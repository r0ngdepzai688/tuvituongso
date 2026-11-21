"use client";

import React from "react";

// Helper to round SVG coordinates to avoid SSR hydration mismatch
const r = (val: number) => Math.round(val * 100) / 100;

/**
 * Thiên Văn Cổ Phương Đông (Eastern Classical Celestial Geometry)
 * - Vòng thiên bàn đồng tâm khắc đồng (Celestial Meridian Rings & Equatorial Arc).
 * - Phân cung 24 tiết khí / 12 thời thần thanh mảnh dạng nét khắc thư tịch cổ.
 * - Các chấm tinh tú đơn lẻ li ti như mực sao cổ truyền (KHÔNG có đường kẻ nối constellation kiểu sci-fi).
 * - Được bố trí tinh tế ở vùng nền trời biên sườn (vùng chuyển tiếp), KHÔNG đặt phía sau Hero hay Form.
 */
export function MetaphysicalVectorLayers() {
  const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Vòng Thiên Bàn Khắc Đồng Cổ Điển — Góc Trời Biên Trái (Upper Left Sky Transition) */}
      <div className="hidden xl:block absolute -top-32 -left-32 w-[520px] h-[520px] opacity-[0.045] text-[#175A67]">
        <svg viewBox="0 0 500 500" className="w-full h-full animate-spin-ultra-slow" suppressHydrationWarning>
          {/* Vòng tròn đồng tâm thiên văn */}
          <circle cx="250" cy="250" r="236" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="250" cy="250" r="220" fill="none" stroke="#A98A55" strokeWidth="0.6" strokeDasharray="3 5" />
          <circle cx="250" cy="250" r="184" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="250" cy="250" r="140" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 4" />
          <circle cx="250" cy="250" r="90" fill="none" stroke="#A98A55" strokeWidth="0.5" />

          {/* 24 Nét Phân Cung Tiết Khí Dạng Khắc Đồng */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const x1 = r(250 + 184 * Math.cos(angle));
            const y1 = r(250 + 184 * Math.sin(angle));
            const x2 = r(250 + 220 * Math.cos(angle));
            const y2 = r(250 + 220 * Math.sin(angle));
            return (
              <line
                key={`left-rad-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth={i % 2 === 0 ? "0.8" : "0.4"}
                opacity={i % 2 === 0 ? 0.7 : 0.35}
              />
            );
          })}

          {/* 12 Địa Chi Khắc Đồng Cổ Mộc */}
          {branches.map((b, i) => {
            const deg = i * 30 - 90;
            const rad = (deg * Math.PI) / 180;
            const x = r(250 + 202 * Math.cos(rad));
            const y = r(250 + 202 * Math.sin(rad));
            return (
              <text
                key={`left-br-${b}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="currentColor"
                fontSize="12"
                className="font-han select-none"
              >
                {b}
              </text>
            );
          })}
        </svg>
      </div>

      {/* 2. Cung Thiên Xích & Quỹ Đạo Đồng Tâm — Góc Trời Biên Phải (Upper Right Sky Transition) */}
      <div className="hidden xl:block absolute -top-24 -right-24 w-[460px] h-[460px] opacity-[0.04] text-[#A98A55]">
        <svg viewBox="0 0 460 460" className="w-full h-full animate-spin-reverse-slow" suppressHydrationWarning>
          <circle cx="230" cy="230" r="218" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="230" cy="230" r="198" fill="none" stroke="#175A67" strokeWidth="0.6" strokeDasharray="4 6" />
          <circle cx="230" cy="230" r="160" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="230" cy="230" r="110" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />

          {/* 8 Cung Bát Quái Cổ Khắc */}
          {["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"].map((t, i) => {
            const deg = i * 45 - 90;
            const rad = (deg * Math.PI) / 180;
            const x = r(230 + 178 * Math.cos(rad));
            const y = r(230 + 178 * Math.sin(rad));
            return (
              <text
                key={`right-tri-${i}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="currentColor"
                fontSize="14"
              >
                {t}
              </text>
            );
          })}
        </svg>
      </div>

      {/* 3. Tinh Tú Đơn Lẻ Li Ti (Thưa thớt, mờ ảo như chấm mực sao cổ truyền — Tuyệt đối không nối đường vẽ sci-fi) */}
      <svg
        viewBox="0 0 1440 320"
        className="hidden md:block absolute top-0 inset-x-0 w-full h-80 opacity-[0.16] pointer-events-none"
        fill="none"
      >
        {[
          { cx: 120, cy: 75, r: 1.4, fill: "#A98A55" },
          { cx: 240, cy: 45, r: 1.2, fill: "#175A67" },
          { cx: 310, cy: 110, r: 1.6, fill: "#A98A55" },
          { cx: 460, cy: 60, r: 1.0, fill: "#175A67" },
          { cx: 980, cy: 50, r: 1.2, fill: "#175A67" },
          { cx: 1120, cy: 95, r: 1.6, fill: "#A98A55" },
          { cx: 1260, cy: 40, r: 1.3, fill: "#175A67" },
          { cx: 1360, cy: 85, r: 1.5, fill: "#A98A55" },
        ].map((star, idx) => (
          <circle
            key={`antique-star-${idx}`}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill={star.fill}
            opacity={0.8}
          />
        ))}
      </svg>
    </div>
  );
}
