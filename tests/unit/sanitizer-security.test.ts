import { describe, it, expect } from "vitest";
import { sanitizeAndCompactChartData } from "@/lib/ai/chartSanitizer";
import { computeTuViAstrolabe } from "@/lib/tu-vi/tuviService";
import { computeBaZi } from "@/lib/bat-tu/baziService";

describe("PII Anonymizer & Token Compactor Security", () => {
  it("strips 100% of PII from ZiWei astrolabe payload and reduces JSON size by >= 70%", () => {
    const rawAstrolabe = computeTuViAstrolabe("1988-04-16", 4, "male");
    const bloatedWithPII = {
      ...rawAstrolabe,
      fullName: "Nguyễn Văn An",
      name: "An Nguyễn",
      address: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
      provinceName: "TP. Hồ Chí Minh",
      phone: "0901234567",
      email: "an.nguyen@example.com",
      birthTime: "08:15",
      coordinates: { lat: 10.8231, lng: 106.6297 },
    };

    const rawJson = JSON.stringify(bloatedWithPII);
    const sanitized = sanitizeAndCompactChartData(bloatedWithPII);
    const sanitizedJson = JSON.stringify(sanitized);

    // Zero PII leakage
    const forbiddenValues = [
      "Nguyễn Văn An",
      "An Nguyễn",
      "123 Đường Lê Lợi",
      "TP. Hồ Chí Minh",
      "0901234567",
      "an.nguyen@example.com",
      "1988-04-16",
      "10.8231",
      "106.6297",
    ];
    for (const val of forbiddenValues) {
      expect(sanitizedJson).not.toContain(val);
    }

    const forbiddenKeys = [
      "fullName",
      "address",
      "provinceName",
      "solarDate",
      "lunarDate",
      "birthTime",
      "coordinates",
    ];
    for (const key of forbiddenKeys) {
      expect(sanitizedJson).not.toContain(`"${key}"`);
    }

    // Token compaction >= 70%
    const reductionRatio = 1 - sanitizedJson.length / rawJson.length;
    expect(reductionRatio).toBeGreaterThanOrEqual(0.7);
  });

  it("strips 100% of PII from BaZi payload, preserves weighted score/patternType, and compacts JSON", () => {
    const rawBaZi = computeBaZi(2022, 2, 18, 4, "male");
    const bloatedWithPII = {
      ...rawBaZi,
      fullName: "Trần Thị Bình",
      address: "Số 45 Phố Huế, Hà Nội",
      provinceName: "TP. Hà Nội",
      solarDate: "2022-02-18",
      lunarDate: "2022-01-18",
      birthTime: "04:00",
      coordinates: { lat: 21.0278, lng: 105.8342 },
      // Simulate extra raw metadata that could be passed from client
      rawClientMeta: {
        debugDump: "x".repeat(4000),
      },
    };

    const rawJson = JSON.stringify(bloatedWithPII);
    const sanitized = sanitizeAndCompactChartData(bloatedWithPII) as Record<string, unknown>;
    const sanitizedJson = JSON.stringify(sanitized);

    expect(sanitizedJson).not.toContain("Trần Thị Bình");
    expect(sanitizedJson).not.toContain("Phố Huế");
    expect(sanitizedJson).not.toContain("2022-02-18");
    expect(sanitizedJson).not.toContain("105.8342");

    // Preserves essential Phase 2 analytical fields
    expect(sanitized.diemVuongSuy).toBe(rawBaZi.strengthScore);
    expect(sanitized.loaiCachCuc).toBe(rawBaZi.patternType);
    expect(sanitized.dungThan).toBe(rawBaZi.favorableElement);

    const reductionRatio = 1 - sanitizedJson.length / rawJson.length;
    expect(reductionRatio).toBeGreaterThanOrEqual(0.7);
  });
});
