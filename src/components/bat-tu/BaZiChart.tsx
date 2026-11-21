"use client";

import { BaZiResult, PillarData } from "@/lib/bat-tu/baziService";
import { WUXING_COLOR } from "@/lib/constants/vietnameseDictionary";
import { Sparkles, Activity } from "lucide-react";
import { ChineseCorners } from "../decorations/ChineseCorners";
import { AuspiciousSeal } from "../decorations/AuspiciousSeal";

interface BaZiChartProps {
  data: BaZiResult;
}

function PillarCard({ title, pillar, isDayMaster = false }: { title: string; pillar: PillarData; isDayMaster?: boolean }) {
  const ganColor = WUXING_COLOR[pillar.ganWuXing];
  const zhiColor = WUXING_COLOR[pillar.zhiWuXing];

  return (
    <div
      className={`relative p-4 sm:p-5 rounded-2xl border flex flex-col justify-between items-center text-center transition-all duration-200 overflow-hidden ${
        isDayMaster
          ? "bg-gradient-to-br from-oriental-gold/25 via-oriental-card to-oriental-cardLight border-oriental-goldBright shadow-goldGlow ring-1 ring-oriental-gold"
          : "bg-gradient-to-br from-oriental-card to-oriental-cardLight border-oriental-border hover:border-oriental-borderGold/60"
      }`}
    >
      <ChineseCorners size={16} color={isDayMaster ? "#F5D57F" : "#9C7938"} />

      <div className="text-[11px] uppercase font-mono tracking-wider text-oriental-textMuted mb-2">
        {title}
      </div>

      <div className="text-xs font-bold px-2.5 py-0.5 rounded-full mb-2 bg-oriental-cardLight text-oriental-goldBright border border-oriental-borderGold/30">
        {pillar.shiShenGan}
      </div>

      {/* Heavenly Stem */}
      <div className="my-2">
        <div className={`text-3xl sm:text-4xl font-serif font-extrabold ${ganColor?.text || "text-oriental-gold"}`}>
          {pillar.ganVi}
        </div>
        <div className="text-xs text-oriental-textMuted mt-0.5 flex items-center justify-center space-x-1">
          <span className="font-han text-sm text-oriental-goldBright font-normal">{pillar.gan}</span>
          <span>({pillar.ganWuXing})</span>
        </div>
      </div>

      {/* Earthly Branch */}
      <div className="my-2 pt-2 border-t border-oriental-border/60 w-full">
        <div className={`text-3xl sm:text-4xl font-serif font-extrabold ${zhiColor?.text || "text-oriental-gold"}`}>
          {pillar.zhiVi}
        </div>
        <div className="text-xs text-oriental-textMuted mt-0.5 flex items-center justify-center space-x-1">
          <span className="font-han text-sm text-oriental-goldBright font-normal">{pillar.zhi}</span>
          <span>({pillar.zhiWuXing})</span>
        </div>
      </div>

      {/* NaYin */}
      <div className="mt-3 pt-2 border-t border-oriental-border/60 text-[11px] text-oriental-textSecondary w-full font-serif">
        Nạp Âm: <strong className="text-oriental-goldBright">{pillar.naYin}</strong>
      </div>
    </div>
  );
}

export function BaZiChart({ data }: BaZiChartProps) {
  const elements = [
    { name: "Kim", hanz: "金", count: data.elementsCount.Kim, pct: data.elementsPercentage.Kim, color: "bg-[#966F28] text-[#966F28]" },
    { name: "Mộc", hanz: "木", count: data.elementsCount.Mộc, pct: data.elementsPercentage.Mộc, color: "bg-[#1D6353] text-[#1D6353]" },
    { name: "Thủy", hanz: "水", count: data.elementsCount.Thủy, pct: data.elementsPercentage.Thủy, color: "bg-[#175A67] text-[#175A67]" },
    { name: "Hỏa", hanz: "火", count: data.elementsCount.Hỏa, pct: data.elementsPercentage.Hỏa, color: "bg-[#B83A32] text-[#9B2921]" },
    { name: "Thổ", hanz: "土", count: data.elementsCount.Thổ, pct: data.elementsPercentage.Thổ, color: "bg-yellow-500 text-yellow-500" },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <PillarCard title="Trụ Năm (Tổ Tiên • Gốc)" pillar={data.pillars.year} />
        <PillarCard title="Trụ Tháng (Phụ Mẫu • Lệnh)" pillar={data.pillars.month} />
        <PillarCard title="Trụ Ngày (Bản Mệnh • Hoa)" pillar={data.pillars.day} isDayMaster={true} />
        <PillarCard title="Trụ Giờ (Tử Tức • Quả)" pillar={data.pillars.hour} />
      </div>

      {/* Strength & Dụng Thần Card with Chinese Corners */}
      <div className="relative bg-gradient-to-br from-oriental-card via-oriental-cardLight to-oriental-card p-6 sm:p-7 rounded-2xl border border-oriental-gold/50 shadow-cardWarm grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
        <ChineseCorners size={22} color="#D4AF37" />

        <div className="space-y-2.5 border-b md:border-b-0 md:border-r border-oriental-border/70 pb-4 md:pb-0 md:pr-4">
          <div className="flex items-center justify-between text-xs text-oriental-gold font-mono uppercase">
            <span className="flex items-center space-x-1.5">
              <Activity className="w-4 h-4 text-oriental-gold" />
              <span>Đánh Giá Nhật Chủ</span>
            </span>
            <span className="font-bold text-[#175A67]">
              {data.strengthScore}/100đ
            </span>
          </div>
          <div className="text-3xl font-serif font-bold text-oriental-goldBright">
            {data.dayMaster.ganVi} {data.dayMaster.element}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                data.patternType !== "CHINH_CACH"
                  ? "bg-[#9E2A2B]/12 text-[#9E2A2B] border-[#9E2A2B]/40"
                  : "bg-oriental-gold/20 text-oriental-goldBright border-oriental-gold/40"
              }`}
            >
              {data.strengthStatus} ({data.patternName})
            </span>
            <AuspiciousSeal text={data.patternType !== "CHINH_CACH" ? "从格" : "八字"} subtext="" shape="circle" />
          </div>
          {data.scoreBreakdown && (
            <div className="pt-1.5 grid grid-cols-3 gap-1 text-[10px] font-mono text-oriental-textMuted">
              <span className="px-1.5 py-0.5 rounded bg-[#EAE3DE]/70">
                Lệnh: <strong className="text-[#175A67]">{data.scoreBreakdown.monthBranch}</strong>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#EAE3DE]/70">
                Nhật: <strong className="text-[#175A67]">{data.scoreBreakdown.dayBranch}</strong>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#EAE3DE]/70">
                Giờ: <strong className="text-[#175A67]">{data.scoreBreakdown.hourBranch}</strong>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#EAE3DE]/70">
                Năm: <strong className="text-[#175A67]">{data.scoreBreakdown.yearBranch}</strong>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#EAE3DE]/70">
                Can: <strong className="text-[#175A67]">{data.scoreBreakdown.exposedStems}</strong>
              </span>
              {data.scoreBreakdown.monthClashPenalty !== 0 && (
                <span className="px-1.5 py-0.5 rounded bg-[#9E2A2B]/10 text-[#9E2A2B]">
                  Xung: <strong>{data.scoreBreakdown.monthClashPenalty}</strong>
                </span>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2 border-b md:border-b-0 md:border-r border-oriental-border/70 pb-4 md:pb-0 md:pr-4">
          <div className="flex items-center space-x-2 text-xs text-[#1D6353] font-mono uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Hỷ Dụng Thần Khai Mở Vận Trình</span>
          </div>
          <div className="text-sm space-y-1.5 text-oriental-textSecondary">
            <div>
              <span className="text-oriental-textMuted">Dụng Thần Cốt Lõi:</span>{" "}
              <strong className="text-[#1D6353] font-bold">{data.favorableElement}</strong>
            </div>
            <div>
              <span className="text-oriental-textMuted">Hỷ Thần Trợ Lực:</span>{" "}
              <strong className="text-[#175A67] font-bold">{data.supportingElement}</strong>
            </div>
            <div>
              <span className="text-oriental-textMuted">Kỵ Thần Cần Phòng:</span>{" "}
              <strong className="text-[#9B2921] font-bold">{data.unfavorableElement}</strong>
            </div>
          </div>
        </div>

        {/* Five Elements Bar Meter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono uppercase text-oriental-textMuted">
            <span>Cân Bằng Ngũ Hành</span>
            <span>Tổng: 100%</span>
          </div>
          <div className="space-y-2">
            {elements.map((el) => (
              <div key={el.name} className="flex items-center text-xs space-x-2">
                <span className="w-12 font-serif font-bold text-oriental-textPrimary flex items-center space-x-1">
                  <span>{el.name}</span>
                  <span className="font-han text-xs text-oriental-gold opacity-80">{el.hanz}</span>
                </span>
                <div className="flex-1 h-2.5 rounded-full bg-oriental-darker overflow-hidden border border-oriental-border">
                  <div
                    className={`h-full rounded-full ${el.color.split(" ")[0]}`}
                    style={{ width: `${el.pct}%` }}
                  ></div>
                </div>
                <span className="w-8 text-right font-mono text-[11px] text-oriental-gold font-bold">
                  {el.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DaYun Timeline */}
      <div className="relative bg-gradient-to-br from-oriental-card to-oriental-cardLight p-5 sm:p-6 rounded-2xl border border-oriental-borderGold/40 shadow-cardWarm overflow-hidden">
        <ChineseCorners size={18} color="#D4AF37" />

        <h3 className="text-sm font-serif font-bold text-oriental-gold mb-4 flex items-center space-x-2">
          <span>TIẾN TRÌNH 8 BƯỚC ĐẠI VẬN CUỘC ĐỜI (MỖI BƯỚC 10 NĂM)</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {data.daYunList.map((dy) => (
            <div
              key={dy.index}
              className="p-3.5 rounded-xl bg-oriental-dark/70 border border-oriental-border text-center hover:border-oriental-gold hover:bg-oriental-cardLight transition-all group"
            >
              <div className="text-[10px] text-oriental-textMuted font-mono">
                {dy.startAge} - {dy.endAge} tuổi
              </div>
              <div className="font-serif font-bold text-oriental-goldBright text-base mt-1 group-hover:scale-105 transition-transform">
                {dy.ganZhiVi}
              </div>
              <div className="text-[10px] text-oriental-textMuted mt-1">
                {dy.startYear} - {dy.endYear}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deterministic BaZi Enricher Panel (Cách Cục, Điều Hầu, Hình Xung Hợp Hại, Thần Sát) */}
      {data.enrichment && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Cách Cục & Điều Hầu */}
          <div className="relative bg-oriental-card p-5 rounded-2xl border border-[#175A67]/25 shadow-cardWarm space-y-4">
            <ChineseCorners size={16} color="#175A67" />
            <div>
              <div className="text-[11px] font-mono uppercase text-[#966F28]">
                Định Cách Cục • {data.enrichment.geJu.source}
              </div>
              <div className="text-lg font-serif font-bold text-[#175A67] mt-0.5">
                {data.enrichment.geJu.name}
              </div>
              <p className="text-xs text-oriental-textSecondary leading-relaxed mt-1">
                {data.enrichment.geJu.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#175A67]/15">
              <div className="text-[11px] font-mono uppercase text-[#966F28]">
                Điều Hầu Dụng Thần • {data.enrichment.tiaoHou.source}
              </div>
              <div className="text-xs font-semibold text-[#175A67] mt-1">
                {data.enrichment.tiaoHou.season} — Ưu tiên:{" "}
                <span className="text-[#9B2921]">{data.enrichment.tiaoHou.recommendedStems.join(", ")}</span>
              </div>
              <p className="text-xs text-oriental-textSecondary leading-relaxed mt-1">
                {data.enrichment.tiaoHou.explanation}
              </p>
            </div>

            {(data.enrichment.ganRelations.length > 0 || data.enrichment.zhiRelations.length > 0) && (
              <div className="pt-3 border-t border-[#175A67]/15 space-y-1.5">
                <div className="text-[11px] font-mono uppercase text-[#966F28]">
                  Tương Tác Can Chi (Hợp – Xung – Hại)
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[...data.enrichment.ganRelations, ...data.enrichment.zhiRelations].map((rel, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-[#EAE3DE] text-[#12343B] border border-[#175A67]/20"
                    >
                      {rel}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Thần Sát (ShenSha) */}
          <div className="relative bg-oriental-card p-5 rounded-2xl border border-[#175A67]/25 shadow-cardWarm space-y-3">
            <ChineseCorners size={16} color="#966F28" />
            <div className="text-[11px] font-mono uppercase text-[#966F28]">
              Thần Sát Chính Tông (Tích hợp jinchenma94 &amp; Cổ Pháp)
            </div>
            {data.enrichment.shenSha.length === 0 ? (
              <p className="text-xs text-oriental-textMuted">Không ghi nhận thần sát đặc biệt nổi bật.</p>
            ) : (
              <div className="space-y-2">
                {data.enrichment.shenSha.map((ss, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#EAE3DE]/55 border border-[#175A67]/15 flex flex-col gap-0.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif font-bold text-xs text-[#175A67]">{ss.name}</span>
                      <span className="text-[10px] font-mono text-[#966F28]">{ss.pillars.join(" • ")}</span>
                    </div>
                    <p className="text-[11px] text-oriental-textSecondary leading-snug">{ss.meaning}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
