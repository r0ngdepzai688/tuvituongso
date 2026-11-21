"use client";

import Link from "next/link";
import { Compass, Home, RotateCcw } from "lucide-react";
import { ChineseCorners } from "@/components/decorations/ChineseCorners";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="relative max-w-lg w-full bg-gradient-to-br from-oriental-card via-oriental-cardLight to-oriental-card p-8 rounded-2xl border border-oriental-gold/50 text-center space-y-6 shadow-cardWarm flame-glow">
        <ChineseCorners size={24} color="#D4AF37" />

        <div className="w-16 h-16 rounded-2xl bg-oriental-gold/15 border border-oriental-gold/40 flex items-center justify-center mx-auto text-oriental-gold">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-oriental-gold">
            Càn Khôn Biến Hóa • 404
          </div>
          <h2 className="text-2xl font-serif font-bold text-oriental-goldBright">
            Thiên Cơ Bất Khả Tầm
          </h2>
          <p className="text-sm text-oriental-textSecondary leading-relaxed">
            Cung vị hoặc trang bạn đang tìm kiếm không tồn tại hoặc đã được luân chuyển theo quy luật tuần hoàn của vũ trụ.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-oriental-goldMuted via-oriental-gold to-oriental-goldBright text-oriental-dark font-bold text-xs hover:brightness-110 transition-all flex items-center space-x-2 shadow-goldGlow"
          >
            <Home className="w-4 h-4" />
            <span>Về Trang Chủ Kỳ Thư</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-4 py-2.5 rounded-xl bg-oriental-dark border border-oriental-borderGold/50 text-oriental-textSecondary hover:text-oriental-gold text-xs transition-colors flex items-center space-x-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Quay Lại Bước Trước</span>
          </button>
        </div>
      </div>
    </div>
  );
}
