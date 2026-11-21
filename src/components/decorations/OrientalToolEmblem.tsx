import React from "react";

export type OrientalToolType =
  | "tu-vi"
  | "bat-tu"
  | "ky-mon"
  | "la-ban"
  | "hop-hon"
  | "tai-lieu";

interface OrientalToolEmblemProps {
  type: OrientalToolType;
  size?: number;
  className?: string;
}

/**
 * BIỂU TƯỢNG PHÙ HIỆU THUẬT SỐ CỔ TRUYỀN PHƯƠNG ĐÔNG (ORIENTAL TOOL EMBLEMS)
 * Thay thế 100% các icon công nghệ hiện đại (Lucide icons: shield, handshake, stars, v.v.)
 * bằng các phù hiệu mỹ thuật cổ học phương Đông:
 * - tu-vi: Bắc Đẩu Thất Tinh & Triện tự 紫微 (Tử Vi)
 * - bat-tu: Hà Đồ Tứ Tượng & Triện tự 八字 (Bát Tự)
 * - ky-mon: Cửu Cung Trận Đồ & Triện tự 奇门 (Kỳ Môn)
 * - la-ban: La Kinh Thiên Trì 24 Sơn Hướng & Triện tự 罗盘 (La Bàn)
 * - hop-hon: Đồng Tâm Kết / Loan Phượng Hòa Minh & Triện tự 合璧 (Hợp Bích)
 * - tai-lieu: Trúc Giản Quyển Trục Thư Hạp & Triện tự 古籍 (Cổ Tịch)
 */
export function OrientalToolEmblem({
  type,
  size = 52,
  className = "",
}: OrientalToolEmblemProps) {
  switch (type) {
    // 1. TỬ VI ĐẨU SỐ: Bắc Đẩu Thất Tinh & Tử Vi Viên Tinh Tọa
    case "tu-vi":
      return (
        <div
          className={`relative rounded-xl bg-gradient-to-br from-[#FAF7F2] to-[#EAE3DE] border border-[#A98A55]/40 shadow-sm flex items-center justify-center select-none overflow-hidden group-hover:border-[#175A67] transition-colors ${className}`}
          style={{ width: size, height: size }}
          title="Tử Vi Đẩu Số • Bắc Đẩu Thất Tinh"
        >
          <svg viewBox="0 0 52 52" className="w-full h-full p-1" aria-hidden="true">
            {/* Vành phù hiệu đồng tâm */}
            <circle cx="26" cy="26" r="23" fill="none" stroke="#A98A55" strokeWidth="0.8" opacity="0.5" />
            <circle cx="26" cy="26" r="20" fill="none" stroke="#175A67" strokeWidth="0.6" strokeDasharray="1.5 2.5" opacity="0.6" />

            {/* Chòm Bắc Đẩu Thất Tinh (Big Dipper Constellation) */}
            <polyline
              points="11,15 17,14 22,18 28,19 32,27 40,26 42,35 34,36 32,27"
              fill="none"
              stroke="#A98A55"
              strokeWidth="0.8"
              opacity="0.5"
            />
            {/* 7 ngôi sao vàng */}
            <circle cx="11" cy="15" r="1.5" fill="#966F28" />
            <circle cx="17" cy="14" r="1.5" fill="#966F28" />
            <circle cx="22" cy="18" r="1.5" fill="#966F28" />
            <circle cx="28" cy="19" r="1.5" fill="#966F28" />
            <circle cx="40" cy="26" r="1.6" fill="#175A67" />
            <circle cx="42" cy="35" r="1.8" fill="#175A67" />
            <circle cx="34" cy="36" r="1.6" fill="#175A67" />

            {/* Triện tự 紫微 */}
            <text
              x="26"
              y="32"
              textAnchor="middle"
              className="font-han font-bold"
              fontSize="13"
              fill="#175A67"
              letterSpacing="0.5"
            >
              紫微
            </text>
          </svg>
        </div>
      );

    // 2. TỨ TRỤ BÁT TỰ: Càn Khôn Tứ Trụ & Can Chi Ngũ Hành
    case "bat-tu":
      return (
        <div
          className={`relative rounded-xl bg-gradient-to-br from-[#FAF7F2] to-[#EAE3DE] border border-[#A98A55]/40 shadow-sm flex items-center justify-center select-none overflow-hidden group-hover:border-[#1D6353] transition-colors ${className}`}
          style={{ width: size, height: size }}
          title="Tứ Trụ Bát Tự • Can Chi Mệnh Bàn"
        >
          <svg viewBox="0 0 52 52" className="w-full h-full p-1" aria-hidden="true">
            {/* Vành phù hiệu bát giác */}
            <rect x="5" y="5" width="42" height="42" rx="7" fill="none" stroke="#A98A55" strokeWidth="0.8" opacity="0.45" />
            <circle cx="26" cy="26" r="18" fill="none" stroke="#1D6353" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.5" />

            {/* 4 Trụ Can Chi cách điệu (4 phương vị trục Càn Khôn) */}
            <line x1="26" y1="7" x2="26" y2="13" stroke="#966F28" strokeWidth="1" />
            <line x1="26" y1="39" x2="26" y2="45" stroke="#966F28" strokeWidth="1" />
            <line x1="7" y1="26" x2="13" y2="26" stroke="#966F28" strokeWidth="1" />
            <line x1="39" y1="26" x2="45" y2="26" stroke="#966F28" strokeWidth="1" />

            {/* Triện tự 八字 */}
            <text
              x="26"
              y="32"
              textAnchor="middle"
              className="font-han font-bold"
              fontSize="14"
              fill="#1D6353"
              letterSpacing="1"
            >
              八字
            </text>
          </svg>
        </div>
      );

    // 3. KỲ MÔN ĐỘN GIÁP: Cửu Cung Trận Đồ & Bát Quái
    case "ky-mon":
      return (
        <div
          className={`relative rounded-xl bg-gradient-to-br from-[#FAF7F2] to-[#EAE3DE] border border-[#A98A55]/40 shadow-sm flex items-center justify-center select-none overflow-hidden group-hover:border-[#175A67] transition-colors ${className}`}
          style={{ width: size, height: size }}
          title="Kỳ Môn Độn Giáp • Cửu Cung Trận Đồ"
        >
          <svg viewBox="0 0 52 52" className="w-full h-full p-1" aria-hidden="true">
            {/* Khung trận đồ Cửu Cung 3x3 */}
            <rect x="8" y="8" width="36" height="36" rx="4" fill="none" stroke="#175A67" strokeWidth="0.8" opacity="0.5" />
            <line x1="20" y1="8" x2="20" y2="44" stroke="#A98A55" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.6" />
            <line x1="32" y1="8" x2="32" y2="44" stroke="#A98A55" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.6" />
            <line x1="8" y1="20" x2="44" y2="20" stroke="#A98A55" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.6" />
            <line x1="8" y1="32" x2="44" y2="32" stroke="#A98A55" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.6" />

            {/* Triện tự 奇门 */}
            <text
              x="26"
              y="31"
              textAnchor="middle"
              className="font-han font-bold"
              fontSize="13"
              fill="#175A67"
              letterSpacing="0.5"
            >
              奇门
            </text>
          </svg>
        </div>
      );

    // 4. LA BÀN PHONG THỦY: La Kinh Thiên Trì & 24 Sơn Hướng
    case "la-ban":
      return (
        <div
          className={`relative rounded-xl bg-gradient-to-br from-[#FAF7F2] to-[#EAE3DE] border border-[#A98A55]/40 shadow-sm flex items-center justify-center select-none overflow-hidden group-hover:border-[#9B2921] transition-colors ${className}`}
          style={{ width: size, height: size }}
          title="La Bàn Phong Thủy • La Kinh Cổ Bản"
        >
          <svg viewBox="0 0 52 52" className="w-full h-full p-1" aria-hidden="true">
            {/* Vành La Kinh cổ */}
            <circle cx="26" cy="26" r="23" fill="none" stroke="#9B2921" strokeWidth="0.9" opacity="0.6" />
            <circle cx="26" cy="26" r="20" fill="none" stroke="#A98A55" strokeWidth="0.6" strokeDasharray="1 2" opacity="0.7" />
            <circle cx="26" cy="26" r="16" fill="none" stroke="#9B2921" strokeWidth="0.5" opacity="0.4" />

            {/* Kim La Bàn (Thiên Trì Châm) */}
            <line x1="26" y1="9" x2="26" y2="21" stroke="#9B2921" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="26" cy="9" r="1.5" fill="#9B2921" />
            <line x1="26" y1="31" x2="26" y2="43" stroke="#175A67" strokeWidth="1" strokeLinecap="round" />

            {/* Triện tự 罗盘 */}
            <text
              x="26"
              y="30"
              textAnchor="middle"
              className="font-han font-bold"
              fontSize="12"
              fill="#9B2921"
              letterSpacing="0.5"
            >
              罗盘
            </text>
          </svg>
        </div>
      );

    // 5. HỢP HÔN & ĐỐI TÁC: Đồng Tâm Kết & Song Hỷ Hợp Bích
    case "hop-hon":
      return (
        <div
          className={`relative rounded-xl bg-gradient-to-br from-[#FAF7F2] to-[#EAE3DE] border border-[#A98A55]/40 shadow-sm flex items-center justify-center select-none overflow-hidden group-hover:border-[#966F28] transition-colors ${className}`}
          style={{ width: size, height: size }}
          title="Hợp Hôn & Đối Tác • Song Hỷ Hợp Bích"
        >
          <svg viewBox="0 0 52 52" className="w-full h-full p-1" aria-hidden="true">
            {/* Khung hoa văn Như Ý giao duyên */}
            <circle cx="26" cy="26" r="22" fill="none" stroke="#A98A55" strokeWidth="0.8" opacity="0.5" />
            {/* Hai vòng khuyên đan lồng (Lục Hợp Đồng Tâm) */}
            <circle cx="22" cy="24" r="13" fill="none" stroke="#966F28" strokeWidth="0.8" opacity="0.4" />
            <circle cx="30" cy="24" r="13" fill="none" stroke="#175A67" strokeWidth="0.8" opacity="0.4" />

            {/* Triện tự 合璧 */}
            <text
              x="26"
              y="32"
              textAnchor="middle"
              className="font-han font-bold"
              fontSize="13"
              fill="#966F28"
              letterSpacing="0.5"
            >
              合璧
            </text>
          </svg>
        </div>
      );

    // 6. THƯ VIỆN CỔ THƯ: Trúc Giản Quyển Trục & Tàng Kinh Thư Hạp
    case "tai-lieu":
    default:
      return (
        <div
          className={`relative rounded-xl bg-gradient-to-br from-[#FAF7F2] to-[#EAE3DE] border border-[#A98A55]/40 shadow-sm flex items-center justify-center select-none overflow-hidden group-hover:border-[#175A67] transition-colors ${className}`}
          style={{ width: size, height: size }}
          title="Thư Viện Cổ Thư • 47 Bộ Kinh Điển"
        >
          <svg viewBox="0 0 52 52" className="w-full h-full p-1" aria-hidden="true">
            {/* Khung thư tịch cổ bản hình chữ nhật viền kép */}
            <rect x="7" y="6" width="38" height="40" rx="5" fill="none" stroke="#A98A55" strokeWidth="0.9" opacity="0.5" />
            <rect x="10" y="9" width="32" height="34" rx="3" fill="none" stroke="#175A67" strokeWidth="0.5" strokeDasharray="2 1.5" opacity="0.4" />

            {/* Gáy sách cổ / Nếp gấp trúc giản */}
            <line x1="15" y1="9" x2="15" y2="43" stroke="#A98A55" strokeWidth="0.8" opacity="0.6" />

            {/* Triện tự 古籍 */}
            <text
              x="27"
              y="31"
              textAnchor="middle"
              className="font-han font-bold"
              fontSize="13"
              fill="#175A67"
              letterSpacing="0.5"
            >
              古籍
            </text>
          </svg>
        </div>
      );
  }
}
