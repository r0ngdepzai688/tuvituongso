/**
 * Solar Term Boundary Guard & Lunar-Solar Conversion Helper
 * Powered deterministically by lunar-typescript.
 * - Converts Lunar Date (supporting Leap Months) -> Solar Date
 * - Detects if birth time falls within ±45 minutes of any of the 12 Month-Changing Solar Terms (Tiết Khí / 节),
 *   especially Lập Xuân (立春 — Year & Month boundary).
 */

import { Solar, Lunar, LunarYear } from "lunar-typescript";

export interface SolarTermBoundaryWarning {
  termNameZh: string;
  termNameVi: string;
  crossingTimeStr: string; // HH:mm DD/MM/YYYY
  minutesDiff: number;
  direction: "before" | "after";
  isYearBoundary: boolean; // True if Lập Xuân (立春)
  message: string;
}

const SOLAR_TERM_VI: Record<string, string> = {
  立春: "Lập Xuân",
  惊蛰: "Kinh Trập",
  清明: "Thanh Minh",
  立夏: "Lập Hạ",
  芒种: "Mang Chủng",
  小暑: "Tiểu Thử",
  立秋: "Lập Thu",
  白露: "Bạch Lộ",
  寒露: "Hàn Lộ",
  立冬: "Lập Đông",
  大雪: "Đại Tuyết",
  小寒: "Tiểu Hàn",
  雨水: "Vũ Thủy",
  春分: "Xuân Phân",
  谷雨: "Cốc Vũ",
  小满: "Tiểu Mãn",
  夏至: "Hạ Chí",
  大暑: "Đại Thử",
  处暑: "Xử Thử",
  秋分: "Thu Phân",
  霜降: "Sương Giáng",
  小雪: "Tiểu Tuyết",
  冬至: "Đông Chí",
  大寒: "Đại Hàn",
};

/**
 * Returns the leap month number (1..12) for a given lunar year, or 0 if no leap month.
 */
export function getLunarLeapMonth(lunarYear: number): number {
  try {
    return LunarYear.fromYear(lunarYear).getLeapMonth();
  } catch {
    return 0;
  }
}

/**
 * Converts a Vietnamese/Chinese Lunar Date (with optional leap month flag) to Solar YYYY-MM-DD.
 */
export function convertLunarToSolarDate(
  lunarYear: number,
  lunarMonth: number,
  lunarDay: number,
  isLeapMonth: boolean = false
): string {
  const leapMonth = getLunarLeapMonth(lunarYear);
  const signedMonth = isLeapMonth && leapMonth === lunarMonth ? -lunarMonth : lunarMonth;
  const lunar = Lunar.fromYmd(lunarYear, signedMonth, lunarDay);
  const solar = lunar.getSolar();
  const y = solar.getYear();
  const m = String(solar.getMonth()).padStart(2, "0");
  const d = String(solar.getDay()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Checks whether a given Solar date + time is within thresholdMinutes (default 45m)
 * of the nearest prior or next month-changing Solar Term (Jie / Tiết).
 */
export function checkSolarTermBoundary(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number = 0,
  thresholdMinutes: number = 45
): SolarTermBoundaryWarning | null {
  try {
    const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
    const lunar = solar.getLunar();
    const birthMs = new Date(year, month - 1, day, hour, minute, 0).getTime();

    const candidates = [lunar.getPrevJie(false), lunar.getNextJie(false)].filter(Boolean);

    let closest: SolarTermBoundaryWarning | null = null;

    for (const jq of candidates) {
      const jqSolar = jq.getSolar();
      const jqMs = new Date(
        jqSolar.getYear(),
        jqSolar.getMonth() - 1,
        jqSolar.getDay(),
        jqSolar.getHour(),
        jqSolar.getMinute(),
        jqSolar.getSecond()
      ).getTime();

      const diffMin = Math.round(Math.abs(birthMs - jqMs) / 60_000);
      if (diffMin <= thresholdMinutes) {
        const zh = jq.getName();
        const vi = SOLAR_TERM_VI[zh] || zh;
        const isYearBoundary = zh === "立春";
        const crossingTimeStr = `${String(jqSolar.getHour()).padStart(2, "0")}:${String(
          jqSolar.getMinute()
        ).padStart(2, "0")} ${String(jqSolar.getDay()).padStart(2, "0")}/${String(
          jqSolar.getMonth()
        ).padStart(2, "0")}/${jqSolar.getYear()}`;

        const direction: "before" | "after" = birthMs < jqMs ? "before" : "after";
        const boundaryScope = isYearBoundary ? "trụ Năm & trụ Tháng" : "trụ Tháng";
        const warning: SolarTermBoundaryWarning = {
          termNameZh: zh,
          termNameVi: vi,
          crossingTimeStr,
          minutesDiff: diffMin,
          direction,
          isYearBoundary,
          message: `Giờ sinh nằm sát thời điểm giao tiết khí ${vi} (${crossingTimeStr}, chênh ${diffMin} phút). Khuyến nghị đối chiếu cả 2 phương án ${boundaryScope} để đảm bảo độ chính xác tuyệt đối.`,
        };

        if (!closest || diffMin < closest.minutesDiff) {
          closest = warning;
        }
      }
    }

    return closest;
  } catch {
    return null;
  }
}
