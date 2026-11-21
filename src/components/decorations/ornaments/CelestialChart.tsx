import React from "react";

interface CelestialChartProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  opacity?: number;
  color?: string;
}

/**
 * 05. Tinh Đồ (Celestial Astronomy Chart)
 * Mô phỏng bản đồ thiên văn học cổ truyền: Vòng hoàng đạo, xích đạo, 28 Tú, các điểm tinh tú đơn lẻ.
 * Dùng làm họa tiết nền cho khu vực Tử Vi, Bát Tự hoặc watermark học thuật.
 */
export function CelestialChart({
  className = "",
  width = 300,
  height = 300,
  opacity = 0.08,
  color = "#175A67",
}: CelestialChartProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Các vòng quỹ đạo thiên bàn đồng tâm */}
      <circle cx="150" cy="150" r="142" stroke={color} strokeWidth="0.8" />
      <circle cx="150" cy="150" r="132" stroke="#A98A55" strokeWidth="0.6" strokeDasharray="3 4" />
      <circle cx="150" cy="150" r="110" stroke={color} strokeWidth="0.5" />
      <circle cx="150" cy="150" r="75" stroke={color} strokeWidth="0.5" strokeDasharray="1 3" />
      <circle cx="150" cy="150" r="45" stroke="#A98A55" strokeWidth="0.6" />

      {/* Đường phân cung 12 thời thần */}
      {Array.from({ length: 12 }).map((_, i) => {
        const rad = (i * 30 * Math.PI) / 180;
        const x1 = Math.round((150 + 110 * Math.cos(rad)) * 10) / 10;
        const y1 = Math.round((150 + 110 * Math.sin(rad)) * 10) / 10;
        const x2 = Math.round((150 + 132 * Math.cos(rad)) * 10) / 10;
        const y2 = Math.round((150 + 132 * Math.sin(rad)) * 10) / 10;
        return (
          <line
            key={`cc-line-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="0.7"
          />
        );
      })}

      {/* Các điểm tinh tú cổ rải rác */}
      {[
        { cx: 80, cy: 90, r: 1.5 },
        { cx: 120, cy: 60, r: 1.2 },
        { cx: 190, cy: 75, r: 1.8 },
        { cx: 225, cy: 120, r: 1.3 },
        { cx: 210, cy: 185, r: 1.6 },
        { cx: 165, cy: 220, r: 1.2 },
        { cx: 95, cy: 205, r: 1.5 },
        { cx: 65, cy: 150, r: 1.4 },
      ].map((star, idx) => (
        <circle
          key={`cc-star-${idx}`}
          cx={star.cx}
          cy={star.cy}
          r={star.r}
          fill={color}
        />
      ))}
    </svg>
  );
}
