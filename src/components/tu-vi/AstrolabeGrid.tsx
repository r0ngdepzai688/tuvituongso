"use client";

import { useState } from "react";
import { AstrolabeResult, PalaceData } from "@/lib/tu-vi/tuviService";
import { PalaceCard } from "./PalaceCard";
import { Sparkles, Compass, User, Calendar, BookOpen } from "lucide-react";
import { ChineseCorners } from "../decorations/ChineseCorners";
import { AuspiciousSeal } from "../decorations/AuspiciousSeal";

interface AstrolabeGridProps {
  data: AstrolabeResult;
  onAskAI?: (palace: PalaceData) => void;
}

export function AstrolabeGrid({ data, onAskAI }: AstrolabeGridProps) {
  const [selectedPalaceIndex, setSelectedPalaceIndex] = useState<number | null>(null);

  // Map palaces by earthly branch for fixed 4x4 layout
  const branchMap: Record<string, PalaceData> = {};
  data.palaces.forEach((p) => {
    branchMap[p.earthlyBranch] = p;
  });

  const selectedPalace =
    selectedPalaceIndex !== null
      ? data.palaces.find((p) => p.index === selectedPalaceIndex)
      : null;

  return (
    <div className="space-y-6">
      {/* 4x4 Grid Board Layout */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 bg-gradient-to-br from-oriental-darker via-oriental-card to-oriental-darker p-3 sm:p-5 rounded-2xl border-2 border-oriental-borderGold/60 shadow-cardWarm flame-glow overflow-hidden">
        <ChineseCorners size={28} color="#D4AF37" />

        {/* ROW 0: Tỵ, Ngọ, Mùi, Thân */}
        <PalaceCard
          palace={branchMap["巳"]}
          isSelected={selectedPalace?.earthlyBranch === "巳"}
          isHighlightedTriad={selectedPalace?.triadPalaces.includes(branchMap["巳"]?.index)}
          isHighlightedOpposite={selectedPalace?.oppositePalace === branchMap["巳"]?.index}
          onClick={() => setSelectedPalaceIndex(branchMap["巳"]?.index)}
        />
        <PalaceCard
          palace={branchMap["午"]}
          isSelected={selectedPalace?.earthlyBranch === "午"}
          isHighlightedTriad={selectedPalace?.triadPalaces.includes(branchMap["午"]?.index)}
          isHighlightedOpposite={selectedPalace?.oppositePalace === branchMap["午"]?.index}
          onClick={() => setSelectedPalaceIndex(branchMap["午"]?.index)}
        />
        <PalaceCard
          palace={branchMap["未"]}
          isSelected={selectedPalace?.earthlyBranch === "未"}
          isHighlightedTriad={selectedPalace?.triadPalaces.includes(branchMap["未"]?.index)}
          isHighlightedOpposite={selectedPalace?.oppositePalace === branchMap["未"]?.index}
          onClick={() => setSelectedPalaceIndex(branchMap["未"]?.index)}
        />
        <PalaceCard
          palace={branchMap["申"]}
          isSelected={selectedPalace?.earthlyBranch === "申"}
          isHighlightedTriad={selectedPalace?.triadPalaces.includes(branchMap["申"]?.index)}
          isHighlightedOpposite={selectedPalace?.oppositePalace === branchMap["申"]?.index}
          onClick={() => setSelectedPalaceIndex(branchMap["申"]?.index)}
        />

        {/* ROW 1: Thìn, [CENTER 2x2], Dậu */}
        <PalaceCard
          palace={branchMap["辰"]}
          isSelected={selectedPalace?.earthlyBranch === "辰"}
          isHighlightedTriad={selectedPalace?.triadPalaces.includes(branchMap["辰"]?.index)}
          isHighlightedOpposite={selectedPalace?.oppositePalace === branchMap["辰"]?.index}
          onClick={() => setSelectedPalaceIndex(branchMap["辰"]?.index)}
        />

        {/* Center Board (col-span-2 row-span-2) with Traditional Seal */}
        <div className="relative hidden lg:flex col-span-2 row-span-2 bg-gradient-to-br from-oriental-card via-oriental-cardLight to-oriental-card p-6 rounded-xl border border-oriental-gold/50 flex-col justify-between shadow-inner overflow-hidden">
          <ChineseCorners size={20} color="#D4AF37" />

          <div className="border-b border-oriental-border/80 pb-4 flex justify-between items-start">
            <div>
              <div className="text-xl font-serif font-bold text-oriental-goldBright flex items-center space-x-2">
                <span>LÁ SỐ TỬ VI ĐẨU SỐ</span>
              </div>
              <div className="text-xs text-oriental-textMuted mt-1">
                Trường Phái Tam Hợp & Phi Tinh Tứ Hóa
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded bg-oriental-gold/20 border border-oriental-gold/40 text-xs font-mono font-bold text-oriental-goldBright">
                {data.fiveElementsClass}
              </span>
              <AuspiciousSeal text="紫微" subtext="TỬ VI" shape="square" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 my-auto py-2 text-sm">
            <div className="space-y-1.5">
              <div className="text-xs text-oriental-textMuted flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-oriental-gold" />
                <span>Dương Lịch:</span>
              </div>
              <div className="font-mono text-oriental-textPrimary font-semibold">
                {data.solarDate} ({data.time})
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs text-oriental-textMuted flex items-center space-x-1">
                <Compass className="w-3.5 h-3.5 text-oriental-gold" />
                <span>Âm Lịch:</span>
              </div>
              <div className="font-serif text-oriental-textPrimary font-semibold">
                {data.lunarDate} (Giờ {data.timeBranchVi})
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs text-oriental-textMuted flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-oriental-gold" />
                <span>Bản Mệnh:</span>
              </div>
              <div className="text-oriental-gold font-bold">
                {data.yinYang} ({data.gender})
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs text-oriental-textMuted flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-oriental-gold" />
                <span>Mệnh / Thân Chủ:</span>
              </div>
              <div className="text-oriental-textPrimary font-semibold">
                {data.soul} / {data.body}
              </div>
            </div>
          </div>

          <div className="border-t border-oriental-border/80 pt-3 text-xs text-oriental-textMuted flex justify-between items-center">
            <span>Bấm vào cung bất kỳ để xem Tam Hợp & Xung Chiếu</span>
            {selectedPalace && (
              <button
                onClick={() => onAskAI && onAskAI(selectedPalace)}
                className="px-3.5 py-1.5 rounded-lg bg-oriental-gold/25 text-oriental-goldBright hover:bg-oriental-gold/35 border border-oriental-gold/50 transition-colors flex items-center space-x-1.5 font-semibold shadow-goldGlow"
              >
                <BookOpen className="w-3.5 h-3.5 text-oriental-goldBright" />
                <span>Luận Cung {selectedPalace.nameVi}</span>
              </button>
            )}
          </div>
        </div>

        <PalaceCard
          palace={branchMap["酉"]}
          isSelected={selectedPalace?.earthlyBranch === "酉"}
          isHighlightedTriad={selectedPalace?.triadPalaces.includes(branchMap["酉"]?.index)}
          isHighlightedOpposite={selectedPalace?.oppositePalace === branchMap["酉"]?.index}
          onClick={() => setSelectedPalaceIndex(branchMap["酉"]?.index)}
        />

        {/* ROW 2: Mão, [Center continuation], Tuất */}
        <PalaceCard
          palace={branchMap["卯"]}
          isSelected={selectedPalace?.earthlyBranch === "卯"}
          isHighlightedTriad={selectedPalace?.triadPalaces.includes(branchMap["卯"]?.index)}
          isHighlightedOpposite={selectedPalace?.oppositePalace === branchMap["卯"]?.index}
          onClick={() => setSelectedPalaceIndex(branchMap["卯"]?.index)}
        />
        <PalaceCard
          palace={branchMap["戌"]}
          isSelected={selectedPalace?.earthlyBranch === "戌"}
          isHighlightedTriad={selectedPalace?.triadPalaces.includes(branchMap["戌"]?.index)}
          isHighlightedOpposite={selectedPalace?.oppositePalace === branchMap["戌"]?.index}
          onClick={() => setSelectedPalaceIndex(branchMap["戌"]?.index)}
        />

        {/* ROW 3: Dần, Sửu, Tý, Hợi */}
        <PalaceCard
          palace={branchMap["寅"]}
          isSelected={selectedPalace?.earthlyBranch === "寅"}
          isHighlightedTriad={selectedPalace?.triadPalaces.includes(branchMap["寅"]?.index)}
          isHighlightedOpposite={selectedPalace?.oppositePalace === branchMap["寅"]?.index}
          onClick={() => setSelectedPalaceIndex(branchMap["寅"]?.index)}
        />
        <PalaceCard
          palace={branchMap["丑"]}
          isSelected={selectedPalace?.earthlyBranch === "丑"}
          isHighlightedTriad={selectedPalace?.triadPalaces.includes(branchMap["丑"]?.index)}
          isHighlightedOpposite={selectedPalace?.oppositePalace === branchMap["丑"]?.index}
          onClick={() => setSelectedPalaceIndex(branchMap["丑"]?.index)}
        />
        <PalaceCard
          palace={branchMap["子"]}
          isSelected={selectedPalace?.earthlyBranch === "子"}
          isHighlightedTriad={selectedPalace?.triadPalaces.includes(branchMap["子"]?.index)}
          isHighlightedOpposite={selectedPalace?.oppositePalace === branchMap["子"]?.index}
          onClick={() => setSelectedPalaceIndex(branchMap["子"]?.index)}
        />
        <PalaceCard
          palace={branchMap["亥"]}
          isSelected={selectedPalace?.earthlyBranch === "亥"}
          isHighlightedTriad={selectedPalace?.triadPalaces.includes(branchMap["亥"]?.index)}
          isHighlightedOpposite={selectedPalace?.oppositePalace === branchMap["亥"]?.index}
          onClick={() => setSelectedPalaceIndex(branchMap["亥"]?.index)}
        />
      </div>

      {/* Selected Palace Detail Inspection Drawer / Banner */}
      {selectedPalace && (
        <div className="relative bg-gradient-to-br from-oriental-card to-oriental-cardLight p-5 sm:p-6 rounded-2xl border border-oriental-gold/50 shadow-cardWarm space-y-3 overflow-hidden">
          <ChineseCorners size={20} color="#D4AF37" />

          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-oriental-border/80 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-serif font-bold text-oriental-goldBright">
                Chi Tiết {selectedPalace.nameVi} ({selectedPalace.heavenlyStemVi} {selectedPalace.earthlyBranchVi})
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-oriental-gold/20 text-oriental-goldBright font-mono font-bold border border-oriental-gold/40">
                Đại Hạn: {selectedPalace.decadal.range[0]} - {selectedPalace.decadal.range[1]} tuổi
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-[#1D6353] flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1D6353] shadow-sm"></span>
                <span>Tam Hợp Chiếu</span>
              </span>
              <span className="text-[#9B2921] flex items-center space-x-1.5 ml-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B83A32] shadow-sm"></span>
                <span>Xung Chiếu</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs text-oriental-gold block mb-1 font-semibold uppercase">Chính Tinh Tọa Thủ</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPalace.majorStars.length > 0 ? (
                  selectedPalace.majorStars.map((s, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-oriental-cardLight border border-oriental-gold/40 text-oriental-goldBright font-semibold shadow-sm">
                      {s.nameVi} ({s.element}) - {s.brightnessVi || "Bình"} {s.mutagen ? `[${s.mutagen}]` : ""}
                    </span>
                  ))
                ) : (
                  <span className="text-oriental-textMuted italic">Cung Vô Chính Diệu (Mượn sao cung đối diện xung chiếu để luận giải)</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-xs text-oriental-gold block mb-1 font-semibold uppercase">Phụ Tinh Hội Tụ</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPalace.minorStars.map((s, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-oriental-cardLight/90 text-xs text-oriental-textSecondary border border-oriental-border">
                    {s.nameVi} {s.mutagen ? `(${s.mutagen})` : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
