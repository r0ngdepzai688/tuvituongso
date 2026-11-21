/**
 * Vietnam True Solar Time (Chân Thái Dương Thời) Calculator
 * Updated to the official 34 provincial-level administrative units of Vietnam (post-2025 merger),
 * with full backwards-compatible aliases for pre-2025 province names.
 * Algorithm: NOAA Equation of Time (EoT) + Longitude offset relative to UTC+7 (105.0°E).
 */

export interface VietnamProvinceCoord {
  id: string;
  name: string;
  type: "Thành phố TW" | "Tỉnh";
  region: "Bắc" | "Trung" | "Nam";
  lng: number; // East longitude in degrees
  lat: number;
  aliases?: string[]; // Pre-merger province names for seamless lookup
}

export const VIETNAM_34_PROVINCES: VietnamProvinceCoord[] = [
  // === 9 THÀNH PHỐ TRỰC THUỘC TRUNG ƯƠNG ===
  { id: "ha-noi", name: "TP. Hà Nội", type: "Thành phố TW", region: "Bắc", lng: 105.8342, lat: 21.0278, aliases: ["Hà Tây"] },
  { id: "ho-chi-minh", name: "TP. Hồ Chí Minh", type: "Thành phố TW", region: "Nam", lng: 106.6297, lat: 10.8231, aliases: ["Sài Gòn", "Bình Dương", "Bà Rịa - Vũng Tàu", "Vũng Tàu"] },
  { id: "hai-phong", name: "TP. Hải Phòng", type: "Thành phố TW", region: "Bắc", lng: 106.6881, lat: 20.8449, aliases: ["Hải Dương"] },
  { id: "da-nang", name: "TP. Đà Nẵng", type: "Thành phố TW", region: "Trung", lng: 108.2022, lat: 16.0544, aliases: ["Quảng Nam", "Tam Kỳ", "Hội An"] },
  { id: "hue", name: "TP. Huế", type: "Thành phố TW", region: "Trung", lng: 107.5909, lat: 16.4637, aliases: ["Thừa Thiên Huế"] },
  { id: "can-tho", name: "TP. Cần Thơ", type: "Thành phố TW", region: "Nam", lng: 105.7469, lat: 10.0452, aliases: ["Hậu Giang", "Sóc Trăng"] },
  { id: "dong-nai", name: "TP. Đồng Nai", type: "Thành phố TW", region: "Nam", lng: 106.8427, lat: 10.9574, aliases: ["Biên Hòa", "Bình Phước"] },
  { id: "quang-ninh", name: "TP. Quảng Ninh", type: "Thành phố TW", region: "Bắc", lng: 107.0448, lat: 20.9599, aliases: ["Hạ Long"] },
  { id: "bac-ninh", name: "TP. Bắc Ninh", type: "Thành phố TW", region: "Bắc", lng: 106.0763, lat: 21.1861, aliases: ["Bắc Giang"] },

  // === 25 TỈNH ===
  { id: "lai-chau", name: "Lai Châu", type: "Tỉnh", region: "Bắc", lng: 103.4702, lat: 22.3864 },
  { id: "dien-bien", name: "Điện Biên", type: "Tỉnh", region: "Bắc", lng: 103.0168, lat: 21.3860 },
  { id: "son-la", name: "Sơn La", type: "Tỉnh", region: "Bắc", lng: 103.9188, lat: 21.3256 },
  { id: "lao-cai", name: "Lào Cai", type: "Tỉnh", region: "Bắc", lng: 103.9755, lat: 22.4856, aliases: ["Yên Bái"] },
  { id: "cao-bang", name: "Cao Bằng", type: "Tỉnh", region: "Bắc", lng: 106.2522, lat: 22.6666 },
  { id: "tuyen-quang", name: "Tuyên Quang", type: "Tỉnh", region: "Bắc", lng: 105.2180, lat: 21.8236, aliases: ["Hà Giang"] },
  { id: "thai-nguyen", name: "Thái Nguyên", type: "Tỉnh", region: "Bắc", lng: 105.8482, lat: 21.5672, aliases: ["Bắc Kạn"] },
  { id: "phu-tho", name: "Phú Thọ", type: "Tỉnh", region: "Bắc", lng: 105.2046, lat: 21.3227, aliases: ["Vĩnh Phúc", "Hòa Bình", "Việt Trì"] },
  { id: "lang-son", name: "Lạng Sơn", type: "Tỉnh", region: "Bắc", lng: 106.7615, lat: 21.8537 },
  { id: "hung-yen", name: "Hưng Yên", type: "Tỉnh", region: "Bắc", lng: 106.0511, lat: 20.6464, aliases: ["Thái Bình"] },
  { id: "ninh-binh", name: "Ninh Bình", type: "Tỉnh", region: "Bắc", lng: 105.9745, lat: 20.2506, aliases: ["Hà Nam", "Nam Định"] },
  { id: "thanh-hoa", name: "Thanh Hóa", type: "Tỉnh", region: "Trung", lng: 105.7852, lat: 19.8067 },
  { id: "nghe-an", name: "Nghệ An", type: "Tỉnh", region: "Trung", lng: 105.6813, lat: 18.6796, aliases: ["Vinh"] },
  { id: "ha-tinh", name: "Hà Tĩnh", type: "Tỉnh", region: "Trung", lng: 105.9057, lat: 18.3428 },
  { id: "quang-tri", name: "Quảng Trị", type: "Tỉnh", region: "Trung", lng: 107.1855, lat: 16.7403, aliases: ["Quảng Bình", "Đồng Hới"] },
  { id: "quang-ngai", name: "Quảng Ngãi", type: "Tỉnh", region: "Trung", lng: 108.8044, lat: 15.1214, aliases: ["Kon Tum"] },
  { id: "gia-lai", name: "Gia Lai", type: "Tỉnh", region: "Trung", lng: 108.0005, lat: 13.9833, aliases: ["Bình Định", "Quy Nhơn", "Pleiku"] },
  { id: "khanh-hoa", name: "Khánh Hòa", type: "Tỉnh", region: "Trung", lng: 109.1967, lat: 12.2388, aliases: ["Nha Trang", "Ninh Thuận", "Phan Rang"] },
  { id: "lam-dong", name: "Lâm Đồng", type: "Tỉnh", region: "Trung", lng: 108.4583, lat: 11.9404, aliases: ["Đà Lạt", "Đắk Nông", "Bình Thuận", "Phan Thiết"] },
  { id: "dak-lak", name: "Đắk Lắk", type: "Tỉnh", region: "Trung", lng: 108.0378, lat: 12.6667, aliases: ["Buôn Ma Thuột", "Phú Yên", "Tuy Hòa"] },
  { id: "tay-ninh", name: "Tây Ninh", type: "Tỉnh", region: "Nam", lng: 106.1099, lat: 11.3352, aliases: ["Long An"] },
  { id: "vinh-long", name: "Vĩnh Long", type: "Tỉnh", region: "Nam", lng: 105.9722, lat: 10.2537, aliases: ["Bến Tre", "Trà Vinh"] },
  { id: "dong-thap", name: "Đồng Tháp", type: "Tỉnh", region: "Nam", lng: 105.6354, lat: 10.4938, aliases: ["Tiền Giang", "Mỹ Tho", "Cao Lãnh"] },
  { id: "an-giang", name: "An Giang", type: "Tỉnh", region: "Nam", lng: 105.4352, lat: 10.3864, aliases: ["Kiên Giang", "Rạch Giá", "Phú Quốc", "Long Xuyên"] },
  { id: "ca-mau", name: "Cà Mau", type: "Tỉnh", region: "Nam", lng: 105.1524, lat: 9.1768, aliases: ["Bạc Liêu"] },
];

export interface TrueSolarTimeResult {
  provinceName: string;
  longitude: number;
  longitudeOffsetMin: number;
  equationOfTimeMin: number;
  totalOffsetMin: number;
  originalTimeStr: string;
  trueSolarTimeStr: string;
  adjustedDateStr: string; // YYYY-MM-DD
  adjustedHour: number;
  adjustedMinute: number;
  adjustedTimeIndex: number; // 0=Tý .. 11=Hợi
  hourBranchChanged: boolean;
}

/**
 * NOAA Equation of Time approximation (minutes)
 */
function calculateEquationOfTime(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const B = ((2 * Math.PI) / 365) * (dayOfYear - 81);
  return 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
}

export function hourToTimeIndex(hour: number): number {
  if (hour === 23) return 12; // Vãn Tý (23:00–23:59)
  if (hour === 0) return 0;   // Tảo Tý (00:00–00:59)
  return Math.floor((hour + 1) / 2);
}

export function calculateVietnamTrueSolarTime(
  solarDateStr: string,
  hour: number,
  minute: number,
  provinceId: string
): TrueSolarTimeResult {
  const province =
    VIETNAM_34_PROVINCES.find((p) => p.id === provinceId) || VIETNAM_34_PROVINCES[0];

  const [y, m, d] = solarDateStr.split("-").map(Number);
  const baseDate = new Date(y, (m || 1) - 1, d || 1, hour, minute, 0);

  // UTC+7 standard meridian is 105.0°E; each 1° = 4 minutes
  const longitudeOffsetMin = (province.lng - 105.0) * 4;
  const equationOfTimeMin = calculateEquationOfTime(baseDate);
  const totalOffsetMin = Math.round(longitudeOffsetMin + equationOfTimeMin);

  const adjusted = new Date(baseDate.getTime() + totalOffsetMin * 60 * 1000);
  const ay = adjusted.getFullYear();
  const am = String(adjusted.getMonth() + 1).padStart(2, "0");
  const ad = String(adjusted.getDate()).padStart(2, "0");
  const ah = adjusted.getHours();
  const amin = adjusted.getMinutes();

  const origIdx = hourToTimeIndex(hour);
  const adjIdx = hourToTimeIndex(ah);

  return {
    provinceName: province.name,
    longitude: province.lng,
    longitudeOffsetMin: Number(longitudeOffsetMin.toFixed(1)),
    equationOfTimeMin: Number(equationOfTimeMin.toFixed(1)),
    totalOffsetMin,
    originalTimeStr: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    trueSolarTimeStr: `${String(ah).padStart(2, "0")}:${String(amin).padStart(2, "0")}`,
    adjustedDateStr: `${ay}-${am}-${ad}`,
    adjustedHour: ah,
    adjustedMinute: amin,
    adjustedTimeIndex: adjIdx,
    hourBranchChanged: origIdx !== adjIdx,
  };
}
