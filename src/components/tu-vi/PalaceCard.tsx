import { PalaceData } from "@/lib/tu-vi/tuviService";
import { StarBadge } from "./StarBadge";
import { ChineseCorners } from "../decorations/ChineseCorners";

interface PalaceCardProps {
  palace: PalaceData;
  isSelected?: boolean;
  isHighlightedTriad?: boolean;
  isHighlightedOpposite?: boolean;
  onClick?: () => void;
}

export function PalaceCard({
  palace,
  isSelected,
  isHighlightedTriad,
  isHighlightedOpposite,
  onClick,
}: PalaceCardProps) {
  const isLifePalace = palace.nameVi.includes("Mệnh");

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col justify-between p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer min-h-[165px] sm:min-h-[195px] select-none overflow-hidden ${
        isSelected
          ? "bg-gradient-to-br from-oriental-gold/25 via-oriental-card to-oriental-cardLight border-oriental-goldBright ring-1 ring-oriental-goldBright shadow-goldGlow scale-[1.02] z-20"
          : isHighlightedTriad
          ? "bg-gradient-to-br from-oriental-jade/25 via-oriental-card to-oriental-cardLight border-emerald-500/70 ring-1 ring-emerald-500/50 z-10"
          : isHighlightedOpposite
          ? "bg-gradient-to-br from-oriental-red/25 via-oriental-card to-oriental-cardLight border-oriental-red/70 z-10"
          : isLifePalace
          ? "bg-oriental-card/95 border-oriental-gold/60 shadow-inner"
          : "bg-oriental-card/90 border-oriental-border hover:border-oriental-borderGold/70 hover:bg-oriental-cardLight"
      }`}
    >
      {/* Chinese Corner Ornaments for Life Palace or Selected */}
      {(isSelected || isLifePalace) && (
        <ChineseCorners size={16} color={isSelected ? "#F5D57F" : "#D4AF37"} />
      )}

      {/* Top Header: Palace Name & Earthly Branch */}
      <div className="flex items-center justify-between border-b border-oriental-border/60 pb-1.5 mb-2">
        <div className="flex items-center space-x-1.5">
          <span
            className={`font-serif font-bold text-sm sm:text-base ${
              isLifePalace
                ? "text-oriental-goldBright underline decoration-oriental-gold underline-offset-4"
                : "text-oriental-textPrimary"
            }`}
          >
            {palace.nameVi}
          </span>
          {palace.isBodyPalace && (
            <span className="text-[10px] bg-oriental-red/80 text-white font-bold px-1 rounded shadow-sm">
              Thân
            </span>
          )}
        </div>
        <div className="text-right flex items-center space-x-1.5">
          <span className="text-xs font-mono font-bold text-oriental-gold">
            {palace.heavenlyStemVi} {palace.earthlyBranchVi}
          </span>
          <span className="font-han text-xs text-oriental-goldBright opacity-70">
            {palace.heavenlyStem}{palace.earthlyBranch}
          </span>
        </div>
      </div>

      {/* Middle: Major Stars (Chính tinh) */}
      <div className="flex-1 space-y-2">
        <div className="flex flex-wrap gap-1">
          {palace.majorStars.length > 0 ? (
            palace.majorStars.map((star, i) => (
              <StarBadge key={i} star={star} isMajor={true} />
            ))
          ) : (
            <span className="text-xs text-oriental-textMuted italic font-serif">
              Vô Chính Diệu
            </span>
          )}
        </div>

        {/* Minor Stars (Phụ tinh) */}
        <div className="flex flex-wrap gap-1 pt-1 border-t border-oriental-border/30">
          {palace.minorStars.slice(0, 6).map((star, i) => (
            <StarBadge key={i} star={star} isMajor={false} />
          ))}
          {palace.minorStars.length > 6 && (
            <span className="text-[10px] text-oriental-textMuted self-center">
              +{palace.minorStars.length - 6}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Decadal Range (Đại hạn) & Tràng sinh */}
      <div className="mt-2 pt-1.5 border-t border-oriental-border/60 flex items-center justify-between text-[11px] text-oriental-textMuted font-mono">
        <span className="text-oriental-gold font-medium">
          Hạn: {palace.decadal.range[0]} - {palace.decadal.range[1]}
        </span>
        <span className="text-oriental-textSecondary">{palace.changsheng12 || ""}</span>
      </div>
    </div>
  );
}
