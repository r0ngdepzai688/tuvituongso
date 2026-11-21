"use client";

import { useState } from "react";
import Link from "next/link";
import { PHONG_TUC_LIST, PhongTucItem } from "@/lib/data/phongTucData";
import { OrientalFrame } from "@/components/decorations/OrientalFrame";
import { AuspiciousSeal } from "@/components/decorations/AuspiciousSeal";
import {
  BookHeart,
  Map,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ScrollText,
  ArrowRight,
  Heart,
} from "lucide-react";

export default function PhongTucPage() {
  const [selectedTopic, setSelectedTopic] = useState<PhongTucItem>(PHONG_TUC_LIST[0]);
  const [regionView, setRegionView] = useState<"all" | "bac" | "trung" | "nam">("all");

  const regionTabs = [
    { id: "all", label: "So sánh cả 3 Miền" },
    { id: "bac", label: "Miền Bắc" },
    { id: "trung", label: "Miền Trung" },
    { id: "nam", label: "Miền Nam" },
  ] as const;

  const regionCards = [
    { key: "bac" as const, tag: "Bắc Bộ", color: "border-[#175A67]/30 bg-[#175A67]/[0.04]", badge: "bg-[#175A67] text-[#EAE3DE]" },
    { key: "trung" as const, tag: "Trung Bộ", color: "border-[#966F28]/35 bg-[#966F28]/[0.05]", badge: "bg-[#966F28] text-[#F8F4F0]" },
    { key: "nam" as const, tag: "Nam Bộ", color: "border-[#1D6353]/30 bg-[#1D6353]/[0.04]", badge: "bg-[#1D6353] text-[#EAE3DE]" },
  ];

  const visibleRegions =
    regionView === "all" ? regionCards : regionCards.filter((r) => r.key === regionView);

  return (
    <div className="space-y-8 animate-rise-in">
      {/* Top Editorial Banner */}
      <OrientalFrame
        variant="grand"
        rounded="rounded-2xl"
        innerClassName="p-6 sm:p-8 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#175A67]/15 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#966F28] flex items-center space-x-1.5">
              <BookHeart className="w-4 h-4" />
              <span>Giữ Gìn Bản Sắc Việt • Hiểu Đúng Gốc Rễ Cho Thế Hệ Trẻ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#175A67] mt-1">
              Phong Tục Thờ Cúng 3 Miền Việt Nam
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/van-khan"
              className="px-3.5 py-2 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#EAE3DE] text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-tealGlow"
            >
              <ScrollText className="w-3.5 h-3.5" />
              <span>Thư Viện Văn Khấn</span>
            </Link>
            <AuspiciousSeal text="饮水" subtext="NHỚ NGUỒN" shape="square" />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#345258] leading-relaxed mt-3 max-w-3xl">
          Diễn giải chi tiết, sinh động và khách quan về văn hóa thờ cúng gia tiên, lễ Tết và tập quán đặc trưng <strong>Bắc – Trung – Nam</strong>. Giúp người trẻ hiểu rõ ý nghĩa nhân văn đằng sau từng nghi lễ, gạt bỏ mê tín rườm rà và lưu giữ nếp nhà Việt không bị mai một.
        </p>

        {/* 12-Month Lunar + Core/Life-Cycle Selector */}
        <div className="pt-5 space-y-2.5">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#5E777D]">
            Chọn chuyên đề theo Lịch 12 Tháng Âm Lịch &amp; Vòng Đời ({PHONG_TUC_LIST.length} chuyên đề):
          </div>
          <div className="flex flex-wrap gap-2">
            {PHONG_TUC_LIST.map((topic) => {
              const isActive = selectedTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? "bg-[#175A67] text-[#EAE3DE] border-[#175A67] shadow-tealGlow"
                      : "bg-[#EAE3DE]/65 text-[#12343B] border-[#175A67]/18 hover:border-[#175A67]/50 hover:bg-[#F8F4F0]"
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive ? "bg-[#EAE3DE]/20 text-[#EAE3DE]" : "bg-[#F8F4F0] text-[#966F28]"
                    }`}
                  >
                    {topic.lunarMonth}
                  </span>
                  <span>{topic.title.split("—")[0].split("(")[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>
      </OrientalFrame>

      {/* Main Illustrated Story Card */}
      <OrientalFrame
        key={selectedTopic.id}
        variant="grand"
        rounded="rounded-3xl"
        className="animate-scroll-unfurl"
        innerClassName="overflow-hidden"
      >
        {/* Hero Illustration (16:9 Bespoke Watercolor Art) */}
        <div className="relative w-full aspect-[16/9] max-h-[440px] bg-[#EAE3DE] overflow-hidden border-b border-[#175A67]/15">
          <img
            src={selectedTopic.image}
            alt={selectedTopic.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#12343B]/85 via-[#12343B]/40 to-transparent p-5 sm:p-8 text-[#F8F4F0]">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#F5D57F]">
              {selectedTopic.badge} • Văn Hóa Thờ Cúng Việt Nam
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mt-1">{selectedTopic.title}</h2>
            <p className="text-xs sm:text-sm text-[#EAE3DE]/90 mt-1 max-w-2xl">{selectedTopic.subtitle}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Origin & Humanistic Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-[#EAE3DE]/50 border border-[#175A67]/15 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase text-[#175A67]">
                <Sparkles className="w-4 h-4 text-[#966F28]" />
                <span>Nguồn Gốc &amp; Ý Nghĩa Văn Hóa</span>
              </div>
              <p className="text-sm text-[#12343B] leading-relaxed">{selectedTopic.origin}</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#175A67]/[0.06] border border-[#175A67]/20 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase text-[#175A67]">
                <Heart className="w-4 h-4 text-[#B83A32]" />
                <span>Giá Trị Nhân Văn Với Giới Trẻ Hôm Nay</span>
              </div>
              <p className="text-sm text-[#12343B] leading-relaxed">{selectedTopic.humanisticValue}</p>
            </div>
          </div>

          {/* 3-Region Comparison Section */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#175A67]/15 pb-3">
              <div className="flex items-center space-x-2">
                <Map className="w-5 h-5 text-[#175A67]" />
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#175A67]">
                  Đối Chiếu Phong Tục 3 Miền Bắc – Trung – Nam
                </h3>
              </div>

              <div className="flex items-center flex-wrap gap-1.5">
                {regionTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setRegionView(tab.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      regionView === tab.id
                        ? "bg-[#175A67] text-[#EAE3DE] shadow-sm"
                        : "bg-[#EAE3DE]/80 text-[#345258] border border-[#175A67]/15 hover:border-[#175A67]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`grid grid-cols-1 gap-5 ${
                visibleRegions.length === 3 ? "lg:grid-cols-3" : "max-w-2xl"
              }`}
            >
              {visibleRegions.map((rc) => {
                const detail = selectedTopic.regions[rc.key];
                return (
                  <div key={rc.key} className={`p-5 rounded-2xl border ${rc.color} space-y-3`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${rc.badge}`}>
                        {rc.tag}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-[#175A67]">{detail.title}</h4>
                    <div className="p-3 rounded-xl bg-[#F8F4F0] border border-[#175A67]/12 text-xs text-[#345258]">
                      <strong className="text-[#966F28] block mb-0.5">Lễ vật / Nét đặc trưng:</strong>
                      {detail.specialDishOrItem}
                    </div>
                    <ul className="space-y-2 text-xs text-[#12343B] leading-relaxed">
                      {detail.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-[#175A67] font-bold mt-0.5">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Practical Checklist + Myths to Avoid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="p-5 rounded-2xl bg-[#1D6353]/[0.06] border border-[#1D6353]/25 space-y-3">
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#165B46] flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Checklist Thực Hành Gọn Gàng</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#12343B]">
                {selectedTopic.checklist.map((c, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1D6353] flex-shrink-0 mt-1" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#B83A32]/[0.05] border border-[#B83A32]/25 space-y-3">
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#9B2921] flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Hiểu Đúng — Tránh Mê Tín Rườm Rà</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#12343B]">
                {selectedTopic.mythsToAvoid.map((m, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#B83A32] font-bold mt-0.5">✦</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Direct Link to Corresponding Prayer */}
          <div className="pt-4 border-t border-[#175A67]/15 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-[#5E777D] italic">{selectedTopic.imageCaption}</p>
            <Link
              href={`/van-khan?id=${selectedTopic.relatedPrayerId}`}
              className="px-5 py-2.5 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#EAE3DE] text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-tealGlow transition-all"
            >
              <ScrollText className="w-4 h-4" />
              <span>Mở Bài Văn Khấn Tương Ứng</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </OrientalFrame>
    </div>
  );
}
