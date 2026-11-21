import { StarInfo } from "@/lib/tu-vi/tuviService";
import { WUXING_COLOR } from "@/lib/constants/vietnameseDictionary";

interface StarBadgeProps {
  star: StarInfo;
  isMajor?: boolean;
}

export function StarBadge({ star, isMajor = false }: StarBadgeProps) {
  const elementStyle = star.element ? WUXING_COLOR[star.element] : WUXING_COLOR["Kim"];

  return (
    <span
      className={`inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-xs transition-all ${
        isMajor
          ? `font-semibold ${elementStyle?.text || "text-oriental-goldBright"} ${elementStyle?.bg || "bg-oriental-gold/10"} border ${elementStyle?.border || "border-oriental-gold/30"}`
          : star.group === "Sát"
          ? "text-[#9B2921] bg-[#B83A32]/10 border border-[#B83A32]/30"
          : star.group === "Cát"
          ? "text-[#165B46] bg-[#1D6353]/10 border border-[#1D6353]/30"
          : star.group === "Đào Hoa"
          ? "text-[#9D174D] bg-[#BE185D]/10 border border-[#BE185D]/30"
          : "text-oriental-textSecondary bg-oriental-cardLight border border-oriental-border"
      }`}
    >
      <span>{star.nameVi}</span>
      {star.brightnessVi && (
        <span className="text-[10px] font-mono opacity-80 underline decoration-dotted">
          {star.brightnessVi}
        </span>
      )}
      {star.mutagen && (
        <span className="ml-1 text-[9px] px-1 py-0.2 rounded bg-oriental-red/80 text-white font-bold">
          {star.mutagen.replace("化", "H.")}
        </span>
      )}
    </span>
  );
}
