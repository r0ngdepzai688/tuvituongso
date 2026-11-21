"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  buildCandidateHourProfiles,
  generateRectificationQuestions,
  scoreCandidateHours,
  CandidateHourProfile,
  RectificationQuestion,
  RectificationReport,
} from "@/lib/astronomy/birthTimeRectifier";
import { VIETNAM_34_PROVINCES } from "@/lib/astronomy/vietnamTrueSolarTime";
import { OrientalFrame } from "@/components/decorations/OrientalFrame";
import { ChineseCloudDivider } from "@/components/decorations/XiangyunCloud";
import { AuspiciousSeal } from "@/components/decorations/AuspiciousSeal";
import {
  Clock,
  Sparkles,
  Scroll,
  TrendingUp,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Compass,
} from "lucide-react";

const PRESET_RANGES = [
  { label: "Buổi sáng sớm (03h–07h: Dần, Mão)", indexes: [2, 3] },
  { label: "Buổi sáng (07h–11h: Thìn, Tỵ)", indexes: [4, 5] },
  { label: "Buổi trưa (11h–15h: Ngọ, Mùi)", indexes: [6, 7] },
  { label: "Buổi chiều (15h–19h: Thân, Dậu)", indexes: [8, 9] },
  { label: "Buổi tối (19h–23h: Tuất, Hợi)", indexes: [10, 11] },
  { label: "Nửa đêm (23h–03h: Tý, Sửu)", indexes: [12, 0, 1] },
  { label: "Cả ngày (Khảo sát toàn diện 12 canh giờ)", indexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
];

const ALL_12_HOURS = [
  { idx: 0, label: "Tảo Tý (00h–01h)" },
  { idx: 1, label: "Sửu (01h–03h)" },
  { idx: 2, label: "Dần (03h–05h)" },
  { idx: 3, label: "Mão (05h–07h)" },
  { idx: 4, label: "Thìn (07h–09h)" },
  { idx: 5, label: "Tỵ (09h–11h)" },
  { idx: 6, label: "Ngọ (11h–13h)" },
  { idx: 7, label: "Mùi (13h–15h)" },
  { idx: 8, label: "Thân (15h–17h)" },
  { idx: 9, label: "Dậu (17h–19h)" },
  { idx: 10, label: "Tuất (19h–21h)" },
  { idx: 11, label: "Hợi (21h–23h)" },
  { idx: 12, label: "Vãn Tý (23h–00h)" },
];

export default function DinhGioSinhPage() {
  const router = useRouter();

  // Step 1: Input data
  const [solarDate, setSolarDate] = useState("1992-06-15");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [selectedPreset, setSelectedPreset] = useState<number>(1); // Default to 07h-11h (Thìn, Tỵ)
  const [customSelection, setCustomSelection] = useState<number[]>([4, 5]);
  const [isCustom, setIsCustom] = useState(false);

  // Flow State
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [candidates, setCandidates] = useState<CandidateHourProfile[]>([]);
  const [questions, setQuestions] = useState<RectificationQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [report, setReport] = useState<RectificationReport | null>(null);

  const activeCandidateIndexes = useMemo(() => {
    return isCustom ? customSelection : PRESET_RANGES[selectedPreset]?.indexes || [4, 5];
  }, [isCustom, customSelection, selectedPreset]);

  // Handle Step 1 -> Step 2
  const handleStartSurvey = () => {
    if (activeCandidateIndexes.length < 2) {
      alert("Vui lòng chọn ít nhất 2 canh giờ ứng viên để hệ thống đối chiếu.");
      return;
    }

    try {
      const candProfiles = buildCandidateHourProfiles(solarDate, gender, activeCandidateIndexes);
      const generatedQs = generateRectificationQuestions(candProfiles);

      setCandidates(candProfiles);
      setQuestions(generatedQs);

      // Pre-select first option for each question as default
      const initialAnswers: Record<string, number> = {};
      for (const q of generatedQs) {
        if (q.options.length > 0) {
          initialAnswers[q.id] = q.options[0].matchedTimeIndex;
        }
      }
      setUserAnswers(initialAnswers);
      setCurrentStep(2);
    } catch (e: any) {
      alert("Lỗi khởi tạo định giờ: " + e.message);
    }
  };

  // Handle Step 2 -> Step 3
  const handleCalculateScore = () => {
    try {
      const result = scoreCandidateHours(candidates, userAnswers);
      setReport(result);
      setCurrentStep(3);
    } catch (e: any) {
      alert("Lỗi tính toán: " + e.message);
    }
  };

  const toggleCustomHour = (idx: number) => {
    setCustomSelection((prev) => {
      if (prev.includes(idx)) {
        if (prev.length <= 2) return prev; // Keep at least 2
        return prev.filter((i) => i !== idx);
      } else {
        if (prev.length >= 6) return prev; // Cap at 6
        return [...prev, idx].sort((a, b) => a - b);
      }
    });
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header Banner */}
      <OrientalFrame
        variant="grand"
        cornerStyle="ruyi"
        rounded="rounded-3xl"
        innerClassName="p-6 sm:p-8 text-center space-y-3"
      >
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EAE3DE] border border-[#175A67]/25 text-[#175A67] text-xs font-mono">
          <Clock className="w-3.5 h-3.5 text-[#966F28]" />
          <span>PHƯƠNG PHÁP KHẢO CHỨNG THỰC TẾ • KHÓA CHẶN THIÊN CƠ</span>
          <span className="font-han text-[#B83A32]">定辰</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#175A67]">
          Định Canh Giờ Sinh Học Thuật (Rectification)
        </h1>
        <p className="text-xs sm:text-sm text-[#345258] max-w-2xl mx-auto leading-relaxed">
          Quý bạn chỉ nhớ mang máng khoảng buổi sáng, buổi tối hoặc không rõ giờ sinh?
          Hệ thống sẽ đối chiếu song song cấu trúc Tử Vi và Bát Tự của các canh giờ nghi ngờ,
          đưa ra 4 câu hỏi thực chứng và khóa chính xác canh giờ của bạn.
        </p>

        {/* 3 Steps Indicator Menu Nhỏ Đồng Nhất */}
        <div className="pt-3 flex items-center justify-center space-x-1.5 sm:space-x-3 text-xs font-semibold">
          <div className="inline-flex items-center p-1 rounded-full bg-[#EAE3DE]/80 border border-[#175A67]/20 shadow-inner">
            <div
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                currentStep === 1
                  ? "bg-[#175A67] text-[#FAF7F2] shadow-sm"
                  : "text-[#345258]"
              }`}
            >
              <span>1. Khoanh Vùng Giờ</span>
            </div>
            <span className="text-[#175A67]/30 px-1">→</span>
            <div
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                currentStep === 2
                  ? "bg-[#175A67] text-[#FAF7F2] shadow-sm"
                  : "text-[#345258]"
              }`}
            >
              <span>2. Khảo Sát Thực Chứng</span>
            </div>
            <span className="text-[#175A67]/30 px-1">→</span>
            <div
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                currentStep === 3
                  ? "bg-[#175A67] text-[#FAF7F2] shadow-sm"
                  : "text-[#345258]"
              }`}
            >
              <span>3. Kết Quả Khóa Giờ</span>
            </div>
          </div>
        </div>
      </OrientalFrame>

      {/* STEP 1: Thiết Lập & Khoanh Vùng Giờ Sinh */}
      {currentStep === 1 && (
        <OrientalFrame
          variant="standard"
          cornerStyle="huiwen"
          rounded="rounded-2xl"
          innerClassName="p-6 sm:p-7 space-y-6"
        >

          <div className="flex items-center justify-between border-b border-[#175A67]/15 pb-3">
            <h2 className="font-serif font-bold text-lg text-[#175A67] flex items-center space-x-2">
              <Compass className="w-5 h-5" />
              <span>Bước 1: Thiết Lập Thông Tin &amp; Khoanh Vùng Canh Giờ Nghi Ngờ</span>
            </h2>
            <AuspiciousSeal text="考证" subtext="KHẢO CHỨNG" shape="square" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[#5E777D] font-medium block mb-1">Ngày sinh (Dương lịch)</label>
              <input
                type="date"
                value={solarDate}
                onChange={(e) => setSolarDate(e.target.value)}
                className="w-full bg-[#EAE3DE]/60 border border-[#175A67]/25 rounded-xl px-3 py-2.5 text-[#12343B] focus:outline-none focus:border-[#175A67]"
              />
            </div>

            <div>
              <label className="text-[#5E777D] font-medium block mb-1">Giới tính sinh học</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as "male" | "female")}
                className="w-full bg-[#EAE3DE]/60 border border-[#175A67]/25 rounded-xl px-3 py-2.5 text-[#12343B] focus:outline-none focus:border-[#175A67]"
              >
                <option value="male">Nam Mệnh</option>
                <option value="female">Nữ Mệnh</option>
              </select>
            </div>
          </div>

          {/* Preset Ranges Selection */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#175A67]">
              <span>Chọn Khoảng Thời Gian Nghi Ngờ Nhất:</span>
              <button
                type="button"
                onClick={() => setIsCustom(!isCustom)}
                className="text-[11px] underline text-[#966F28] hover:text-[#175A67]"
              >
                {isCustom ? "Dùng khoảng giờ định sẵn" : "Tùy chọn tự tích canh giờ"}
              </button>
            </div>

            {!isCustom ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {PRESET_RANGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPreset(idx)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedPreset === idx
                        ? "bg-[#175A67] text-[#F8F4F0] border-[#175A67] shadow-sm font-semibold"
                        : "bg-[#EAE3DE]/60 text-[#12343B] border-[#175A67]/20 hover:border-[#175A67]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{preset.label}</span>
                      {selectedPreset === idx && <CheckCircle2 className="w-4 h-4 text-[#F8F4F0]" />}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-[11px] text-[#5E777D]">
                  Tích chọn 2 đến 6 canh giờ bạn đang phân vân (Đã chọn: {customSelection.length} giờ):
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {ALL_12_HOURS.map((h) => {
                    const active = customSelection.includes(h.idx);
                    return (
                      <button
                        key={h.idx}
                        type="button"
                        onClick={() => toggleCustomHour(h.idx)}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          active
                            ? "bg-[#175A67] text-[#F8F4F0] border-[#175A67] font-semibold"
                            : "bg-[#EAE3DE]/60 text-[#12343B] border-[#175A67]/20 hover:border-[#175A67]/40"
                        }`}
                      >
                        {h.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleStartSurvey}
              className="px-6 py-3 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#FAF7F2] font-semibold text-xs sm:text-sm transition-all flex items-center space-x-2 shadow-tealGlow"
            >
              <span>Tiếp Tục Sang Bước 2 (Khảo Sát Thực Chứng)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </OrientalFrame>
      )}

      {/* STEP 2: Khảo Sát 4 Câu Hỏi Đối Chiếu Thực Chứng */}
      {currentStep === 2 && (
        <OrientalFrame
          variant="standard"
          cornerStyle="huiwen"
          rounded="rounded-2xl"
          innerClassName="p-6 sm:p-7 space-y-6"
        >
          <div className="flex items-center justify-between border-b border-[#175A67]/15 pb-3">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#175A67] flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-[#966F28]" />
                <span>Bước 2: Khảo Sát Thực Chứng (4 Trục Đối Chiếu)</span>
              </h2>
              <p className="text-xs text-[#5E777D] mt-0.5">
                Các câu hỏi dưới đây được hệ thống sinh ra từ các điểm khác biệt then chốt giữa {candidates.length} canh giờ ứng viên.
              </p>
            </div>
            <AuspiciousSeal text="四问" subtext="TỨ VẤN" shape="circle" />
          </div>

          <div className="space-y-6">
            {questions.map((q, qIdx) => (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#EAE3DE]/50 border border-[#175A67]/20 space-y-3"
              >
                <div className="space-y-1">
                  <div className="font-serif font-bold text-sm text-[#175A67]">
                    {q.title}
                  </div>
                  <p className="text-xs text-[#5E777D] leading-relaxed">
                    {q.description}
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = userAnswers[q.id] === opt.matchedTimeIndex;
                    return (
                      <label
                        key={opt.optionId}
                        className={`flex items-start space-x-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-[#F8F4F0] border-[#175A67] ring-1 ring-[#175A67]/40 shadow-sm"
                            : "bg-[#F8F4F0]/60 border-[#175A67]/15 hover:border-[#175A67]/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={isSelected}
                          onChange={() =>
                            setUserAnswers((prev) => ({
                              ...prev,
                              [q.id]: opt.matchedTimeIndex,
                            }))
                          }
                          className="mt-0.5 text-[#175A67] focus:ring-[#175A67]"
                        />
                        <div className="text-xs text-[#12343B] space-y-0.5 flex-1">
                          <p className="leading-relaxed">{opt.description}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2.5 rounded-xl bg-[#EAE3DE] hover:bg-[#EAE3DE]/80 text-[#345258] font-semibold text-xs flex items-center space-x-1.5 border border-[#175A67]/20"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay Lại Bước 1</span>
            </button>

            <button
              type="button"
              onClick={handleCalculateScore}
              className="px-6 py-3 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#FAF7F2] font-semibold text-xs sm:text-sm transition-all flex items-center space-x-2 shadow-tealGlow"
            >
              <span>Chấm Điểm &amp; Xem Kết Quả Khóa Giờ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </OrientalFrame>
      )}

      {/* STEP 3: Kết Quả Định Giờ & Khóa Canh Giờ */}
      {currentStep === 3 && report && (
        <div className="space-y-6">
          {/* Main Recommended Winner Card */}
          <OrientalFrame
            variant="grand"
            cornerStyle="ruyi"
            rounded="rounded-3xl"
            innerClassName="p-6 sm:p-8 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#175A67]/15 pb-4">
              <div>
                <div className="text-xs uppercase font-mono tracking-wider text-[#A98A55] flex items-center space-x-1 font-bold">
                  <Sparkles className="w-4 h-4 text-[#A98A55]" />
                  <span>KẾT QUẢ ĐỐI CHIẾU HỌC THUẬT TỐI ƯU NHẤT</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#175A67] mt-0.5">
                  Khóa Giờ: {report.recommended.candidate.hourLabel}
                </h2>
              </div>
              <div className="text-right">
                <div className="text-3xl font-serif font-extrabold text-[#175A67]">
                  {report.recommended.percentage}%
                </div>
                <div className="text-[11px] font-mono text-[#5E777D]">Độ tương thích thực chứng</div>
              </div>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#EAE3DE]/70 border border-[#175A67]/15 space-y-1">
                <span className="text-[#5E777D] font-mono uppercase text-[10px]">Cung Mệnh Tử Vi</span>
                <div className="font-serif font-bold text-[#175A67] text-sm">
                  Cung {report.recommended.candidate.menhPalaceBranch}
                </div>
                <div className="text-[11px] text-[#966F28] font-semibold">
                  {report.recommended.candidate.menhStarsDisplay}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#EAE3DE]/70 border border-[#175A67]/15 space-y-1">
                <span className="text-[#5E777D] font-mono uppercase text-[10px]">Trụ Giờ Bát Tự</span>
                <div className="font-serif font-bold text-[#175A67] text-sm">
                  {report.recommended.candidate.hourPillarVi}
                </div>
                <div className="text-[11px] text-[#345258]">
                  Thân mệnh: {report.recommended.candidate.baziStrength}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#EAE3DE]/70 border border-[#175A67]/15 space-y-1">
                <span className="text-[#5E777D] font-mono uppercase text-[10px]">Hỷ Dụng Thần Dự Báo</span>
                <div className="font-serif font-bold text-[#1D6353] text-sm">
                  {report.recommended.candidate.favorableElement}
                </div>
                <div className="text-[11px] text-[#5E777D]">Trợ lực đắc cách hậu vận</div>
              </div>
            </div>

            {/* Academic Rationale Box */}
            <div className="p-4 rounded-2xl bg-[#EAE3DE]/50 border border-[#175A67]/20 text-xs text-[#2D4A50] leading-relaxed space-y-1.5">
              <div className="font-semibold text-[#175A67] flex items-center space-x-1 text-[11px] uppercase tracking-wide">
                <span>Lý Giải Học Thuật:</span>
              </div>
              <p>{report.academicRationale}</p>
            </div>

            {/* Direct Action Launchers */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  const recTime = report.recommended.candidate.timeIndex;
                  const recHour = recTime === 12 ? 23 : recTime === 0 ? 0 : recTime * 2;
                  router.push(
                    `/tu-vi?date=${solarDate}&time=${recTime}&hour=${recHour}&gender=${gender}`
                  );
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#F8F4F0] font-semibold text-xs transition-all flex items-center justify-center space-x-2 shadow-tealGlow"
              >
                <Sparkles className="w-4 h-4 text-[#F8F4F0]" />
                <span>Xem Lá Số Tử Vi Với Giờ Này (紫微)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const recTime = report.recommended.candidate.timeIndex;
                  const recHour = recTime === 12 ? 23 : recTime === 0 ? 0 : recTime * 2;
                  router.push(
                    `/bat-tu?date=${solarDate}&time=${recTime}&hour=${recHour}&gender=${gender}`
                  );
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#EAE3DE] border border-[#175A67]/30 hover:border-[#175A67] text-[#175A67] font-semibold text-xs transition-all flex items-center justify-center space-x-2"
              >
                <Scroll className="w-4 h-4 text-[#1D6353]" />
                <span>Xem Tứ Trụ Bát Tự (八字)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const recTime = report.recommended.candidate.timeIndex;
                  const recHour = recTime === 12 ? 23 : recTime === 0 ? 0 : recTime * 2;
                  router.push(
                    `/hop-luan?date=${solarDate}&time=${recTime}&hour=${recHour}&gender=${gender}`
                  );
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#EAE3DE] border border-[#966F28]/40 hover:border-[#966F28] text-[#966F28] font-semibold text-xs transition-all flex items-center justify-center space-x-2"
              >
                <TrendingUp className="w-4 h-4 text-[#966F28]" />
                <span>Song Kiếm Hợp Bích &amp; K-Line (双剑)</span>
              </button>
            </div>
          </OrientalFrame>

          {/* Comparison Progress Bar for all Candidate Hours */}
          <OrientalFrame
            variant="standard"
            cornerStyle="huiwen"
            rounded="rounded-2xl"
            innerClassName="p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#175A67]/15 pb-2">
              <h3 className="font-serif font-bold text-sm text-[#175A67]">
                Bảng So Sánh Tỷ Lệ Độ Khớp Giữa Các Canh Giờ Ứng Viên
              </h3>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-[11px] text-[#966F28] hover:text-[#175A67] flex items-center space-x-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Khảo Sát Lại</span>
              </button>
            </div>

            <div className="space-y-3">
              {report.candidates.map((cand) => (
                <div key={cand.candidate.timeIndex} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[#12343B]">
                    <span className="font-semibold flex items-center space-x-2">
                      <span>{cand.candidate.hourLabel}</span>
                      <span className="text-[#5E777D] text-[11px]">
                        (Mệnh {cand.candidate.menhStarsDisplay})
                      </span>
                    </span>
                    <span className="font-mono font-bold text-[#175A67]">{cand.percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#EAE3DE] overflow-hidden border border-[#175A67]/15">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        cand.isRecommended ? "bg-[#175A67]" : "bg-[#966F28]/60"
                      }`}
                      style={{ width: `${cand.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </OrientalFrame>
        </div>
      )}
    </div>
  );
}
