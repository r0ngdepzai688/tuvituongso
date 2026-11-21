/**
 * Deterministic Fortune K-Line Candlestick Generator (0–90 tuổi)
 * Inspired by xuemian168/bazi-skill (Fortune K-line JSON).
 * Scores each 10-year DaYun pillar against Favorable / Supporting / Unfavorable elements.
 */

import { DaYunData } from "../bat-tu/baziService";

export interface FortuneKlineCandle {
  index: number;
  ageRange: string;
  yearRange: string;
  ganZhiVi: string;
  open: number;
  close: number;
  high: number;
  low: number;
  score: number; // 0..100
  trend: "up" | "down" | "flat";
  phaseLabel: string;
  advice: string;
}

const GAN_EL: Record<string, string> = {
  甲: "Mộc", 乙: "Mộc", 丙: "Hỏa", 丁: "Hỏa", 戊: "Thổ",
  己: "Thổ", 庚: "Kim", 辛: "Kim", 壬: "Thủy", 癸: "Thủy",
};

const ZHI_EL: Record<string, string> = {
  子: "Thủy", 丑: "Thổ", 寅: "Mộc", 卯: "Mộc", 辰: "Thổ", 巳: "Hỏa",
  午: "Hỏa", 未: "Thổ", 申: "Kim", 酉: "Kim", 戌: "Thổ", 亥: "Thủy",
};

function scoreElement(el: string, fav: string, sup: string, unfav: string): number {
  if (!el) return 0;
  if (fav.includes(el)) return 18;
  if (sup.includes(el)) return 12;
  if (unfav.includes(el)) return -14;
  return 2;
}

export function generateFortuneKline(
  daYunList: DaYunData[],
  favorableElement: string,
  supportingElement: string,
  unfavorableElement: string
): FortuneKlineCandle[] {
  let prevClose = 58;

  return daYunList.map((dy) => {
    const gan = dy.ganZhi[0] || "";
    const zhi = dy.ganZhi[1] || "";
    const ganEl = GAN_EL[gan] || "";
    const zhiEl = ZHI_EL[zhi] || "";

    // Earthly Branch carries ~60% weight of the 10-year DaYun
    const delta = Math.round(
      scoreElement(ganEl, favorableElement, supportingElement, unfavorableElement) * 0.45 +
        scoreElement(zhiEl, favorableElement, supportingElement, unfavorableElement) * 0.75
    );

    const open = prevClose;
    const close = Math.max(22, Math.min(96, open + delta));
    const high = Math.min(99, Math.max(open, close) + 6 + (dy.index % 4));
    const low = Math.max(15, Math.min(open, close) - 6 - ((dy.index + 1) % 3));
    const score = Math.round((open + close) / 2);
    const trend: "up" | "down" | "flat" = close > open + 2 ? "up" : close < open - 2 ? "down" : "flat";

    let phaseLabel = "Tích Lũy Ổn Định";
    let advice = "Duy trì nền tảng, trau dồi chuyên môn và củng cố nội lực.";
    if (close >= 78) {
      phaseLabel = "Hoàng Kim Đỉnh Cao";
      advice = "Vận khí đắc Hỷ/Dụng thần mạnh mẽ — thời điểm vàng mở rộng sự nghiệp, đầu tư và khẳng định vị thế.";
    } else if (trend === "up") {
      phaseLabel = "Đà Tăng Trưởng";
      advice = "Khí vận đi lên thuận lợi, nên chủ động nắm bắt cơ hội mới và mở rộng mạng lưới quý nhân.";
    } else if (close <= 42) {
      phaseLabel = "Phòng Thủ & Tích Lũy";
      advice = "Gặp vận Kỵ thần nhiều thử thách — ưu tiên bảo toàn vốn, tránh đầu tư mạo hiểm và chú trọng sức khỏe.";
    } else if (trend === "down") {
      phaseLabel = "Điều Chỉnh Nhịp Độ";
      advice = "Tạm chậm lại để rà soát hệ thống, tối ưu chi phí và chuẩn bị nguồn lực cho chu kỳ bứt phá tiếp theo.";
    }

    prevClose = close;

    return {
      index: dy.index,
      ageRange: `${dy.startAge}–${dy.endAge}t`,
      yearRange: `${dy.startYear}–${dy.endYear}`,
      ganZhiVi: dy.ganZhiVi,
      open,
      close,
      high,
      low,
      score,
      trend,
      phaseLabel,
      advice,
    };
  });
}
