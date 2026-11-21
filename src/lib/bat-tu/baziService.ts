import { Solar } from "lunar-typescript";
import {
  STEM_MAP,
  BRANCH_MAP,
  SHISHEN_MAP,
} from "../constants/vietnameseDictionary";
import { enrichBaZiChart, BaZiEnrichment } from "./baziEnricher";
import { checkSolarTermBoundary, SolarTermBoundaryWarning } from "../astronomy/solarTermGuard";

export type BaZiPatternType =
  | "CHINH_CACH"
  | "TONG_CUONG"
  | "TONG_TAI"
  | "TONG_SAT"
  | "TONG_NHI"
  | "TONG_THE";

export interface BaZiScoreBreakdown {
  monthBranch: number;       // Max 40 (Nguyệt Lệnh - Đắc Lệnh)
  monthClashPenalty: number; // Negative adjustment (-25% if clashed by Day/Year branch)
  dayBranch: number;         // Max 15 (Nhật Chi - Đắc Địa)
  hourBranch: number;        // Max 12 (Thời Chi)
  yearBranch: number;        // Max 10 (Niên Chi)
  exposedStems: number;      // Max 23 (Nguyệt Can 8 + Thời Can 8 + Niên Can 7)
  total: number;             // 0..100
}

export interface PillarData {
  gan: string;
  ganVi: string;
  zhi: string;
  zhiVi: string;
  ganWuXing: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
  zhiWuXing: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
  naYin: string;
  shiShenGan: string;
  hiddenGan: {
    gan: string;
    ganVi: string;
    shiShen: string;
  }[];
}

export interface DaYunData {
  index: number;
  startAge: number;
  endAge: number;
  startYear: number;
  endYear: number;
  ganZhi: string;
  ganZhiVi: string;
  ganWuXing: string;
  zhiWuXing: string;
}

export interface BaZiResult {
  solarDate: string;
  lunarDate: string;
  gender: "Nam" | "Nữ";
  dayMaster: {
    gan: string;
    ganVi: string;
    element: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
    polarity: "Dương" | "Âm";
  };
  pillars: {
    year: PillarData;
    month: PillarData;
    day: PillarData;
    hour: PillarData;
  };
  elementsCount: {
    Kim: number;
    Mộc: number;
    Thủy: number;
    Hỏa: number;
    Thổ: number;
  };
  elementsPercentage: {
    Kim: number;
    Mộc: number;
    Thủy: number;
    Hỏa: number;
    Thổ: number;
  };
  strengthStatus: "Thân Vượng" | "Thân Nhược" | "Trung Hòa" | "Cực Vượng" | "Cực Nhược";
  strengthScore: number; // 0..100 weighted Tzu Ping score
  scoreBreakdown: BaZiScoreBreakdown;
  patternType: BaZiPatternType;
  patternName: string; // Cách cục
  favorableElement: string; // Dụng thần
  supportingElement: string; // Hỷ thần
  unfavorableElement: string; // Kỵ thần
  daYunList: DaYunData[];
  enrichment?: BaZiEnrichment;
  boundaryWarning?: SolarTermBoundaryWarning | null;
}

const WUXING_MAP: Record<string, "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ"> = {
  金: "Kim",
  木: "Mộc",
  水: "Thủy",
  火: "Hỏa",
  土: "Thổ",
};

const GAN_WUXING_MAP: Record<string, "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ"> = {
  甲: "Mộc", 乙: "Mộc", 丙: "Hỏa", 丁: "Hỏa", 戊: "Thổ",
  己: "Thổ", 庚: "Kim", 辛: "Kim", 壬: "Thủy", 癸: "Thủy",
};

const ZHI_WUXING_MAP: Record<string, "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ"> = {
  子: "Thủy", 丑: "Thổ", 寅: "Mộc", 卯: "Mộc", 辰: "Thổ", 巳: "Hỏa",
  午: "Hỏa", 未: "Thổ", 申: "Kim", 酉: "Kim", 戌: "Thổ", 亥: "Thủy",
};

export function computeBaZi(
  year: number,
  month: number,
  day: number,
  hour: number,
  gender: "male" | "female" = "male",
  sect: 1 | 2 = 2,
  minute: number = 0
): BaZiResult {
  const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
  const lunar = solar.getLunar();
  const eightChar = lunar.getEightChar();
  // sect = 2 (mặc định): Vãn Tý (23h-23h59) giữ nguyên trụ ngày, đổi trụ giờ; sect = 1: đổi sang trụ ngày hôm sau
  eightChar.setSect(sect);
  const yun = eightChar.getYun(gender === "male" ? 1 : 0);

  // Helper to extract pillar data
  const createPillar = (
    gan: string,
    zhi: string,
    ganWuXingZh: string,
    zhiWuXingZh: string,
    naYin: string,
    shiShen: string,
    hideGanZh: string[]
  ): PillarData => {
    return {
      gan,
      ganVi: STEM_MAP[gan] || gan,
      zhi,
      zhiVi: BRANCH_MAP[zhi] || zhi,
      ganWuXing: WUXING_MAP[ganWuXingZh] || "Thổ",
      zhiWuXing: WUXING_MAP[zhiWuXingZh] || "Thổ",
      naYin,
      shiShenGan: SHISHEN_MAP[shiShen] || (shiShen === "日主" ? "Nhật Nguyên" : shiShen),
      hiddenGan: hideGanZh.map((hGan) => {
        // Find shishen for hidden gan relative to day gan
        return {
          gan: hGan,
          ganVi: STEM_MAP[hGan] || hGan,
          shiShen: "Tàng Can",
        };
      }),
    };
  };

  const dayGan = eightChar.getDayGan();
  const dayGanWuXing = WUXING_MAP[eightChar.getDayWuXing()[0]] || "Kim";
  const isYang = ["甲", "丙", "戊", "庚", "壬"].includes(dayGan);

  const pillars = {
    year: createPillar(
      eightChar.getYearGan(),
      eightChar.getYearZhi(),
      eightChar.getYearWuXing()[0],
      eightChar.getYearWuXing()[1],
      eightChar.getYearNaYin(),
      eightChar.getYearShiShenGan(),
      eightChar.getYearHideGan()
    ),
    month: createPillar(
      eightChar.getMonthGan(),
      eightChar.getMonthZhi(),
      eightChar.getMonthWuXing()[0],
      eightChar.getMonthWuXing()[1],
      eightChar.getMonthNaYin(),
      eightChar.getMonthShiShenGan(),
      eightChar.getMonthHideGan()
    ),
    day: createPillar(
      eightChar.getDayGan(),
      eightChar.getDayZhi(),
      eightChar.getDayWuXing()[0],
      eightChar.getDayWuXing()[1],
      eightChar.getDayNaYin(),
      "Nhật Nguyên",
      eightChar.getDayHideGan()
    ),
    hour: createPillar(
      eightChar.getTimeGan(),
      eightChar.getTimeZhi(),
      eightChar.getTimeWuXing()[0],
      eightChar.getTimeWuXing()[1],
      eightChar.getTimeNaYin(),
      eightChar.getTimeShiShenGan(),
      eightChar.getTimeHideGan()
    ),
  };

  // Count elements
  const allWuXing = [
    pillars.year.ganWuXing, pillars.year.zhiWuXing,
    pillars.month.ganWuXing, pillars.month.zhiWuXing,
    pillars.day.ganWuXing, pillars.day.zhiWuXing,
    pillars.hour.ganWuXing, pillars.hour.zhiWuXing,
  ];

  const elementsCount = { Kim: 0, Mộc: 0, Thủy: 0, Hỏa: 0, Thổ: 0 };
  allWuXing.forEach((e) => {
    elementsCount[e]++;
  });

  const total = allWuXing.length;
  const elementsPercentage = {
    Kim: Math.round((elementsCount.Kim / total) * 100),
    Mộc: Math.round((elementsCount.Mộc / total) * 100),
    Thủy: Math.round((elementsCount.Thủy / total) * 100),
    Hỏa: Math.round((elementsCount.Hỏa / total) * 100),
    Thổ: Math.round((elementsCount.Thổ / total) * 100),
  };

  // === TỬ BÌNH WEIGHTED STRENGTH ENGINE (THANG ĐIỂM 100) ===
  type WuXing = "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";
  const MOTHER_OF: Record<WuXing, WuXing> = { Kim: "Thổ", Mộc: "Thủy", Thủy: "Kim", Hỏa: "Mộc", Thổ: "Hỏa" };
  const CHILD_OF: Record<WuXing, WuXing> = { Kim: "Thủy", Mộc: "Hỏa", Thủy: "Mộc", Hỏa: "Thổ", Thổ: "Kim" };
  const WEALTH_OF: Record<WuXing, WuXing> = { Kim: "Mộc", Mộc: "Thổ", Thủy: "Hỏa", Hỏa: "Kim", Thổ: "Thủy" };
  const OFFICER_OF: Record<WuXing, WuXing> = { Kim: "Hỏa", Mộc: "Kim", Thủy: "Thổ", Hỏa: "Thủy", Thổ: "Mộc" };

  const motherElement = MOTHER_OF[dayGanWuXing];
  const outputElement = CHILD_OF[dayGanWuXing];
  const wealthElement = WEALTH_OF[dayGanWuXing];
  const officerElement = OFFICER_OF[dayGanWuXing];

  const isSupportive = (el: WuXing) => el === dayGanWuXing || el === motherElement;

  // 1. Nguyệt Lệnh (Max 40đ — Đắc Lệnh)
  const monthZhi = pillars.month.zhi;
  const monthMainEl = ZHI_WUXING_MAP[monthZhi] || "Thổ";
  const FOUR_EARTH_TAP_QI: Record<string, WuXing[]> = {
    辰: ["Mộc", "Thủy"], // Thìn tàng Ất Mộc, Quý Thủy
    戌: ["Kim", "Hỏa"],  // Tuất tàng Tân Kim, Đinh Hỏa
    丑: ["Thủy", "Kim"], // Sửu tàng Quý Thủy, Tân Kim
    未: ["Hỏa", "Mộc"],  // Mùi tàng Đinh Hỏa, Ất Mộc
  };

  let monthBranchRaw = 0;
  if (monthMainEl === dayGanWuXing) {
    monthBranchRaw = 40;
  } else if (monthMainEl === motherElement) {
    monthBranchRaw = 30;
  } else if (FOUR_EARTH_TAP_QI[monthZhi]) {
    // Tứ quý Thìn/Tuất/Sửu/Mùi: xét thêm tạp khí nắm lệnh
    const taps = FOUR_EARTH_TAP_QI[monthZhi];
    if (taps.includes(dayGanWuXing)) monthBranchRaw = 18;
    else if (taps.includes(motherElement)) monthBranchRaw = 12;
  }

  // Hiệu chỉnh Lục Xung: nếu Nguyệt Lệnh bị Nhật Chi hoặc Niên Chi xung trực tiếp -> trừ 25%
  const CLASH_PAIRS: Record<string, string> = {
    子: "午", 午: "子", 丑: "未", 未: "丑", 寅: "申", 申: "寅",
    卯: "酉", 酉: "卯", 辰: "戌", 戌: "辰", 巳: "亥", 亥: "巳",
  };
  const monthClashed =
    CLASH_PAIRS[monthZhi] === pillars.day.zhi || CLASH_PAIRS[monthZhi] === pillars.year.zhi;
  const monthClashPenalty = monthClashed && monthBranchRaw > 0 ? -Math.round(monthBranchRaw * 0.25) : 0;
  const monthBranchScore = monthBranchRaw + monthClashPenalty;

  // Helper chấm điểm thông căn Tàng Can cho Địa Chi (Nhật Chi 15đ, Thời Chi 12đ, Niên Chi 10đ)
  const scoreBranchByHiddenStems = (pillar: PillarData, maxPoints: number): number => {
    const hides = pillar.hiddenGan;
    if (!hides || hides.length === 0) {
      return isSupportive(pillar.zhiWuXing) ? maxPoints : 0;
    }
    const ratios = [1.0, 0.6, 0.35]; // Bản khí, Trung khí, Dư khí
    let bestRatio = 0;
    hides.forEach((h, idx) => {
      const hEl = GAN_WUXING_MAP[h.gan] || "Thổ";
      if (isSupportive(hEl)) {
        const weight = hEl === dayGanWuXing ? ratios[idx] ?? 0.3 : (ratios[idx] ?? 0.3) * 0.85;
        if (weight > bestRatio) bestRatio = weight;
      }
    });
    return Math.round(maxPoints * bestRatio);
  };

  const dayBranchScore = scoreBranchByHiddenStems(pillars.day, 15);
  const hourBranchScore = scoreBranchByHiddenStems(pillars.hour, 12);
  const yearBranchScore = scoreBranchByHiddenStems(pillars.year, 10);

  // 3 Thiên Can lộ xuất (Tổng 23đ: Nguyệt Can 8đ, Thời Can 8đ, Niên Can 7đ)
  const exposedStemsScore =
    (isSupportive(pillars.month.ganWuXing) ? 8 : 0) +
    (isSupportive(pillars.hour.ganWuXing) ? 8 : 0) +
    (isSupportive(pillars.year.ganWuXing) ? 7 : 0);

  const strengthScore = Math.max(
    0,
    Math.min(100, monthBranchScore + dayBranchScore + hourBranchScore + yearBranchScore + exposedStemsScore)
  );

  const scoreBreakdown: BaZiScoreBreakdown = {
    monthBranch: monthBranchRaw,
    monthClashPenalty,
    dayBranch: dayBranchScore,
    hourBranch: hourBranchScore,
    yearBranch: yearBranchScore,
    exposedStems: exposedStemsScore,
    total: strengthScore,
  };

  // Kiểm tra Thông Căn (Rooted) trên 4 Địa Chi theo chuẩn Trích Thiên Tủy
  const allBranches = [pillars.year, pillars.month, pillars.day, pillars.hour];
  const otherStems = [pillars.year.ganWuXing, pillars.month.ganWuXing, pillars.hour.ganWuXing];

  const hasMainRoot = (targetEl: WuXing): boolean =>
    allBranches.some((p) => p.zhiWuXing === targetEl);

  const hasSelfSecondaryRoot = allBranches.some((p) =>
    p.hiddenGan.slice(0, 2).some((h) => GAN_WUXING_MAP[h.gan] === dayGanWuXing)
  );

  // Ấn tinh tàng trung khí chỉ tính thông căn phá Tòng Cách nếu có Ấn lộ ở Thiên Can
  const hasExposedMother = otherStems.includes(motherElement);
  const hasMotherSecondaryRoot =
    hasExposedMother &&
    allBranches.some((p) =>
      p.hiddenGan.slice(0, 2).some((h) => GAN_WUXING_MAP[h.gan] === motherElement)
    );

  const hasSupportRoot =
    hasMainRoot(dayGanWuXing) ||
    hasMainRoot(motherElement) ||
    hasSelfSecondaryRoot ||
    hasMotherSecondaryRoot;

  const hasOpposingRoot = hasMainRoot(officerElement) || hasMainRoot(wealthElement);

  // Tính tổng lực 3 phe đối kháng để phân nhánh Tòng Nhược (Tòng Tài / Tòng Sát / Tòng Nhi / Tòng Thế)
  const elementWeights: Record<WuXing, number> = { Kim: 0, Mộc: 0, Thủy: 0, Hỏa: 0, Thổ: 0 };
  elementWeights[pillars.month.zhiWuXing] += 40;
  elementWeights[pillars.day.zhiWuXing] += 15;
  elementWeights[pillars.hour.zhiWuXing] += 12;
  elementWeights[pillars.year.zhiWuXing] += 10;
  elementWeights[pillars.month.ganWuXing] += 8;
  elementWeights[pillars.hour.ganWuXing] += 8;
  elementWeights[pillars.year.ganWuXing] += 7;

  let strengthStatus: BaZiResult["strengthStatus"] = "Trung Hòa";
  let patternType: BaZiPatternType = "CHINH_CACH";
  let favorableElement = "";
  let supportingElement = "";
  let unfavorableElement = "";
  let specialPatternLabel: string | null = null;

  if (strengthScore >= 80 && !hasOpposingRoot) {
    // NGOẠI CÁCH: TÒNG CƯỜNG (CHUYÊN VƯỢNG)
    strengthStatus = "Cực Vượng";
    patternType = "TONG_CUONG";
    specialPatternLabel = "Tòng Cường Cách (Chuyên Vượng • Ngoại Cách)";
    favorableElement = `${dayGanWuXing} (Tỷ Kiếp — Thuận Khí Thế)`;
    supportingElement = `${motherElement} (Ấn Tinh) & ${outputElement} (Thực Thương)`;
    unfavorableElement = `${officerElement} (Quan Sát — Đại Kỵ Phạm Vượng)`;
  } else if (strengthScore <= 20 && !hasSupportRoot) {
    // NGOẠI CÁCH: TÒNG NHƯỢC (Tòng Tài / Tòng Sát / Tòng Nhi / Tòng Thế)
    strengthStatus = "Cực Nhược";
    const wWealth = elementWeights[wealthElement];
    const wOfficer = elementWeights[officerElement];
    const wOutput = elementWeights[outputElement];

    if (wOfficer >= wWealth && wOfficer >= wOutput && wOfficer >= 35) {
      patternType = "TONG_SAT";
      specialPatternLabel = "Tòng Sát Cách (Ngoại Cách)";
      favorableElement = `${officerElement} (Quan Sát — Thuận Thế)`;
      supportingElement = `${wealthElement} (Tài Tinh — Sinh Sát)`;
      unfavorableElement = `${motherElement} (Ấn Tinh) & ${dayGanWuXing} (Tỷ Kiếp)`;
    } else if (wWealth >= wOfficer && wWealth >= wOutput && wWealth >= 35) {
      patternType = "TONG_TAI";
      specialPatternLabel = "Tòng Tài Cách (Ngoại Cách)";
      favorableElement = `${wealthElement} (Tài Tinh — Thuận Thế)`;
      supportingElement = `${outputElement} (Thực Thương — Sinh Tài)`;
      unfavorableElement = `${dayGanWuXing} (Tỷ Kiếp) & ${motherElement} (Ấn Tinh)`;
    } else if (wOutput >= wWealth && wOutput >= wOfficer && wOutput >= 35) {
      patternType = "TONG_NHI";
      specialPatternLabel = "Tòng Nhi Cách (Ngoại Cách)";
      favorableElement = `${outputElement} (Thực Thương — Tiết Tú)`;
      supportingElement = `${wealthElement} (Tài Tinh — Hộ Nhi)`;
      unfavorableElement = `${motherElement} (Ấn Tinh — Kiêu Thần Đoạt Thực)`;
    } else {
      patternType = "TONG_THE";
      specialPatternLabel = "Tòng Thế Cách (Ngoại Cách)";
      favorableElement = `${wealthElement} (Tài Tinh) & ${outputElement} (Thực Thương)`;
      supportingElement = `${officerElement} (Quan Sát)`;
      unfavorableElement = `${motherElement} (Ấn Tinh) & ${dayGanWuXing} (Tỷ Kiếp)`;
    }
  } else if (strengthScore > 65) {
    // CHÍNH CÁCH: THÂN VƯỢNG
    strengthStatus = strengthScore >= 80 ? "Cực Vượng" : "Thân Vượng";
    patternType = "CHINH_CACH";
    favorableElement = `${wealthElement} (Tài Tinh) / ${officerElement} (Quan Sát)`;
    supportingElement = `${outputElement} (Thực Thương — Tiết Khí)`;
    unfavorableElement = `${motherElement} (Ấn Tinh) & ${dayGanWuXing} (Tỷ Kiếp)`;
  } else if (strengthScore < 35) {
    // CHÍNH CÁCH: THÂN NHƯỢC
    strengthStatus = strengthScore <= 20 ? "Cực Nhược" : "Thân Nhược";
    patternType = "CHINH_CACH";
    favorableElement = `${motherElement} (Ấn Tinh — Sinh Thân)`;
    supportingElement = `${dayGanWuXing} (Tỷ Kiếp — Trợ Thân)`;
    unfavorableElement = `${officerElement} (Quan Sát) & ${wealthElement} (Tài Tinh)`;
  } else {
    // CHÍNH CÁCH: TRUNG HÒA (35 <= score <= 65)
    strengthStatus = "Trung Hòa";
    patternType = "CHINH_CACH";
    // Tìm hành đang khuyết yếu nhất để cân bằng điều hòa
    const weakest = (["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"] as WuXing[]).sort(
      (a, b) => elementWeights[a] - elementWeights[b]
    )[0];
    favorableElement = `${weakest} (Bổ Khuyết Cân Bằng & Điều Hầu)`;
    supportingElement = `${motherElement} (Ấn Tinh) / ${outputElement} (Thực Thương)`;
    unfavorableElement = "Hành Quá Vượng Gây Mất Cân Bằng";
  }

  // DaYun list
  const daYunRaw = yun.getDaYun();
  const daYunList: DaYunData[] = [];
  for (let i = 1; i <= 8; i++) {
    const dy = daYunRaw[i];
    if (dy) {
      const gz = dy.getGanZhi();
      const g = gz[0] || "";
      const z = gz[1] || "";
      daYunList.push({
        index: i,
        startAge: dy.getStartAge(),
        endAge: dy.getEndAge(),
        startYear: dy.getStartYear(),
        endYear: dy.getEndYear(),
        ganZhi: gz,
        ganZhiVi: `${STEM_MAP[g] || g} ${BRANCH_MAP[z] || z}`,
        ganWuXing: GAN_WUXING_MAP[g] || "Thổ",
        zhiWuXing: ZHI_WUXING_MAP[z] || "Thổ",
      });
    }
  }

  const enrichment = enrichBaZiChart({
    yearGan: pillars.year.gan,
    yearZhi: pillars.year.zhi,
    monthGan: pillars.month.gan,
    monthZhi: pillars.month.zhi,
    dayGan: pillars.day.gan,
    dayZhi: pillars.day.zhi,
    timeGan: pillars.hour.gan,
    timeZhi: pillars.hour.zhi,
  });

  const boundaryWarning = checkSolarTermBoundary(year, month, day, hour, minute);

  return {
    solarDate: `${solar.getYear()}-${String(solar.getMonth()).padStart(2, "0")}-${String(solar.getDay()).padStart(2, "0")}`,
    lunarDate: lunar.toString(),
    gender: gender === "male" ? "Nam" : "Nữ",
    dayMaster: {
      gan: dayGan,
      ganVi: STEM_MAP[dayGan] || dayGan,
      element: dayGanWuXing,
      polarity: isYang ? "Dương" : "Âm",
    },
    pillars,
    elementsCount,
    elementsPercentage,
    strengthStatus,
    strengthScore,
    scoreBreakdown,
    patternType,
    patternName: specialPatternLabel || enrichment.geJu.name,
    favorableElement,
    supportingElement,
    unfavorableElement,
    daYunList,
    enrichment,
    boundaryWarning,
  };
}
