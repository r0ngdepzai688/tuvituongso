"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Sparkles,
  Scroll,
  Shield,
  HeartHandshake,
  BookOpen,
  Library,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ScrollText,
  BookHeart,
  TrendingUp,
  CalendarDays,
  Clock,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { BrandLogo } from "./decorations/BrandLogo";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown & mobile menu on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const directLinks = [
    { href: "/tu-vi", label: "Tử Vi", icon: Sparkles },
    { href: "/bat-tu", label: "Bát Tự", icon: Scroll },
    { href: "/ky-mon", label: "Kỳ Môn", icon: Shield },
  ];

  const dropdownGroups = [
    {
      id: "phong-thuy",
      label: "Phong Thủy",
      icon: Compass,
      activePaths: ["/la-ban", "/hop-hon", "/hop-luan", "/lich-van-nien", "/dinh-gio-sinh"],
      items: [
        {
          href: "/dinh-gio-sinh",
          label: "Định Canh Giờ Sinh",
          hanz: "定辰考证",
          desc: "Khảo chứng 4 trục thực chứng để khóa chuẩn giờ sinh",
          icon: Clock,
        },
        {
          href: "/hop-luan",
          label: "Song Kiếm Hợp Bích & K-Line",
          hanz: "双剑合璧",
          desc: "Đối chiếu Tử Vi × Bát Tự, Chân Thái Dương Thời & K-Line",
          icon: TrendingUp,
        },
        {
          href: "/lich-van-nien",
          label: "Lịch Vạn Niên & Trạch Nhật",
          hanz: "万年历",
          desc: "Chọn ngày Hoàng Đạo, 12 Trực & giờ tốt xuất hành",
          icon: CalendarDays,
        },
        {
          href: "/la-ban",
          label: "La Bàn Phong Thủy",
          hanz: "羅盤風水",
          desc: "24 Sơn hướng, Tam Nguyên Cửu Vận & Bát Trạch",
          icon: Compass,
        },
        {
          href: "/hop-hon",
          label: "Hợp Hôn & Đối Tác",
          hanz: "八字合婚",
          desc: "Khảo sát tương hợp Bát Tự & ngũ hành bổ khuyết",
          icon: HeartHandshake,
        },
      ],
    },
    {
      id: "co-thu",
      label: "Cổ Thư",
      icon: Library,
      activePaths: ["/tai-lieu", "/tang-kinh-cac"],
      items: [
        {
          href: "/tai-lieu",
          label: "Thư Viện Cổ Thư (47 Bộ)",
          hanz: "古籍秘庫",
          desc: "Đọc trực tuyến & tải về 2 ngôn ngữ Trung – Việt",
          icon: Library,
        },
        {
          href: "/tang-kinh-cac",
          label: "Tàng Kinh Các",
          hanz: "藏經閣",
          desc: "Tra cứu câu phú, khẩu quyết & trích lục thuật số",
          icon: BookOpen,
        },
      ],
    },
    {
      id: "van-hoa",
      label: "Văn Hóa",
      icon: BookHeart,
      activePaths: ["/van-khan", "/phong-tuc"],
      items: [
        {
          href: "/van-khan",
          label: "Văn Khấn Cổ Truyền",
          hanz: "祭文",
          desc: "Tự động điền lịch Âm, Can Chi & tên gia chủ",
          icon: ScrollText,
        },
        {
          href: "/phong-tuc",
          label: "Phong Tục 3 Miền",
          hanz: "風俗",
          desc: "Văn hóa thờ cúng Bắc – Trung – Nam kèm tranh vẽ",
          icon: BookHeart,
        },
      ],
    },
  ];

  const allMobileLinks = [
    { href: "/dinh-gio-sinh", label: "Định Canh Giờ Sinh", hanz: "定辰", icon: Clock },
    { href: "/tu-vi", label: "Tử Vi Đẩu Số", hanz: "紫微", icon: Sparkles },
    { href: "/bat-tu", label: "Tứ Trụ Bát Tự", hanz: "八字", icon: Scroll },
    { href: "/ky-mon", label: "Kỳ Môn Độn Giáp", hanz: "奇门", icon: Shield },
    { href: "/la-ban", label: "La Bàn Phong Thủy", hanz: "罗盘", icon: Compass },
    { href: "/hop-hon", label: "Hợp Hôn & Đối Tác", hanz: "合婚", icon: HeartHandshake },
    { href: "/tai-lieu", label: "Thư Viện Cổ Thư (Trung – Việt)", hanz: "古籍", icon: Library },
    { href: "/tang-kinh-cac", label: "Tàng Kinh Các", hanz: "经阁", icon: BookOpen },
    { href: "/van-khan", label: "Văn Khấn Cổ Truyền Việt Nam", hanz: "祭文", icon: ScrollText },
    { href: "/phong-tuc", label: "Phong Tục Thờ Cúng 3 Miền", hanz: "風俗", icon: BookHeart },
  ];

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 bg-[#F4EFEA]/88 backdrop-blur-md border-b border-[#175A67]/15 transition-colors shadow-[0_2px_12px_rgba(23,90,103,0.04)]"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[70px] gap-4">
          {/* Left: Clean Single-Line Brand Lockup */}
          <Link href="/" className="flex items-center space-x-2.5 group flex-shrink-0">
            <BrandLogo size="md" className="group-hover:rotate-12 transition-transform duration-500" />

            <div className="flex items-center space-x-2">
              <span className="font-calligraphy text-2xl sm:text-[26px] font-bold tracking-normal text-[#175A67] group-hover:text-[#0F454F] whitespace-nowrap transition-colors">
                Kỳ Thư Cổ Môn
              </span>
              <span
                className="hidden sm:inline-flex items-center justify-center w-5 h-5 rounded-sm bg-[#B83A32] text-[#F8F4F0] font-han text-xs leading-none select-none shadow-sm"
                title="Bí Truyền Cổ Pháp"
              >
                秘
              </span>
            </div>
          </Link>

          {/* Center: Clean 5-Item Single-Line Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Điều hướng chính">
            {directLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "text-[#175A67] font-semibold bg-[#175A67]/10"
                      : "text-[#345258] font-medium hover:text-[#175A67] hover:bg-[#175A67]/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#175A67]" : "text-[#5E777D]"}`} />
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#175A67] rounded-full" />
                  )}
                </Link>
              );
            })}

            {dropdownGroups.map((group) => {
              const Icon = group.icon;
              const isGroupActive = group.activePaths.includes(pathname);
              const isOpen = openDropdown === group.id;

              return (
                <div key={group.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(isOpen ? null : group.id)}
                    aria-expanded={isOpen}
                    className={`relative flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm whitespace-nowrap transition-all duration-200 ${
                      isGroupActive || isOpen
                        ? "text-[#175A67] font-semibold bg-[#175A67]/10"
                        : "text-[#345258] font-medium hover:text-[#175A67] hover:bg-[#175A67]/5"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${
                        isGroupActive || isOpen ? "text-[#175A67]" : "text-[#5E777D]"
                      }`}
                    />
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                    {isGroupActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#175A67] rounded-full" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-[#FAF7F2]/98 backdrop-blur-md border border-[#A98A55]/30 shadow-[0_12px_36px_rgba(23,90,103,0.12)] p-2 space-y-1 z-50 animate-rise-in">
                      {/* Viền trong chỉ thư tịch cực mảnh */}
                      <div className="absolute inset-1 rounded-[14px] border border-[#A98A55]/15 pointer-events-none" />

                      {group.items.map((item) => {
                        const ItemIcon = item.icon;
                        const isItemActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`relative z-10 flex items-start space-x-3 p-2.5 rounded-xl transition-all ${
                              isItemActive
                                ? "bg-[#175A67] text-[#FAF7F2] shadow-sm"
                                : "hover:bg-[#EAE3DE]/80 text-[#12343B]"
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                              isItemActive
                                ? "bg-[#FAF7F2]/20 text-[#FAF7F2]"
                                : "bg-[#175A67]/10 text-[#175A67]"
                            }`}>
                              <ItemIcon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center space-x-1.5">
                                <span className="text-sm font-semibold whitespace-nowrap">{item.label}</span>
                                <span className={`font-han text-xs ${isItemActive ? "text-[#FAF7F2]/80" : "text-[#966F28]"}`}>{item.hanz}</span>
                              </div>
                              <p className={`text-[11px] leading-snug mt-0.5 ${isItemActive ? "text-[#FAF7F2]/80" : "text-[#5E777D]"}`}>{item.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right: Practical Action CTA */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <Link
              href="/tu-vi"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#EAE3DE] text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 shadow-tealGlow"
            >
              <span>Lập Lá Số</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#F8F4F0] border border-[#175A67]/20 text-[#175A67] hover:bg-[#175A67]/10 transition-colors"
              aria-label="Mở trình đơn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2]/98 backdrop-blur-md border-b border-[#A98A55]/30 px-4 py-3 space-y-1 shadow-[0_12px_32px_rgba(23,90,103,0.1)] animate-rise-in">
          {allMobileLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#175A67] text-[#FAF7F2] font-semibold shadow-sm"
                    : "text-[#345258] hover:bg-[#EAE3DE]/80 hover:text-[#175A67]"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#FAF7F2]" : "text-[#175A67]"}`} />
                  <span>{link.label}</span>
                </div>
                <span className={`font-han text-xs ${isActive ? "text-[#FAF7F2]/80" : "text-[#966F28]"}`}>{link.hanz}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
