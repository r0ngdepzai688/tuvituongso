"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { computeBaZi, BaZiResult } from "@/lib/bat-tu/baziService";
import { BaZiChart } from "@/components/bat-tu/BaZiChart";
import { AIChatModal } from "@/components/AIChatModal";
import { BirthInputForm, BirthInputPayload } from "@/components/BirthInputForm";
import { OrientalFrame } from "@/components/decorations/OrientalFrame";
import { Scroll, MessageSquareQuote } from "lucide-react";

function timeIndexToDefaultHour(timeParam: string | null): number {
  const map: Record<number, number> = {
    0: 0, 1: 2, 2: 4, 3: 6, 4: 8, 5: 10, 6: 12,
    7: 14, 8: 16, 9: 18, 10: 20, 11: 22, 12: 23,
  };
  const idx = Number(timeParam);
  return Number.isFinite(idx) && idx in map ? map[idx] : 8;
}

function BaZiContent() {
  const searchParams = useSearchParams();

  const initialDate = searchParams.get("date") || "1988-04-16";
  const timeParam = searchParams.get("time");
  const hourParam = searchParams.get("hour");

  let initialHour = 8;
  if (hourParam !== null) {
    const h = Number(hourParam);
    if (!isNaN(h)) initialHour = Math.max(0, Math.min(23, h));
  } else if (timeParam !== null) {
    initialHour = timeIndexToDefaultHour(timeParam);
  }

  const initialGender = (searchParams.get("gender") as "male" | "female") || "male";
  const initialProvinceId = searchParams.get("province") || searchParams.get("provinceId") || "ha-noi";
  const initialSect = (Number(searchParams.get("sect")) as 1 | 2) || 2;

  const [baziData, setBaziData] = useState<BaZiResult | null>(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const computeFromPayload = (payload: {
    solarDate: string;
    hour: number;
    minute: number;
    gender: "male" | "female";
    sect: 1 | 2;
  }) => {
    try {
      const parts = payload.solarDate.split("-").map(Number);
      if (parts.length === 3) {
        const res = computeBaZi(
          parts[0],
          parts[1],
          parts[2],
          payload.hour,
          payload.gender,
          payload.sect,
          payload.minute
        );
        setBaziData(res);
      }
    } catch (e: any) {
      alert("Lỗi tính Bát Tự: " + e.message);
    }
  };

  useEffect(() => {
    computeFromPayload({
      solarDate: initialDate,
      hour: initialHour,
      minute: 0,
      gender: initialGender,
      sect: initialSect,
    });
  }, [initialDate, initialHour, initialGender, initialSect]);

  const handleFormSubmit = (payload: BirthInputPayload) => {
    computeFromPayload({
      solarDate: payload.solarDate,
      hour: payload.hour,
      minute: payload.minute,
      gender: payload.gender,
      sect: payload.sect,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Unified BirthInputForm */}
      <OrientalFrame
        variant="standard"
        cornerStyle="huiwen"
        rounded="rounded-2xl"
        innerClassName="p-5 sm:p-6 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#175A67]/15 pb-3">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-[#1D6353] flex items-center space-x-1.5 font-bold">
              <Scroll className="w-3.5 h-3.5" />
              <span>Tử Bình Chính Tông • Trọng Số Nhật Chủ &amp; Ngoại Cách</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#175A67]">
              Tứ Trụ Bát Tự &amp; Ngũ Hành Khai Vận
            </h1>
          </div>

          <button
            onClick={() => setIsAIChatOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#FAF7F2] font-semibold text-xs sm:text-sm transition-all flex items-center space-x-2 shadow-tealGlow"
          >
            <MessageSquareQuote className="w-4 h-4 text-[#FAF7F2]" />
            <span>Thầy Bát Tự AI Luận Giải</span>
          </button>
        </div>

        <BirthInputForm
          initialSolarDate={initialDate}
          initialHour={initialHour}
          initialMinute={0}
          initialGender={initialGender}
          initialProvinceId={initialProvinceId}
          initialSect={initialSect}
          showSectSelector={true}
          submitLabel="Tính Lại Bát Tự"
          accentVariant="emerald"
          boundaryWarning={baziData?.boundaryWarning ?? null}
          onSubmit={handleFormSubmit}
        />
      </OrientalFrame>

      {/* Render BaZi Chart */}
      {baziData && <BaZiChart data={baziData} />}

      {/* AI Chat Consultation Modal */}
      {baziData && (
        <AIChatModal
          isOpen={isAIChatOpen}
          onClose={() => setIsAIChatOpen(false)}
          systemType="bat-tu"
          chartData={baziData}
        />
      )}
    </div>
  );
}

export default function BaZiPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-[#1D6353]">Đang tính toán Tứ Trụ Bát Tự...</div>}>
      <BaZiContent />
    </Suspense>
  );
}
