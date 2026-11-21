/**
 * Deterministic BaZi Enricher (TypeScript)
 * Synthesized from AdrianBOM/bazi-ziwei-skill (gan-relations, ge-ju, enrich),
 * jinchenma94/bazi-skill (shensha-table), and ai-freer/fortune-skill (classical-rules).
 */

import { STEM_MAP, BRANCH_MAP } from "../constants/vietnameseDictionary";

export interface BaZiEnrichment {
  geJu: {
    name: string;
    category: "Chính Cách" | "Đặc Biệt";
    description: string;
    source: string;
  };
  tiaoHou: {
    season: string;
    recommendedStems: string[];
    explanation: string;
    source: string;
  };
  ganRelations: string[];
  zhiRelations: string[];
  shenSha: Array<{
    name: string;
    nature: "Cát" | "Hung" | "Trung";
    pillars: string[];
    meaning: string;
  }>;
}

const GAN_WUHE: Array<[string, string, string]> = [
  ["甲", "己", "Giáp Kỷ hợp hóa Thổ (Trung Chính chi hợp)"],
  ["乙", "庚", "Ất Canh hợp hóa Kim (Nhân Nghĩa chi hợp)"],
  ["丙", "辛", "Bính Tân hợp hóa Thủy (Uy Chế chi hợp)"],
  ["丁", "壬", "Đinh Nhâm hợp hóa Mộc (Nhân Thọ chi hợp)"],
  ["戊", "癸", "Mậu Quý hợp hóa Hỏa (Vô Tình chi hợp)"],
];

const ZHI_LIUHE: Array<[string, string, string]> = [
  ["子", "丑", "Tý Sửu Lục Hợp (Thổ)"],
  ["寅", "亥", "Dần Hợi Lục Hợp (Mộc)"],
  ["卯", "戌", "Mão Tuất Lục Hợp (Hỏa)"],
  ["辰", "酉", "Thìn Dậu Lục Hợp (Kim)"],
  ["巳", "申", "Tỵ Thân Lục Hợp (Thủy)"],
  ["午", "未", "Ngọ Mùi Lục Hợp (Thái Dương/Thổ)"],
];

const ZHI_LIUCHONG: Array<[string, string, string]> = [
  ["子", "午", "Tý Ngọ Lục Xung (Thủy Hỏa tương xung)"],
  ["丑", "未", "Sửu Mùi Lục Xung (Thổ xung khai khố)"],
  ["寅", "申", "Dần Thân Lục Xung (Dịch Mã tương xung)"],
  ["卯", "酉", "Mão Dậu Lục Xung (Đào Hoa tương xung)"],
  ["辰", "戌", "Thìn Tuất Lục Xung (Thiên La Địa Võng)"],
  ["巳", "亥", "Tỵ Hợi Lục Xung (Thủy Hỏa biến động)"],
];

const ZHI_SANHE: Array<[string[], string]> = [
  [["申", "子", "辰"], "Thân Tý Thìn Tam Hợp Thủy cục"],
  [["亥", "卯", "未"], "Hợi Mão Mùi Tam Hợp Mộc cục"],
  [["寅", "午", "戌"], "Dần Ngọ Tuất Tam Hợp Hỏa cục"],
  [["巳", "酉", "丑"], "Tỵ Dậu Sửu Tam Hợp Kim cục"],
];

const ZHI_LIUHAI: Array<[string, string, string]> = [
  ["子", "未", "Tý Mùi Tương Hại"],
  ["丑", "午", "Sửu Ngọ Tương Hại"],
  ["寅", "巳", "Dần Tỵ Tương Hại"],
  ["卯", "辰", "Mão Thìn Tương Hại"],
  ["申", "亥", "Thân Hợi Tương Hại"],
  ["酉", "戌", "Dậu Tuất Tương Hại"],
];

// Thiên Ất Quý Nhân (theo Nhật Can)
const TIAN_YI: Record<string, string[]> = {
  甲: ["丑", "未"], 戊: ["丑", "未"], 庚: ["丑", "未"],
  乙: ["子", "申"], 己: ["子", "申"],
  丙: ["亥", "酉"], 丁: ["亥", "酉"],
  壬: ["卯", "巳"], 癸: ["卯", "巳"],
  辛: ["午", "寅"],
};

// Văn Xương Quý Nhân (theo Nhật Can)
const WEN_CHANG: Record<string, string> = {
  甲: "巳", 乙: "午", 丙: "申", 丁: "酉", 戊: "申",
  己: "酉", 庚: "亥", 辛: "子", 壬: "寅", 癸: "卯",
};

// Lộc Thần (theo Nhật Can)
const LU_SHEN: Record<string, string> = {
  甲: "寅", 乙: "卯", 丙: "巳", 丁: "午", 戊: "巳",
  己: "午", 庚: "申", 辛: "酉", 壬: "亥", 癸: "子",
};

// Dương Nhận (theo Nhật Can Dương)
const YANG_REN: Record<string, string> = {
  甲: "卯", 丙: "午", 戊: "午", 庚: "酉", 壬: "子",
};

// Dịch Mã / Đào Hoa / Hoa Cái (theo Chi Năm hoặc Chi Ngày)
function getTriadShenSha(baseZhi: string) {
  if (["申", "子", "辰"].includes(baseZhi)) return { yiMa: "寅", taoHua: "酉", huaGai: "辰", jiangXing: "子" };
  if (["寅", "午", "戌"].includes(baseZhi)) return { yiMa: "申", taoHua: "卯", huaGai: "戌", jiangXing: "午" };
  if (["巳", "酉", "丑"].includes(baseZhi)) return { yiMa: "亥", taoHua: "午", huaGai: "丑", jiangXing: "酉" };
  return { yiMa: "巳", taoHua: "子", huaGai: "未", jiangXing: "卯" }; // 亥卯未
}

// Nguyệt Lệnh bản khí -> Cách cục
const MONTH_MAIN_QI: Record<string, string> = {
  子: "癸", 丑: "己", 寅: "甲", 卯: "乙", 辰: "戊", 巳: "丙",
  午: "丁", 未: "己", 申: "庚", 酉: "辛", 戌: "戊", 亥: "壬",
};

const GAN_ELEMENT: Record<string, string> = {
  甲: "Mộc", 乙: "Mộc", 丙: "Hỏa", 丁: "Hỏa", 戊: "Thổ",
  己: "Thổ", 庚: "Kim", 辛: "Kim", 壬: "Thủy", 癸: "Thủy",
};

const GAN_YANG: Record<string, boolean> = {
  甲: true, 丙: true, 戊: true, 庚: true, 壬: true,
  乙: false, 丁: false, 己: false, 辛: false, 癸: false,
};

function getTenGod(dayGan: string, targetGan: string): string {
  const e1 = GAN_ELEMENT[dayGan];
  const e2 = GAN_ELEMENT[targetGan];
  const samePol = GAN_YANG[dayGan] === GAN_YANG[targetGan];

  if (e1 === e2) return samePol ? "Tỷ Kiên" : "Kiếp Tài";
  const generates: Record<string, string> = { Mộc: "Hỏa", Hỏa: "Thổ", Thổ: "Kim", Kim: "Thủy", Thủy: "Mộc" };
  const controls: Record<string, string> = { Mộc: "Thổ", Thổ: "Thủy", Thủy: "Hỏa", Hỏa: "Kim", Kim: "Mộc" };

  if (generates[e1] === e2) return samePol ? "Thực Thần" : "Thương Quan";
  if (controls[e1] === e2) return samePol ? "Thiên Tài" : "Chính Tài";
  if (controls[e2] === e1) return samePol ? "Thất Sát" : "Chính Quan";
  if (generates[e2] === e1) return samePol ? "Thiên Ấn" : "Chính Ấn";
  return "Tỷ Kiên";
}

function determineGeJu(dayGan: string, monthZhi: string): BaZiEnrichment["geJu"] {
  if (LU_SHEN[dayGan] === monthZhi) {
    return {
      name: "Kiến Lộc Cách (建禄格)",
      category: "Đặc Biệt",
      description: "Nhật chủ đắc Lộc tại Nguyệt Lệnh, tự lập tự cường, chí tiến thủ cao; ưa Tài Quan hiển lộ để thành đại nghiệp.",
      source: "Tử Bình Chân Thuyên • Luận Kiến Lộc Nguyệt Kiếp",
    };
  }
  if (YANG_REN[dayGan] === monthZhi) {
    return {
      name: "Dương Nhận Cách (阳刃格)",
      category: "Đặc Biệt",
      description: "Khí thế Nhật chủ cực vượng tại Nguyệt Lệnh, quyết đoán mạnh mẽ; ưa Thất Sát chế phục thành cách Sát Nhận Tương Đình.",
      source: "Tử Bình Chân Thuyên • Luận Dương Nhận Cách",
    };
  }

  const mainQi = MONTH_MAIN_QI[monthZhi] || "戊";
  const tenGod = getTenGod(dayGan, mainQi);
  const descMap: Record<string, string> = {
    "Chính Quan": "Chủ chính trực, có kỷ luật, trọng danh dự và năng lực quản lý hành chính, tổ chức.",
    "Thất Sát": "Chủ uy quyền, bản lĩnh vượt nghịch cảnh, phù hợp khai phá, lãnh đạo và môi trường cạnh tranh cao.",
    "Chính Ấn": "Chủ học thức uyên bác, nhân hậu, quý nhân phò trợ, bền vững trong học thuật và cố vấn.",
    "Thiên Ấn": "Chủ tư duy độc đáo, trực giác nhạy bén, giỏi chuyên môn sâu, nghiên cứu hoặc nghệ thuật.",
    "Chính Tài": "Chủ thực tế, cẩn trọng, giỏi tích lũy tài sản bền vững và quản trị tài chính.",
    "Thiên Tài": "Chủ linh hoạt, nhạy bén cơ hội thương mại, hào sảng và có duyên đầu tư kinh doanh.",
    "Thực Thần": "Chủ ôn hòa, có phúc khí, sáng tạo tinh tế, khéo léo trong chuyên môn và hưởng thụ cuộc sống.",
    "Thương Quan": "Chủ tài hoa sắc sảo, phản biện mạnh, đột phá sáng tạo; cần phối Ấn hoặc Tài để thành đại khí.",
    "Tỷ Kiên": "Chủ tự chủ, kiên định, trọng nghĩa khí bằng hữu; cần Tài Quan điều tiết để phát huy thực lực.",
    "Kiếp Tài": "Chủ năng động, giao tiếp rộng, hành động nhanh; cần có Quan Sát chế ước hoặc Thực Thương tiết tú.",
  };

  return {
    name: `${tenGod} Cách`,
    category: "Chính Cách",
    description: descMap[tenGod] || "Cách cục cân bằng theo lệnh tháng.",
    source: "Tử Bình Chân Thuyên • Bát Cách Chính Thống",
  };
}

function determineTiaoHou(dayGan: string, monthZhi: string): BaZiEnrichment["tiaoHou"] {
  const spring = ["寅", "卯", "辰"].includes(monthZhi);
  const summer = ["巳", "午", "未"].includes(monthZhi);
  const autumn = ["申", "酉", "戌"].includes(monthZhi);
  const season = spring ? "Mùa Xuân (Mộc vượng, dư hàn)" : summer ? "Mùa Hạ (Hỏa viêm, táo nhiệt)" : autumn ? "Mùa Thu (Kim túc, khí mát)" : "Mùa Đông (Thủy hàn, đất lạnh)";

  if (summer) {
    return {
      season,
      recommendedStems: ["Nhâm Thủy (壬)", "Quý Thủy (癸)"],
      explanation: `Sinh tháng ${BRANCH_MAP[monthZhi] || monthZhi} tiết mùa Hạ khí hậu nóng gắt, ưu tiên Thủy nhuận trạch điều hầu để hạ nhiệt và dưỡng sinh khí cho Nhật chủ ${STEM_MAP[dayGan] || dayGan}.`,
      source: "Cùng Thông Bảo Giám (Lan Giang Võng)",
    };
  }
  if (!spring && !summer && !autumn) {
    return {
      season,
      recommendedStems: ["Bính Hỏa (丙)", "Đinh Hỏa (丁)"],
      explanation: `Sinh tháng ${BRANCH_MAP[monthZhi] || monthZhi} tiết mùa Đông thiên hàn địa đông, tối kỵ thiếu Hỏa; cần Bính/Đinh Hỏa sưởi ấm giải đông để vạn vật sinh trưởng.`,
      source: "Cùng Thông Bảo Giám (Lan Giang Võng)",
    };
  }
  if (spring) {
    return {
      season,
      recommendedStems: ["Bính Hỏa (丙)", "Quý Thủy (癸)"],
      explanation: `Sinh mùa Xuân vạn vật nảy mầm, cần Bính Hỏa sưởi ấm tan dư hàn và chút Thủy tưới nhuận giúp cách cục thanh tú.`,
      source: "Cùng Thông Bảo Giám (Lan Giang Võng)",
    };
  }
  return {
    season,
    recommendedStems: ["Bính Hỏa (丙)", "Đinh Hỏa (丁)", "Giáp Mộc (甲)"],
    explanation: `Sinh mùa Thu kim khí sắc lạnh, thường cần Đinh/Bính Hỏa chế luyện Kim hoặc Giáp Mộc khai thông khí thế.`,
    source: "Cùng Thông Bảo Giám (Lan Giang Võng)",
  };
}

export function enrichBaZiChart(params: {
  yearGan: string; yearZhi: string;
  monthGan: string; monthZhi: string;
  dayGan: string; dayZhi: string;
  timeGan: string; timeZhi: string;
}): BaZiEnrichment {
  const gans = [params.yearGan, params.monthGan, params.dayGan, params.timeGan];
  const zhis = [params.yearZhi, params.monthZhi, params.dayZhi, params.timeZhi];
  const pillarNames = ["Trụ Năm", "Trụ Tháng", "Trụ Ngày", "Trụ Giờ"];

  // 1. Thiên Can Ngũ Hợp
  const ganRelations: string[] = [];
  for (const [g1, g2, label] of GAN_WUHE) {
    if (gans.includes(g1) && gans.includes(g2)) {
      ganRelations.push(label);
    }
  }

  // 2. Địa Chi Hợp / Xung / Hại / Tam Hợp
  const zhiRelations: string[] = [];
  for (const [triad, label] of ZHI_SANHE) {
    const matched = triad.filter((z) => zhis.includes(z));
    if (matched.length === 3) zhiRelations.push(label);
    else if (matched.length === 2 && matched.includes(triad[1])) {
      zhiRelations.push(`Bán Hợp ${label.split("Tam Hợp ")[1] || ""} (${matched.map((z) => BRANCH_MAP[z]).join("–")})`);
    }
  }
  for (const [z1, z2, label] of ZHI_LIUHE) {
    if (zhis.includes(z1) && zhis.includes(z2)) zhiRelations.push(label);
  }
  for (const [z1, z2, label] of ZHI_LIUCHONG) {
    if (zhis.includes(z1) && zhis.includes(z2)) zhiRelations.push(label);
  }
  for (const [z1, z2, label] of ZHI_LIUHAI) {
    if (zhis.includes(z1) && zhis.includes(z2)) zhiRelations.push(label);
  }

  // 3. Thần Sát (ShenSha)
  const shenSha: BaZiEnrichment["shenSha"] = [];
  const findPillars = (targets: string[]) =>
    zhis
      .map((z, idx) => (targets.includes(z) ? `${pillarNames[idx]} (${BRANCH_MAP[z]})` : null))
      .filter(Boolean) as string[];

  const tianYiHits = findPillars(TIAN_YI[params.dayGan] || []);
  if (tianYiHits.length) {
    shenSha.push({
      name: "Thiên Ất Quý Nhân",
      nature: "Cát",
      pillars: tianYiHits,
      meaning: "Cát thần đứng đầu chư thần, gặp hung hóa cát, thường có quý nhân nâng đỡ lúc khó khăn.",
    });
  }

  const wenChangHits = findPillars([WEN_CHANG[params.dayGan]]);
  if (wenChangHits.length) {
    shenSha.push({
      name: "Văn Xương Quý Nhân",
      nature: "Cát",
      pillars: wenChangHits,
      meaning: "Chủ thông minh, học vấn sắc sảo, thi cử thuận lợi và có khiếu văn chương, học thuật.",
    });
  }

  const luHits = findPillars([LU_SHEN[params.dayGan]]);
  if (luHits.length) {
    shenSha.push({
      name: "Lộc Thần",
      nature: "Cát",
      pillars: luHits,
      meaning: "Chủ tài lộc tự thân, phúc hậu, năng lực tự lập vững vàng.",
    });
  }

  if (YANG_REN[params.dayGan]) {
    const renHits = findPillars([YANG_REN[params.dayGan]]);
    if (renHits.length) {
      shenSha.push({
        name: "Dương Nhận",
        nature: "Trung",
        pillars: renHits,
        meaning: "Chủ cá tính mạnh mẽ, quyết liệt, bản lĩnh cao; cần tu tâm kiềm chế nóng nảy.",
      });
    }
  }

  const triadYear = getTriadShenSha(params.yearZhi);
  const triadDay = getTriadShenSha(params.dayZhi);

  const yiMaHits = findPillars(Array.from(new Set([triadYear.yiMa, triadDay.yiMa])));
  if (yiMaHits.length) {
    shenSha.push({
      name: "Dịch Mã",
      nature: "Trung",
      pillars: yiMaHits,
      meaning: "Chủ di chuyển, xuất ngoại, kinh doanh giao thương năng động, phát triển khi lập nghiệp phương xa.",
    });
  }

  const taoHuaHits = findPillars(Array.from(new Set([triadYear.taoHua, triadDay.taoHua])));
  if (taoHuaHits.length) {
    shenSha.push({
      name: "Đào Hoa (Hàm Trì)",
      nature: "Trung",
      pillars: taoHuaHits,
      meaning: "Chủ duyên dáng, nhân duyên tốt, dễ thu hút trong giao tiếp, nghệ thuật và truyền thông.",
    });
  }

  const huaGaiHits = findPillars(Array.from(new Set([triadYear.huaGai, triadDay.huaGai])));
  if (huaGaiHits.length) {
    shenSha.push({
      name: "Hoa Cái",
      nature: "Cát",
      pillars: huaGaiHits,
      meaning: "Chủ tâm tính thanh cao, có duyên sâu với nghệ thuật, triết học, huyền học và tôn giáo.",
    });
  }

  return {
    geJu: determineGeJu(params.dayGan, params.monthZhi),
    tiaoHou: determineTiaoHou(params.dayGan, params.monthZhi),
    ganRelations,
    zhiRelations,
    shenSha,
  };
}
