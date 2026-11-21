"use client";

import { QiMenChartResult, QiMenPalace } from "@/lib/qimen/qimenService";
import { Shield, Navigation } from "lucide-react";
import { ChineseCorners } from "../decorations/ChineseCorners";
import { AuspiciousSeal } from "../decorations/AuspiciousSeal";

interface QiMenGridProps {
  data: QiMenChartResult;
}

function PalaceGridCell({ palace }: { palace: QiMenPalace }) {
  const isAuspicious = palace.evaluation === "Đại Cát" || palace.evaluation === "Cát";
  const isOminous = palace.evaluation === "Đại Hung" || palace.evaluation === "Hung";

  return (
    <div
      className={`relative p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-all duration-200 min-h-[175px] overflow-hidden ${
        isAuspicious
          ? "bg-gradient-to-br from-oriental-jade/25 via-oriental-card to-oriental-cardLight border-emerald-500/70 hover:bg-oriental-jade/30 shadow-mysticGlow"
          : isOminous
          ? "bg-gradient-to-br from-oriental-red/25 via-oriental-card to-oriental-cardLight border-oriental-red/60 hover:bg-oriental-red/30"
          : "bg-oriental-card border-oriental-border hover:border-oriental-borderGold/60"
      }`}
    >
      <ChineseCorners size={15} color={isAuspicious ? "#369986" : isOminous ? "#D94E44" : "#9C7938"} />

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-oriental-border/50 pb-1.5">
        <div className="flex items-center space-x-1.5">
          <span className="font-serif font-bold text-sm text-oriental-goldBright">
            {palace.nameVi}
          </span>
          <span className="font-han text-xs text-oriental-gold opacity-75">
            {palace.trigram}
          </span>
          <span className="text-[10px] text-oriental-textMuted font-mono">
            ({palace.direction})
          </span>
        </div>
        <span
          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
            isAuspicious
              ? "bg-emerald-500/20 text-[#1D6353] border border-emerald-500/40"
              : isOminous
              ? "bg-rose-500/20 text-[#9B2921] border border-rose-500/40"
              : "bg-oriental-cardLight text-oriental-textMuted"
          }`}
        >
          {palace.evaluation}
        </span>
      </div>

      {/* Center Elements: Deity, Star, Door */}
      <div className="space-y-1.5 py-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-oriental-textMuted">Bát Thần:</span>
          <span className={`font-semibold flex items-center space-x-1 ${palace.deity.nature === "Cát" ? "text-[#1D6353]" : "text-oriental-textPrimary"}`}>
            <span>{palace.deity.nameVi}</span>
            <span className="font-han text-xs opacity-75">({palace.deity.name})</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-oriental-textMuted">Cửu Tinh:</span>
          <span className="font-semibold text-oriental-gold flex items-center space-x-1">
            <span>{palace.star.nameVi}</span>
            <span className="font-han text-xs opacity-75">({palace.star.name})</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-oriental-textMuted">Bát Môn:</span>
          <span
            className={`font-serif font-bold text-sm flex items-center space-x-1 ${
              palace.door.nature === "Cát"
                ? "text-[#1D6353] underline decoration-emerald-500 decoration-2"
                : palace.door.nature === "Hung"
                ? "text-[#9B2921]"
                : "text-oriental-textPrimary"
            }`}
          >
            <span>{palace.door.nameVi}</span>
            <span className="font-han text-xs opacity-85">({palace.door.name})</span>
          </span>
        </div>
      </div>

      {/* Footer: Heavenly Stem & Earthly Stem */}
      <div className="border-t border-oriental-border/50 pt-2 flex items-center justify-between text-xs font-mono text-oriental-textMuted">
        <span>Thiên: <strong className="text-oriental-gold">{palace.heavenStemVi}</strong> <span className="font-han text-[11px] opacity-75">({palace.heavenStem})</span></span>
        <span>Địa: <strong className="text-oriental-textSecondary">{palace.earthStemVi}</strong> <span className="font-han text-[11px] opacity-75">({palace.earthStem})</span></span>
      </div>
    </div>
  );
}

export function QiMenGrid({ data }: QiMenGridProps) {
  return (
    <div className="space-y-6">
      {/* Overview Banner with Chinese Corners */}
      <div className="relative bg-gradient-to-br from-oriental-card via-oriental-cardLight to-oriental-card p-5 sm:p-6 rounded-2xl border border-oriental-gold/50 shadow-cardWarm flex flex-wrap items-center justify-between gap-4 overflow-hidden">
        <ChineseCorners size={22} color="#D4AF37" />

        <div className="space-y-1">
          <div className="text-xs uppercase font-mono tracking-wider text-oriental-gold flex items-center space-x-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Thời Gia Kỳ Môn Độn Giáp (奇门遁甲)</span>
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-oriental-goldBright">
            {data.dunType} • {data.juNumber} Cục (Tiết {data.solarTerm})
          </div>
          <div className="text-xs text-oriental-textMuted font-mono">
            {data.yearGanZhi} năm • {data.monthGanZhi} tháng • {data.dayGanZhi} ngày • {data.hourGanZhi} giờ
          </div>
        </div>

        <div className="flex items-center space-x-6 text-sm">
          <div>
            <div className="text-xs text-oriental-textMuted">Trực Phù (Sao Tinh):</div>
            <div className="font-bold text-oriental-goldBright">{data.zhifuStar}</div>
          </div>
          <div>
            <div className="text-xs text-oriental-textMuted">Trực Sử (Cửa Môn):</div>
            <div className="font-bold text-[#1D6353]">{data.zhishiDoor}</div>
          </div>
          <AuspiciousSeal text="奇门" subtext="KỲ MÔN" shape="square" />
        </div>
      </div>

      {/* 3x3 LuoShu Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 bg-oriental-darker/90 p-4 sm:p-5 rounded-2xl border-2 border-oriental-borderGold/50 shadow-cardWarm">
        {data.palaces.map((palace) => (
          <PalaceGridCell key={palace.palaceNum} palace={palace} />
        ))}
      </div>

      {/* Strategic Guidance Box */}
      <div className="relative bg-oriental-card p-4.5 rounded-xl border border-oriental-border flex items-start space-x-3 text-xs text-oriental-textSecondary shadow-sm">
        <Navigation className="w-5 h-5 text-oriental-gold flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-oriental-goldBright font-bold">Chỉ dẫn hành động (Xu Cát Tị Hung):</strong> Hãy ưu tiên chọn phương vị có sự kết hợp của các cung <strong>Đại Cát</strong> (có Sinh Môn, Khai Môn hoặc Hưu Môn) để đàm phán, xuất hành, tiến hành công việc quan trọng. Tránh hướng có <strong>Tử Môn, Thương Môn</strong> hoặc Bạch Hổ tọa thủ để giảm thiểu xung đột và rủi ro.
        </div>
      </div>
    </div>
  );
}
