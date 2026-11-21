import React from "react";
import { RuyiCorner, HuiwenCorner } from "./ornaments";
import { AuspiciousSeal } from "./AuspiciousSeal";

interface OrientalFrameProps {
  children: React.ReactNode;
  variant?: "grand" | "standard" | "minimal";
  cornerStyle?: "ruyi" | "huiwen" | "none";
  showSeal?: boolean;
  sealText?: string;
  sealSubtext?: string;
  className?: string;
  innerClassName?: string;
  rounded?: "rounded-xl" | "rounded-2xl" | "rounded-3xl";
}

/**
 * HỆ THỐNG KHUNG THƯ TỊCH CỔ HỌC PHƯƠNG ĐÔNG (ORIENTAL FRAME SYSTEM)
 * Chuẩn mực 3 cấp độ:
 * - grand: Dành cho Hero & Bảng mệnh kết quả luận giải (viền vàng đồng nhạt kép, hoa văn góc Như Ý / Hồi Văn SVG, triện ấn chu sa).
 * - standard: Dành cho Form khởi tạo & Công cụ chính (viền vàng đồng thanh nhã, viền trong hairline, gờ góc hình học).
 * - minimal: Dành cho Sidebar widgets & Thẻ thông tin phụ (viền hairline mỏng, bề mặt giấy ngà đầm ấm chống xuyên thấu).
 */
export function OrientalFrame({
  children,
  variant = "standard",
  cornerStyle = "none",
  showSeal = false,
  sealText = "秘传",
  sealSubtext = "CỔ PHÁP",
  className = "",
  innerClassName = "",
  rounded = "rounded-2xl",
}: OrientalFrameProps) {
  // Bán kính bo góc đồng tâm hoàn hảo cho viền trong (Concentric inner border radius)
  const innerRadius =
    rounded === "rounded-3xl"
      ? "rounded-[16px] sm:rounded-[18px]"
      : rounded === "rounded-2xl"
      ? "rounded-[10px] sm:rounded-[12px]"
      : "rounded-[6px] sm:rounded-[8px]";

  // 1. GRAND FRAME — Dành cho Hero & Kết Quả Luận Giải Cấp Cao (Khung Thư Tịch Viền Kép Cổ Bản)
  if (variant === "grand") {
    return (
      <div
        className={`relative ${rounded} bg-[#FAF7F2]/96 backdrop-blur-md border border-[#A98A55]/35 shadow-[0_8px_32px_rgba(23,90,103,0.07)] transition-all duration-300 overflow-hidden ${className}`}
      >
        {/* Viền trong đồng tâm cực mảnh thanh nhã kiểu văn bản thư viện cổ */}
        <div className={`absolute inset-2 sm:inset-2.5 ${innerRadius} border border-[#A98A55]/25 pointer-events-none`} />

        {/* 4 Góc Hoa Văn Tinh Xảo — Đặt lọt lòng góc trong không giao cắt viền */}
        {cornerStyle === "ruyi" ? (
          <>
            <RuyiCorner size={26} color="#A98A55" className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 opacity-80" />
            <RuyiCorner size={26} color="#A98A55" className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 rotate-90 opacity-80" />
            <RuyiCorner size={26} color="#A98A55" className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 -rotate-90 opacity-80" />
            <RuyiCorner size={26} color="#A98A55" className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 rotate-180 opacity-80" />
          </>
        ) : cornerStyle === "huiwen" ? (
          <>
            <HuiwenCorner size={20} color="#A98A55" className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 opacity-65" />
            <HuiwenCorner size={20} color="#A98A55" className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 rotate-90 opacity-65" />
            <HuiwenCorner size={20} color="#A98A55" className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 -rotate-90 opacity-65" />
            <HuiwenCorner size={20} color="#A98A55" className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 rotate-180 opacity-65" />
          </>
        ) : null}

        {/* Triện ấn điểm xuyết (Tùy chọn) */}
        {showSeal && (
          <div className="absolute top-4 right-4 hidden sm:block pointer-events-none z-20">
            <AuspiciousSeal text={sealText} subtext={sealSubtext} shape="square" className="scale-90 opacity-85" />
          </div>
        )}

        <div className={`relative z-10 ${innerClassName}`}>{children}</div>
      </div>
    );
  }

  // 2. STANDARD FRAME — Dành cho Form Nhập Liệu & Công Cụ Chính
  if (variant === "standard") {
    return (
      <div
        className={`relative ${rounded} bg-[#FAF7F2]/94 backdrop-blur-md border border-[#A98A55]/30 hover:border-[#175A67]/40 shadow-[0_4px_20px_rgba(23,90,103,0.05)] transition-all duration-300 overflow-hidden ${className}`}
      >
        {/* Viền trong đồng tâm cực mảnh cách mép */}
        <div className={`absolute inset-1.5 sm:inset-2 ${innerRadius} border border-[#A98A55]/20 pointer-events-none`} />

        {/* Gờ góc Hồi Văn thanh mảnh (Chỉ hiển thị khi yêu cầu) */}
        {cornerStyle === "huiwen" && (
          <>
            <HuiwenCorner size={16} color="#A98A55" className="absolute top-1.5 left-1.5 opacity-60" />
            <HuiwenCorner size={16} color="#A98A55" className="absolute top-1.5 right-1.5 rotate-90 opacity-60" />
            <HuiwenCorner size={16} color="#A98A55" className="absolute bottom-1.5 left-1.5 -rotate-90 opacity-60" />
            <HuiwenCorner size={16} color="#A98A55" className="absolute bottom-1.5 right-1.5 rotate-180 opacity-60" />
          </>
        )}
        {cornerStyle === "ruyi" && (
          <>
            <RuyiCorner size={20} color="#A98A55" className="absolute top-1 left-1 opacity-70" />
            <RuyiCorner size={20} color="#A98A55" className="absolute top-1 right-1 rotate-90 opacity-70" />
            <RuyiCorner size={20} color="#A98A55" className="absolute bottom-1 left-1 -rotate-90 opacity-70" />
            <RuyiCorner size={20} color="#A98A55" className="absolute bottom-1 right-1 rotate-180 opacity-70" />
          </>
        )}

        <div className={`relative z-10 ${innerClassName}`}>{children}</div>
      </div>
    );
  }

  // 3. MINIMAL FRAME — Dành cho Sidebar, Danh Sách & Thông Tin Phụ
  return (
    <div
      className={`relative ${rounded} bg-[#FAF7F2]/95 backdrop-blur-md border border-[#175A67]/18 hover:border-[#175A67]/35 shadow-[0_2px_12px_rgba(23,90,103,0.04)] transition-all duration-300 overflow-hidden ${className}`}
    >
      <div className={`relative z-10 ${innerClassName}`}>{children}</div>
    </div>
  );
}
