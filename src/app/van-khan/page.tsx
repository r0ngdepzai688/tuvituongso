"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Solar } from "lunar-typescript";
import { STEM_MAP, BRANCH_MAP } from "@/lib/constants/vietnameseDictionary";
import { VAN_KHAN_LIST, VAN_KHAN_CATEGORIES, VanKhanItem } from "@/lib/data/vanKhanData";
import { OrientalFrame } from "@/components/decorations/OrientalFrame";
import { AuspiciousSeal } from "@/components/decorations/AuspiciousSeal";
import {
  ScrollText,
  Search,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  Sparkles,
  User,
  MapPin,
  Calendar,
  BookHeart,
  CheckCircle2,
  Info,
} from "lucide-react";

function VanKhanContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedPrayer, setSelectedPrayer] = useState<VanKhanItem>(VAN_KHAN_LIST[0]);

  // Personalization state
  const [giaChu, setGiaChu] = useState("Nguyễn Văn A (cùng toàn thể gia quyến)");
  const [diaChi, setDiaChi] = useState("Số nhà ..., Phường/Xã ..., Quận/Huyện ..., Tỉnh/TP ...");
  const [nguoiGio, setNguoiGio] = useState("Hiển Khảo / Hiển Tỷ (Họ tên người đã khuất)");
  const [lunarInfo, setLunarInfo] = useState({ ngayAm: "mùng 1 tháng Giêng", namAm: "Bính Ngọ" });

  // Reader UX state
  const [fontSize, setFontSize] = useState(17);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const solar = Solar.fromDate(new Date());
    const lunar = solar.getLunar();
    const ec = lunar.getEightChar();

    const yearStem = STEM_MAP[ec.getYearGan()] || ec.getYearGan();
    const yearBranch = BRANCH_MAP[ec.getYearZhi()] || ec.getYearZhi();
    const dayNum = lunar.getDay();
    const monthNum = lunar.getMonth();
    const dayStr = dayNum <= 10 ? `mùng ${dayNum}` : `${dayNum}`;
    const monthStr = monthNum === 1 ? "Giêng" : monthNum === 12 ? "Chạp" : `${monthNum}`;

    setLunarInfo({
      ngayAm: `${dayStr} tháng ${monthStr} (Âm lịch)`,
      namAm: `${yearStem} ${yearBranch}`,
    });
  }, []);

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      const found = VAN_KHAN_LIST.find((v) => v.id === idParam);
      if (found) setSelectedPrayer(found);
    }
  }, [searchParams]);

  const filteredList = VAN_KHAN_LIST.filter((item) => {
    const matchCat = category === "all" || item.category === category;
    const q = search.toLowerCase();
    const matchSearch =
      item.title.toLowerCase().includes(q) ||
      item.occasion.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const renderPrayerText = (raw: string) => {
    return raw
      .replace(/\{\{NGAY_AM\}\}/g, lunarInfo.ngayAm)
      .replace(/\{\{NAM_AM\}\}/g, lunarInfo.namAm)
      .replace(/\{\{GIA_CHU\}\}/g, giaChu.trim() || "............................")
      .replace(/\{\{DIA_CHI\}\}/g, diaChi.trim() || "............................")
      .replace(/\{\{NGUOI_GIO\}\}/g, nguoiGio.trim() || "............................");
  };

  const finalText = renderPrayerText(selectedPrayer.content);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Header Banner */}
      <OrientalFrame
        variant="grand"
        rounded="rounded-2xl"
        innerClassName="p-6 sm:p-8 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#175A67]/15 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#966F28] flex items-center space-x-1.5">
              <ScrollText className="w-4 h-4" />
              <span>Văn Hóa Tâm Linh Việt Nam • Tự Động Điền Lịch Âm &amp; Can Chi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#175A67] mt-1">
              Văn Khấn Cổ Truyền Việt Nam
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/phong-tuc"
              className="px-3.5 py-2 rounded-xl bg-[#EAE3DE] hover:bg-[#175A67] text-[#175A67] hover:text-[#EAE3DE] border border-[#175A67]/25 text-xs font-semibold transition-all flex items-center space-x-1.5"
            >
              <BookHeart className="w-3.5 h-3.5" />
              <span>Xem Phong Tục 3 Miền</span>
            </Link>
            <AuspiciousSeal text="虔诚" subtext="THÀNH TÂM" shape="square" />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#345258] leading-relaxed mt-3 max-w-3xl">
          Tuyển tập các bài văn khấn chuẩn mực theo <em>Văn Khấn Cổ Truyền Việt Nam</em> cho các dịp Mùng 1, Rằm, Lễ Tết, Cúng Giỗ, Nhập Trạch, Khai Trương. Hệ thống tự động cập nhật <strong>ngày Âm lịch hôm nay ({lunarInfo.ngayAm}, năm {lunarInfo.namAm})</strong> và tên gia chủ vào thẳng bài khấn.
        </p>

        {/* Personalization Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 p-4 rounded-xl bg-[#EAE3DE]/55 border border-[#175A67]/15">
          <div>
            <label className="text-[11px] font-semibold text-[#175A67] flex items-center space-x-1 mb-1">
              <User className="w-3.5 h-3.5" />
              <span>Tên Tín Chủ (Gia Chủ)</span>
            </label>
            <input
              type="text"
              value={giaChu}
              onChange={(e) => setGiaChu(e.target.value)}
              className="w-full bg-[#F8F4F0] border border-[#175A67]/25 rounded-lg px-3 py-1.5 text-xs text-[#12343B] focus:outline-none focus:border-[#175A67]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#175A67] flex items-center space-x-1 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Địa Chỉ Cư Ngụ</span>
            </label>
            <input
              type="text"
              value={diaChi}
              onChange={(e) => setDiaChi(e.target.value)}
              className="w-full bg-[#F8F4F0] border border-[#175A67]/25 rounded-lg px-3 py-1.5 text-xs text-[#12343B] focus:outline-none focus:border-[#175A67]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#175A67] flex items-center space-x-1 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{selectedPrayer.needsDeceasedName ? "Họ Tên Người Được Cúng Giỗ" : "Ngày Âm Lịch Tự Động"}</span>
            </label>
            {selectedPrayer.needsDeceasedName ? (
              <input
                type="text"
                value={nguoiGio}
                onChange={(e) => setNguoiGio(e.target.value)}
                className="w-full bg-[#F8F4F0] border border-[#966F28]/50 rounded-lg px-3 py-1.5 text-xs text-[#12343B] focus:outline-none focus:border-[#175A67]"
              />
            ) : (
              <div className="w-full bg-[#F8F4F0]/80 border border-[#175A67]/15 rounded-lg px-3 py-1.5 text-xs font-mono text-[#175A67]">
                {lunarInfo.ngayAm} • Năm {lunarInfo.namAm}
              </div>
            )}
          </div>
        </div>

        {/* Category Filter & Search */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#175A67] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm bài văn khấn (Rằm, Giao Thừa, Ông Táo, Giỗ, Khai Trương...)"
              className="w-full bg-[#EAE3DE]/55 border border-[#175A67]/25 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-[#12343B] placeholder:text-[#5E777D] focus:outline-none focus:border-[#175A67]"
            />
          </div>
          <div className="flex space-x-1.5 overflow-x-auto pb-1 bg-[#EAE3DE]/70 p-1 rounded-xl border border-[#175A67]/20">
            {VAN_KHAN_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  category === c.id
                    ? "bg-[#175A67] text-[#FAF7F2] shadow-sm"
                    : "text-[#345258] hover:text-[#175A67]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </OrientalFrame>

      {/* Main Split Workspace: List on Left + Altar Reading Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List */}
        <div className="lg:col-span-4 space-y-2.5 max-h-[820px] overflow-y-auto pr-1">
          {filteredList.map((item) => {
            const isSelected = selectedPrayer.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedPrayer(item)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all card-hover-lift ${
                  isSelected
                    ? "bg-[#175A67] text-[#FAF7F2] border-[#175A67] shadow-tealGlow"
                    : "bg-[#FAF7F2]/90 text-[#12343B] border-[#175A67]/18 hover:border-[#175A67]/50"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                      isSelected ? "bg-[#FAF7F2]/20 text-[#FAF7F2]" : "bg-[#EAE3DE] text-[#966F28]"
                    }`}
                  >
                    {item.categoryLabel}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                      isSelected ? "bg-[#FAF7F2]/20 text-[#FAF7F2]" : "bg-[#175A67]/10 text-[#175A67]"
                    }`}
                  >
                    {item.monthTag}
                  </span>
                </div>
                <div className="font-serif font-bold text-sm leading-snug">{item.title}</div>
                <div className={`text-[11px] mt-1 line-clamp-2 ${isSelected ? "text-[#FAF7F2]/80" : "text-[#5E777D]"}`}>
                  {item.occasion}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Altar Reader */}
        <OrientalFrame
          variant="grand"
          rounded="rounded-2xl"
          className="lg:col-span-8 animate-scroll-unfurl"
          innerClassName="overflow-hidden"
        >
          {/* Reader Toolbar */}
          <div className="p-4 sm:p-5 border-b border-[#175A67]/15 bg-[#EAE3DE]/45 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-mono text-[#966F28] uppercase">{selectedPrayer.categoryLabel}</span>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[#175A67]">{selectedPrayer.title}</h2>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-[#F8F4F0] px-2 py-1 rounded-xl border border-[#175A67]/20">
                <button
                  onClick={() => setFontSize(Math.max(14, fontSize - 1))}
                  className="p-1 text-[#345258] hover:text-[#175A67]"
                  title="Giảm cỡ chữ"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-mono text-[#175A67] px-1">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(Math.min(26, fontSize + 1))}
                  className="p-1 text-[#345258] hover:text-[#175A67]"
                  title="Tăng cỡ chữ"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#EAE3DE] text-xs font-semibold flex items-center space-x-1.5 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Đã Sao Chép" : "Sao Chép"}</span>
              </button>
            </div>
          </div>

          {/* Offerings & Preparation Note */}
          <div className="p-5 sm:p-6 bg-[#EAE3DE]/25 border-b border-[#175A67]/12 space-y-3">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#175A67]">
              <Sparkles className="w-3.5 h-3.5 text-[#966F28]" />
              <span>Gợi ý sắm lễ chuẩn mực:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedPrayer.offerings.map((of, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-[#345258]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1D6353] flex-shrink-0 mt-0.5" />
                  <span>{of}</span>
                </div>
              ))}
            </div>
            <div className="flex items-start space-x-2 text-[11px] text-[#5E777D] bg-[#F8F4F0] p-2.5 rounded-lg border border-[#175A67]/12">
              <Info className="w-3.5 h-3.5 text-[#966F28] flex-shrink-0 mt-0.5" />
              <span>{selectedPrayer.note}</span>
            </div>
          </div>

          {/* Prayer Content Body (Altar Reading View) */}
          <div className="p-6 sm:p-8 md:p-10">
            <article
              className="whitespace-pre-wrap font-serif text-[#12343B] leading-loose select-text"
              style={{ fontSize: `${fontSize}px` }}
            >
              {finalText}
            </article>
          </div>
        </OrientalFrame>
      </div>
    </div>
  );
}

export default function VanKhanPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-sm text-[#175A67]">Đang tải thư viện văn khấn...</div>}>
      <VanKhanContent />
    </Suspense>
  );
}
