import { Solar } from "lunar-typescript";
import {
  QIMEN_DOORS,
  QIMEN_STARS,
  QIMEN_DEITIES,
  STEM_MAP,
  BRANCH_MAP,
} from "../constants/vietnameseDictionary";

export interface QiMenPalace {
  palaceNum: number;
  nameVi: string;
  direction: string;
  trigram: string;
  element: string;
  earthStem: string;
  earthStemVi: string;
  heavenStem: string;
  heavenStemVi: string;
  door: {
    name: string;
    nameVi: string;
    nature: "Cát" | "Hung" | "Trung";
  };
  star: {
    name: string;
    nameVi: string;
    element: string;
  };
  deity: {
    name: string;
    nameVi: string;
    nature: "Cát" | "Hung" | "Trung";
  };
  evaluation: "Đại Cát" | "Cát" | "Bình" | "Hung" | "Đại Hung";
}

export interface QiMenChartResult {
  solarDate: string;
  timeStr: string;
  yearGanZhi: string;
  monthGanZhi: string;
  dayGanZhi: string;
  hourGanZhi: string;
  solarTerm: string;
  dunType: "Dương Độn" | "Âm Độn";
  juNumber: number;
  zhifuStar: string;
  zhishiDoor: string;
  palaces: QiMenPalace[]; // 9 palaces arranged in order 4, 9, 2, 3, 5, 7, 8, 1, 6
}

// 8 Palaces ring (excluding center 5) in clockwise order: Kan 1 -> Gen 8 -> Zhen 3 -> Xun 4 -> Li 9 -> Kun 2 -> Dui 7 -> Qian 6
const RING_PALACES = [1, 8, 3, 4, 9, 2, 7, 6];
const STAR_RING = ["天蓬", "天任", "天冲", "天辅", "天英", "天芮", "天柱", "天心"];
const DOOR_RING = ["休门", "生门", "伤门", "杜门", "景门", "死门", "惊门", "开门"];
const GOD_YANG = ["值符", "螣蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天"];
const GOD_YIN = ["值符", "九天", "九地", "玄武", "白虎", "六合", "太阴", "螣蛇"];

const PALACE_BASE_DATA: Record<number, { name: string; direction: string; trigram: string; element: string }> = {
  1: { name: "Khảm Cung", direction: "Bắc", trigram: "Khảm (☵)", element: "Thủy" },
  2: { name: "Khôn Cung", direction: "Tây Nam", trigram: "Khôn (☷)", element: "Thổ" },
  3: { name: "Chấn Cung", direction: "Đông", trigram: "Chấn (☳)", element: "Mộc" },
  4: { name: "Tốn Cung", direction: "Đông Nam", trigram: "Tốn (☴)", element: "Mộc" },
  5: { name: "Trung Cung", direction: "Trung Ương", trigram: "Thái Cực (☯)", element: "Thổ" },
  6: { name: "Càn Cung", direction: "Tây Bắc", trigram: "Càn (☰)", element: "Kim" },
  7: { name: "Đoài Cung", direction: "Tây", trigram: "Đoài (☱)", element: "Kim" },
  8: { name: "Cấn Cung", direction: "Đông Bắc", trigram: "Cấn (☶)", element: "Thổ" },
  9: { name: "Ly Cung", direction: "Nam", trigram: "Ly (☲)", element: "Hỏa" },
};

export function computeQiMenChart(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number = 0
): QiMenChartResult {
  const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
  const lunar = solar.getLunar();
  const ec = lunar.getEightChar();
  const prevJie = lunar.getPrevJieQi(true);

  const solarTerm = prevJie.getName();
  const isYangDun = [
    "冬至", "小寒", "大寒", "立春", "雨水", "惊蛰",
    "春分", "清明", "谷雨", "立夏", "小满", "芒种"
  ].includes(solarTerm);

  const dunType = isYangDun ? "Dương Độn" : "Âm Độn";
  // Ju number simple heuristic based on day branch & solar term
  const juNumber = ((solar.getDay() + hour) % 9) + 1;

  // Calculate Ring offsets
  const hourBranch = ec.getTimeZhi();
  const branchIdx = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"].indexOf(hourBranch);
  const ringShift = (branchIdx + juNumber) % 8;

  const godList = isYangDun ? GOD_YANG : GOD_YIN;

  // 9 grid layout order: [4 (Tốn), 9 (Ly), 2 (Khôn), 3 (Chấn), 5 (Trung), 7 (Đoài), 8 (Cấn), 1 (Khảm), 6 (Càn)]
  const gridOrder = [4, 9, 2, 3, 5, 7, 8, 1, 6];

  const palaces: QiMenPalace[] = gridOrder.map((palaceNum) => {
    const base = PALACE_BASE_DATA[palaceNum];

    if (palaceNum === 5) {
      // Trung cung
      return {
        palaceNum,
        nameVi: base.name,
        direction: base.direction,
        trigram: base.trigram,
        element: base.element,
        earthStem: "戊",
        earthStemVi: "Mậu",
        heavenStem: "戊",
        heavenStemVi: "Mậu",
        door: { name: "--", nameVi: "Ký Khôn", nature: "Trung" },
        star: { name: "天禽", nameVi: "Thiên Cầm", element: "Thổ" },
        deity: { name: "--", nameVi: "Trung Ương", nature: "Trung" },
        evaluation: "Cát",
      };
    }

    const ringIndex = RING_PALACES.indexOf(palaceNum);
    const starIndex = (ringIndex + ringShift) % 8;
    const doorIndex = (ringIndex + ringShift + 2) % 8;
    const godIndex = (ringIndex + ringShift) % 8;

    const starRaw = STAR_RING[starIndex];
    const doorRaw = DOOR_RING[doorIndex];
    const godRaw = godList[godIndex];

    const doorInfo = QIMEN_DOORS[doorRaw] || { vi: doorRaw, nature: "Trung" as const };
    const starInfo = QIMEN_STARS[starRaw] || { vi: starRaw, element: "Thổ" };
    const deityInfo = QIMEN_DEITIES[godRaw] || { vi: godRaw, nature: "Trung" as const };

    // Evaluation
    let evalRank: QiMenPalace["evaluation"] = "Bình";
    const auspiciousScore =
      (doorInfo.nature === "Cát" ? 2 : doorInfo.nature === "Hung" ? -2 : 0) +
      (deityInfo.nature === "Cát" ? 1 : deityInfo.nature === "Hung" ? -1 : 0);

    if (auspiciousScore >= 3) evalRank = "Đại Cát";
    else if (auspiciousScore >= 1) evalRank = "Cát";
    else if (auspiciousScore <= -2) evalRank = "Đại Hung";
    else if (auspiciousScore < 0) evalRank = "Hung";

    const earthStems = ["戊", "乙", "丙", "丁", "癸", "壬", "辛", "庚"];
    const eStem = earthStems[ringIndex % earthStems.length];
    const hStem = earthStems[(ringIndex + 3) % earthStems.length];

    return {
      palaceNum,
      nameVi: base.name,
      direction: base.direction,
      trigram: base.trigram,
      element: base.element,
      earthStem: eStem,
      earthStemVi: STEM_MAP[eStem] || eStem,
      heavenStem: hStem,
      heavenStemVi: STEM_MAP[hStem] || hStem,
      door: {
        name: doorRaw,
        nameVi: doorInfo.vi,
        nature: doorInfo.nature,
      },
      star: {
        name: starRaw,
        nameVi: starInfo.vi,
        element: starInfo.element,
      },
      deity: {
        name: godRaw,
        nameVi: deityInfo.vi,
        nature: deityInfo.nature,
      },
      evaluation: evalRank,
    };
  });

  const zhifu = palaces.find((p) => p.deity.name === "值符");

  return {
    solarDate: `${solar.getYear()}-${String(solar.getMonth()).padStart(2, "0")}-${String(solar.getDay()).padStart(2, "0")}`,
    timeStr: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    yearGanZhi: `${STEM_MAP[ec.getYearGan()] || ec.getYearGan()} ${BRANCH_MAP[ec.getYearZhi()] || ec.getYearZhi()}`,
    monthGanZhi: `${STEM_MAP[ec.getMonthGan()] || ec.getMonthGan()} ${BRANCH_MAP[ec.getMonthZhi()] || ec.getMonthZhi()}`,
    dayGanZhi: `${STEM_MAP[ec.getDayGan()] || ec.getDayGan()} ${BRANCH_MAP[ec.getDayZhi()] || ec.getDayZhi()}`,
    hourGanZhi: `${STEM_MAP[ec.getTimeGan()] || ec.getTimeGan()} ${BRANCH_MAP[ec.getTimeZhi()] || ec.getTimeZhi()}`,
    solarTerm,
    dunType,
    juNumber,
    zhifuStar: zhifu ? zhifu.star.nameVi : "Thiên Phụ",
    zhishiDoor: "Sinh Môn",
    palaces,
  };
}
