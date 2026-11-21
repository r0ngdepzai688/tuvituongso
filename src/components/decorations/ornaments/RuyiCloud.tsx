import React from "react";

interface OrnamentProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * 01. Như Ý Vân (Ruyi Cloud Pattern)
 * Họa tiết đầu mây Như Ý cát tường uốn lượn hình linh chi cổ điển.
 * Dùng làm góc khung (corner), dải phân cách (divider) hoặc điểm nhấn header.
 */
export function RuyiCorner({
  className = "",
  size = 32,
  color = "#A98A55",
}: OrnamentProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Vòng cung góc ôm mềm mại theo lòng góc trong */}
      <path
        d="M4 20V10C4 6.68629 6.68629 4 10 4H20"
        stroke={color}
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />
      {/* Cuộn xoắn mây Như Ý trung tâm tinh xảo */}
      <path
        d="M10 16C10 12.5 13 10 16.5 10C19.5 10 21.5 12 21.5 14.5C21.5 16.5 20 18 18 18C16.5 18 15.5 17 15.5 16"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M16 10C12.5 10 10 13 10 16.5C10 19.5 12 21.5 14.5 21.5C16.5 21.5 18 20 18 18"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Chấm ngọc trung tâm */}
      <circle cx="16.5" cy="16.5" r="1.3" fill={color} />
    </svg>
  );
}

/**
 * Mây Như Ý Đơn Lẻ (Ruyi Cloud Icon/Badge)
 */
export function RuyiCloudMotif({
  className = "",
  width = 64,
  height = 24,
  color = "#A98A55",
}: {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M10 24C6 24 3 21 3 17C3 13 6 10 10 10C11.5 10 13 10.5 14.2 11.5C16.5 7 21.5 4 27 4C34 4 40 9.5 40 16.5C40 17.2 39.9 17.8 39.8 18.5C41.5 17.5 43.5 17 45.5 17C51 17 55.5 21.5 55.5 27C55.5 27.2 55.5 27.3 55.5 27.5C56.8 26.5 58.5 26 60.5 26C64 26 67 28.8 67 32.5H12C12.5 30.5 13.5 28.5 14 26.5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Vòng xoắn âm dương bên trong đám mây */}
      <path
        d="M27 12C24 12 21.5 14.5 21.5 17.5C21.5 19.5 22.8 21.2 24.5 22"
        stroke={color}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <circle cx="45.5" cy="22.5" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}
