"use client";

import { useState, useEffect } from "react";
import { Solar } from "lunar-typescript";
import { OrientalFrame } from "../decorations/OrientalFrame";
import { AuspiciousSeal } from "../decorations/AuspiciousSeal";
import { Sparkles, MapPin, Bot, ShieldCheck } from "lucide-react";
import { AIChatModal } from "../AIChatModal";

const DIRECTION_MAP: Record<string, { vi: string; han: string }> = {
  "东南": { vi: "Đông Nam", han: "東南" },
  "正北": { vi: "Chính Bắc", han: "正北" },
  "东北": { vi: "Đông Bắc", han: "東北" },
  "西南": { vi: "Tây Nam", han: "西南" },
  "正西": { vi: "Chính Tây", han: "正西" },
  "正东": { vi: "Chính Đông", han: "正東" },
  "正南": { vi: "Chính Nam", han: "正南" },
  "西北": { vi: "Tây Bắc", han: "西北" },
};

function formatDirection(raw: string) {
  if (!raw) return { vi: "---", han: "" };
  const found = DIRECTION_MAP[raw];
  if (found) return found;
  return { vi: raw, han: raw };
}

export function RightMetaphysicalWing() {
  const [deityData, setDeityData] = useState<any>(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  useEffect(() => {
    const solar = Solar.fromDate(new Date());
    const lunar = solar.getLunar();

    setDeityData({
      xiPos: formatDirection(lunar.getPositionXiDesc()),
      caiPos: formatDirection(lunar.getPositionCaiDesc()),
      fuPos: formatDirection(lunar.getPositionFuDesc()),
      chong: lunar.getChongDesc(),
      sha: lunar.getSha(),
      dayNaYin: lunar.getDayNaYin(),
    });
  }, []);

  return (
    <aside className="hidden xl:flex flex-col w-60 2xl:w-64 space-y-3.5 flex-shrink-0 select-none sticky top-20 h-fit">
      {/* 1. Quick AI Consultant Card */}
      <OrientalFrame
        variant="minimal"
        rounded="rounded-2xl"
        innerClassName="p-3.5 space-y-2.5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-[#175A67] text-xs font-serif font-bold">
            <Bot className="w-4 h-4 text-[#175A67]" />
            <span>Trợ Lý Diệu Toán AI</span>
          </div>
          <span className="font-han text-xs text-[#B83A32]">妙算</span>
        </div>

        <p className="text-[11px] text-[#2A444A] leading-relaxed">
          Khảo nghiệm 47 bộ cổ thư nguyên bản, đối chiếu cách cục và tham vấn chiến lược Xu Cát Tị Hung.
        </p>

        <button
          onClick={() => setIsAIChatOpen(true)}
          className="w-full py-2 px-3 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#FAF7F2] font-semibold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-tealGlow"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FAF7F2]" />
          <span>Mở Cửa Sổ Tham Vấn</span>
        </button>
      </OrientalFrame>

      {/* 2. Auspicious Directions & Gods */}
      {deityData && (
        <OrientalFrame
          variant="minimal"
          rounded="rounded-2xl"
          innerClassName="p-3.5 space-y-2.5"
        >
          <div className="flex items-center justify-between border-b border-[#175A67]/15 pb-1.5">
            <span className="text-xs font-mono font-bold text-[#175A67] flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Phương Vị Cát Thần</span>
            </span>
            <AuspiciousSeal text="吉方" subtext="" shape="circle" className="p-0.5 scale-90" />
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-[#3B585F] font-medium">Hỷ Thần (May Mắn):</span>
              <span className="text-[#1D6353] font-semibold">
                {deityData.xiPos.vi} <span className="font-han text-xs opacity-80">{deityData.xiPos.han}</span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#3B585F] font-medium">Tài Thần (Tài Lộc):</span>
              <span className="text-[#966F28] font-semibold">
                {deityData.caiPos.vi} <span className="font-han text-xs opacity-80">{deityData.caiPos.han}</span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#3B585F] font-medium">Phúc Thần (Bình An):</span>
              <span className="text-[#175A67] font-semibold">
                {deityData.fuPos.vi} <span className="font-han text-xs opacity-80">{deityData.fuPos.han}</span>
              </span>
            </div>
            <div className="pt-1.5 border-t border-[#175A67]/10 flex justify-between items-center text-[11px]">
              <span className="text-[#9E2A2B] font-medium">Phương Kỵ Tránh:</span>
              <span className="text-[#9E2A2B] font-semibold">
                Xung: {deityData.chong} • Sát: {deityData.sha}
              </span>
            </div>
          </div>
        </OrientalFrame>
      )}

      {/* 3. Security & Integrity Badge */}
      <OrientalFrame
        variant="minimal"
        rounded="rounded-2xl"
        innerClassName="p-3 text-[11px] text-[#345258] space-y-1"
      >
        <div className="flex items-center space-x-1.5 text-[#175A67] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1D6353]" />
          <span>Bảo Mật Lịch Số:</span>
        </div>
        <p className="text-[10px] text-[#5E777D] leading-tight">
          Dữ liệu tính toán khớp kín trên máy tính người dùng, bảo đảm an toàn thiên cơ.
        </p>
      </OrientalFrame>

      {/* AI Chat Modal */}
      <AIChatModal isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </aside>
  );
}
