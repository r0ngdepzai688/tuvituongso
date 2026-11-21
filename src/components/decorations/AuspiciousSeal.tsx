import React from "react";

interface AuspiciousSealProps {
  text?: string;
  subtext?: string;
  className?: string;
  shape?: "square" | "circle";
}

export function AuspiciousSeal({
  text = "趋吉避凶", // Xu Cát Tị Hung
  subtext = "Xu Cát Tị Hung",
  className = "",
  shape = "square",
}: AuspiciousSealProps) {
  const isChinese = /[\u4e00-\u9fa5]/.test(text);

  return (
    <div
      className={`animate-stamp-press inline-flex flex-col items-center justify-center p-1.5 border-2 border-oriental-red/80 bg-oriental-red/10 text-oriental-redBright select-none ${
        shape === "circle" ? "rounded-full aspect-square" : "rounded-md"
      } ${className}`}
      title={subtext}
    >
      <span className={`${isChinese ? "font-han text-sm sm:text-base" : "font-serif font-extrabold text-xs"} tracking-widest leading-none text-oriental-redBright`}>
        {text}
      </span>
      {subtext && (
        <span className="text-[8px] font-mono uppercase tracking-tighter text-oriental-red mt-0.5 opacity-90">
          {subtext}
        </span>
      )}
    </div>
  );
}
