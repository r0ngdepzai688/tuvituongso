import React from "react";

interface LuoPanMarkProps {
  className?: string;
  size?: number;
  color?: string;
  accentColor?: string;
}

/**
 * 03. La Bàn Thiên Văn (Luo Pan / Bagua Metaphysical Compass)
 * La Kinh truyền thống bằng đồng khắc: 8 quẻ Bát Quái, 24 phân vị, Thái Cực trung tâm.
 * Dùng làm biểu tượng trung tâm, ấn chứng hoặc điểm nhấn học thuật.
 */
export function LuoPanMark({
  className = "",
  size = 48,
  color = "#A98A55",
  accentColor = "#175A67",
}: LuoPanMarkProps) {
  const trigrams = ["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Vành La Kinh Ngoài Cùng */}
      <circle cx="50" cy="50" r="47" stroke={color} strokeWidth="1.5" />
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="0.8" strokeDasharray="2 3" />
      <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="1" />
      <circle cx="50" cy="50" r="26" stroke={accentColor} strokeWidth="0.8" />
      <circle cx="50" cy="50" r="16" stroke={color} strokeWidth="1" />

      {/* 8 Tia Phân Hướng Bát Quái */}
      {Array.from({ length: 8 }).map((_, i) => {
        const rad = (i * 45 * Math.PI) / 180;
        const x1 = Math.round((50 + 26 * Math.cos(rad)) * 10) / 10;
        const y1 = Math.round((50 + 26 * Math.sin(rad)) * 10) / 10;
        const x2 = Math.round((50 + 38 * Math.cos(rad)) * 10) / 10;
        const y2 = Math.round((50 + 38 * Math.sin(rad)) * 10) / 10;
        return (
          <line
            key={`lp-ray-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="0.8"
          />
        );
      })}

      {/* 8 Quẻ Bát Quái Vòng Trong */}
      {trigrams.map((t, i) => {
        const rad = ((i * 45 - 90) * Math.PI) / 180;
        const x = Math.round((50 + 32 * Math.cos(rad)) * 10) / 10;
        const y = Math.round((50 + 32 * Math.sin(rad)) * 10) / 10;
        return (
          <text
            key={`lp-tri-${i}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fill={accentColor}
            fontSize="8"
            fontWeight="bold"
          >
            {t}
          </text>
        );
      })}

      {/* Thiên Trì (Thái Cực Âm Dương Tâm Điểm) */}
      <circle cx="50" cy="50" r="15" fill="#FAF7F2" stroke={color} strokeWidth="1" />
      <path
        d="M50 35 A15 15 0 0 1 50 65 A7.5 7.5 0 0 1 50 50 A7.5 7.5 0 0 0 50 35"
        fill={accentColor}
      />
      <circle cx="50" cy="42.5" r="2.2" fill="#FAF7F2" />
      <circle cx="50" cy="57.5" r="2.2" fill={accentColor} />
    </svg>
  );
}
