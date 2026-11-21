"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { ChineseCorners } from "@/components/decorations/ChineseCorners";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="relative max-w-lg w-full bg-gradient-to-br from-oriental-card via-oriental-cardLight to-oriental-card p-8 rounded-2xl border border-oriental-red/60 text-center space-y-6 shadow-cardWarm flame-glow">
        <ChineseCorners size={24} color="#B83A32" />

        <div className="w-16 h-16 rounded-2xl bg-oriental-red/20 border border-oriental-red/50 flex items-center justify-center mx-auto text-oriental-redBright">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-oriental-redBright">
            Khí Tượng Gián Đoạn • Lỗi Hệ Thống
          </div>
          <h2 className="text-2xl font-serif font-bold text-oriental-goldBright">
            Thiên Cơ Tạm Nghẽn
          </h2>
          <p className="text-sm text-oriental-textSecondary leading-relaxed">
            Hệ thống tính toán thuật số vừa gặp sự cố ngoài dự liệu. Bạn có thể thử khởi lập lại quẻ số hoặc làm mới trang.
          </p>
          {error?.message && (
            <div className="p-2.5 rounded bg-oriental-dark/80 border border-oriental-border text-[11px] font-mono text-oriental-redBright/90 text-left overflow-x-auto">
              {error.message}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-oriental-goldMuted via-oriental-gold to-oriental-goldBright text-oriental-dark font-bold text-xs hover:brightness-110 transition-all flex items-center space-x-2 shadow-goldGlow"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Thử Khởi Lại (Reset)</span>
          </button>

          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl bg-oriental-dark border border-oriental-borderGold/50 text-oriental-textSecondary hover:text-oriental-gold text-xs transition-colors flex items-center space-x-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Về Trang Chủ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
