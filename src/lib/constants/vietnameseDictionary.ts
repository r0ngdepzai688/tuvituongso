/**
 * TỪ ĐIỂN BẢN ĐỊA HÓA THUẬT SỐ HÁN - VIỆT (TỬ VI, BÁT TỰ, KỲ MÔN, PHONG THỦY)
 */

export const PALACE_MAP: Record<string, string> = {
  命宫: "Mệnh Cung",
  兄弟: "Huynh Đệ",
  夫妻: "Phu Thê",
  子女: "Tử Tức",
  财帛: "Tài Bạch",
  疾厄: "Tật Ách",
  迁移: "Thiên Di",
  交友: "Nô Bộc",
  仆役: "Nô Bộc",
  官禄: "Quan Lộc",
  事业: "Quan Lộc",
  田宅: "Điền Trạch",
  福德: "Phúc Đức",
  父母: "Phụ Mẫu",
  身宫: "Thân Cung",
};

export const MAJOR_STAR_MAP: Record<string, { name: string; element: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ"; type: "Bắc Đẩu" | "Nam Đẩu" | "Trung Thiên" }> = {
  紫微: { name: "Tử Vi", element: "Thổ", type: "Bắc Đẩu" },
  天机: { name: "Thiên Cơ", element: "Mộc", type: "Nam Đẩu" },
  太阳: { name: "Thái Dương", element: "Hỏa", type: "Nam Đẩu" },
  武曲: { name: "Vũ Khúc", element: "Kim", type: "Bắc Đẩu" },
  天同: { name: "Thiên Đồng", element: "Thủy", type: "Nam Đẩu" },
  廉贞: { name: "Liêm Trinh", element: "Hỏa", type: "Bắc Đẩu" },
  天府: { name: "Thiên Phủ", element: "Thổ", type: "Nam Đẩu" },
  太阴: { name: "Thái Âm", element: "Thủy", type: "Bắc Đẩu" },
  贪狼: { name: "Tham Lang", element: "Mộc", type: "Bắc Đẩu" },
  巨门: { name: "Cự Môn", element: "Thủy", type: "Bắc Đẩu" },
  天相: { name: "Thiên Tướng", element: "Thủy", type: "Nam Đẩu" },
  天梁: { name: "Thiên Lương", element: "Thổ", type: "Nam Đẩu" },
  七杀: { name: "Thất Sát", element: "Kim", type: "Nam Đẩu" },
  破军: { name: "Phá Quân", element: "Thủy", type: "Bắc Đẩu" },
};

export const MINOR_STAR_MAP: Record<string, { name: string; element: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ"; group: "Cát" | "Sát" | "Đào Hoa" | "Phụ" }> = {
  // Lục Cát Tinh
  左辅: { name: "Tả Phù", element: "Thổ", group: "Cát" },
  右弼: { name: "Hữu Bật", element: "Thủy", group: "Cát" },
  文昌: { name: "Văn Xương", element: "Kim", group: "Cát" },
  文曲: { name: "Văn Khúc", element: "Thủy", group: "Cát" },
  天魁: { name: "Thiên Khôi", element: "Hỏa", group: "Cát" },
  天钺: { name: "Thiên Việt", element: "Hỏa", group: "Cát" },
  禄存: { name: "Lộc Tồn", element: "Thổ", group: "Cát" },
  天马: { name: "Thiên Mã", element: "Hỏa", group: "Cát" },

  // Lục Sát Tinh
  擎羊: { name: "Kình Dương", element: "Kim", group: "Sát" },
  陀罗: { name: "Đà La", element: "Kim", group: "Sát" },
  火星: { name: "Hỏa Tinh", element: "Hỏa", group: "Sát" },
  铃星: { name: "Linh Tinh", element: "Hỏa", group: "Sát" },
  地空: { name: "Địa Không", element: "Hỏa", group: "Sát" },
  地劫: { name: "Địa Kiếp", element: "Hỏa", group: "Sát" },

  // Tứ Hóa
  化禄: { name: "Hóa Lộc", element: "Mộc", group: "Cát" },
  化权: { name: "Hóa Quyền", element: "Hỏa", group: "Cát" },
  化科: { name: "Hóa Khoa", element: "Thủy", group: "Cát" },
  化忌: { name: "Hóa Kỵ", element: "Thủy", group: "Sát" },

  // Cát tinh khác
  红鸾: { name: "Hồng Loan", element: "Thủy", group: "Đào Hoa" },
  天喜: { name: "Thiên Hỷ", element: "Thủy", group: "Đào Hoa" },
  天姚: { name: "Thiên Diêu", element: "Thủy", group: "Đào Hoa" },
  咸池: { name: "Hàm Trì", element: "Thủy", group: "Đào Hoa" },
  孤辰: { name: "Cô Thần", element: "Hỏa", group: "Sát" },
  寡宿: { name: "Quả Tú", element: "Hỏa", group: "Sát" },
  天刑: { name: "Thiên Hình", element: "Hỏa", group: "Sát" },
  天哭: { name: "Thiên Khốc", element: "Kim", group: "Sát" },
  天虚: { name: "Thiên Hư", element: "Thủy", group: "Sát" },
  龙池: { name: "Long Trì", element: "Thủy", group: "Cát" },
  凤阁: { name: "Phượng Các", element: "Thổ", group: "Cát" },
  台辅: { name: "Đài Phụ", element: "Thổ", group: "Cát" },
  封诰: { name: "Phong Cáo", element: "Thổ", group: "Cát" },
  三台: { name: "Tam Thai", element: "Thủy", group: "Cát" },
  八座: { name: "Bát Tọa", element: "Thủy", group: "Cát" },
  恩光: { name: "Ân Quang", element: "Mộc", group: "Cát" },
  天贵: { name: "Thiên Quý", element: "Thổ", group: "Cát" },
  天德: { name: "Thiên Đức", element: "Hỏa", group: "Cát" },
  月德: { name: "Nguyệt Đức", element: "Hỏa", group: "Cát" },
};

export const BRIGHTNESS_MAP: Record<string, { label: string; tag: string }> = {
  庙: { label: "Miếu", tag: "M" },
  旺: { label: "Vượng", tag: "V" },
  得: { label: "Đắc", tag: "Đ" },
  利: { label: "Lợi", tag: "L" },
  平: { label: "Bình", tag: "B" },
  不: { label: "Bất", tag: "B" },
  陷: { label: "Hãm", tag: "H" },
};

export const STEM_MAP: Record<string, string> = {
  甲: "Giáp", 乙: "Ất", 丙: "Bính", 丁: "Đinh", 戊: "Mậu",
  己: "Kỷ", 庚: "Canh", 辛: "Tân", 壬: "Nhâm", 癸: "Quý",
};

export const BRANCH_MAP: Record<string, string> = {
  子: "Tý", 丑: "Sửu", 寅: "Dần", 卯: "Mão", 辰: "Thìn", 巳: "Tỵ",
  午: "Ngọ", 未: "Mùi", 申: "Thân", 酉: "Dậu", 戌: "Tuất", 亥: "Hợi",
};

export const SHISHEN_MAP: Record<string, string> = {
  比肩: "Tỷ Kiên",
  劫财: "Kiếp Tài",
  食神: "Thực Thần",
  伤官: "Thương Quan",
  偏财: "Thiên Tài",
  正财: "Chính Tài",
  七杀: "Thất Sát",
  偏官: "Thiên Quan",
  正官: "Chính Quan",
  偏印: "Thiên Ấn (Kiêu)",
  枭神: "Kiêu Thần",
  正印: "Chính Ấn",
};

export const WUXING_COLOR: Record<string, { text: string; bg: string; border: string }> = {
  Kim: { text: "text-[#6E5423]", bg: "bg-[#966F28]/12", border: "border-[#966F28]/35" },
  Mộc: { text: "text-[#165B46]", bg: "bg-[#1D6353]/12", border: "border-[#1D6353]/35" },
  Thủy: { text: "text-[#114B5F]", bg: "bg-[#175A67]/12", border: "border-[#175A67]/35" },
  Hỏa: { text: "text-[#9B2921]", bg: "bg-[#B83A32]/12", border: "border-[#B83A32]/35" },
  Thổ: { text: "text-[#854D0E]", bg: "bg-[#A85D1A]/12", border: "border-[#A85D1A]/35" },
};

// Kỳ Môn Độn Giáp
export const QIMEN_DOORS: Record<string, { vi: string; nature: "Cát" | "Hung" | "Trung" }> = {
  休门: { vi: "Hưu Môn", nature: "Cát" },
  生门: { vi: "Sinh Môn", nature: "Cát" },
  伤门: { vi: "Thương Môn", nature: "Hung" },
  杜门: { vi: "Đỗ Môn", nature: "Trung" },
  景门: { vi: "Cảnh Môn", nature: "Trung" },
  死门: { vi: "Tử Môn", nature: "Hung" },
  惊门: { vi: "Kinh Môn", nature: "Hung" },
  开门: { vi: "Khai Môn", nature: "Cát" },
};

export const QIMEN_STARS: Record<string, { vi: string; element: string }> = {
  天蓬: { vi: "Thiên Bồng", element: "Thủy" },
  天任: { vi: "Thiên Nhậm", element: "Thổ" },
  天冲: { vi: "Thiên Xung", element: "Mộc" },
  天辅: { vi: "Thiên Phụ", element: "Mộc" },
  天英: { vi: "Thiên Anh", element: "Hỏa" },
  天芮: { vi: "Thiên Nhuế", element: "Thổ" },
  天柱: { vi: "Thiên Trụ", element: "Kim" },
  天心: { vi: "Thiên Tâm", element: "Kim" },
  天禽: { vi: "Thiên Cầm", element: "Thổ" },
};

export const QIMEN_DEITIES: Record<string, { vi: string; nature: "Cát" | "Hung" | "Trung" }> = {
  值符: { vi: "Trực Phù", nature: "Cát" },
  螣蛇: { vi: "Đằng Xà", nature: "Hung" },
  太阴: { vi: "Thái Âm", nature: "Cát" },
  六合: { vi: "Lục Hợp", nature: "Cát" },
  白虎: { vi: "Bạch Hổ", nature: "Hung" },
  玄武: { vi: "Huyền Vũ", nature: "Hung" },
  九地: { vi: "Cửu Địa", nature: "Cát" },
  九天: { vi: "Cửu Thiên", nature: "Cát" },
};
