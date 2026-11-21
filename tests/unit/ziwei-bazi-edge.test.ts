import { describe, it, expect } from "vitest";
import { computeTuViAstrolabe } from "@/lib/tu-vi/tuviService";
import { computeBaZi } from "@/lib/bat-tu/baziService";

const VALID_ELEMENTS = new Set(["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"]);

describe("ZiWei & BaZi Core Engine Edge Cases", () => {
  it("distinguishes Tảo Tý (timeIndex=0) and Vãn Tý (timeIndex=12) in ZiWei without undefined", () => {
    const taoTy = computeTuViAstrolabe("1990-05-15", 0, "male");
    const vanTy = computeTuViAstrolabe("1990-05-15", 12, "male");

    expect(taoTy.palaces.length).toBe(12);
    expect(vanTy.palaces.length).toBe(12);
    expect(taoTy.timeBranchVi).toContain("Tảo Tý");
    expect(taoTy.timeBranchVi).not.toContain("undefined");
    expect(vanTy.timeBranchVi).toBe("Vãn Tý (23h-00h)");
    expect(vanTy.timeBranchVi).not.toContain("undefined");
  });

  it("maps valid Five Elements (Kim/Mộc/Thủy/Hỏa/Thổ) for every DaYun step in BaZi", () => {
    const res = computeBaZi(1988, 4, 16, 8, "male");
    expect(res.daYunList.length).toBeGreaterThanOrEqual(6);

    for (const dy of res.daYunList) {
      expect(VALID_ELEMENTS.has(dy.ganWuXing)).toBe(true);
      expect(VALID_ELEMENTS.has(dy.zhiWuXing)).toBe(true);
      expect(dy.ganWuXing).not.toBe("Ngũ Hành");
      expect(dy.zhiWuXing).not.toBe("Địa Chi");
    }
  });

  it("handles Vãn Tý (23:30) differently between sect=2 (keep day pillar) and sect=1 (advance day pillar)", () => {
    const sect2 = computeBaZi(1995, 8, 20, 23, "male", 2, 30);
    const sect1 = computeBaZi(1995, 8, 20, 23, "male", 1, 30);

    const daySect2 = sect2.pillars.day.gan + sect2.pillars.day.zhi;
    const daySect1 = sect1.pillars.day.gan + sect1.pillars.day.zhi;
    expect(daySect2).not.toBe(daySect1);
  });

  it("computes consistent 100-point weighted strength score breakdown", () => {
    const res = computeBaZi(1988, 4, 16, 8, "male");
    const bd = res.scoreBreakdown;
    const expectedTotal = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          bd.monthBranch +
            bd.monthClashPenalty +
            bd.dayBranch +
            bd.hourBranch +
            bd.yearBranch +
            bd.exposedStems
        )
      )
    );

    expect(res.strengthScore).toBe(bd.total);
    expect(bd.total).toBe(expectedTotal);
    expect(bd.monthBranch).toBeGreaterThanOrEqual(0);
    expect(bd.monthBranch).toBeLessThanOrEqual(40);
  });

  it("identifies Ngoại Cách (Tòng Cường) for 2022-03-02 00:30 (壬寅 壬寅 甲寅 甲子)", () => {
    const chart = computeBaZi(2022, 3, 2, 0, "male", 2, 30);
    expect(chart.strengthScore).toBeGreaterThanOrEqual(85);
    expect(chart.patternType).toBe("TONG_CUONG");
    expect(chart.patternName).toContain("Tòng Cường");
    // In Tòng Cường, Dụng/Hỷ Thần follow the strong Day Master / resource instead of fighting it
    expect(chart.unfavorableElement).not.toBe(chart.dayMaster.element);
  });

  it("identifies Ngoại Cách (Tòng Sát) for 2016-08-31 10:00 (丙申 丙申 乙酉 辛巳)", () => {
    const chart = computeBaZi(2016, 8, 31, 10, "male", 2, 0);
    expect(chart.strengthScore).toBeLessThanOrEqual(15);
    expect(chart.patternType).toBe("TONG_SAT");
    expect(chart.patternName).toContain("Tòng Sát");
    // In Tòng Sát, Dụng Thần follows Quan Sát (Kim) / Tài (Thổ), NOT Mộc/Thủy
    expect(chart.favorableElement).toContain("Kim");
    expect(chart.favorableElement).not.toContain(chart.dayMaster.element);
  });
});
