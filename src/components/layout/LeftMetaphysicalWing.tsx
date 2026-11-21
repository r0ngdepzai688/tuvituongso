"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Solar } from "lunar-typescript";
import { STEM_MAP, BRANCH_MAP } from "@/lib/constants/vietnameseDictionary";
import { OrientalFrame } from "../decorations/OrientalFrame";
import { AuspiciousSeal } from "../decorations/AuspiciousSeal";
import {
  Sparkles,
  Scroll,
  Shield,
  Compass,
  HeartHandshake,
  BookOpen,
  Clock,
  Library,
  ScrollText,
  BookHeart,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

const DAILY_HEXAGRAMS = [
  { name: "Thuần Càn", hanz: "乾为天", lines: [1, 1, 1, 1, 1, 1], hint: "Cương kiện tự cường, đại cát hanh thông." },
  { name: "Địa Thiên Thái", hanz: "地天泰", lines: [1, 1, 1, 0, 0, 0], hint: "Âm dương giao hòa, vạn sự hanh thông." },
  { name: "Hỏa Thiên Đại Hữu", hanz: "火天大有", lines: [1, 1, 1, 1, 0, 1], hint: "Nhật trung thiên đỉnh, tài lộc thịnh vượng." },
  { name: "Lôi Địa Dự", hanz: "雷地豫", lines: [0, 0, 0, 1, 0, 0], hint: "Thuận thời động tác, hòa lạc an khang." },
  { name: "Phong Hỏa Gia Nhân", hanz: "风火家人", lines: [1, 0, 1, 0, 1, 1], hint: "Gia đạo hòa thuận, nội ngoại tề chỉnh." },
  { name: "Thủy Lôi Truân", hanz: "水雷屯", lines: [1, 0, 0, 0, 1, 0], hint: "Khởi đầu tích lũy, kiên trì ắt thành." },
  { name: "Sơn Hỏa Bí", hanz: "山火贲", lines: [1, 0, 1, 0, 0, 1], hint: "Văn minh sáng rạng, tu dưỡng nội tâm." },
  { name: "Địa Sơn Khiêm", hanz: "地山谦", lines: [0, 0, 1, 0, 0, 0], hint: "Khiêm tốn hữu lễ, cát tường bền lâu." },
];

export function LeftMetaphysicalWing() {
  const pathname = usePathname();
  const [timeInfo, setTimeInfo] = useState<any>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const solar = Solar.fromDate(now);
      const lunar = solar.getLunar();
      const ec = lunar.getEightChar();

      const hexIdx = (lunar.getYear() + lunar.getMonth() + lunar.getDay()) % DAILY_HEXAGRAMS.length;

      setTimeInfo({
        timeStr: now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        hourBranch: BRANCH_MAP[ec.getTimeZhi()] || ec.getTimeZhi(),
        dayStem: STEM_MAP[ec.getDayGan()] || ec.getDayGan(),
        dayBranch: BRANCH_MAP[ec.getDayZhi()] || ec.getDayZhi(),
        solarTerm: lunar.getPrevJieQi(true).getName(),
        hexagram: DAILY_HEXAGRAMS[hexIdx],
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const coreTools = [
    { href: "/tu-vi", label: "Tử Vi Đẩu Số", icon: Sparkles, hanz: "紫微" },
    { href: "/bat-tu", label: "Tứ Trụ Bát Tự", icon: Scroll, hanz: "八字" },
    { href: "/hop-luan", label: "Hợp Luận & K-Line", icon: TrendingUp, hanz: "合璧" },
    { href: "/ky-mon", label: "Kỳ Môn Độn Giáp", icon: Shield, hanz: "奇门" },
    { href: "/lich-van-nien", label: "Lịch Vạn Niên", icon: CalendarDays, hanz: "择日" },
    { href: "/la-ban", label: "La Bàn Phong Thủy", icon: Compass, hanz: "罗盘" },
    { href: "/hop-hon", label: "Hợp Hôn", icon: HeartHandshake, hanz: "合婚" },
  ];

  const classicBooks = [
    { href: "/tai-lieu", label: "Cổ Thư (Trung – Việt)", icon: Library, hanz: "古籍" },
    { href: "/tang-kinh-cac", label: "Tàng Kinh Các", icon: BookOpen, hanz: "经阁" },
    { href: "/van-khan", label: "Văn Khấn Cổ Truyền", icon: ScrollText, hanz: "祭文" },
    { href: "/phong-tuc", label: "Phong Tục 3 Miền", icon: BookHeart, hanz: "風俗" },
  ];

  return (
    <aside className="hidden xl:flex flex-col w-60 2xl:w-64 space-y-3.5 flex-shrink-0 select-none sticky top-20 h-fit">
      {/* 1. Real-time Astronomical Clock Card */}
      <OrientalFrame
        variant="minimal"
        rounded="rounded-2xl"
        innerClassName="p-3.5 space-y-2"
      >
        <div className="flex items-center justify-between border-b border-[#175A67]/15 pb-1.5">
          <div className="flex items-center space-x-1.5 text-[#175A67] text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>Thời Khắc Thiên Cơ</span>
          </div>
          <AuspiciousSeal text="吉时" subtext="" shape="circle" className="p-0.5 scale-90" />
        </div>

        {timeInfo ? (
          <div className="space-y-1">
            <div className="text-2xl font-serif font-bold text-[#175A67] font-mono tracking-tight">
              {timeInfo.timeStr}
            </div>
            <div className="text-xs text-[#2A444A] space-y-0.5">
              <div>Giờ: <strong className="text-[#966F28]">{timeInfo.hourBranch}</strong> (Thời thần)</div>
              <div>Ngày: <strong className="text-[#12343B]">{timeInfo.dayStem} {timeInfo.dayBranch}</strong></div>
              <div>Tiết khí: <strong className="text-[#1D6353]">{timeInfo.solarTerm}</strong></div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-[#3B585F] py-3">Đang đồng bộ lịch pháp...</div>
        )}
      </OrientalFrame>

      {/* 2. Quick Access Menu with Clean Categorization */}
      <OrientalFrame
        variant="minimal"
        rounded="rounded-2xl"
        innerClassName="p-2.5 space-y-2"
      >
        {/* Nhóm 1: Thuật Số Chính Tông */}
        <div>
          <div className="text-[10px] font-mono tracking-wider text-[#3B585F] font-bold px-2 py-1 flex items-center justify-between uppercase">
            <span>Thuật Số Chính Tông</span>
            <span className="font-han text-xs text-[#966F28]">六門</span>
          </div>
          <div className="space-y-0.5">
            {coreTools.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#175A67] text-[#FAF7F2] font-semibold shadow-sm"
                      : "text-[#2A444A] hover:text-[#175A67] hover:bg-[#EAE3DE]/80"
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-[#FAF7F2]" : "text-[#175A67]"}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span className={`font-han text-xs flex-shrink-0 ml-1 ${isActive ? "text-[#FAF7F2]/90" : "text-[#966F28]"}`}>
                    {item.hanz}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Nhóm 2: Tàng Thư & Văn Hóa */}
        <div className="pt-1 border-t border-[#175A67]/10">
          <div className="text-[10px] font-mono tracking-wider text-[#3B585F] font-bold px-2 py-1 flex items-center justify-between uppercase">
            <span>Tàng Thư & Văn Hóa</span>
            <span className="font-han text-xs text-[#966F28]">經典</span>
          </div>
          <div className="space-y-0.5">
            {classicBooks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#175A67] text-[#FAF7F2] font-semibold shadow-sm"
                      : "text-[#2A444A] hover:text-[#175A67] hover:bg-[#EAE3DE]/80"
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-[#FAF7F2]" : "text-[#175A67]"}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span className={`font-han text-xs flex-shrink-0 ml-1 ${isActive ? "text-[#FAF7F2]/90" : "text-[#966F28]"}`}>
                    {item.hanz}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </OrientalFrame>

      {/* 3. Daily I-Ching Hexagram Vector (Quẻ Dịch Hôm Nay) */}
      {timeInfo?.hexagram && (
        <OrientalFrame
          variant="minimal"
          rounded="rounded-2xl"
          innerClassName="p-3.5 space-y-2"
        >
          <div className="flex items-center justify-between border-b border-[#175A67]/12 pb-1.5">
            <span className="text-[11px] font-mono font-bold text-[#175A67]">Quẻ Dịch Nhật Dụng</span>
            <span className="font-han text-xs text-[#966F28]">{timeInfo.hexagram.hanz}</span>
          </div>

          <div className="flex items-center space-x-3">
            <svg viewBox="0 0 48 54" className="w-10 h-11 flex-shrink-0 text-[#175A67]" aria-hidden="true">
              {[...timeInfo.hexagram.lines].reverse().map((bit: number, idx: number) => {
                const y = 5 + idx * 8.5;
                return bit === 1 ? (
                  <rect key={idx} x="2" y={y} width="44" height="4.5" rx="1.5" fill="currentColor" />
                ) : (
                  <g key={idx}>
                    <rect x="2" y={y} width="19" height="4.5" rx="1.5" fill="currentColor" />
                    <rect x="27" y={y} width="19" height="4.5" rx="1.5" fill="currentColor" />
                  </g>
                );
              })}
            </svg>
            <div className="space-y-0.5 text-xs min-w-0">
              <div className="font-serif font-bold text-[#175A67] truncate">{timeInfo.hexagram.name}</div>
              <p className="text-[11px] text-[#345258] leading-tight line-clamp-2">{timeInfo.hexagram.hint}</p>
            </div>
          </div>
        </OrientalFrame>
      )}
    </aside>
  );
}
