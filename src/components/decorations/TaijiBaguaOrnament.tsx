import React from "react";

interface TaijiBaguaOrnamentProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export function TaijiBaguaOrnament({
  size = 64,
  className = "",
  glow = true,
}: TaijiBaguaOrnamentProps) {
  const trigrams = [
    { symbol: "☰", name: "Càn (Trời)", angle: 0 },
    { symbol: "☱", name: "Đoài (Đầm)", angle: 45 },
    { symbol: "☲", name: "Ly (Lửa)", angle: 90 },
    { symbol: "☳", name: "Chấn (Sấm)", angle: 135 },
    { symbol: "☴", name: "Tốn (Gió)", angle: 180 },
    { symbol: "☵", name: "Khảm (Nước)", angle: 225 },
    { symbol: "☶", name: "Cấn (Núi)", angle: 270 },
    { symbol: "☷", name: "Khôn (Đất)", angle: 315 },
  ];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Rotating Bagua Ring */}
      <div
        className="absolute inset-0 rounded-full border border-oriental-goldMuted/40 spin-slow flex items-center justify-center"
      >
        {trigrams.map((t, idx) => {
          const rad = (t.angle * Math.PI) / 180;
          const radius = size * 0.42;
          const x = Math.round(radius * Math.sin(rad) * 100) / 100;
          const y = Math.round(-radius * Math.cos(rad) * 100) / 100;

          return (
            <span
              key={idx}
              className="absolute text-oriental-goldBright font-bold font-serif opacity-80"
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${t.angle}deg)`,
                fontSize: size * 0.16,
              }}
              title={t.name}
            >
              {t.symbol}
            </span>
          );
        })}
      </div>

      {/* Inner Golden Ring */}
      <div
        className="absolute rounded-full border border-oriental-borderGold/60 spin-slow-reverse"
        style={{ width: size * 0.68, height: size * 0.68 }}
      />

      {/* Center Taiji Symbol */}
      <div
        className={`rounded-full bg-gradient-to-br from-oriental-card to-oriental-cardLight border border-oriental-gold flex items-center justify-center font-serif text-oriental-gold ${
          glow ? "shadow-goldGlow" : ""
        }`}
        style={{
          width: size * 0.5,
          height: size * 0.5,
          fontSize: size * 0.28,
        }}
      >
        ☯
      </div>
    </div>
  );
}
