import React from "react";
import { HuiwenCorner } from "./ornaments/HuiwenBorder";

interface ChineseCornersProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * Gờ Góc Cổ Phong Thư Tịch (Antique Corner Brackets)
 * Đã loại bỏ hoàn toàn viền bo lồng (inset border) để tránh hiện tượng chồng 2 loại card bo.
 * Chỉ hiển thị 4 góc gờ hoa văn Hồi Văn tinh xảo, thanh mảnh gắn sát góc thẻ.
 */
export function ChineseCorners({
  className = "",
  size = 18,
  color = "#A98A55",
}: ChineseCornersProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${className}`}
      aria-hidden="true"
    >
      <HuiwenCorner size={size} color={color} className="absolute top-1.5 left-1.5 opacity-60" />
      <HuiwenCorner size={size} color={color} className="absolute top-1.5 right-1.5 rotate-90 opacity-60" />
      <HuiwenCorner size={size} color={color} className="absolute bottom-1.5 left-1.5 -rotate-90 opacity-60" />
      <HuiwenCorner size={size} color={color} className="absolute bottom-1.5 right-1.5 rotate-180 opacity-60" />
    </div>
  );
}
