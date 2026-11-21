"use client";

import React from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showGlow?: boolean;
}

/**
 * Biểu tượng Thương Hiệu Hoàng Kim Thái Cực - Kỳ Thư Cổ Môn
 * Thiết kế chuẩn mực nhận diện thương hiệu cao cấp (Visual Identity & Logo Design Guidelines):
 * - Đĩa Huy Chương Hoàng Kim (Imperial Celestial Medallion): Khóa ranh giới tương phản tuyệt đối trên mọi nền sáng/tối.
 * - Thái Cực Đồ chuẩn hình học toán học: Bạch Ngọc Hoàng Gia tương phản tuyệt đối với Mực Lam Thủy Mặc sâu thẳm.
 * - Nhãn Âm Dương Thuần Sắc: Tỷ lệ vàng R=5.8 to rõ, sắc sảo, dứt khoát, không viền lồng.
 * - Vành La Kinh Thiên Cơ: Tứ Phương Tinh Vị & Tứ Duy Tinh Tú đúc nổi đồng cổ.
 */
export function BrandLogo({ size = "md", className = "", showGlow = true }: BrandLogoProps) {
  const dimensions = {
    sm: { box: 28, stroke: 1.5 },
    md: { box: 38, stroke: 1.8 },
    lg: { box: 54, stroke: 2.2 },
    xl: { box: 76, stroke: 2.6 },
  };

  const dim = dimensions[size];
  const px = dim.box;

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: px, height: px }}
    >
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full transition-transform duration-300 hover:scale-105 ${
          showGlow ? "drop-shadow-[0_2px_12px_rgba(150,111,40,0.4)]" : ""
        }`}
        fill="none"
        role="img"
        aria-label="Kỳ Thư Cổ Môn Logo"
      >
        <defs>
          {/* Imperial Gold Gradient for Outer Celestial Bezel */}
          <linearGradient id="imperialGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#966F28" />
            <stop offset="100%" stopColor="#6B4E04" />
          </linearGradient>

          {/* Deep Prussian Teal Ink Gradient for Yin */}
          <linearGradient id="deepTealInkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#196270" />
            <stop offset="50%" stopColor="#10444E" />
            <stop offset="100%" stopColor="#08282E" />
          </linearGradient>

          {/* Imperial White Jade Gradient for Yang */}
          <linearGradient id="whiteJadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F2ECE4" />
          </linearGradient>
        </defs>

        {/* 1. Vành Đế Huy Chương Hoàng Kim (The Imperial Astrolabe Base) */}
        <circle
          cx="50"
          cy="50"
          r="47.5"
          fill="#FAF6F0"
          stroke="url(#imperialGoldGrad)"
          strokeWidth="2.5"
        />
        <circle
          cx="50"
          cy="50"
          r="40.5"
          fill="none"
          stroke="url(#imperialGoldGrad)"
          strokeWidth="1.2"
          strokeDasharray="2 2"
          opacity="0.85"
        />

        {/* 2. Tứ Phương Tinh Vị La Kinh (0° / 90° / 180° / 270°) */}
        <line x1="50" y1="2" x2="50" y2="8" stroke="#6B4E04" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="50" y1="92" x2="50" y2="98" stroke="#6B4E04" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="2" y1="50" x2="8" y2="50" stroke="#6B4E04" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="92" y1="50" x2="98" y2="50" stroke="#6B4E04" strokeWidth="2.2" strokeLinecap="round" />

        {/* 3. Tứ Duy Cát Tinh (4 điểm ngọc đúc nổi tại 4 góc 45°) */}
        <circle cx="18" cy="18" r="2" fill="#8B6508" stroke="#FFFFFF" strokeWidth="0.6" />
        <circle cx="82" cy="18" r="2" fill="#8B6508" stroke="#FFFFFF" strokeWidth="0.6" />
        <circle cx="18" cy="82" r="2" fill="#8B6508" stroke="#FFFFFF" strokeWidth="0.6" />
        <circle cx="82" cy="82" r="2" fill="#8B6508" stroke="#FFFFFF" strokeWidth="0.6" />

        {/* 4. Khung Viền Đĩa Thái Cực Tâm Điểm (Beveled Inner Taiji Frame) */}
        <circle
          cx="50"
          cy="50"
          r="33.5"
          fill="none"
          stroke="url(#imperialGoldGrad)"
          strokeWidth="2.4"
        />

        {/* 5. Nửa Dương Bạch Ngọc Hoàng Gia (White Jade Yang Fish) */}
        <path
          d="M 50 16.5 A 33.5 33.5 0 0 0 50 83.5 A 16.75 16.75 0 0 1 50 50 A 16.75 16.75 0 0 0 50 16.5 Z"
          fill="url(#whiteJadeGrad)"
          stroke="#8B6508"
          strokeWidth="0.8"
        />

        {/* 6. Nửa Âm Mực Lam Thủy Mặc (Deep Teal Yin Fish) */}
        <path
          d="M 50 16.5 A 33.5 33.5 0 0 1 50 83.5 A 16.75 16.75 0 0 1 50 50 A 16.75 16.75 0 0 0 50 16.5 Z"
          fill="url(#deepTealInkGrad)"
          stroke="#8B6508"
          strokeWidth="0.8"
        />

        {/* 7. Nhãn Âm Dương Thuần Sắc Siêu Sắc Nét (Tỷ Lệ Vàng R=5.8) */}
        {/* Mắt Mực Lam Đậm sâu thẳm trong lòng Bạch Ngọc (Phía trên, tâm y=33.25) */}
        <circle cx="50" cy="33.25" r="5.8" fill="#08282E" />

        {/* Mắt Bạch Ngọc Sáng Tinh Khiết rực rỡ trong lòng Mực Lam (Phía dưới, tâm y=66.75) */}
        <circle cx="50" cy="66.75" r="5.8" fill="#FFFFFF" />

        {/* 8. Đường Ranh Giới Chữ S Mạ Vàng Cổ Bản */}
        <path
          d="M 50 16.5 A 16.75 16.75 0 0 1 50 50 A 16.75 16.75 0 0 0 50 83.5"
          fill="none"
          stroke="url(#imperialGoldGrad)"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}
