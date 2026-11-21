import React from "react";
import { RuyiCloudMotif } from "./ornaments/RuyiCloud";

interface XiangyunCloudProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export function XiangyunCloud({
  className = "",
  width = 120,
  height = 36,
  color = "#A98A55",
}: XiangyunCloudProps) {
  return <RuyiCloudMotif width={width} height={height} color={color} className={className} />;
}

/**
 * Đường Phân Cách Mây Như Ý Cát Tường (Ruyi Cloud Scholarly Divider)
 * Kết hợp chỉ vàng đồng nhạt, mây Như Ý đối xứng và tiêu đề mộc bản trang trọng.
 */
export function ChineseCloudDivider({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <div className="flex items-center justify-center space-x-3 sm:space-x-4 my-8 select-none" aria-hidden="true">
      {/* Tia chỉ dẫn bên trái */}
      <div className="flex items-center space-x-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A98A55]/40" />
        <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#A98A55]/40 to-[#175A67]" />
      </div>

      <RuyiCloudMotif width={42} height={18} color="#A98A55" className="transform -scale-x-100 opacity-80" />

      <div className="text-center px-2 sm:px-3">
        {title && (
          <span className="font-serif font-bold text-sm sm:text-base text-[#175A67] tracking-wider block">
            {title}
          </span>
        )}
        {subtitle && (
          <span className="text-[10px] text-[#5E777D] font-mono uppercase tracking-widest block mt-0.5">
            {subtitle}
          </span>
        )}
      </div>

      <RuyiCloudMotif width={42} height={18} color="#A98A55" className="opacity-80" />

      {/* Tia chỉ dẫn bên phải */}
      <div className="flex items-center space-x-1.5">
        <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-[#A98A55]/40 to-[#175A67]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#A98A55]/40" />
      </div>
    </div>
  );
}
