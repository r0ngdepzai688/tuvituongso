"use client";

import { useEffect, useState } from "react";
import { Solar } from "lunar-typescript";
import { STEM_MAP, BRANCH_MAP } from "@/lib/constants/vietnameseDictionary";
import { ChineseCorners } from "./ChineseCorners";
import { AuspiciousSeal } from "./AuspiciousSeal";
import { Compass, Sparkles, Sun, Moon, Calendar, MapPin } from "lucide-react";

const DIRECTION_NAMES: Record<string, string> = {
  "东南": "Đông Nam",
  "正北": "Chính Bắc",
  "东北": "Đông Bắc",
  "西南": "Tây Nam",
  "正西": "Chính Tây",
  "正东": "Chính Đông",
  "正南": "Chính Nam",
  "西北": "Tây Bắc",
};

export function AuspiciousSolarCalendar() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const solar = Solar.fromDate(new Date());
    const lunar = solar.getLunar();
    const ec = lunar.getEightChar();

    const yearGz = `${STEM_MAP[ec.getYearGan()] || ec.getYearGan()} ${BRANCH_MAP[ec.getYearZhi()] || ec.getYearZhi()}`;
    const monthGz = `${STEM_MAP[ec.getMonthGan()] || ec.getMonthGan()} ${BRANCH_MAP[ec.getMonthZhi()] || ec.getMonthZhi()}`;
    const dayGz = `${STEM_MAP[ec.getDayGan()] || ec.getDayGan()} ${BRANCH_MAP[ec.getDayZhi()] || ec.getDayZhi()}`;
    const hourGz = `${STEM_MAP[ec.getTimeGan()] || ec.getTimeGan()} ${BRANCH_MAP[ec.getTimeZhi()] || ec.getTimeZhi()}`;

    const prevJie = lunar.getPrevJieQi(true);
    const xiRaw = lunar.getPositionXiDesc();
    const caiRaw = lunar.getPositionCaiDesc();

    setData({
      solarYmd: solar.toYmd(),
      lunarFull: lunar.toString(),
      yearGz,
      monthGz,
      dayGz,
      hourGz,
      solarTerm: prevJie.getName(),
      xiPos: DIRECTION_NAMES[xiRaw] || xiRaw,
      caiPos: DIRECTION_NAMES[caiRaw] || caiRaw,
    });
  }, []);

  if (!data) return null;

  return (
    <div className="relative bg-gradient-to-br from-oriental-card via-oriental-cardLight to-oriental-card p-5 sm:p-6 rounded-2xl border border-oriental-borderGold/60 shadow-cardWarm flame-glow my-8 overflow-hidden">
      <ChineseCorners size={22} color="#D4AF37" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-oriental-border/60 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-oriental-red/15 border border-oriental-red/40 flex items-center justify-center text-oriental-redBright font-han text-2xl shadow-redGlow">
            曆
          </div>
          <div>
            <div className="text-xs font-mono tracking-wider text-oriental-gold flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hoàng Đạo & Tiết Khí Hôm Nay</span>
            </div>
            <div className="text-base sm:text-lg font-serif font-bold text-oriental-goldBright">
              Ngày {data.dayGz} • Tiết {data.solarTerm}
            </div>
          </div>
        </div>

        <AuspiciousSeal text="吉日" subtext="CÁT NHẬT" shape="square" />
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs">
        <div className="p-3 rounded-xl bg-oriental-dark/60 border border-oriental-border space-y-1">
          <div className="text-oriental-textMuted flex items-center space-x-1">
            <Sun className="w-3.5 h-3.5 text-oriental-gold" />
            <span>Dương Lịch:</span>
          </div>
          <div className="font-mono font-bold text-oriental-textPrimary text-sm">
            {data.solarYmd}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-oriental-dark/60 border border-oriental-border space-y-1">
          <div className="text-oriental-textMuted flex items-center space-x-1">
            <Moon className="w-3.5 h-3.5 text-oriental-gold" />
            <span>Âm Lịch:</span>
          </div>
          <div className="font-serif font-bold text-oriental-textPrimary text-sm">
            {data.lunarFull}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-oriental-dark/60 border border-oriental-border space-y-1">
          <div className="text-oriental-textMuted flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-oriental-gold" />
            <span>Tứ Trụ Giờ Khắc:</span>
          </div>
          <div className="font-serif font-bold text-oriental-goldBright text-sm">
            {data.yearGz} • {data.monthGz} • {data.hourGz}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-oriental-dark/60 border border-oriental-border space-y-1">
          <div className="text-oriental-textMuted flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-oriental-redBright" />
            <span>Hướng Hỷ Thần / Tài Thần:</span>
          </div>
          <div className="font-serif font-bold text-[#1D6353] text-sm">
            {data.xiPos} / {data.caiPos}
          </div>
        </div>
      </div>
    </div>
  );
}
