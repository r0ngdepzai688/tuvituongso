import { describe, it, expect } from "vitest";
import { retrieveClassics, searchClassicsFileSnippet } from "@/lib/ai/classicsRetriever";
import { validateAIResponse } from "@/lib/ai/outputValidator";
import {
  buildCandidateHourProfiles,
  generateRectificationQuestions,
  scoreCandidateHours,
} from "@/lib/astronomy/birthTimeRectifier";
import { computeBaZi } from "@/lib/bat-tu/baziService";
import { computeTuViAstrolabe } from "@/lib/tu-vi/tuviService";
import { sanitizeAndCompactChartData } from "@/lib/ai/chartSanitizer";
import nextConfig from "../../next.config";

describe("Domain RAG Classics Retriever", () => {
  it("retrieves relevant citations from Trích Thiên Tủy or Cùng Thông Bảo Giám for BaZi chart", () => {
    const rawBaZi = computeBaZi(1988, 4, 16, 8, "male");
    const sanitized = sanitizeAndCompactChartData(rawBaZi);

    // Initial retrieval caches result
    retrieveClassics(sanitized, "bat-tu");

    // Measure in-memory cache retrieval latency
    const start = performance.now();
    const citations = retrieveClassics(sanitized, "bat-tu");
    const durationMs = performance.now() - start;

    expect(citations.length).toBeGreaterThanOrEqual(1);
    expect(citations.length).toBeLessThanOrEqual(3);
    expect(durationMs).toBeLessThan(5); // Guaranteed < 5ms via in-memory cache

    const bookTitles = citations.map((c) => c.bookTitle);
    const hasTzuPingClassics = bookTitles.some(
      (t) =>
        t.includes("Trích Thiên Tủy") ||
        t.includes("Cùng Thông Bảo Giám") ||
        t.includes("Thần Phong Thông Khảo")
    );
    expect(hasTzuPingClassics).toBe(true);
  });

  it("retrieves relevant citations from Tử Vi Đẩu Số Toàn Thư for ZiWei chart", () => {
    const rawZiWei = computeTuViAstrolabe("1990-05-15", 4, "male");
    const sanitized = sanitizeAndCompactChartData(rawZiWei);

    const citations = retrieveClassics(sanitized, "tu-vi");
    expect(citations.length).toBeGreaterThanOrEqual(1);

    const bookTitles = citations.map((c) => c.bookTitle);
    const hasZiWeiClassics = bookTitles.some(
      (t) => t.includes("Tử Vi Đẩu Số Toàn Thư") || t.includes("Đẩu Số Cốt Tủy Phú")
    );
    expect(hasZiWeiClassics).toBe(true);
  });

  it("retrieves Tòng Cách classical citation for Ngoại Cách (Tòng Cường / Tòng Sát) chart", () => {
    const tongCuong = computeBaZi(2022, 3, 2, 0, "male", 2, 30);
    const sanitized = sanitizeAndCompactChartData(tongCuong);

    const citations = retrieveClassics(sanitized, "bat-tu");
    const excerpts = citations.map((c) => c.excerpt).join(" ");
    const reasons = citations.map((c) => c.relevanceReason).join(" ");

    expect(excerpts.includes("从") || reasons.includes("Tòng") || reasons.includes("Giáp")).toBe(true);
  });

  it("retrieves exact Cung Phụ Mẫu citation when user asks about Phụ Mẫu", () => {
    const rawZiWei = computeTuViAstrolabe("1988-04-16", 4, "male");
    const sanitized = sanitizeAndCompactChartData(rawZiWei);

    const citations = retrieveClassics(sanitized, "tu-vi", "Phụ mẫu");
    expect(citations.length).toBeGreaterThanOrEqual(1);

    const topCitation = citations[0];
    expect(topCitation.bookTitle).toContain("Tử Vi Đẩu Số Toàn Thư");
    expect(topCitation.chapter).toContain("Phụ Mẫu");
    expect(topCitation.excerpt).toContain("父母宫");
  });

  it("retrieves exact Cung Phu Thê citation when user asks about Phu Thê / Hôn nhân", () => {
    const rawZiWei = computeTuViAstrolabe("1988-04-16", 4, "male");
    const sanitized = sanitizeAndCompactChartData(rawZiWei);

    const citations = retrieveClassics(sanitized, "tu-vi", "hôn nhân phu thê tình duyên");
    expect(citations.length).toBeGreaterThanOrEqual(1);

    const chapters = citations.map((c) => c.chapter).join(" ");
    expect(chapters).toContain("Phu Thê");
  });
});

describe("Output Hallucination & Citation Validator", () => {
  it("flags warning when AI advocates Kỵ Thần as Dụng Thần in BaZi", () => {
    const fakeChart = {
      nhatChu: "Giáp Mộc",
      dungThan: "Mộc (Tỷ Kiếp)",
      hyThan: "Thủy (Ấn Tinh)",
      kyThan: "Kim (Quan Sát — Đại Kỵ)",
    };

    // AI hallucinates: advising user to take Kim as primary Dụng Thần
    const hallucinatedText = `
### Luận Giải
Dụng Thần cốt lõi là Kim để chế ngự bản mệnh. Quý bạn nên chọn Kim làm Dụng Thần chính.
`;

    const result = validateAIResponse(hallucinatedText, fakeChart);
    expect(result.isValid).toBe(false);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain("nhầm lẫn Kỵ Thần (Kim) thành Dụng Thần");
    expect(result.details?.favorableConflict).toBe(true);
  });

  it("flags warning when AI fabricates a Major Star in Destiny Palace (Cung Mệnh) in ZiWei", () => {
    const fakeZiWeiChart = {
      muoiHaiCung: [
        { cung: "Mệnh", canChi: "Canh Thân", chinhTinh: ["Thiên Phủ(Miếu)"] },
        { cung: "Huynh Đệ", canChi: "Tân Dậu", chinhTinh: ["Thái Âm"] },
      ],
    };

    // AI hallucinates: claiming Thất Sát sits in Cung Mệnh (when actual is Thiên Phủ)
    const hallucinatedText = `
### Phân Tích Bản Mệnh
Cung Mệnh có sao Thất Sát tọa thủ hãm địa khiến cuộc đời bạn chịu nhiều bôn ba chìm nổi.
`;

    const result = validateAIResponse(hallucinatedText, fakeZiWeiChart);
    expect(result.isValid).toBe(false);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain("sao Thất Sát tọa thủ Cung Mệnh không khớp với lá số gốc");
    expect(result.details?.starHallucinations).toContain("Thất Sát");
  });

  it("passes validation with zero warnings when AI response is faithful to ground truth", () => {
    const faithfulChart = {
      nhatChu: "Giáp Mộc",
      dungThan: "Hỏa (Thực Thương)",
      hyThan: "Thổ (Tài Tinh)",
      kyThan: "Kim (Quan Sát)",
      muoiHaiCung: [
        { cung: "Mệnh", canChi: "Canh Thân", chinhTinh: ["Tử Vi", "Thiên Phủ"] },
      ],
    };

    const faithfulText = `
### Luận Giải Hợp Cách
[Cung Mệnh: Tử Vi, Thiên Phủ] tại Thân hội tụ thế Quân Thần Khánh Hội.
Dụng Thần là Hỏa để tiết tú, sinh Tài, kỵ hành Kim xung khắc cội rễ.
`;

    const result = validateAIResponse(faithfulText, faithfulChart);
    expect(result.isValid).toBe(true);
    expect(result.warnings.length).toBe(0);
  });
});

describe("Birth-Time Rectification Engine", () => {
  it("builds candidate profiles with distinct Destiny Palaces and Hour Pillars", () => {
    // Check candidate hours 4 (Thìn 7-9h) and 5 (Tỵ 9-11h) for 1990-05-15
    const candidates = buildCandidateHourProfiles("1990-05-15", "male", [4, 5]);
    expect(candidates.length).toBe(2);

    expect(candidates[0].branchName).toBe("Thìn");
    expect(candidates[1].branchName).toBe("Tỵ");
    expect(candidates[0].hourPillarVi).not.toBe(candidates[1].hourPillarVi);
    expect(candidates[0].menhPalaceBranch).not.toBe(candidates[1].menhPalaceBranch);
  });

  it("generates 4 verification questions with candidate options", () => {
    const candidates = buildCandidateHourProfiles("1990-05-15", "male", [4, 5]);
    const questions = generateRectificationQuestions(candidates);

    expect(questions.length).toBe(4);
    expect(questions[0].id).toBe("temperament");
    expect(questions[1].id).toBe("career");
    expect(questions[2].id).toBe("family");
    expect(questions[3].id).toBe("milestone");

    for (const q of questions) {
      expect(q.options.length).toBe(2);
      expect(q.options[0].matchedTimeIndex).toBe(4);
      expect(q.options[1].matchedTimeIndex).toBe(5);
    }
  });

  it("scores user responses and accurately recommends the matched hour", () => {
    const candidates = buildCandidateHourProfiles("1990-05-15", "male", [4, 5]);

    // User chooses option for timeIndex 4 in all 4 questions
    const userAnswers = {
      temperament: 4,
      career: 4,
      family: 4,
      milestone: 4,
    };

    const report = scoreCandidateHours(candidates, userAnswers);
    expect(report.recommended.candidate.timeIndex).toBe(4);
    expect(report.recommended.percentage).toBe(100);
    expect(report.candidates.find((c) => c.candidate.timeIndex === 5)?.percentage).toBe(0);
    expect(report.academicRationale).toContain("Thìn");
  });
});

describe("File-Based Classics RAG & Production Security Headers", () => {
  it("scans and extracts live snippet from docs/references/classics markdown files", () => {
    const snippet = searchClassicsFileSnippet("Thất Sát", "tu-vi");
    expect(snippet).not.toBeNull();
    expect(snippet?.bookTitle).toContain("Tử Vi");
    expect(snippet?.excerpt.length).toBeGreaterThanOrEqual(150);
    expect(snippet?.excerpt.length).toBeLessThanOrEqual(400);
    expect(snippet?.excerpt).toContain("Thất Sát");
  });

  it("synchronizes query parameters for auto-launching charts from /dinh-gio-sinh", () => {
    // Simulate query params passed when clicking "Xem Lá Số Tử Vi Với Giờ Này"
    const params = new URLSearchParams("date=1995-08-20&time=7&hour=14&gender=female&province=da-nang");

    const date = params.get("date");
    const timeParam = params.get("time");
    const hourParam = params.get("hour");
    const gender = params.get("gender");
    const province = params.get("province");

    expect(date).toBe("1995-08-20");
    expect(gender).toBe("female");
    expect(province).toBe("da-nang");
    expect(Number(timeParam)).toBe(7); // Mùi
    expect(Number(hourParam)).toBe(14);

    // Verify BaZi & ZiWei can directly compute immediately from these resolved values
    const bazi = computeBaZi(1995, 8, 20, 14, "female");
    const ziwei = computeTuViAstrolabe("1995-08-20", 7, "female");

    expect(bazi.dayMaster.ganVi).toBe("Quý");
    expect(ziwei.palaces.length).toBe(12);
  });

  it("configures strict production security headers in next.config.ts", async () => {
    expect(typeof nextConfig.headers).toBe("function");
    const headersConfig = await nextConfig.headers!();
    expect(headersConfig.length).toBeGreaterThanOrEqual(1);

    const rootRule = headersConfig.find((r) => r.source === "/(.*)");
    expect(rootRule).toBeDefined();

    const headersMap = new Map(rootRule?.headers.map((h) => [h.key, h.value]));
    expect(headersMap.get("X-Frame-Options")).toBe("DENY");
    expect(headersMap.get("X-Content-Type-Options")).toBe("nosniff");
    expect(headersMap.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(headersMap.get("Permissions-Policy")).toContain("camera=()");
    expect(headersMap.get("Content-Security-Policy")).toContain("frame-ancestors 'none'");
  });
});

