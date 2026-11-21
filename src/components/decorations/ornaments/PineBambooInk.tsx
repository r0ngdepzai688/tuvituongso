import React from "react";

interface PineBambooProps {
  className?: string;
  size?: number;
  color?: string;
  variant?: "pine" | "bamboo";
}

/**
 * 06. Tùng Trúc Thủy Mặc (Pine & Bamboo Ink Painting)
 * Cành tùng bách vững chãi và nhánh trúc quân tử thanh khiết.
 * Nét vẽ thủy mặc mực đạm tinh tế, dùng cho mép trang, chân thẻ hoặc góc thư tịch.
 */
export function PineBambooInk({
  className = "",
  size = 60,
  color = "#175A67",
  variant = "pine",
}: PineBambooProps) {
  if (variant === "bamboo") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        {/* Đốt trúc thanh mảnh */}
        <path
          d="M10 55 C12 40, 16 28, 22 10"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="16" cy="28" r="1.5" fill={color} />
        {/* Nhánh và lá trúc hình chữ Giới */}
        <path
          d="M16 28 C22 25, 34 26, 42 32 M34 26 C38 20, 48 18, 54 22 M22 10 C30 8, 40 6, 48 12 M30 8 C36 4, 46 2, 52 6"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M42 32 C36 34, 30 36, 26 38"
          stroke={color}
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
      </svg>
    );
  }

  // Pine (Cành Tùng Cổ Thụ)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Thân cành tùng bách uốn lượn cổ phong */}
      <path
        d="M5 50 C18 42, 28 36, 38 32 C46 28, 52 18, 56 10"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Các chùm kim tùng hình rẻ quạt */}
      <path
        d="M38 32 C32 26, 30 20, 32 14 M38 32 C42 24, 44 16, 42 10 M38 32 C46 30, 52 26, 56 22"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M26 37 C20 32, 18 24, 22 18 M26 37 C28 30, 26 22, 24 16"
        stroke={color}
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
    </svg>
  );
}
