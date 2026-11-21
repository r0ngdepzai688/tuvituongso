import React from "react";

interface HaiDuongColophonProps {
  className?: string;
}

/**
 * LẠC KHOẢN & TRIỆN THƯ PHÁP "HẢI ĐƯỜNG" (HAI DUONG SCHOLARLY COLOPHON & SEAL)
 * Đề từ thư phòng cổ điển đặt ở góc dưới câu giới thiệu:
 * - Bút tích thư pháp Hán-Việt: "Thủ bút: Hải Đường" (海棠)
 * - Triện ấn Chu Sa đỏ (Vermilion Seal) khắc cổ văn triện tự "海棠"
 * - Lạc khoản: "Cẩn bút" (谨笔)
 */
export function HaiDuongColophon({ className = "" }: HaiDuongColophonProps) {
  return (
    <div
      className={`inline-flex items-center justify-end space-x-2.5 select-none pt-2 border-t border-[#175A67]/15 ${className}`}
      title="Hải Đường Cẩn Bút • Triện Ấn Chính Tông"
    >
      {/* Lời đề thủ bút */}
      <span className="font-serif italic text-xs text-[#5E777D] tracking-wider">
        Thủ bút:
      </span>

      {/* Tên thư pháp Hải Đường */}
      <span className="font-calligraphy text-base sm:text-lg text-[#175A67] font-bold tracking-widest drop-shadow-sm">
        Hải Đường
      </span>

      {/* Triện Ấn Chu Sa Đỏ "海棠" */}
      <div
        className="relative inline-flex flex-col items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-[4px] bg-[#9B2921] border-2 border-[#D97D75] shadow-[0_2px_8px_rgba(155,41,33,0.35)] select-none transition-transform hover:scale-105"
        style={{
          boxShadow: "inset 0 0 4px rgba(0,0,0,0.25), 0 2px 6px rgba(155,41,33,0.3)",
        }}
      >
        {/* Viền trong mảnh kiểu triện khắc đá */}
        <div className="absolute inset-0.5 rounded-[2px] border border-[#F4A8A3]/40 pointer-events-none" />
        <span
          className="font-han font-black text-[#FAF7F2] tracking-tighter leading-none"
          style={{ fontSize: "12px", textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
        >
          海棠
        </span>
      </div>

      {/* Lạc khoản cẩn bút */}
      <span className="font-han text-xs text-[#966F28]/85 font-medium tracking-widest">
        谨笔
      </span>
    </div>
  );
}
