"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { VIETNAM_34_PROVINCES, hourToTimeIndex } from "@/lib/astronomy/vietnamTrueSolarTime";
import { generateFortuneKline } from "@/lib/fortune/klineGenerator";
import { FortuneKlineChart } from "@/components/fortune/FortuneKlineChart";
import { OrientalFrame } from "@/components/decorations/OrientalFrame";
import { AuspiciousSeal } from "@/components/decorations/AuspiciousSeal";
import { AIChatModal } from "@/components/AIChatModal";
import {
  Sparkles,
  Scroll,
  Compass,
  MapPin,
  Clock,
  Printer,
  MessageSquareQuote,
  RefreshCw,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

function timeIndexToDefaultHour(timeParam: string | null): number {
  const map: Record<number, number> = {
    0: 0, 1: 2, 2: 4, 3: 6, 4: 8, 5: 10, 6: 12,
    7: 14, 8: 16, 9: 18, 10: 20, 11: 22, 12: 23,
  };
  const idx = Number(timeParam);
  return Number.isFinite(idx) && idx in map ? map[idx] : 8;
}

function HopLuanContent() {
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
  const initialName = searchParams.get("name") || "Gia Chủ Kỳ Thư";

  const [fullName, setFullName] = useState(initialName);
  const [solarDate, setSolarDate] = useState(initialDate);
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(0);
  const [gender, setGender] = useState<"male" | "female">(initialGender);
  const [provinceId, setProvinceId] = useState(initialProvinceId);
  const [useTrueSolarTime, setUseTrueSolarTime] = useState(true);

  const [baziData, setBaziData] = useState<any>(null);
  const [tuviData, setTuviData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const runDualVerification = async (
    targetDate = solarDate,
    targetHour = hour,
    targetMinute = minute,
    targetGender = gender,
    targetProvince = provinceId,
    targetUseTst = useTrueSolarTime
  ) => {
    setLoading(true);
    try {
      const [y, m, d] = targetDate.split("-").map(Number);

      // 1. Compute BaZi (with optional True Solar Time)
      const baziRes = await fetch("/api/bat-tu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: y,
          month: m,
          day: d,
          hour: targetHour,
          minute: targetMinute,
          gender: targetGender,
          provinceId: targetProvince,
          useTrueSolarTime: targetUseTst,
        }),
      });
      const baziJson = await baziRes.json();
      setBaziData(baziJson);

      // Determine exact adjusted date/timeIndex for ZiWei cross-verification
      const tst = baziJson?.trueSolarTime;
      const tvDate = tst ? tst.adjustedDateStr : targetDate;
      const tvTimeIdx = tst
        ? tst.adjustedTimeIndex
        : targetHour === 23
        ? 12
        : targetHour === 0
        ? 0
        : Math.floor((targetHour + 1) / 2);

      // 2. Compute ZiWei Dou Shu
      const tuviRes = await fetch("/api/tu-vi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          solarDate: tvDate,
          timeIndex: tvTimeIdx,
          gender: targetGender,
        }),
      });
      const tuviJson = await tuviRes.json();
      setTuviData(tuviJson);
    } catch (err) {
      console.error("Lỗi lập Song Kiếm Hợp Bích:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runDualVerification(initialDate, initialHour, 0, initialGender, initialProvinceId, true);
  }, [initialDate, initialHour, initialGender, initialProvinceId]);

  const klineCandles =
    baziData?.daYunList
      ? generateFortuneKline(
          baziData.daYunList,
          baziData.favorableElement || "",
          baziData.supportingElement || "",
          baziData.unfavorableElement || ""
        )
      : [];

  const soulPalace = tuviData?.palaces?.find((p: any) => p.isSoul || p.nameVi === "Mệnh") || tuviData?.palaces?.[0];

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Control & True Solar Time Banner */}
      <OrientalFrame
        variant="grand"
        rounded="rounded-2xl"
        className="print:hidden"
        innerClassName="p-6 sm:p-7 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#175A67]/15 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#966F28] flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Song Kiếm Hợp Bích • Tử Vi × Bát Tự × Biểu Đồ K-Line × 34 Tỉnh/TP Việt Nam</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#175A67] mt-1">
              Hợp Luận Mệnh Lý &amp; Biểu Đồ K-Line Đại Vận
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-[#EAE3DE] hover:bg-[#175A67] text-[#175A67] hover:text-[#EAE3DE] border border-[#175A67]/25 text-xs font-semibold transition-all flex items-center space-x-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In / Lưu Poster</span>
            </button>
            <button
              onClick={() => setIsAIChatOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#EAE3DE] text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-tealGlow"
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>AI Hợp Luận Chéo</span>
            </button>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
          <div className="lg:col-span-2">
            <label className="text-[#5E777D] font-medium block mb-1">Họ tên (hiển thị trên Poster)</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#EAE3DE]/55 border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] focus:outline-none focus:border-[#175A67]"
            />
          </div>

          <div>
            <label className="text-[#5E777D] font-medium block mb-1">Ngày sinh (Dương lịch)</label>
            <input
              type="date"
              value={solarDate}
              onChange={(e) => setSolarDate(e.target.value)}
              className="w-full bg-[#EAE3DE]/55 border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] focus:outline-none focus:border-[#175A67]"
            />
          </div>

          <div>
            <label className="text-[#5E777D] font-medium block mb-1">Giờ : Phút sinh</label>
            <div className="flex space-x-1.5">
              <input
                type="number"
                min={0}
                max={23}
                value={hour}
                onChange={(e) => setHour(Math.max(0, Math.min(23, Number(e.target.value))))}
                className="w-1/2 bg-[#EAE3DE]/55 border border-[#175A67]/25 rounded-xl px-2.5 py-2 text-[#12343B] text-center focus:outline-none focus:border-[#175A67]"
                aria-label="Giờ sinh"
              />
              <input
                type="number"
                min={0}
                max={59}
                value={minute}
                onChange={(e) => setMinute(Math.max(0, Math.min(59, Number(e.target.value))))}
                className="w-1/2 bg-[#EAE3DE]/55 border border-[#175A67]/25 rounded-xl px-2.5 py-2 text-[#12343B] text-center focus:outline-none focus:border-[#175A67]"
                aria-label="Phút sinh"
              />
            </div>
          </div>

          <div>
            <label className="text-[#5E777D] font-medium block mb-1">Giới tính</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as "male" | "female")}
              className="w-full bg-[#EAE3DE]/55 border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] focus:outline-none focus:border-[#175A67]"
            >
              <option value="male">Nam Mệnh</option>
              <option value="female">Nữ Mệnh</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => runDualVerification()}
              disabled={loading}
              className="w-full py-2 px-3 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#EAE3DE] font-semibold flex items-center justify-center space-x-1.5 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Hợp Luận</span>
            </button>
          </div>
        </div>

        {/* 34 Provinces + True Solar Time Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#175A67]/12 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center space-x-2 cursor-pointer text-[#175A67] font-semibold">
              <input
                type="checkbox"
                checked={useTrueSolarTime}
                onChange={(e) => setUseTrueSolarTime(e.target.checked)}
                className="rounded accent-[#175A67]"
              />
              <Clock className="w-3.5 h-3.5" />
              <span>Hiệu chỉnh Chân Thái Dương Thời (NOAA)</span>
            </label>

            <div className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#966F28]" />
              <select
                value={provinceId}
                onChange={(e) => setProvinceId(e.target.value)}
                disabled={!useTrueSolarTime}
                className="bg-[#EAE3DE]/70 border border-[#175A67]/25 rounded-lg px-2.5 py-1 text-xs text-[#12343B] disabled:opacity-50"
              >
                {VIETNAM_34_PROVINCES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.lng.toFixed(1)}°E){p.aliases ? ` — gồm ${p.aliases.slice(0, 2).join(", ")}` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {baziData?.trueSolarTime && (
            <div className="px-3 py-1 rounded-full bg-[#175A67]/10 text-[#175A67] font-mono text-[11px]">
              Giờ gốc {baziData.trueSolarTime.originalTimeStr} → Chân Thái Dương{" "}
              <strong>{baziData.trueSolarTime.trueSolarTimeStr}</strong> (
              {baziData.trueSolarTime.totalOffsetMin >= 0 ? "+" : ""}
              {baziData.trueSolarTime.totalOffsetMin} phút)
              {baziData.trueSolarTime.hourBranchChanged && (
                <span className="ml-1.5 text-[#B83A32] font-bold">• Đổi canh giờ!</span>
              )}
            </div>
          )}
        </div>
      </OrientalFrame>

      {/* ZONGHE POSTER — Printable Dual-Verification Report Card */}
      {baziData && tuviData && (
        <OrientalFrame
          variant="grand"
          rounded="rounded-3xl"
          className="animate-scroll-unfurl"
          innerClassName="p-6 sm:p-9 space-y-7"
        >
          {/* Poster Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#175A67]/20 pb-5">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#966F28]">
                Kỳ Thư Cổ Môn • Bản Đồ Mệnh Lý Song Kiếm Hợp Bích
              </div>
              <h2 className="text-3xl sm:text-4xl font-calligraphy font-bold text-[#175A67] mt-1">
                {fullName}
              </h2>
              <div className="text-xs text-[#345258] font-mono mt-1">
                Dương lịch: {baziData.solarDate} • Âm lịch: {baziData.lunarDate} • {baziData.gender} Mệnh
              </div>
            </div>
            <AuspiciousSeal text="双剑" subtext="HỢP BÍCH" shape="square" />
          </div>

          {/* Dual Verification Side-by-Side (Tử Vi vs Bát Tự) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ZiWei Summary */}
            <div className="p-5 rounded-2xl bg-[#EAE3DE]/50 border border-[#175A67]/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-[#175A67] flex items-center space-x-1.5">
                  <Compass className="w-4 h-4" />
                  <span>Hệ 1: Tử Vi Đẩu Số (iztro)</span>
                </span>
                <span className="font-han text-base text-[#966F28]">紫微斗数</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-[#F8F4F0] border border-[#175A67]/12">
                  <span className="text-[#5E777D] block text-[10px]">Ngũ Hành Cục</span>
                  <strong className="text-[#175A67]">{tuviData.fiveElementsClass}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8F4F0] border border-[#175A67]/12">
                  <span className="text-[#5E777D] block text-[10px]">Mệnh Chủ / Thân Chủ</span>
                  <strong className="text-[#175A67]">
                    {tuviData.soul} / {tuviData.body}
                  </strong>
                </div>
              </div>

              {soulPalace && (
                <div className="p-3 rounded-xl bg-[#F8F4F0] border border-[#175A67]/15 text-xs space-y-1">
                  <div className="font-semibold text-[#175A67]">
                    Cung Mệnh tại {soulPalace.earthlyBranchVi} ({soulPalace.heavenlyStemVi} {soulPalace.earthlyBranchVi}):
                  </div>
                  <div className="text-[#345258]">
                    Chính tinh:{" "}
                    <strong>
                      {soulPalace.majorStars?.length
                        ? soulPalace.majorStars.map((s: any) => s.nameVi).join(", ")
                        : "Vô Chính Diệu (mượn đối cung Thiên Di)"}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            {/* BaZi Summary */}
            <div className="p-5 rounded-2xl bg-[#EAE3DE]/50 border border-[#175A67]/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-[#1D6353] flex items-center space-x-1.5">
                  <Scroll className="w-4 h-4" />
                  <span>Hệ 2: Tứ Trụ Bát Tự (Tử Bình)</span>
                </span>
                <span className="font-han text-base text-[#966F28]">四柱八字</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-[#F8F4F0] border border-[#175A67]/12">
                  <span className="text-[#5E777D] block text-[10px]">Nhật Chủ &amp; Vượng Suy</span>
                  <strong className="text-[#175A67]">
                    {baziData.dayMaster?.ganVi} {baziData.dayMaster?.element} ({baziData.strengthStatus})
                  </strong>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8F4F0] border border-[#175A67]/12">
                  <span className="text-[#5E777D] block text-[10px]">Cách Cục Định Vị</span>
                  <strong className="text-[#966F28]">{baziData.enrichment?.geJu?.name || baziData.patternName}</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F4F0] border border-[#175A67]/15 text-xs flex flex-wrap gap-3">
                <span>
                  Dụng Thần: <strong className="text-[#1D6353]">{baziData.favorableElement}</strong>
                </span>
                <span>
                  Hỷ Thần: <strong className="text-[#175A67]">{baziData.supportingElement}</strong>
                </span>
                <span>
                  Kỵ Thần: <strong className="text-[#9B2921]">{baziData.unfavorableElement}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* K-Line Fortune Chart (Phase 3) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F8F4F0] border border-[#175A67]/20 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-[#175A67]" />
                <h3 className="font-serif font-bold text-lg text-[#175A67]">
                  Biểu Đồ Nến K-Line Vận Mệnh Theo 8 Đại Vận (0 – 90 Tuổi)
                </h3>
              </div>
              <div className="flex items-center space-x-3 text-[11px] font-mono">
                <span className="flex items-center space-x-1 text-[#1D6353]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#1D6353] inline-block" />
                  <span>Vượng Khí (Tăng)</span>
                </span>
                <span className="flex items-center space-x-1 text-[#B83A32]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#B83A32] inline-block" />
                  <span>Phòng Thủ (Giảm)</span>
                </span>
              </div>
            </div>
            <FortuneKlineChart candles={klineCandles} />
          </div>

          {/* Enrichment Synthesis Highlights */}
          {baziData.enrichment && (
            <div className="p-4 rounded-2xl bg-[#175A67]/[0.05] border border-[#175A67]/20 text-xs text-[#12343B] space-y-2">
              <div className="font-semibold text-[#175A67] flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1D6353]" />
                <span>Tổng Hợp Đối Chiếu Cổ Thư (Cùng Thông Bảo Giám • Tử Bình Chân Thuyên):</span>
              </div>
              <p className="leading-relaxed text-[#345258]">
                <strong>Cách cục:</strong> {baziData.enrichment.geJu.description} • <strong>Điều hầu:</strong>{" "}
                {baziData.enrichment.tiaoHou.explanation}
              </p>
            </div>
          )}
        </OrientalFrame>
      )}

      {/* AI Chat Modal with Dual Data */}
      <AIChatModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        systemType="bat-tu"
        chartData={{
          mode: "Song Kiếm Hợp Bích (Đối chiếu chéo Tử Vi + Bát Tự)",
          bazi: baziData,
          ziweiSummary: {
            fiveElementsClass: tuviData?.fiveElementsClass,
            soul: tuviData?.soul,
            body: tuviData?.body,
            soulPalace,
          },
          kline: klineCandles,
        }}
      />
    </div>
  );
}

export default function HopLuanPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-[#175A67]">Đang tải Song Kiếm Hợp Bích...</div>}>
      <HopLuanContent />
    </Suspense>
  );
}
