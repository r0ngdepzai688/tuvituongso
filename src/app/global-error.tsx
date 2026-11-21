"use client";

import { AlertCircle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body className="bg-[#EAE3DE] text-[#12343B] min-h-screen flex items-center justify-center p-4">
        <div className="relative max-w-lg w-full bg-[#F8F4F0] p-8 rounded-2xl border border-[#B83A32]/50 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-[#B83A32]/15 border border-[#B83A32]/40 flex items-center justify-center mx-auto text-[#B83A32]">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#175A67]">
              Thiên Địa Hỗn Độn • Lỗi Căn Bản
            </h2>
            <p className="text-sm text-[#345258] leading-relaxed">
              Khung bố cục gốc gặp sự cố không thể khôi phục tự động. Xin vui lòng thử khởi động lại ứng dụng.
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-xl bg-[#175A67] text-[#EAE3DE] font-bold text-xs hover:bg-[#0F454F] transition-all inline-flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Khôi Phục Trạng Thái</span>
          </button>
        </div>
      </body>
    </html>
  );
}
