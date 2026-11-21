"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { computeTuViAstrolabe, AstrolabeResult, PalaceData } from "@/lib/tu-vi/tuviService";
import { checkSolarTermBoundary, SolarTermBoundaryWarning } from "@/lib/astronomy/solarTermGuard";
import { hourToTimeIndex } from "@/lib/astronomy/vietnamTrueSolarTime";
import { AstrolabeGrid } from "@/components/tu-vi/AstrolabeGrid";
import { AIChatModal } from "@/components/AIChatModal";
import { BirthInputForm, BirthInputPayload } from "@/components/BirthInputForm";
import { OrientalFrame } from "@/components/decorations/OrientalFrame";
import { Sparkles, MessageSquareQuote } from "lucide-react";

function timeIndexToDefaultHour(timeParam: string | null): number {
  const map: Record<number, number> = {
    0: 0, 1: 2, 2: 4, 3: 6, 4: 8, 5: 10, 6: 12,
    7: 14, 8: 16, 9: 18, 10: 20, 11: 22, 12: 23,
  };
  const idx = Number(timeParam);
  return Number.isFinite(idx) && idx in map ? map[idx] : 8;
}

function TuViContent() {
  const searchParams = useSearchParams();

  const initialDate = searchParams.get("date") || "1988-04-16";
  const timeParam = searchParams.get("time");
  const hourParam = searchParams.get("hour");

  let initialHour = 8;
  let initialTimeIndex = 4;
  if (timeParam !== null) {
    const t = Number(timeParam);
    if (!isNaN(t) && t >= 0 && t <= 12) {
      initialTimeIndex = t;
      initialHour = timeIndexToDefaultHour(timeParam);
    }
  } else if (hourParam !== null) {
    const h = Number(hourParam);
    if (!isNaN(h)) {
      initialHour = Math.max(0, Math.min(23, h));
      initialTimeIndex = hourToTimeIndex(initialHour);
    }
  }

  const initialGender = (searchParams.get("gender") as "male" | "female") || "male";
  const initialProvinceId = searchParams.get("province") || searchParams.get("provinceId") || "ha-noi";

  const [astrolabe, setAstrolabe] = useState<AstrolabeResult | null>(null);
  const [boundaryWarning, setBoundaryWarning] = useState<SolarTermBoundaryWarning | null>(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const computeChart = (solarDate: string, timeIndex: number, hour: number, minute: number, gender: "male" | "female") => {
    try {
      const res = computeTuViAstrolabe(solarDate, timeIndex, gender);
      setAstrolabe(res);
      const parts = solarDate.split("-").map(Number);
      if (parts.length === 3) {
        setBoundaryWarning(checkSolarTermBoundary(parts[0], parts[1], parts[2], hour, minute));
      } else {
        setBoundaryWarning(null);
      }
    } catch (e: any) {
      alert("Lỗi tính lá số: " + e.message);
    }
  };

  useEffect(() => {
    computeChart(initialDate, initialTimeIndex, initialHour, 0, initialGender);
  }, [initialDate, initialTimeIndex, initialHour, initialGender]);

  const handleFormSubmit = (payload: BirthInputPayload) => {
    computeChart(payload.solarDate, payload.timeIndex, payload.hour, payload.minute, payload.gender);
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
            <div className="text-xs uppercase font-mono tracking-wider text-[#A98A55] flex items-center space-x-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chính Tông Tam Hợp &amp; Phi Tinh Tứ Hóa</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#175A67]">
              Lập Lá Số Tử Vi Đẩu Số
            </h1>
          </div>

          <button
            onClick={() => setIsAIChatOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#FAF7F2] font-semibold text-xs sm:text-sm transition-all flex items-center space-x-2 shadow-tealGlow"
          >
            <MessageSquareQuote className="w-4 h-4 text-[#FAF7F2]" />
            <span>Thầy Tử Vi AI Luận Giải</span>
          </button>
        </div>

        <BirthInputForm
          initialSolarDate={initialDate}
          initialHour={initialHour}
          initialMinute={0}
          initialGender={initialGender}
          initialProvinceId={initialProvinceId}
          showSectSelector={false}
          submitLabel="An Sao Lại Lá Số"
          accentVariant="teal"
          boundaryWarning={boundaryWarning}
          onSubmit={handleFormSubmit}
        />
      </OrientalFrame>

      {/* Render Astrolabe Grid */}
      {astrolabe && (
        <AstrolabeGrid
          data={astrolabe}
          onAskAI={(palace: PalaceData) => setIsAIChatOpen(true)}
        />
      )}

      {/* AI Chat Consultation Modal */}
      {astrolabe && (
        <AIChatModal
          isOpen={isAIChatOpen}
          onClose={() => setIsAIChatOpen(false)}
          systemType="tu-vi"
          chartData={astrolabe}
        />
      )}
    </div>
  );
}

export default function TuViPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-oriental-gold">Đang nạp dữ liệu lá số Tử Vi...</div>}>
      <TuViContent />
    </Suspense>
  );
}
