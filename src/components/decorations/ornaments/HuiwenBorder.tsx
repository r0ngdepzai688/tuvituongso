import React from "react";

interface OrnamentProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * 02. Hồi Văn (Huiwen / Thunder Key Fret Pattern)
 * Họa tiết Lôi Văn hình học vuông góc gấp khúc truyền thống.
 * Tượng trưng cho sự trường tồn, tuần hoàn và kết nối vô tận.
 * Rất trang trọng khi dùng làm góc thẻ, viền khung hoặc dải ngăn cách.
 */
export function HuiwenCorner({
  className = "",
  size = 24,
  color = "#A98A55",
}: OrnamentProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Vành ngoài Hồi Văn gấp khúc vuông vức */}
      <path
        d="M2 18V4C2 2.89543 2.89543 2 4 2H18 M2 10H10V18 M10 10V6H14 M5 14H8"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="miter"
      />
      {/* Ô vuông hồi văn tâm */}
      <rect x="5" y="5" width="3.5" height="3.5" stroke={color} strokeWidth="0.8" strokeOpacity="0.8" />
    </svg>
  );
}

/**
 * Dải Viền Hồi Văn Chạy Ngang (Huiwen Continuous Border Strip)
 */
export function HuiwenBorderStrip({
  className = "",
  repeat = 6,
  color = "#A98A55",
}: {
  className?: string;
  repeat?: number;
  color?: string;
}) {
  return (
    <div className={`flex items-center overflow-hidden select-none pointer-events-none ${className}`} aria-hidden="true">
      {Array.from({ length: repeat }).map((_, i) => (
        <svg
          key={i}
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <path
            d="M1 11V1H11V7H5V5H9 M11 1H19V11H13V7"
            stroke={color}
            strokeWidth="0.9"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      ))}
    </div>
  );
}
