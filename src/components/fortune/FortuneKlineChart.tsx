"use client";

import { useState } from "react";
import { FortuneKlineCandle } from "@/lib/fortune/klineGenerator";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function FortuneKlineChart({ candles }: { candles: FortuneKlineCandle[] }) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  if (!candles || candles.length === 0) return null;
  const active = candles[activeIdx] || candles[0];

  const width = 760;
  const height = 250;
  const padX = 42;
  const padY = 24;
  const plotW = width - padX * 2;
  const plotH = height - padY * 2;

  const yPos = (val: number) => padY + plotH * (1 - val / 100);
  const stepX = plotW / candles.length;

  // Smooth Trendline path through midpoints
  const trendPath = candles
    .map((c, i) => {
      const x = padX + stepX * i + stepX / 2;
      const y = yPos(c.score);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="space-y-4">
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height + 28}`}
          className="w-full min-w-[540px] h-auto select-none"
          role="img"
          aria-label="Biểu đồ nến K-Line Vận Mệnh theo 8 Đại Vận"
        >
          {/* Horizontal grid lines */}
          {[20, 40, 60, 80, 100].map((v) => {
            const y = yPos(v);
            return (
              <g key={v}>
                <line
                  x1={padX}
                  y1={y}
                  x2={width - padX}
                  y2={y}
                  stroke="#175A67"
                  strokeOpacity="0.12"
                  strokeDasharray="3 4"
                />
                <text x={padX - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#5E777D" fontFamily="monospace">
                  {v}
                </text>
              </g>
            );
          })}

          {/* Golden Moving Trendline */}
          <path d={trendPath} fill="none" stroke="#966F28" strokeWidth="1.8" strokeOpacity="0.7" />

          {/* Candlesticks */}
          {candles.map((c, i) => {
            const cx = padX + stepX * i + stepX / 2;
            const yHigh = yPos(c.high);
            const yLow = yPos(c.low);
            const yTop = yPos(Math.max(c.open, c.close));
            const yBot = yPos(Math.min(c.open, c.close));
            const bodyH = Math.max(8, yBot - yTop);
            const isUp = c.close >= c.open;
            const color = isUp ? "#1D6353" : "#B83A32";
            const isSelected = activeIdx === i;

            return (
              <g
                key={c.index}
                className="cursor-pointer"
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
              >
                {/* Hover Column Highlight */}
                {isSelected && (
                  <rect
                    x={cx - stepX * 0.42}
                    y={padY - 6}
                    width={stepX * 0.84}
                    height={plotH + 12}
                    rx="8"
                    fill="#175A67"
                    fillOpacity="0.07"
                  />
                )}

                {/* Wick */}
                <line x1={cx} y1={yHigh} x2={cx} y2={yLow} stroke={color} strokeWidth="2" />

                {/* Candle Body */}
                <rect
                  x={cx - 14}
                  y={yTop}
                  width="28"
                  height={bodyH}
                  rx="4"
                  fill={isUp ? "#1D6353" : "#B83A32"}
                  fillOpacity={isSelected ? 1 : 0.82}
                  stroke={isSelected ? "#12343B" : color}
                  strokeWidth={isSelected ? 1.5 : 1}
                />

                {/* Score label above high */}
                <text x={cx} y={yHigh - 6} textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>
                  {c.close}
                </text>

                {/* X-axis Age & GanZhi */}
                <text x={cx} y={height + 6} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#175A67">
                  {c.ganZhiVi}
                </text>
                <text x={cx} y={height + 21} textAnchor="middle" fontSize="9.5" fill="#5E777D" fontFamily="monospace">
                  {c.ageRange}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Decade Detail Strip */}
      <div className="p-4 rounded-xl bg-[#EAE3DE]/60 border border-[#175A67]/20 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <span className="font-serif font-bold text-base text-[#175A67]">
              Đại Vận {active.ganZhiVi} ({active.ageRange} • {active.yearRange})
            </span>
            <span
              className={`inline-flex items-center space-x-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                active.trend === "up"
                  ? "bg-[#1D6353]/15 text-[#165B46]"
                  : active.trend === "down"
                  ? "bg-[#B83A32]/15 text-[#9B2921]"
                  : "bg-[#966F28]/15 text-[#7D5A1C]"
              }`}
            >
              {active.trend === "up" ? (
                <TrendingUp className="w-3 h-3" />
              ) : active.trend === "down" ? (
                <TrendingDown className="w-3 h-3" />
              ) : (
                <Minus className="w-3 h-3" />
              )}
              <span>{active.phaseLabel}</span>
            </span>
          </div>
          <p className="text-xs text-[#345258]">{active.advice}</p>
        </div>
        <div className="text-right font-mono text-xs text-[#5E777D]">
          Khởi: <strong className="text-[#12343B]">{active.open}</strong> • Đỉnh:{" "}
          <strong className="text-[#1D6353]">{active.high}</strong> • Kết:{" "}
          <strong className="text-[#175A67]">{active.close}</strong>
        </div>
      </div>
    </div>
  );
}
