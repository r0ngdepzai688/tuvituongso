import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { buildMetaphysicsPrompt } from "@/lib/ai/metaphysicsPromptEngine";
import { sanitizeAndCompactChartData } from "@/lib/ai/chartSanitizer";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimiter";
import { validateAIResponse } from "@/lib/ai/outputValidator";
import { retrieveClassics } from "@/lib/ai/classicsRetriever";

const MAX_PAYLOAD_BYTES = 80 * 1024; // 80 KB safety limit

const ChatAIRequestSchema = z.object({
  systemType: z.enum(["tu-vi", "bat-tu", "ky-mon", "hop-hon", "general"]).default("general"),
  data: z.unknown().optional(),
  query: z
    .string()
    .trim()
    .max(1000, "Câu hỏi quá dài (tối đa 1.000 ký tự). Xin vui lòng rút gọn câu hỏi.")
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Sliding-Window Rate Limiting (12 requests / minute per IP)
    const ip = getClientIp(req.headers);
    const rate = checkRateLimit(`chat-ai:${ip}`, 12, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `Quý bạn đang gửi yêu cầu quá nhanh. Xin vui lòng chờ khoảng ${rate.retryAfterSec} giây rồi thử lại để hệ thống giữ ổn định.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rate.retryAfterSec),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // 2. Payload size guardrail
    const rawText = await req.text();
    if (Buffer.byteLength(rawText, "utf-8") > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { error: "Dữ liệu gửi lên vượt quá giới hạn an toàn (80KB)." },
        { status: 413 }
      );
    }

    let rawJson: unknown;
    try {
      rawJson = JSON.parse(rawText);
    } catch {
      return NextResponse.json({ error: "Định dạng JSON không hợp lệ." }, { status: 400 });
    }

    // 3. Zod Schema Validation
    const parsed = ChatAIRequestSchema.safeParse(rawJson);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || "Dữ liệu yêu cầu không hợp lệ.",
          details: parsed.error.issues.map((i) => i.message),
        },
        { status: 400 }
      );
    }

    const { systemType, data, query } = parsed.data;

    // 4. Mandatory PII Anonymization & Token Compaction BEFORE leaving server
    const sanitizedData = sanitizeAndCompactChartData(data);

    // 5. Call Gemini API if configured
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      const structuredPrompt = buildMetaphysicsPrompt(systemType, sanitizedData, query);
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: structuredPrompt }],
              },
            ],
          }),
        }
      );

      const resJson = await response.json();
      const reply = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) {
        const validation = validateAIResponse(reply, sanitizedData);
        return NextResponse.json(
          { reply, validation },
          { headers: { "X-RateLimit-Remaining": String(rate.remaining) } }
        );
      }
    }

    // 6. Structured offline fallback (strictly using sanitizedData + Classics RAG)
    const d = sanitizedData as any;
    const citations = retrieveClassics(sanitizedData, systemType, query);
    const citationSnippet =
      citations.length > 0
        ? `\n\n**Đối chiếu cổ thư (${citations[0].bookTitle}):**\n> *${citations[0].chapter}*\n> "${citations[0].excerpt.split("\n")[0]}"`
        : "";

    // Hàm chuẩn hóa Hán Việt các thuật ngữ cục diện và tinh diệu
    const toVietnameseTerm = (val: string | undefined): string => {
      if (!val) return "Chưa xác định";
      return val
        .replace(/土五局/g, "Thổ Ngũ Cục")
        .replace(/水二局/g, "Thủy Nhị Cục")
        .replace(/木三局/g, "Mộc Tam Cục")
        .replace(/金四局/g, "Kim Tứ Cục")
        .replace(/火六局/g, "Hỏa Lục Cục")
        .replace(/文昌/g, "Văn Xương")
        .replace(/文曲/g, "Văn Khúc")
        .replace(/武曲/g, "Vũ Khúc")
        .replace(/天相/g, "Thiên Tướng")
        .replace(/贪狼/g, "Tham Lang")
        .replace(/七杀/g, "Thất Sát")
        .replace(/破军/g, "Phá Quân")
        .replace(/紫微/g, "Tử Vi")
        .replace(/天府/g, "Thiên Phủ")
        .replace(/太阴/g, "Thái Âm")
        .replace(/太阳/g, "Thái Dương")
        .replace(/天同/g, "Thiên Đồng")
        .replace(/天机/g, "Thiên Cơ")
        .replace(/廉贞/g, "Liêm Trinh")
        .replace(/天梁/g, "Thiên Lương")
        .replace(/巨门/g, "Cự Môn");
    };

    let fallbackReply = "";
    if (systemType === "tu-vi") {
      const qLower = (query || "").toLowerCase();
      const muoiHaiCung: any[] = Array.isArray(d.muoiHaiCung) ? d.muoiHaiCung : [];

      // Nhận diện cung vị trọng tâm theo câu hỏi người dùng
      let targetPalaceName = "Mệnh";
      let topicTitle = "Cung Mệnh & Cốt Cách Bản Mệnh";

      if (qLower.includes("phụ mẫu") || qLower.includes("cha mẹ") || qLower.includes("bố mẹ") || qLower.includes("song thân") || qLower.includes("mẹ cha")) {
        targetPalaceName = "Phụ Mẫu";
        topicTitle = "Cung Phụ Mẫu (Phúc Ấm & Duyên Nợ Song Thân)";
      } else if (qLower.includes("phu thê") || qLower.includes("vợ chồng") || qLower.includes("hôn nhân") || qLower.includes("tình duyên")) {
        targetPalaceName = "Phu Thê";
        topicTitle = "Cung Phu Thê (Hôn Nhân & Lương Duyên Phối Ngẫu)";
      } else if (qLower.includes("tài bạch") || qLower.includes("tiền bạc") || qLower.includes("tài chính") || qLower.includes("tài lộc")) {
        targetPalaceName = "Tài Bạch";
        topicTitle = "Cung Tài Bạch (Dòng Tiền, Thu Hoạch & Tích Lũy)";
      } else if (qLower.includes("quan lộc") || qLower.includes("sự nghiệp") || qLower.includes("công danh") || qLower.includes("thăng tiến")) {
        targetPalaceName = "Quan Lộc";
        topicTitle = "Cung Quan Lộc (Lộ Trình Công Danh & Sự Nghiệp)";
      } else if (qLower.includes("tử tức") || qLower.includes("con cái") || qLower.includes("hậu tự")) {
        targetPalaceName = "Tử Tức";
        topicTitle = "Cung Tử Tức (Hậu Tự & Nhân Duyên Thế Hệ Sau)";
      } else if (qLower.includes("huynh đệ") || qLower.includes("anh em")) {
        targetPalaceName = "Huynh Đệ";
        topicTitle = "Cung Huynh Đệ (Tình Nghĩa Huynh Đệ & Trợ Lực)";
      } else if (qLower.includes("tật ách") || qLower.includes("sức khỏe") || qLower.includes("bệnh tật")) {
        targetPalaceName = "Tật Ách";
        topicTitle = "Cung Tật Ách (Sức Khỏe, Khí Huyết & Thể Trạng)";
      } else if (qLower.includes("thiên di") || qLower.includes("đi xa") || qLower.includes("xuất ngoại") || qLower.includes("ra ngoài")) {
        targetPalaceName = "Thiên Di";
        topicTitle = "Cung Thiên Di (Ngoại Cảnh Xã Hội & Cơ Hội Đi Xa)";
      } else if (qLower.includes("nô bộc") || qLower.includes("bạn bè") || qLower.includes("đồng nghiệp") || qLower.includes("cấp dưới")) {
        targetPalaceName = "Nô Bộc";
        topicTitle = "Cung Nô Bộc (Mạng Lưới Bạn Bè & Cộng Sự)";
      } else if (qLower.includes("điền trạch") || qLower.includes("nhà đất") || qLower.includes("bất động sản")) {
        targetPalaceName = "Điền Trạch";
        topicTitle = "Cung Điền Trạch (Cơ Nghiệp Điền Sản & An Cư)";
      } else if (qLower.includes("phúc đức") || qLower.includes("tổ tiên") || qLower.includes("tâm tính")) {
        targetPalaceName = "Phúc Đức";
        topicTitle = "Cung Phúc Đức (Phúc Trạch Tiên Tổ & Chiều Sâu Tâm Tính)";
      }

      const activePalace =
        muoiHaiCung.find((p) => p && (p.cung === targetPalaceName || p.cung?.includes(targetPalaceName))) ||
        muoiHaiCung.find((p) => p && (p.cung === "Mệnh" || p.cung?.includes("Mệnh"))) ||
        muoiHaiCung[0];

      const starList = Array.isArray(activePalace?.chinhTinh) && activePalace.chinhTinh.length > 0
        ? activePalace.chinhTinh.map((s: string) => toVietnameseTerm(s)).join(", ")
        : "Vô Chính Diệu (mượn chính tinh cung đối diện)";

      const canChiText = toVietnameseTerm(activePalace?.canChi || "Địa Chi");
      const cucText = toVietnameseTerm(d.cuc);
      const menhChuText = toVietnameseTerm(d.menhChu);
      const thanChuText = toVietnameseTerm(d.thanChu);

      if (targetPalaceName === "Phụ Mẫu") {
        fallbackReply = `### Luận Giải Chi Tiết: ${topicTitle}
- **Tọa độ phong thủy & Cung vị:** [${targetPalaceName} tại ${canChiText}] • Chính tinh tọa thủ: [${starList}] • [Cục bản mệnh: ${cucText}].
- **Ân đức & Quan hệ song thân:** Cung Phụ Mẫu phản ánh nền tảng nuôi dưỡng, phúc lộc gia đình và sự tương tác giữa đương số với cha mẹ. Khi các tinh diệu như ${starList} lâm chiếu, cha mẹ có cá tính riêng và phong cách giáo dưỡng chuẩn mực; nếu có thêm văn tinh như Xương Khúc hội chiếu, gia phong thiên về lễ nghĩa tri thức.
- **Chiến lược Xu Cát Tị Hung:** Cần chú ý tam phương tứ chính nếu hội chiếu các sát tinh (Kình Dương, Đà La, Hóa Kỵ) có thể dễ nảy sinh bất đồng quan điểm do khoảng cách thế hệ. Đương số nên lấy đức hiếu hòa làm đầu, chủ động lắng nghe và chia sẻ chân thành để bồi đắp phúc ấm bền lâu cho gia đình.${citationSnippet}`;
      } else if (targetPalaceName === "Phu Thê") {
        fallbackReply = `### Luận Giải Chi Tiết: ${topicTitle}
- **Tọa độ phong thủy & Cung vị:** [Phu Thê tại ${canChiText}] • Tinh diệu tọa thủ: [${starList}].
- **Nhân duyên kết tóc:** Cung Phu Thê chủ về khí chất người phối ngẫu và sự hòa hợp trong đời sống hôn nhân. Tinh diệu ${starList} biểu thị bạn đời là người có lập trường, biết vun vén cơ nghiệp.
- **Chiến lược Xu Cát Tị Hung:** Đời sống lứa đôi cần sự tôn trọng không gian riêng và lắng nghe kiên nhẫn để hóa giải triệt để các góc xung khắc thời vận.${citationSnippet}`;
      } else if (targetPalaceName === "Tài Bạch") {
        fallbackReply = `### Luận Giải Chi Tiết: ${topicTitle}
- **Tọa độ dòng tiền:** [Tài Bạch tại ${canChiText}] • Tinh diệu tọa thủ: [${starList}].
- **Cơ chế tụ tài:** Năng lực sinh tài đến từ chuyên môn vững vàng và sự tính toán chặt chẽ. Hạn chế đầu cơ mạo hiểm khi chưa có sự bảo hộ của cát tinh.
- **Chiến lược Xu Cát Tị Hung:** Phân bổ tài sản đa kênh an toàn, ưu tiên tích lũy bền vững thay vì chạy theo lợi nhuận ngắn hạn.${citationSnippet}`;
      } else {
        fallbackReply = `### Luận Giải Chi Tiết: ${topicTitle}
- **Tọa độ bản mệnh:** [Ngũ Hành Cục: ${cucText}] • [Mệnh Chủ: ${menhChuText}] • [Thân Chủ: ${thanChuText}].
- **Khí chất & Năng lực hành động:** [${targetPalaceName} tại ${canChiText}: ${starList}] — định hình tư duy thực chiến và năng lực bứt phá trong Đại Hạn ${activePalace?.daiHan || "hiện tại"}.
- **Chiến lược Xu Cát Tị Hung:** Tập trung phát huy tối đa các cát tinh đắc địa, đồng thời quản trị rủi ro ở các cung xung chiếu mang sát tinh để vững vàng tiến bước.${citationSnippet}`;
      }
    } else if (systemType === "bat-tu") {
      const b = d.batTu || d;
      const qLower = (query || "").toLowerCase();
      let topicNote = "Tứ Trụ Bát Tự";
      if (qLower.includes("phụ mẫu") || qLower.includes("cha mẹ") || qLower.includes("bố mẹ")) {
        topicNote = "Phụ Mẫu & Căn Khí Ấn Tinh";
      }

      fallbackReply = `### Luận Giải Tứ Trụ Bát Tự — ${topicNote}
- **Tọa độ Nhật Chủ & Cách Cục:** [Nhật Chủ: ${b.nhatChu || "N/A"} — ${b.vuongSuy || "N/A"}] • [Cách Cục: ${b.cachCuc || "N/A"}].
- **Lợi thế (Hỷ/Dụng Thần):** Dụng Thần **${b.dungThan || "N/A"}**, Hỷ Thần **${b.hyThan || "N/A"}** — ưu tiên môi trường, phương hướng và hành động tương sinh bản mệnh.
- **Điểm mù & Quản trị rủi ro (Kỵ Thần):** Tiết chế các yếu tố mang hành **${b.kyThan || "N/A"}**; lưu tâm quản lý các mối quan hệ gia đạo và tài chính trong các năm gặp hình xung lục hại.${citationSnippet}`;
    } else {
      fallbackReply = `### Luận Giải Thời Gia Kỳ Môn Độn Giáp
- **Cục Diện:** [${d.dunType || "N/A"} Cục ${d.juNumber || "N/A"}] • [Tiết khí: ${d.solarTerm || "N/A"}].
- **Trực Phù & Trực Sử:** [${d.zhifuStar || "N/A"} / ${d.zhishiDoor || "N/A"}].
- **Chiến lược hành động:** Ưu tiên phương vị có Tam Cát Môn (Khai, Hưu, Sinh) kết hợp Cát Thần để đàm phán hoặc xuất hành; tránh trực xung phương vị có Tử Môn / Kinh Môn.${citationSnippet}`;
    }

    const validation = validateAIResponse(fallbackReply, sanitizedData);
    return NextResponse.json(
      { reply: fallbackReply, validation },
      { headers: { "X-RateLimit-Remaining": String(rate.remaining) } }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Lỗi phản hồi tư vấn AI" }, { status: 500 });
  }
}
