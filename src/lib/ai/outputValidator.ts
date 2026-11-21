/**
 * Output Hallucination & Citation Validator
 * Post-execution guardrail checking AI-generated markdown against ground-truth chart data:
 * 1. Favorable vs Unfavorable Element Conflict (Dụng Thần vs Kỵ Thần) in BaZi.
 * 2. Fabricated Major Stars in Destiny Palace (14 Chính Tinh Cung Mệnh) in ZiWei.
 */

export interface ValidationResult {
  isValid: boolean;
  warnings: string[];
  details?: {
    favorableConflict?: boolean;
    unfavorableAdvocated?: string[];
    starHallucinations?: string[];
  };
}

const MAJOR_STARS = [
  "Tử Vi",
  "Thiên Cơ",
  "Thái Dương",
  "Vũ Khúc",
  "Thiên Đồng",
  "Liêm Trinh",
  "Thiên Phủ",
  "Thái Âm",
  "Tham Lang",
  "Cự Môn",
  "Thiên Tướng",
  "Thiên Lương",
  "Thất Sát",
  "Phá Quân",
];

const FIVE_ELEMENTS = ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"];

function extractBaseElement(text: unknown): string | null {
  if (!text || typeof text !== "string") return null;
  for (const el of FIVE_ELEMENTS) {
    if (text.includes(el)) return el;
  }
  return null;
}

function normalizeStarName(raw: string): string {
  return raw.replace(/\(.*?\)/g, "").trim();
}

export function validateAIResponse(
  aiMarkdown: string,
  sanitizedChart: unknown
): ValidationResult {
  const warnings: string[] = [];
  const starHallucinations: string[] = [];
  const unfavorableAdvocated: string[] = [];

  if (!aiMarkdown || typeof aiMarkdown !== "string") {
    return { isValid: true, warnings: [] };
  }

  if (!sanitizedChart || typeof sanitizedChart !== "object") {
    return { isValid: true, warnings: [] };
  }

  const chart = sanitizedChart as Record<string, any>;

  // =========================================================================
  // 1. KIỂM TRA MÂU THUẪN DỤNG THẦN / KỴ THẦN TRONG BÁT TỰ
  // =========================================================================
  const rawKyThan = chart.kyThan || chart.batTu?.kyThan;
  const rawDungThan = chart.dungThan || chart.batTu?.dungThan;

  const kyElement = extractBaseElement(rawKyThan);
  const dungElement = extractBaseElement(rawDungThan);

  if (kyElement) {
    // Regex patterns where AI explicitly advocates kyElement as the primary Dụng Thần
    const dungThanAdvocacyPatterns = [
      new RegExp(`(?:Dụng\\s*Thần(?:\\s*cốt\\s*lõi)?(?:\\s*là|:\\s*|\\s*chính\\s*là)?|chọn|lấy|hành|sử\\s*dụng)[^.\\n]{0,30}\\b${kyElement}\\b[^.\\n]{0,30}(?:làm\\s*Dụng\\s*Thần|làm\\s*dụng\\s*thần|là\\s*Dụng\\s*Thần)`, "i"),
      new RegExp(`Dụng\\s*Thần\\s*(?:chính|ưu\\s*tiên|cốt\\s*lõi)?\\s*(?:là|:)\\s*[^.\\n]{0,20}\\b${kyElement}\\b`, "i"),
      new RegExp(`(?:khuyên|cần|nên)\\s*(?:bổ\\s*sung|dùng|tăng\\s*cường)\\s*(?:hành\\s*)?${kyElement}\\s*(?:làm\\s*dụng\\s*thần|để\\s*làm\\s*Dụng\\s*Thần)`, "i"),
    ];

    const hasConflict = dungThanAdvocacyPatterns.some((pattern) => pattern.test(aiMarkdown));
    if (hasConflict && kyElement !== dungElement) {
      unfavorableAdvocated.push(kyElement);
      warnings.push(
        `Phát hiện câu trả lời AI có dấu hiệu nhầm lẫn Kỵ Thần (${kyElement}) thành Dụng Thần. Vui lòng đối chiếu với bảng Hỷ Dụng Thần tất định (${dungElement || rawDungThan || "đã xác lập"}).`
      );
    }
  }

  // =========================================================================
  // 2. KIỂM TRA BỊA TÊN CHÍNH TINH CUNG MỆNH TRONG TỬ VI
  // =========================================================================
  let actualMenhStars: string[] = [];
  let foundMenhPalace = false;

  if (Array.isArray(chart.muoiHaiCung)) {
    const menh = chart.muoiHaiCung.find(
      (p: any) =>
        p &&
        (p.cung === "Mệnh" ||
          p.cung === "Mệnh Cung" ||
          p.nameVi?.includes("Mệnh") ||
          p.cung?.includes("Mệnh"))
    );
    if (menh) {
      foundMenhPalace = true;
      if (Array.isArray(menh.chinhTinh)) {
        actualMenhStars = menh.chinhTinh.map(normalizeStarName);
      }
    }
  } else if (chart.tuVi?.cungMenh) {
    foundMenhPalace = true;
    if (Array.isArray(chart.tuVi.cungMenh.chinhTinh)) {
      actualMenhStars = chart.tuVi.cungMenh.chinhTinh.map(normalizeStarName);
    }
  }

  if (foundMenhPalace) {
    const actualSet = new Set(actualMenhStars);
    const actualText = actualMenhStars.length > 0 ? actualMenhStars.join(", ") : "Vô Chính Diệu";

    for (const star of MAJOR_STARS) {
      if (actualSet.has(star)) continue; // Star actually exists in Mệnh -> valid

      // Look for claims that this major star sits in Cung Mệnh
      const starInMenhPatterns = [
        new RegExp(`(?:Cung\\s*Mệnh|Mệnh\\s*cung|bản\\s*Mệnh)[^.\\n]{0,25}(?:tọa\\s*thủ|có\\s*sao|thủ\\s*mệnh|đồng\\s*cung|tọa\\s*lạc)[^.\\n]{0,25}\\b${star}\\b`, "i"),
        new RegExp(`(?:sao\\s*)?\\b${star}\\b[^.\\n]{0,25}(?:tọa\\s*thủ|thủ\\s*cung|nhập|tọa)[^.\\n]{0,25}(?:Cung\\s*Mệnh|cung\\s*mệnh|Mệnh\\s*cung)`, "i"),
        new RegExp(`\\[Cung\\s*Mệnh:[^\\]]*\\b${star}\\b[^\\]]*\\]`, "i"),
      ];

      const matches = starInMenhPatterns.some((pattern) => pattern.test(aiMarkdown));
      if (matches) {
        starHallucinations.push(star);
        warnings.push(
          `Phát hiện AI đề cập sao ${star} tọa thủ Cung Mệnh không khớp với lá số gốc (Cung Mệnh thực tế: ${actualText}).`
        );
      }
    }
  }

  return {
    isValid: warnings.length === 0,
    warnings,
    details: {
      favorableConflict: unfavorableAdvocated.length > 0,
      unfavorableAdvocated,
      starHallucinations,
    },
  };
}
