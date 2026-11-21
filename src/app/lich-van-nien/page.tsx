"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Solar } from "lunar-typescript";
import { STEM_MAP, BRANCH_MAP } from "@/lib/constants/vietnameseDictionary";
import { OrientalFrame } from "@/components/decorations/OrientalFrame";
import { AuspiciousSeal } from "@/components/decorations/AuspiciousSeal";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  Compass,
  ScrollText,
  Sparkles,
  Sun,
} from "lucide-react";

const DIR_VI: Record<string, string> = {
  东南: "Đông Nam", 正北: "Chính Bắc", 东北: "Đông Bắc", 西南: "Tây Nam",
  正西: "Chính Tây", 正东: "Chính Đông", 正南: "Chính Nam", 西北: "Tây Bắc",
};

const ZHIXING_VI: Record<string, { vi: string; nature: string }> = {
  建: { vi: "Trực Kiến", nature: "Cát (Khởi đầu, xuất hành)" },
  除: { vi: "Trực Trừ", nature: "Cát (Tẩy uế, chữa bệnh, giải trừ)" },
  满: { vi: "Trực Mãn", nature: "Cát (Khai trương, ký kết, cầu tài)" },
  平: { vi: "Trực Bình", nature: "Trung (Sửa sang, bình ổn)" },
  定: { vi: "Trực Định", nature: "Cát (Cưới hỏi, giao dịch, ký hợp đồng)" },
  执: { vi: "Trực Chấp", nature: "Trung (Xây dựng, khởi công)" },
  破: { vi: "Trực Phá", nature: "Hung (Nên dỡ bỏ cũ, tránh khởi sự lớn)" },
  危: { vi: "Trực Nguy", nature: "Hung (Thận trọng đi xa, leo cao)" },
  成: { vi: "Trực Thành", nature: "Đại Cát (Khai trương, nhập trạch, cưới hỏi)" },
  收: { vi: "Trực Thu", nature: "Cát (Thu hoạch, nạp tài, giao dịch)" },
  开: { vi: "Trực Khai", nature: "Đại Cát (Khai trương, động thổ, xuất hành)" },
  闭: { vi: "Trực Bế", nature: "Hung (Nên tĩnh dưỡng, tránh khởi sự)" },
};

const HOUR_BRANCHES = [
  { zhi: "Tý", range: "23h–01h" },
  { zhi: "Sửu", range: "01h–03h" },
  { zhi: "Dần", range: "03h–05h" },
  { zhi: "Mão", range: "05h–07h" },
  { zhi: "Thìn", range: "07h–09h" },
  { zhi: "Tỵ", range: "09h–11h" },
  { zhi: "Ngọ", range: "11h–13h" },
  { zhi: "Mùi", range: "13h–15h" },
  { zhi: "Thân", range: "15h–17h" },
  { zhi: "Dậu", range: "17h–19h" },
  { zhi: "Tuất", range: "19h–21h" },
  { zhi: "Hợi", range: "21h–23h" },
];

const YI_JI_VI: Record<string, string> = {
  祭祀: "Cúng tế", 祈福: "Cầu phúc", 求嗣: "Cầu tự", 开光: "Khai quang",
  出行: "Xuất hành", 嫁娶: "Cưới hỏi", 纳采: "Ăn hỏi", 订盟: "Đính ước",
  动土: "Động thổ", 破土: "Phá thổ", 安葬: "An táng", 入宅: "Nhập trạch",
  移徙: "Chuyển nhà", 开市: "Khai trương", 交易: "Giao dịch", 立券: "Ký hợp đồng",
  纳财: "Nạp tài", 栽种: "Trồng cây", 修造: "Tu sửa nhà", 安床: "Kê giường",
  沐浴: "Tắm gội", 理发: "Cắt tóc", 会亲友: "Gặp gỡ thân hữu", 解除: "Giải trừ",
  求医: "Khám chữa bệnh", 治病: "Trị bệnh", 扫舍: "Dọn dẹp nhà cửa",
  词讼: "Kiện tụng", 掘井: "Đào giếng", 伐木: "Chặt cây", 作灶: "Đặt bếp",
  上梁: "Cất nóc", 竖柱: "Dựng cột", 盖屋: "Lợp mái", 经络: "Khai thác",
  安门: "Lắp cửa", 启攒: "Cải táng", 挂匾: "Treo biển hiệu",
};

function translateTerms(list: string[]): string[] {
  return list.slice(0, 10).map((item) => YI_JI_VI[item] || item);
}

export default function LichVanNienPage() {
  const todayStr = new Date().toISOString().split("T")[0];
  const [dateStr, setDateStr] = useState(todayStr);

  const shiftDay = (delta: number) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    const dt = new Date(y, m - 1, d + delta);
    setDateStr(
      `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`
    );
  };

  const dayInfo = useMemo(() => {
    const [y, m, d] = dateStr.split("-").map(Number);
    const solar = Solar.fromYmd(y || 2026, m || 1, d || 1);
    const lunar = solar.getLunar();
    const ec = lunar.getEightChar();

    const zhiXingRaw = lunar.getZhiXing();
    const zhiXing = ZHIXING_VI[zhiXingRaw] || { vi: `Trực ${zhiXingRaw}`, nature: "Trung bình" };
    const tianShenLuck = lunar.getDayTianShenLuck(); // 吉 or 凶
    const isHoangDao = tianShenLuck === "吉";

    // Compute 12 hours Hoàng Đạo / Hắc Đạo
    const times = lunar.getTimes().slice(0, 12).map((t, idx) => ({
      ...(HOUR_BRANCHES[idx] || { zhi: "", range: "" }),
      luck: t.getTianShenLuck() === "吉" ? "Hoàng Đạo" : "Hắc Đạo",
      isGood: t.getTianShenLuck() === "吉",
    }));

    const lunarDay = lunar.getDay();
    const lunarMonth = lunar.getMonth();
    let suggestedPrayerId = "mung-1-ram-gia-tien";
    let suggestedPrayerLabel = "Mở Văn Khấn Mùng 1 / Rằm & Cầu An";
    if (lunarMonth === 12 && lunarDay === 23) {
      suggestedPrayerId = "ong-cong-ong-tao";
      suggestedPrayerLabel = "Mở Văn Khấn Ông Công Ông Táo (23 Chạp)";
    } else if (lunarMonth === 7 && lunarDay === 15) {
      suggestedPrayerId = "vu-lan-ram-thang-7";
      suggestedPrayerLabel = "Mở Văn Khấn Lễ Vu Lan Báo Hiếu";
    } else if (lunarMonth === 5 && lunarDay === 5) {
      suggestedPrayerId = "tet-doan-ngo-5-5";
      suggestedPrayerLabel = "Mở Văn Khấn Tết Đoan Ngọ (5/5)";
    } else if (lunarMonth === 8 && lunarDay === 15) {
      suggestedPrayerId = "tet-trung-thu-15-8";
      suggestedPrayerLabel = "Mở Văn Khấn Tết Trung Thu (15/8)";
    }

    return {
      solarFormatted: `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`,
      weekday: `Thứ ${solar.getWeek() === 0 ? "Chủ Nhật" : solar.getWeek() + 1}`.replace("Thứ Chủ Nhật", "Chủ Nhật"),
      lunarDay,
      lunarMonth,
      yearCanChi: `${STEM_MAP[ec.getYearGan()] || ec.getYearGan()} ${BRANCH_MAP[ec.getYearZhi()] || ec.getYearZhi()}`,
      monthCanChi: `${STEM_MAP[ec.getMonthGan()] || ec.getMonthGan()} ${BRANCH_MAP[ec.getMonthZhi()] || ec.getMonthZhi()}`,
      dayCanChi: `${STEM_MAP[ec.getDayGan()] || ec.getDayGan()} ${BRANCH_MAP[ec.getDayZhi()] || ec.getDayZhi()}`,
      dayNaYin: lunar.getDayNaYin(),
      solarTerm: lunar.getPrevJieQi(true).getName(),
      zhiXing,
      xiu: `${lunar.getXiu()} (${lunar.getXiuLuck()})`,
      isHoangDao,
      tianShen: lunar.getDayTianShen(),
      yiList: translateTerms(lunar.getDayYi()),
      jiList: translateTerms(lunar.getDayJi()),
      pengZu: `${lunar.getPengZuGan()} • ${lunar.getPengZuZhi()}`,
      xiPos: DIR_VI[lunar.getPositionXiDesc()] || lunar.getPositionXiDesc(),
      caiPos: DIR_VI[lunar.getPositionCaiDesc()] || lunar.getPositionCaiDesc(),
      fuPos: DIR_VI[lunar.getPositionFuDesc()] || lunar.getPositionFuDesc(),
      times,
      suggestedPrayerId,
      suggestedPrayerLabel,
    };
  }, [dateStr]);

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Header & Date Selector */}
      <OrientalFrame
        variant="grand"
        rounded="rounded-2xl"
        innerClassName="p-6 sm:p-8 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#175A67]/15 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#966F28] flex items-center space-x-1.5">
              <CalendarDays className="w-4 h-4" />
              <span>Hiệp Kỷ Biện Phương Thư • Lịch Pháp Đông Phương Chuẩn Xác</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#175A67] mt-1">
              Lịch Vạn Niên &amp; Trạch Nhật Chọn Ngày Tốt
            </h1>
          </div>
          <AuspiciousSeal
            text={dayInfo.isHoangDao ? "黄道" : "黑道"}
            subtext={dayInfo.isHoangDao ? "HOÀNG ĐẠO" : "HẮC ĐẠO"}
            shape="square"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => shiftDay(-1)}
              className="p-2 rounded-xl bg-[#EAE3DE] hover:bg-[#175A67] text-[#175A67] hover:text-[#EAE3DE] transition-colors"
              title="Ngày hôm trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <input
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="bg-[#EAE3DE]/70 border border-[#175A67]/25 rounded-xl px-3.5 py-2 text-sm font-mono text-[#12343B] focus:outline-none focus:border-[#175A67]"
            />
            <button
              onClick={() => shiftDay(1)}
              className="p-2 rounded-xl bg-[#EAE3DE] hover:bg-[#175A67] text-[#175A67] hover:text-[#EAE3DE] transition-colors"
              title="Ngày hôm sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDateStr(todayStr)}
              className="px-3 py-2 rounded-xl bg-[#175A67]/10 hover:bg-[#175A67] text-[#175A67] hover:text-[#EAE3DE] text-xs font-semibold transition-colors"
            >
              Hôm Nay
            </button>
          </div>

          <Link
            href={`/van-khan?id=${dayInfo.suggestedPrayerId}`}
            className="px-4 py-2 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#EAE3DE] text-xs font-semibold flex items-center space-x-1.5 shadow-tealGlow transition-all"
          >
            <ScrollText className="w-3.5 h-3.5" />
            <span>{dayInfo.suggestedPrayerLabel}</span>
          </Link>
        </div>
      </OrientalFrame>

      {/* Main Almanac Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Solar/Lunar Big Card */}
        <OrientalFrame
          variant="standard"
          rounded="rounded-2xl"
          className="lg:col-span-5 animate-scroll-unfurl"
          innerClassName="p-6 space-y-5"
        >
          <div className="text-center space-y-1 pb-4 border-b border-[#175A67]/15">
            <div className="text-xs font-mono uppercase text-[#966F28]">{dayInfo.weekday} • Dương Lịch</div>
            <div className="text-4xl font-serif font-bold text-[#175A67]">{dayInfo.solarFormatted}</div>
            <div className="inline-flex items-center space-x-2 mt-2 px-3 py-1 rounded-full bg-[#175A67]/10 text-[#175A67] text-xs font-semibold">
              <Sun className="w-3.5 h-3.5 text-[#966F28]" />
              <span>
                Âm Lịch: Ngày {dayInfo.lunarDay} tháng {dayInfo.lunarMonth} • Năm {dayInfo.yearCanChi}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#EAE3DE]/55 border border-[#175A67]/15">
              <span className="text-[#5E777D] block text-[10px]">Can Chi Ngày</span>
              <strong className="text-[#175A67] text-sm">{dayInfo.dayCanChi}</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#EAE3DE]/55 border border-[#175A67]/15">
              <span className="text-[#5E777D] block text-[10px]">Can Chi Tháng</span>
              <strong className="text-[#175A67] text-sm">{dayInfo.monthCanChi}</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#EAE3DE]/55 border border-[#175A67]/15">
              <span className="text-[#5E777D] block text-[10px]">12 Kiến Trừ</span>
              <strong className="text-[#966F28] text-sm">{dayInfo.zhiXing.vi}</strong>
              <span className="block text-[10px] text-[#345258] mt-0.5">{dayInfo.zhiXing.nature}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#EAE3DE]/55 border border-[#175A67]/15">
              <span className="text-[#5E777D] block text-[10px]">Tiết Khí &amp; Nhị Thập Bát Tú</span>
              <strong className="text-[#1D6353] text-sm">{dayInfo.solarTerm}</strong>
              <span className="block text-[10px] text-[#345258] mt-0.5">Sao {dayInfo.xiu}</span>
            </div>
          </div>

          {/* Auspicious Directions */}
          <div className="p-3.5 rounded-xl bg-[#175A67]/[0.06] border border-[#175A67]/20 space-y-1.5 text-xs">
            <div className="font-semibold text-[#175A67] flex items-center space-x-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Hướng Xuất Hành Cát Lợi:</span>
            </div>
            <div className="flex flex-wrap gap-3 text-[#12343B]">
              <span>Hỷ Thần: <strong className="text-[#1D6353]">{dayInfo.xiPos}</strong></span>
              <span>Tài Thần: <strong className="text-[#966F28]">{dayInfo.caiPos}</strong></span>
              <span>Phúc Thần: <strong className="text-[#175A67]">{dayInfo.fuPos}</strong></span>
            </div>
          </div>
        </OrientalFrame>

        {/* Right: Nghi / Kỵ + 12 Giờ Hoàng Đạo */}
        <div className="lg:col-span-7 space-y-5">
          {/* Nghi & Kỵ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <OrientalFrame
              variant="standard"
              rounded="rounded-2xl"
              innerClassName="p-5 space-y-3"
            >
              <h3 className="font-serif font-bold text-sm text-[#165B46] flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#165B46]" />
                <span>Việc Nên Làm (Nghi)</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {dayInfo.yiList.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#1D6353]/10 text-[#165B46] border border-[#1D6353]/25 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </OrientalFrame>

            <OrientalFrame
              variant="standard"
              rounded="rounded-2xl"
              innerClassName="p-5 space-y-3"
            >
              <h3 className="font-serif font-bold text-sm text-[#9B2921] flex items-center space-x-2">
                <XCircle className="w-4 h-4 text-[#9B2921]" />
                <span>Việc Nên Tránh (Kỵ)</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {dayInfo.jiList.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#B83A32]/10 text-[#9B2921] border border-[#B83A32]/25 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </OrientalFrame>
          </div>

          {/* 12 Giờ Hoàng Đạo / Hắc Đạo */}
          <OrientalFrame
            variant="standard"
            rounded="rounded-2xl"
            innerClassName="p-5 space-y-3"
          >
            <h3 className="font-serif font-bold text-sm text-[#175A67] flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#966F28]" />
              <span>12 Canh Giờ Hoàng Đạo &amp; Hắc Đạo Trong Ngày</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {dayInfo.times.map((t) => (
                <div
                  key={t.zhi}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    t.isGood
                      ? "bg-[#1D6353]/10 border-[#1D6353]/30 text-[#165B46] font-medium"
                      : "bg-[#EAE3DE]/60 border-[#175A67]/12 text-[#3B585F]"
                  }`}
                >
                  <div className="font-bold">
                    Giờ {t.zhi} {t.isGood ? "✦" : ""}
                  </div>
                  <div className="text-[10px] font-mono">{t.range}</div>
                  <div className="text-[10px] font-semibold mt-0.5">{t.luck}</div>
                </div>
              ))}
            </div>
          </OrientalFrame>

          {/* Bành Tổ Bách Kỵ */}
          <OrientalFrame
            variant="minimal"
            rounded="rounded-2xl"
            innerClassName="p-4 text-xs text-[#2A444A] flex items-start space-x-2"
          >
            <Sparkles className="w-4 h-4 text-[#966F28] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#175A67]">Bành Tổ Bách Kỵ: </strong>
              {dayInfo.pengZu}
            </div>
          </OrientalFrame>
        </div>
      </div>
    </div>
  );
}
