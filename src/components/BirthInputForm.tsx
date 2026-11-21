"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  VIETNAM_34_PROVINCES,
  calculateVietnamTrueSolarTime,
  hourToTimeIndex,
  TrueSolarTimeResult,
} from "@/lib/astronomy/vietnamTrueSolarTime";
import {
  getLunarLeapMonth,
  convertLunarToSolarDate,
  SolarTermBoundaryWarning,
} from "@/lib/astronomy/solarTermGuard";
import { RefreshCw, Calendar, Clock, MapPin, AlertTriangle, Sun } from "lucide-react";

export interface BirthInputPayload {
  solarDate: string; // Always resolved to YYYY-MM-DD (after Lunar conversion & True Solar Time if enabled)
  rawSolarDate: string; // Solar date before True Solar Time shift
  hour: number; // Effective hour (after True Solar Time if enabled)
  minute: number; // Effective minute
  timeIndex: number; // 0 (Tảo Tý) .. 11 (Hợi), 12 (Vãn Tý)
  gender: "male" | "female";
  provinceId: string;
  useTrueSolarTime: boolean;
  sect: 1 | 2;
  calendarType: "solar" | "lunar";
  isLeapMonth: boolean;
  trueSolarTime: TrueSolarTimeResult | null;
}

interface BirthInputFormProps {
  initialSolarDate?: string;
  initialHour?: number;
  initialMinute?: number;
  initialGender?: "male" | "female";
  initialProvinceId?: string;
  initialUseTrueSolarTime?: boolean;
  initialSect?: 1 | 2;
  showSectSelector?: boolean;
  submitLabel?: string;
  accentVariant?: "teal" | "emerald";
  boundaryWarning?: SolarTermBoundaryWarning | null;
  onSubmit: (payload: BirthInputPayload) => void;
}

const TIME_BRANCH_OPTIONS = [
  { value: 0, label: "Tảo Tý (00h - 01h)", defaultHour: 0 },
  { value: 1, label: "Sửu (01h - 03h)", defaultHour: 2 },
  { value: 2, label: "Dần (03h - 05h)", defaultHour: 4 },
  { value: 3, label: "Mão (05h - 07h)", defaultHour: 6 },
  { value: 4, label: "Thìn (07h - 09h)", defaultHour: 8 },
  { value: 5, label: "Tỵ (09h - 11h)", defaultHour: 10 },
  { value: 6, label: "Ngọ (11h - 13h)", defaultHour: 12 },
  { value: 7, label: "Mùi (13h - 15h)", defaultHour: 14 },
  { value: 8, label: "Thân (15h - 17h)", defaultHour: 16 },
  { value: 9, label: "Dậu (17h - 19h)", defaultHour: 18 },
  { value: 10, label: "Tuất (19h - 21h)", defaultHour: 20 },
  { value: 11, label: "Hợi (21h - 23h)", defaultHour: 22 },
  { value: 12, label: "Vãn Tý (23h - 00h)", defaultHour: 23 },
];

export function BirthInputForm({
  initialSolarDate = "1988-04-16",
  initialHour = 8,
  initialMinute = 0,
  initialGender = "male",
  initialProvinceId = "ha-noi",
  initialUseTrueSolarTime = false,
  initialSect = 2,
  showSectSelector = false,
  submitLabel = "Lập Lá Số",
  accentVariant = "teal",
  boundaryWarning = null,
  onSubmit,
}: BirthInputFormProps) {
  const [calendarType, setCalendarType] = useState<"solar" | "lunar">("solar");
  const [solarDate, setSolarDate] = useState(initialSolarDate);

  // Lunar input states
  const [lunarYear, setLunarYear] = useState(() => Number(initialSolarDate.split("-")[0]) || 1988);
  const [lunarMonth, setLunarMonth] = useState(() => Number(initialSolarDate.split("-")[1]) || 3);
  const [lunarDay, setLunarDay] = useState(() => Number(initialSolarDate.split("-")[2]) || 1);
  const [isLeapMonth, setIsLeapMonth] = useState(false);

  // Time & Gender
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);
  const [gender, setGender] = useState<"male" | "female">(initialGender);

  // True Solar Time (34 Vietnam Provinces) & Sect
  const [provinceId, setProvinceId] = useState(initialProvinceId);
  const [useTrueSolarTime, setUseTrueSolarTime] = useState(initialUseTrueSolarTime);
  const [sect, setSect] = useState<1 | 2>(initialSect);
  const [lunarError, setLunarError] = useState<string | null>(null);

  const leapMonthOfYear = useMemo(() => getLunarLeapMonth(lunarYear), [lunarYear]);

  // Preview resolved solar date when Lunar mode is active
  const resolvedBaseSolarDate = useMemo(() => {
    if (calendarType === "solar") return solarDate;
    try {
      const effectiveLeap = isLeapMonth && leapMonthOfYear === lunarMonth;
      return convertLunarToSolarDate(lunarYear, lunarMonth, lunarDay, effectiveLeap);
    } catch {
      return null;
    }
  }, [calendarType, solarDate, lunarYear, lunarMonth, lunarDay, isLeapMonth, leapMonthOfYear]);

  // Live preview of True Solar Time
  const trueSolarPreview = useMemo(() => {
    if (!useTrueSolarTime || !resolvedBaseSolarDate) return null;
    try {
      return calculateVietnamTrueSolarTime(resolvedBaseSolarDate, hour, minute, provinceId);
    } catch {
      return null;
    }
  }, [useTrueSolarTime, resolvedBaseSolarDate, hour, minute, provinceId]);

  const handleSubmit = () => {
    setLunarError(null);
    let baseSolar = solarDate;
    const effectiveLeap = calendarType === "lunar" && isLeapMonth && leapMonthOfYear === lunarMonth;

    if (calendarType === "lunar") {
      try {
        baseSolar = convertLunarToSolarDate(lunarYear, lunarMonth, lunarDay, effectiveLeap);
      } catch {
        setLunarError("Ngày Âm lịch không hợp lệ (ví dụ: tháng thiếu chỉ có 29 ngày).");
        return;
      }
    }

    let effSolar = baseSolar;
    let effHour = hour;
    let effMinute = minute;
    let effTimeIndex = hourToTimeIndex(hour);
    let tst: TrueSolarTimeResult | null = null;

    if (useTrueSolarTime) {
      tst = calculateVietnamTrueSolarTime(baseSolar, hour, minute, provinceId);
      effSolar = tst.adjustedDateStr;
      effHour = tst.adjustedHour;
      effMinute = tst.adjustedMinute;
      effTimeIndex = tst.adjustedTimeIndex;
    }

    onSubmit({
      solarDate: effSolar,
      rawSolarDate: baseSolar,
      hour: effHour,
      minute: effMinute,
      timeIndex: effTimeIndex,
      gender,
      provinceId,
      useTrueSolarTime,
      sect,
      calendarType,
      isLeapMonth: effectiveLeap,
      trueSolarTime: tst,
    });
  };

  const focusClass =
    accentVariant === "emerald"
      ? "focus:border-[#1D6353] focus:ring-[#1D6353]/25"
      : "focus:border-[#175A67] focus:ring-[#175A67]/25";

  const buttonClass =
    accentVariant === "emerald"
      ? "bg-[#1D6353] hover:bg-[#144A3E] text-[#F8F4F0]"
      : "bg-[#175A67] hover:bg-[#0F454F] text-[#F8F4F0]";

  return (
    <div className="space-y-4 text-xs">
      {/* Row 1: Calendar Mode Switcher + True Solar Time Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#175A67]/15">
        <div className="inline-flex rounded-xl bg-[#EAE3DE]/80 p-0.5 border border-[#175A67]/20">
          <button
            type="button"
            onClick={() => {
              setCalendarType("solar");
              setLunarError(null);
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
              calendarType === "solar"
                ? "bg-[#175A67] text-[#F8F4F0] shadow-sm"
                : "text-[#345258] hover:text-[#175A67]"
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Dương Lịch</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setCalendarType("lunar");
              setLunarError(null);
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
              calendarType === "lunar"
                ? "bg-[#175A67] text-[#F8F4F0] shadow-sm"
                : "text-[#345258] hover:text-[#175A67]"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Âm Lịch (Hỗ trợ Tháng Nhuận)</span>
          </button>
        </div>

        <label className="inline-flex items-center space-x-2 cursor-pointer select-none px-3 py-1.5 rounded-xl bg-[#EAE3DE]/70 border border-[#175A67]/20 text-[#12343B]">
          <input
            type="checkbox"
            checked={useTrueSolarTime}
            onChange={(e) => setUseTrueSolarTime(e.target.checked)}
            className="rounded border-[#175A67]/40 text-[#175A67] focus:ring-[#175A67]"
          />
          <span className="font-medium">Hiệu chỉnh Chân Thái Dương Thời (NOAA)</span>
        </label>
      </div>

      {/* Row 2: Main Birth Date, Time, Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {calendarType === "solar" ? (
          <div>
            <label className="text-[#5E777D] font-medium block mb-1">Ngày sinh (Dương lịch)</label>
            <input
              type="date"
              value={solarDate}
              onChange={(e) => setSolarDate(e.target.value)}
              className={`w-full bg-[#F8F4F0] border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] focus:outline-none focus:ring-1 ${focusClass}`}
            />
          </div>
        ) : (
          <div className="sm:col-span-2 lg:col-span-2 space-y-1.5">
            <label className="text-[#5E777D] font-medium block">
              Ngày sinh (Âm lịch)
              {resolvedBaseSolarDate && (
                <span className="ml-2 font-mono text-[11px] text-[#175A67]">
                  → Dương lịch: {resolvedBaseSolarDate}
                </span>
              )}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                min={1900}
                max={2100}
                value={lunarYear}
                onChange={(e) => {
                  const y = Number(e.target.value);
                  setLunarYear(y);
                  const lm = getLunarLeapMonth(y);
                  if (lm === 0 || lm !== lunarMonth) setIsLeapMonth(false);
                }}
                placeholder="Năm"
                className={`w-full bg-[#F8F4F0] border border-[#175A67]/25 rounded-xl px-2.5 py-2 text-[#12343B] focus:outline-none focus:ring-1 ${focusClass}`}
              />
              <select
                value={lunarMonth}
                onChange={(e) => {
                  const m = Number(e.target.value);
                  setLunarMonth(m);
                  if (leapMonthOfYear !== m) setIsLeapMonth(false);
                }}
                className={`w-full bg-[#F8F4F0] border border-[#175A67]/25 rounded-xl px-2 py-2 text-[#12343B] focus:outline-none focus:ring-1 ${focusClass}`}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    Tháng {m}
                    {leapMonthOfYear === m ? " (Có nhuận)" : ""}
                  </option>
                ))}
              </select>
              <select
                value={lunarDay}
                onChange={(e) => setLunarDay(Number(e.target.value))}
                className={`w-full bg-[#F8F4F0] border border-[#175A67]/25 rounded-xl px-2 py-2 text-[#12343B] focus:outline-none focus:ring-1 ${focusClass}`}
              >
                {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    Ngày {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Leap month checkbox — ONLY shown when that lunar year actually has a leap month */}
            {leapMonthOfYear > 0 && (
              <label className="inline-flex items-center space-x-2 pt-0.5 text-[11px] text-[#9E2A2B] font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={isLeapMonth && leapMonthOfYear === lunarMonth}
                  disabled={leapMonthOfYear !== lunarMonth}
                  onChange={(e) => setIsLeapMonth(e.target.checked)}
                  className="rounded border-[#9E2A2B]/50 text-[#9E2A2B] focus:ring-[#9E2A2B]"
                />
                <span>
                  Tháng Nhuận (Năm {lunarYear} nhuận tháng {leapMonthOfYear} Âm lịch
                  {leapMonthOfYear !== lunarMonth ? ` — chọn Tháng ${leapMonthOfYear} để tích` : ""})
                </span>
              </label>
            )}
          </div>
        )}

        {/* Hour & Minute (Synced with Canh Giờ) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[#5E777D] font-medium flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Giờ sinh ({TIME_BRANCH_OPTIONS[hourToTimeIndex(hour)]?.label})</span>
            </label>
            <Link
              href="/dinh-gio-sinh"
              className="text-[10px] text-[#966F28] hover:text-[#175A67] underline font-medium"
            >
              Chưa rõ giờ?
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <input
              type="number"
              min={0}
              max={23}
              value={hour}
              onChange={(e) => setHour(Math.max(0, Math.min(23, Number(e.target.value) || 0)))}
              aria-label="Giờ sinh"
              className={`w-full bg-[#F8F4F0] border border-[#175A67]/25 rounded-xl px-2.5 py-2 text-[#12343B] focus:outline-none focus:ring-1 ${focusClass}`}
            />
            <input
              type="number"
              min={0}
              max={59}
              value={minute}
              onChange={(e) => setMinute(Math.max(0, Math.min(59, Number(e.target.value) || 0)))}
              aria-label="Phút sinh"
              placeholder="Phút"
              className={`w-full bg-[#F8F4F0] border border-[#175A67]/25 rounded-xl px-2.5 py-2 text-[#12343B] focus:outline-none focus:ring-1 ${focusClass}`}
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="text-[#5E777D] font-medium block mb-1">Giới tính</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "male" | "female")}
            className={`w-full bg-[#F8F4F0] border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] focus:outline-none focus:ring-1 ${focusClass}`}
          >
            <option value="male">Nam Mệnh</option>
            <option value="female">Nữ Mệnh</option>
          </select>
        </div>

        {/* Submit button (moves nicely if Lunar takes 2 cols) */}
        {calendarType === "solar" && (
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleSubmit}
              className={`w-full py-2.5 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-1.5 shadow-sm ${buttonClass}`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{submitLabel}</span>
            </button>
          </div>
        )}
      </div>

      {/* Row 3: True Solar Time Province (34 Provinces) & Optional Sect Selector */}
      {(useTrueSolarTime || showSectSelector || calendarType === "lunar") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {useTrueSolarTime && (
            <div>
              <label className="text-[#5E777D] font-medium flex items-center space-x-1 mb-1">
                <MapPin className="w-3 h-3" />
                <span>Nơi sinh (34 Tỉnh/TP Việt Nam)</span>
              </label>
              <select
                value={provinceId}
                onChange={(e) => setProvinceId(e.target.value)}
                className={`w-full bg-[#F8F4F0] border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] focus:outline-none focus:ring-1 ${focusClass}`}
              >
                {VIETNAM_34_PROVINCES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.lng.toFixed(2)}°E)
                  </option>
                ))}
              </select>
            </div>
          )}

          {showSectSelector && (
            <div>
              <label className="text-[#5E777D] font-medium block mb-1">
                Quy tắc Giờ Vãn Tý (23h00 - 23h59)
              </label>
              <select
                value={sect}
                onChange={(e) => setSect(Number(e.target.value) as 1 | 2)}
                className={`w-full bg-[#F8F4F0] border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] focus:outline-none focus:ring-1 ${focusClass}`}
              >
                <option value={2}>Phái 2 (Mặc định): Giữ nguyên Trụ Ngày, đổi Trụ Giờ</option>
                <option value={1}>Phái 1: Sang Trụ Ngày hôm sau từ 23h00</option>
              </select>
            </div>
          )}

          {calendarType === "lunar" && (
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleSubmit}
                className={`w-full py-2.5 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-1.5 shadow-sm ${buttonClass}`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{submitLabel}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* True Solar Time Live Preview */}
      {trueSolarPreview && (
        <div className="px-3.5 py-2.5 rounded-xl bg-[#EAE3DE]/75 border border-[#175A67]/20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#12343B]">
          <div>
            <strong className="text-[#175A67]">Chân Thái Dương Thời ({trueSolarPreview.provinceName}):</strong>{" "}
            {trueSolarPreview.originalTimeStr} →{" "}
            <strong className="font-mono text-[#175A67]">{trueSolarPreview.trueSolarTimeStr}</strong>{" "}
            <span className="text-[#5E777D]">
              (Lệch {trueSolarPreview.totalOffsetMin >= 0 ? `+${trueSolarPreview.totalOffsetMin}` : trueSolarPreview.totalOffsetMin} phút
              | Kinh độ {trueSolarPreview.longitudeOffsetMin >= 0 ? `+${trueSolarPreview.longitudeOffsetMin}` : trueSolarPreview.longitudeOffsetMin}p,
              EoT {trueSolarPreview.equationOfTimeMin >= 0 ? `+${trueSolarPreview.equationOfTimeMin}` : trueSolarPreview.equationOfTimeMin}p)
            </span>
          </div>
          {trueSolarPreview.hourBranchChanged && (
            <span className="px-2 py-0.5 rounded-full bg-[#9E2A2B]/15 text-[#9E2A2B] font-semibold border border-[#9E2A2B]/30">
              Đổi Canh Giờ sau hiệu chỉnh
            </span>
          )}
        </div>
      )}

      {/* Lunar Conversion Error */}
      {lunarError && (
        <div className="px-3.5 py-2.5 rounded-xl bg-[#9E2A2B]/10 border border-[#9E2A2B]/35 text-[#9E2A2B] flex items-center space-x-2 text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{lunarError}</span>
        </div>
      )}

      {/* Solar Term Boundary Warning Banner (Mực Chu Sa #9E2A2B) */}
      {boundaryWarning && (
        <div className="px-4 py-3 rounded-xl bg-[#9E2A2B]/8 border border-[#9E2A2B]/40 text-[#9E2A2B] flex items-start space-x-2.5 text-xs leading-relaxed">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#9E2A2B]" />
          <div>
            <div className="font-serif font-bold uppercase tracking-wide text-[11px] mb-0.5">
              Cảnh Báo Giao Tiết Khí ({boundaryWarning.termNameVi} — {boundaryWarning.termNameZh})
              {boundaryWarning.isYearBoundary && " • Ranh Giới Giao Niên"}
            </div>
            <p className="text-[#6B1D1E]">{boundaryWarning.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
