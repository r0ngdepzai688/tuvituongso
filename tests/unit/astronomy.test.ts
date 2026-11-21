import { describe, it, expect } from "vitest";
import {
  getLunarLeapMonth,
  convertLunarToSolarDate,
  checkSolarTermBoundary,
} from "@/lib/astronomy/solarTermGuard";
import {
  VIETNAM_34_PROVINCES,
  calculateVietnamTrueSolarTime,
  hourToTimeIndex,
} from "@/lib/astronomy/vietnamTrueSolarTime";
import { computeBaZi } from "@/lib/bat-tu/baziService";

describe("Astronomy, Lunar-Solar & Solar Term Boundary Guard", () => {
  it("supports official 34 Vietnamese provincial-level units post-merger", () => {
    expect(VIETNAM_34_PROVINCES.length).toBe(34);
    expect(VIETNAM_34_PROVINCES.some((p) => p.id === "dien-bien")).toBe(true);
    expect(VIETNAM_34_PROVINCES.some((p) => p.id === "quang-ninh")).toBe(true);
  });

  it("correctly detects lunar leap months for 2023 (month 2), 2024 (none), and 2025 (month 6)", () => {
    expect(getLunarLeapMonth(2023)).toBe(2);
    expect(getLunarLeapMonth(2024)).toBe(0);
    expect(getLunarLeapMonth(2025)).toBe(6);
  });

  it("converts Lunar dates with leap months accurately to Solar YYYY-MM-DD", () => {
    // 2023: 1/2 Âm lịch (thường) = 2023-02-20; 1/2 Âm lịch (nhuận) = 2023-03-22
    expect(convertLunarToSolarDate(2023, 2, 1, false)).toBe("2023-02-20");
    expect(convertLunarToSolarDate(2023, 2, 1, true)).toBe("2023-03-22");

    // 2025: 1/6 Âm lịch (thường) = 2025-06-25; 1/6 Âm lịch (nhuận) = 2025-07-25
    expect(convertLunarToSolarDate(2025, 6, 1, false)).toBe("2025-06-25");
    expect(convertLunarToSolarDate(2025, 6, 1, true)).toBe("2025-07-25");
  });

  it("switches BaZi Year Pillar at Lập Xuân (before 30 Tết) and fires boundary warning within ±45 min", () => {
    // Lập Xuân 2024 is on 2024-02-04 (~16:27 China/UTC+8). 30 Tết is 2024-02-09.
    const beforeLapXuan = computeBaZi(2024, 2, 3, 12, "male");
    const afterLapXuanBeforeTet = computeBaZi(2024, 2, 6, 12, "male");

    expect(beforeLapXuan.pillars.year.gan + beforeLapXuan.pillars.year.zhi).toBe("癸卯");
    expect(afterLapXuanBeforeTet.pillars.year.gan + afterLapXuanBeforeTet.pillars.year.zhi).toBe("甲辰");

    // Near Lập Xuân 2024 (2024-02-04 16:20 -> within 45 min of 16:27)
    const warning = checkSolarTermBoundary(2024, 2, 4, 16, 20, 45);
    expect(warning).not.toBeNull();
    expect(warning?.termNameZh).toBe("立春");
    expect(warning?.termNameVi).toBe("Lập Xuân");
    expect(warning?.isYearBoundary).toBe(true);
    expect(warning?.minutesDiff).toBeLessThanOrEqual(45);

    // Far from any solar term -> no warning
    const noWarning = checkSolarTermBoundary(2024, 2, 15, 12, 0, 45);
    expect(noWarning).toBeNull();
  });

  it("computes True Solar Time longitude offset accurately between Điện Biên (West) and Quảng Ninh (East)", () => {
    const dienBien = calculateVietnamTrueSolarTime("2024-06-21", 12, 0, "dien-bien");
    const quangNinh = calculateVietnamTrueSolarTime("2024-06-21", 12, 0, "quang-ninh");

    // Điện Biên (~103.02°E) is west of 105°E -> negative longitude offset (~ -7.9 min)
    expect(dienBien.longitudeOffsetMin).toBeLessThan(-7);
    // Quảng Ninh (~107.04°E) is east of 105°E -> positive longitude offset (~ +8.2 min)
    expect(quangNinh.longitudeOffsetMin).toBeGreaterThan(7);

    // Difference between Quảng Ninh and Điện Biên should be ~16 minutes
    const diffMin = quangNinh.totalOffsetMin - dienBien.totalOffsetMin;
    expect(diffMin).toBeGreaterThanOrEqual(15);
    expect(diffMin).toBeLessThanOrEqual(17);
  });

  it("maps hours to 13 time indexes distinguishing Tảo Tý (0) and Vãn Tý (12)", () => {
    expect(hourToTimeIndex(0)).toBe(0);
    expect(hourToTimeIndex(23)).toBe(12);
    expect(hourToTimeIndex(8)).toBe(4); // Thìn
  });
});
