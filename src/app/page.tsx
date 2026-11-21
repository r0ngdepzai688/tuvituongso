"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { OrientalFrame } from "@/components/decorations/OrientalFrame";
import { ChineseCloudDivider } from "@/components/decorations/XiangyunCloud";
import { AuspiciousSeal } from "@/components/decorations/AuspiciousSeal";
import { BrandLogo } from "@/components/decorations/BrandLogo";
import { CelestialChart, LuoPanMark, PineBambooInk } from "@/components/decorations/ornaments";
import { OrientalToolEmblem } from "@/components/decorations/OrientalToolEmblem";
import { HaiDuongColophon } from "@/components/decorations/HaiDuongColophon";
import { getLunarLeapMonth, convertLunarToSolarDate } from "@/lib/astronomy/solarTermGuard";

export default function Home() {
  const router = useRouter();
  const [calendarType, setCalendarType] = useState<"solar" | "lunar">("solar");
  const [solarDate, setSolarDate] = useState("1988-04-16");
  const [lunarYear, setLunarYear] = useState(1988);
  const [lunarMonth, setLunarMonth] = useState(3);
  const [lunarDay, setLunarDay] = useState(1);
  const [isLeapMonth, setIsLeapMonth] = useState(false);
  const [timeIndex, setTimeIndex] = useState(4); // Giờ Thìn (07h-09h)
  const [gender, setGender] = useState<"male" | "female">("male");

  const leapMonthOfYear = getLunarLeapMonth(lunarYear);

  const resolveLaunchDate = (): string | null => {
    if (calendarType === "solar") return solarDate;
    try {
      const effectiveLeap = isLeapMonth && leapMonthOfYear === lunarMonth;
      return convertLunarToSolarDate(lunarYear, lunarMonth, lunarDay, effectiveLeap);
    } catch {
      alert("Ngày Âm lịch không hợp lệ (ví dụ: tháng thiếu chỉ có 29 ngày).");
      return null;
    }
  };

  const handleLaunchTuVi = () => {
    const resolved = resolveLaunchDate();
    if (resolved) router.push(`/tu-vi?date=${resolved}&time=${timeIndex}&gender=${gender}`);
  };

  const handleLaunchBatTu = () => {
    const resolved = resolveLaunchDate();
    if (resolved) router.push(`/bat-tu?date=${resolved}&time=${timeIndex}&gender=${gender}`);
  };

  const modules = [
    {
      id: "tu-vi" as const,
      title: "Tử Vi Đẩu Số",
      hanz: "紫微斗数",
      desc: "An sao chuẩn xác 14 chính tinh & 100+ phụ tinh. Luận Mệnh, Thân, 12 cung, Đại vận & Lưu niên bằng thuật toán toán học tất định.",
      href: "/tu-vi",
      badge: "Khai Vận",
      accent: "text-[#175A67]",
      watermark: "celestial",
    },
    {
      id: "bat-tu" as const,
      title: "Tứ Trụ Bát Tự",
      hanz: "四柱八字",
      desc: "Phân tích Thiên Can Địa Chi 4 trụ, tàng can, thập thần, cân bằng ngũ hành và tìm Hỷ Thần, Dụng Thần trợ mệnh tối ưu.",
      href: "/bat-tu",
      badge: "Chính Tông",
      accent: "text-[#1D6353]",
      watermark: "celestial",
    },
    {
      id: "ky-mon" as const,
      title: "Kỳ Môn Độn Giáp",
      hanz: "奇门遁甲",
      desc: "Thời gia Kỳ Môn bàn, giải đoán Cửu Cung Bát Môn, Cửu Tinh Bát Thần. Định thời khắc và phương vị xuất hành đắc thắng.",
      href: "/ky-mon",
      badge: "Quyết Sách",
      accent: "text-[#175A67]",
      watermark: "luopan",
    },
    {
      id: "la-ban" as const,
      title: "La Bàn Phong Thủy",
      hanz: "电子罗盘",
      desc: "La bàn số 24 Sơn hướng, Tam Nguyên Cửu Vận, Huyền Không Phi Tinh và Bát Trạch Minh Kính trực quan tương tác.",
      href: "/la-ban",
      badge: "Trạch Mệnh",
      accent: "text-[#9B2921]",
      watermark: "luopan",
    },
    {
      id: "hop-hon" as const,
      title: "Hợp Hôn & Đối Tác",
      hanz: "八字合婚",
      desc: "Khảo sát tương hợp ngũ hành, can chi tam hợp lục hợp, cung phi bát trạch và hóa giải xung khắc nhân duyên, sự nghiệp.",
      href: "/hop-hon",
      badge: "Tương Hợp",
      accent: "text-[#966F28]",
      watermark: "pine",
    },
    {
      id: "tai-lieu" as const,
      title: "Thư Viện Cổ Thư (47 Bộ)",
      hanz: "古籍藏经",
      desc: "Kho tàng kinh điển nguyên bản Hán văn & Việt dịch: Tử Vi Toàn Thư, Tử Bình Chân Thuyên, Trích Thiên Tủy, Táng Kinh, Ma Y Thần Tướng.",
      href: "/tai-lieu",
      badge: "Chính Bản",
      accent: "text-[#175A67]",
      watermark: "bamboo",
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 1. Hero Section — Cấp Grand Frame Thư Tịch Viền Kép Cổ Bản với Góc Mây Như Ý Tinh Xảo */}
      <OrientalFrame
        variant="grand"
        cornerStyle="ruyi"
        showSeal={false}
        rounded="rounded-3xl"
        className="max-w-4xl mx-auto text-center animate-rise-in"
        innerClassName="px-5 sm:px-10 py-5 sm:py-6 space-y-4"
      >
        {/* Sacred Celestial Taiji & Bagua Brand Mark */}
        <div className="flex items-center justify-center">
          <BrandLogo size="lg" showGlow={true} className="hover:scale-105 transition-transform duration-500" />
        </div>

        {/* Ethereal Teal Tag */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EAE3DE]/90 backdrop-blur-sm border border-[#175A67]/30 text-[#175A67] text-[11px] font-mono tracking-wider shadow-sm">
          <Sparkles className="w-3 h-3 text-[#966F28]" />
          <span>SƠN THỦY THỦY MẶC • KHOA HỌC DỮ LIỆU & LỊCH PHÁP CHÍNH TÔNG</span>
          <span className="font-han text-xs text-[#B83A32] ml-1">妙算</span>
        </div>

        {/* Main Calligraphy Title: Kỳ Thư Cổ Môn */}
        <div className="space-y-1">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
            <span className="font-han text-2xl sm:text-4xl text-[#966F28]/80 select-none drop-shadow-sm">奇</span>
            <div className="relative inline-flex flex-col items-center">
              <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-calligraphy font-bold tracking-normal text-[#175A67] pt-1 pb-0.5 leading-[1.15] select-text drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] drop-shadow-[0_4px_16px_rgba(23,90,103,0.18)]">
                Kỳ Thư Cổ Môn
              </h1>
              {/* Ink-Wash Brush Underline SVG */}
              <svg
                viewBox="0 0 320 14"
                className="w-44 sm:w-56 h-2.5 text-[#966F28]/75 -mt-1"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 9 C75 2, 210 2, 316 8"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M65 11 C135 7, 200 7, 265 10"
                  stroke="#175A67"
                  strokeWidth="1"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </div>
            <span className="font-han text-2xl sm:text-4xl text-[#966F28]/80 select-none drop-shadow-sm">書</span>
          </div>
          <p className="font-serif italic text-base sm:text-xl text-[#175A67] font-semibold tracking-wide drop-shadow-sm">
            Diệu Toán Thiên Cơ • Khai Thông Mệnh Đồ
          </p>
        </div>

        {/* Khối Đề Từ Huyền Học & Triện Ấn Bút Tích */}
        <div className="max-w-2xl mx-auto bg-[#EAE3DE]/85 backdrop-blur-sm border border-[#175A67]/20 rounded-2xl p-4 sm:p-5 shadow-inner space-y-3 text-left relative">
          <p className="font-thu-phap text-base sm:text-lg lg:text-xl text-[#12343B] leading-relaxed tracking-wide text-justify sm:text-center select-text">
            &ldquo;Vạn tượng càn khôn quy về số lý, ngàn năm cổ tịch đúc kết thiên cơ. 
            Nơi đây phụng chỉ cổ thư, hội tụ <strong className="text-[#175A67] font-bold">47 pho bí tịch kinh điển huyền môn</strong> từ Tử Vi, Bát Tự đến Kỳ Môn bí thuật — 
            minh định toán pháp tất định, gạn đục khơi trong, thấu tỏ mệnh đồ. Soi bóng tiền nhân giữa dòng biến dịch, 
            dẫn lối người hữu duyên thuận thời tri mệnh, an nhiên <strong className="text-[#B83A32] font-bold">Xu Cát Tị Hung</strong>.&rdquo;
          </p>

          {/* Chữ Ký Thư Pháp & Triện Ấn Chu Sa "Hải Đường" */}
          <div className="flex justify-end pr-1">
            <HaiDuongColophon />
          </div>
        </div>
      </OrientalFrame>

      {/* 2. Quick Calculator Launcher Box — Cấp Standard Frame với Gờ Góc Hồi Văn */}
      <OrientalFrame
        variant="standard"
        cornerStyle="huiwen"
        rounded="rounded-2xl"
        className="max-w-2xl mx-auto animate-scroll-unfurl text-left shadow-cardWarm"
        innerClassName="p-4 sm:p-6 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#175A67]/15 pb-2.5">
          <div className="flex items-center space-x-2">
            <span className="text-[#175A67] text-lg">☯</span>
            <span className="font-serif font-bold text-[#175A67] text-sm sm:text-base">
              Khởi Tạo Lá Số Chuẩn Xác (An Sao Tất Định)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="inline-flex rounded-lg bg-[#EAE3DE] p-0.5 border border-[#175A67]/20 text-[11px]">
              <button
                type="button"
                onClick={() => setCalendarType("solar")}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  calendarType === "solar" ? "bg-[#175A67] text-[#FAF7F2] shadow-sm" : "text-[#345258] hover:text-[#175A67]"
                }`}
              >
                Dương lịch
              </button>
              <button
                type="button"
                onClick={() => setCalendarType("lunar")}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  calendarType === "lunar" ? "bg-[#175A67] text-[#FAF7F2] shadow-sm" : "text-[#345258] hover:text-[#175A67]"
                }`}
              >
                Âm lịch
              </button>
            </div>
            <AuspiciousSeal text="天机" subtext="THIÊN CƠ" shape="square" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          {calendarType === "solar" ? (
            <div>
              <label className="text-xs text-[#5E777D] font-medium block mb-1">Ngày sinh (Dương lịch)</label>
              <input
                type="date"
                value={solarDate}
                onChange={(e) => setSolarDate(e.target.value)}
                className="w-full bg-[#EAE3DE]/70 border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] text-xs focus:outline-none focus:border-[#175A67] focus:ring-1 focus:ring-[#175A67]/30 transition-all"
              />
            </div>
          ) : (
            <div className="space-y-1">
              <label className="text-xs text-[#5E777D] font-medium block">Ngày sinh (Âm lịch)</label>
              <div className="grid grid-cols-3 gap-1">
                <input
                  type="number"
                  min={1900}
                  max={2100}
                  value={lunarYear}
                  onChange={(e) => {
                    const y = Number(e.target.value);
                    setLunarYear(y);
                    if (getLunarLeapMonth(y) !== lunarMonth) setIsLeapMonth(false);
                  }}
                  className="w-full bg-[#EAE3DE]/70 border border-[#175A67]/25 rounded-lg px-2 py-2 text-[#12343B] text-xs"
                />
                <select
                  value={lunarMonth}
                  onChange={(e) => {
                    const m = Number(e.target.value);
                    setLunarMonth(m);
                    if (leapMonthOfYear !== m) setIsLeapMonth(false);
                  }}
                  className="w-full bg-[#EAE3DE]/70 border border-[#175A67]/25 rounded-lg px-1.5 py-2 text-[#12343B] text-xs"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>
                      T{m}
                    </option>
                  ))}
                </select>
                <select
                  value={lunarDay}
                  onChange={(e) => setLunarDay(Number(e.target.value))}
                  className="w-full bg-[#EAE3DE]/70 border border-[#175A67]/25 rounded-lg px-1.5 py-2 text-[#12343B] text-xs"
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      N{d}
                    </option>
                  ))}
                </select>
              </div>
              {leapMonthOfYear > 0 && leapMonthOfYear === lunarMonth && (
                <label className="inline-flex items-center space-x-1.5 text-[11px] text-[#9E2A2B] font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isLeapMonth}
                    onChange={(e) => setIsLeapMonth(e.target.checked)}
                    className="rounded border-[#9E2A2B]/50 text-[#9E2A2B]"
                  />
                  <span>Tháng {leapMonthOfYear} nhuận</span>
                </label>
              )}
            </div>
          )}

          <div>
            <label className="text-xs text-[#5E777D] font-medium block mb-1">Giờ sinh (Canh giờ)</label>
            <select
              value={timeIndex}
              onChange={(e) => setTimeIndex(Number(e.target.value))}
              className="w-full bg-[#EAE3DE]/70 border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] text-xs focus:outline-none focus:border-[#175A67] focus:ring-1 focus:ring-[#175A67]/30 transition-all"
            >
              <option value={0}>Tảo Tý (00h - 01h)</option>
              <option value={1}>Sửu (01h - 03h)</option>
              <option value={2}>Dần (03h - 05h)</option>
              <option value={3}>Mão (05h - 07h)</option>
              <option value={4}>Thìn (07h - 09h)</option>
              <option value={5}>Tỵ (09h - 11h)</option>
              <option value={6}>Ngọ (11h - 13h)</option>
              <option value={7}>Mùi (13h - 15h)</option>
              <option value={8}>Thân (15h - 17h)</option>
              <option value={9}>Dậu (17h - 19h)</option>
              <option value={10}>Tuất (19h - 21h)</option>
              <option value={11}>Hợi (21h - 23h)</option>
              <option value={12}>Vãn Tý (23h - 00h)</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-[#5E777D] font-medium block mb-1">Giới tính sinh học</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as "male" | "female")}
              className="w-full bg-[#EAE3DE]/70 border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] text-xs focus:outline-none focus:border-[#175A67] focus:ring-1 focus:ring-[#175A67]/30 transition-all"
            >
              <option value="male">Nam Mệnh (Dương Nam / Âm Nam)</option>
              <option value="female">Nữ Mệnh (Âm Nữ / Dương Nữ)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleLaunchTuVi}
            className="flex-1 py-3 px-4 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#FAF7F2] font-semibold text-xs transition-all flex items-center justify-center space-x-2 shadow-tealGlow"
          >
            <Sparkles className="w-4 h-4 text-[#FAF7F2]" />
            <span>Xem Lá Số Tử Vi (紫微)</span>
          </button>

          <button
            onClick={handleLaunchBatTu}
            className="flex-1 py-3 px-4 rounded-xl bg-[#EAE3DE]/80 border border-[#A98A55]/40 hover:border-[#A98A55] hover:bg-[#EAE3DE] text-[#175A67] font-semibold text-xs transition-all flex items-center justify-center space-x-2"
          >
            <span className="text-sm text-[#1D6353]">☯</span>
            <span>Xem Tứ Trụ Bát Tự (八字)</span>
          </button>
        </div>
      </OrientalFrame>

      {/* Cloud Divider — Đường Phân Cách Mây Như Ý Cát Tường */}
      <ChineseCloudDivider title="Thuật Số Chính Tông • Lục Đại Huyền Môn" subtitle="Hệ Thống Công Cụ & Tài Liệu Khoa Học" />

      {/* 3. 6 Core Modules Cards Grid với Họa Tiết Chủ Đạo Tinh Tế */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((m) => {
          return (
            <Link
              key={m.id}
              href={m.href}
              className="group block"
            >
              <OrientalFrame
                variant="standard"
                cornerStyle="huiwen"
                rounded="rounded-2xl"
                className="h-full card-hover-lift hover:border-[#175A67]/50"
                innerClassName="p-6 sm:p-7 flex flex-col justify-between h-full space-y-4"
              >
                {/* Watermark hoa văn mờ ảo chủ đạo ở góc thẻ */}
                {m.watermark === "celestial" && (
                  <div className="absolute -bottom-6 -right-6 pointer-events-none opacity-20">
                    <CelestialChart width={140} height={140} opacity={0.6} />
                  </div>
                )}
                {m.watermark === "luopan" && (
                  <div className="absolute -bottom-4 -right-4 pointer-events-none opacity-25">
                    <LuoPanMark size={80} color="#A98A55" accentColor="#175A67" />
                  </div>
                )}
                {m.watermark === "bamboo" && (
                  <div className="absolute bottom-2 right-2 pointer-events-none opacity-20">
                    <PineBambooInk size={60} variant="bamboo" color="#175A67" />
                  </div>
                )}
                {m.watermark === "pine" && (
                  <div className="absolute bottom-2 right-2 pointer-events-none opacity-20">
                    <PineBambooInk size={60} variant="pine" color="#A98A55" />
                  </div>
                )}

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <OrientalToolEmblem type={m.id} size={48} className="group-hover:scale-105 transition-transform" />
                    <div className="flex items-center space-x-2">
                      <span className="font-han text-base font-bold text-[#966F28]">
                        {m.hanz}
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#EAE3DE] border border-[#175A67]/20 text-[#175A67] font-mono">
                        {m.badge}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-xl font-serif font-bold ${m.accent} group-hover:text-[#0F454F] transition-colors`}>
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#345258] mt-2 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#175A67]/12 flex items-center justify-between text-xs font-semibold text-[#175A67] relative z-10">
                  <span>Khởi tạo bảng tính & chiêm nghiệm</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </OrientalFrame>
            </Link>
          );
        })}
      </div>

      {/* Cloud Divider */}
      <ChineseCloudDivider title="Kỹ Nghệ Hóa Thuật Số" subtitle="Nguyên Tắc Khoa Học Dựa Trên Cổ Thư" />

      {/* 4. 3 Pillars of AI Metaphysics Engineering */}
      <OrientalFrame
        variant="standard"
        cornerStyle="huiwen"
        rounded="rounded-3xl"
        className="shadow-cardWarm"
        innerClassName="p-6 sm:p-9"
      >
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <h2 className="text-2xl font-serif font-bold text-[#175A67]">
            Triết Lý Thiết Kế: AI Thuật Số Công Trình Hóa
          </h2>
          <p className="text-xs text-[#5E777D]">
            Loại bỏ triệt để ảo giác an sao của AI bằng 3 tầng bảo vệ nghiêm ngặt
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="p-5 rounded-xl bg-[#EAE3DE]/55 border border-[#175A67]/15 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#175A67]/15 flex items-center justify-center text-[#175A67] font-han text-xl">
              一
            </div>
            <h4 className="font-serif font-bold text-[#175A67] text-base">
              Tính Toán Tất Định (Deterministic)
            </h4>
            <p className="text-xs text-[#345258] leading-relaxed">
              Mọi thuật toán can chi, tiết khí, an sao đều được giải bằng code toán học chuẩn xác, không để LLM tự suy diễn ngày giờ.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#EAE3DE]/55 border border-[#175A67]/15 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#B83A32]/15 flex items-center justify-center text-[#B83A32] font-han text-xl">
              二
            </div>
            <h4 className="font-serif font-bold text-[#175A67] text-base">
              Kinh Điển Cổ Thư Làm Gốc
            </h4>
            <p className="text-xs text-[#345258] leading-relaxed">
              Dựa trên các trước tác hàng đầu: Tử Vi Toàn Thư, Tử Bình Chân Thuyên, Trích Thiên Tủy, Kỳ Môn Bí Kíp, Thẩm Thị Huyền Không.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#EAE3DE]/55 border border-[#175A67]/15 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#966F28]/15 flex items-center justify-center text-[#966F28] font-han text-xl">
              三
            </div>
            <h4 className="font-serif font-bold text-[#175A67] text-base">
              Xu Cát Tị Hung Tích Cực
            </h4>
            <p className="text-xs text-[#345258] leading-relaxed">
              Tuyệt đối không hù dọa số phận định sẵn. Luận giải tập trung vào việc nhận diện điểm mạnh, khắc phục nhược điểm và ra quyết định sáng suốt.
            </p>
          </div>
        </div>
      </OrientalFrame>
    </div>
  );
}
