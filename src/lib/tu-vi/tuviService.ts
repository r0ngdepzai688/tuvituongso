import { astro } from "iztro";
import {
  PALACE_MAP,
  MAJOR_STAR_MAP,
  MINOR_STAR_MAP,
  BRIGHTNESS_MAP,
  STEM_MAP,
  BRANCH_MAP,
} from "../constants/vietnameseDictionary";

export interface StarInfo {
  name: string;
  nameVi: string;
  brightness?: string;
  brightnessVi?: string;
  element?: string;
  type?: string;
  group?: string;
  mutagen?: string; // Hóa Lộc, Hóa Quyền...
}

export interface PalaceData {
  index: number;
  name: string;
  nameVi: string;
  isBodyPalace: boolean;
  earthlyBranch: string;
  earthlyBranchVi: string;
  heavenlyStem: string;
  heavenlyStemVi: string;
  majorStars: StarInfo[];
  minorStars: StarInfo[];
  adjectiveStars: StarInfo[];
  changsheng12?: string;
  boshi12?: string;
  suiqian12?: string;
  jiangqian12?: string;
  decadal: {
    range: [number, number];
  };
  ages: number[];
  triadPalaces: number[]; // Tam hợp
  oppositePalace: number; // Xung chiếu
}

export interface AstrolabeResult {
  solarDate: string;
  lunarDate: string;
  chineseDate: string;
  time: string;
  timeBranchVi: string;
  gender: "Nam" | "Nữ";
  yinYang: string;
  fiveElementsClass: string; // Cục
  soul: string; // Mệnh chủ
  body: string; // Thân chủ
  palaces: PalaceData[];
}

export function computeTuViAstrolabe(
  solarDateStr: string, // YYYY-MM-DD
  timeIndex: number, // 0 (Tảo Tý 00h-01h) to 11 (Hợi), 12 (Vãn Tý 23h-00h), or hour (13-23)
  gender: "male" | "female",
  fixLeap: boolean = true
): AstrolabeResult {
  // Distinguish Early Rat (Tảo Tý: 00:00-00:59 -> 0) and Late Rat (Vãn Tý: 23:00-23:59 -> 12) per iztro spec
  let branchIndex = timeIndex;
  if (timeIndex === 23) {
    branchIndex = 12; // Vãn Tý
  } else if (timeIndex > 12) {
    branchIndex = Math.floor((timeIndex + 1) / 2) % 12;
  } else if (timeIndex < 0) {
    branchIndex = 0;
  }

  const astrolabe = astro.bySolar(solarDateStr, branchIndex, gender, fixLeap, "zh-CN");

  // Format palaces with Vietnamese localization
  const palaces: PalaceData[] = astrolabe.palaces.map((p, idx) => {
    // Major stars
    const majorStars: StarInfo[] = p.majorStars.map((s) => {
      const meta = MAJOR_STAR_MAP[s.name] || { name: s.name, element: "Thổ", type: "Chính Tinh" };
      const brightMeta = s.brightness ? BRIGHTNESS_MAP[s.brightness] : undefined;
      return {
        name: s.name,
        nameVi: meta.name,
        brightness: s.brightness,
        brightnessVi: brightMeta?.label || s.brightness,
        element: meta.element,
        type: meta.type,
        mutagen: s.mutagen,
      };
    });

    // Minor stars
    const minorStars: StarInfo[] = p.minorStars.map((s) => {
      const meta = MINOR_STAR_MAP[s.name] || { name: s.name, element: "Thủy", group: "Phụ" };
      return {
        name: s.name,
        nameVi: meta.name,
        element: meta.element,
        group: meta.group,
        mutagen: s.mutagen,
      };
    });

    // Adjective stars
    const adjectiveStars: StarInfo[] = p.adjectiveStars.map((s) => {
      const meta = MINOR_STAR_MAP[s.name] || { name: s.name, element: "Thổ", group: "Phụ" };
      return {
        name: s.name,
        nameVi: meta.name,
        element: meta.element,
        group: meta.group,
      };
    });

    // Opposite palace: (idx + 6) % 12
    const oppositePalace = (idx + 6) % 12;
    // Triad palaces: (idx + 4) % 12, (idx + 8) % 12
    const triadPalaces = [(idx + 4) % 12, (idx + 8) % 12];

    return {
      index: idx,
      name: p.name,
      nameVi: PALACE_MAP[p.name] || p.name,
      isBodyPalace: p.isBodyPalace,
      earthlyBranch: p.earthlyBranch,
      earthlyBranchVi: BRANCH_MAP[p.earthlyBranch] || p.earthlyBranch,
      heavenlyStem: p.heavenlyStem,
      heavenlyStemVi: STEM_MAP[p.heavenlyStem] || p.heavenlyStem,
      majorStars,
      minorStars,
      adjectiveStars,
      changsheng12: p.changsheng12,
      boshi12: p.boshi12,
      suiqian12: p.suiqian12,
      jiangqian12: p.jiangqian12,
      decadal: {
        range: p.decadal.range,
      },
      ages: p.ages,
      triadPalaces,
      oppositePalace,
    };
  });

  const branchList = [
    "Tảo Tý (00h-01h)",
    "Sửu",
    "Dần",
    "Mão",
    "Thìn",
    "Tỵ",
    "Ngọ",
    "Mùi",
    "Thân",
    "Dậu",
    "Tuất",
    "Hợi",
    "Vãn Tý (23h-00h)",
  ];

  return {
    solarDate: astrolabe.solarDate,
    lunarDate: astrolabe.lunarDate,
    chineseDate: astrolabe.chineseDate,
    time: astrolabe.time,
    timeBranchVi: branchList[branchIndex] ?? "Tảo Tý (00h-01h)",
    gender: gender === "male" ? "Nam" : "Nữ",
    yinYang: `${astrolabe.gender === "男" ? "Dương Nam" : "Âm Nữ"} (${astrolabe.zodiac})`,
    fiveElementsClass: astrolabe.fiveElementsClass,
    soul: MAJOR_STAR_MAP[astrolabe.soul]?.name || astrolabe.soul,
    body: MAJOR_STAR_MAP[astrolabe.body]?.name || astrolabe.body,
    palaces,
  };
}
