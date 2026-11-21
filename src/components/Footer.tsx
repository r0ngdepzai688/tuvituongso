"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { BrandLogo } from "./decorations/BrandLogo";

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260901_122529_931c22c8-8d2d-47c0-ad51-b97f56a91e42.mp4";
const POSTER_URL = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4f690bd1-881a-4192-82f2-d714d34c8fb9.png";

export function Footer() {
  return (
    <footer className="relative isolation-isolate flex flex-col min-h-[620px] overflow-hidden bg-[#EAE3DE] text-[#175A67] mt-20 border-t border-[#175A67]/15">
      {/* Full-bleed Authentic Hand-drawn Teal Ink Landscape Video (No dark scrim!) */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        <video
          className="w-full h-full object-cover object-bottom select-none motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER_URL}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div
          className="hidden motion-reduce:block absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: `url(${POSTER_URL})` }}
        />
        {/* Soft top edge seam only, preserving the full artwork */}
        <div
          className="absolute inset-x-0 top-0 h-28 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #EAE3DE 0%, rgba(234,227,222,0.6) 45%, rgba(234,227,222,0) 100%)",
          }}
        />
      </div>

      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16 flex-1 flex flex-col justify-between z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Brand & Contacts */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center space-x-3.5 group">
              <BrandLogo size="lg" className="group-hover:rotate-12 transition-transform duration-500" />
              <div>
                <h3 className="font-brand font-semibold text-2xl sm:text-3xl text-[#175A67] tracking-wide leading-none">
                  Kỳ Thư Cổ Môn
                </h3>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#2A707C] mt-1">
                  Thuật Số Đông Phương • Thủy Mặc
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#175A67]/90 leading-relaxed max-w-sm">
              Nền tảng trí tuệ nhân tạo chuyên biệt cho Thuật Số Cổ Phong Đông Phương.
              Kết hợp toán học lịch pháp chuẩn xác, 47 bộ kinh điển cổ thư và tham vấn chiến lược <strong>Xu Cát Tị Hung</strong>.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-[#175A67] pt-1">
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:phongthuy@kythucomon.vn" className="hover:underline underline-offset-4">
                  phongthuy@kythucomon.vn
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="font-mono">+84 (0) 90 000 0000</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Việt Nam • Phương Nam Cửu Tử Ly Hỏa</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Thuật Số Cổ Môn */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#175A67]">
              Thuật Số Cổ Môn
            </h4>
            <ul className="space-y-2.5 text-sm text-[#175A67]">
              <li>
                <Link href="/tu-vi" className="hover:opacity-65 hover:translate-x-0.5 inline-block transition-all">
                  Tử Vi Đẩu Số
                </Link>
              </li>
              <li>
                <Link href="/bat-tu" className="hover:opacity-65 hover:translate-x-0.5 inline-block transition-all">
                  Tứ Trụ Bát Tự
                </Link>
              </li>
              <li>
                <Link href="/ky-mon" className="hover:opacity-65 hover:translate-x-0.5 inline-block transition-all">
                  Kỳ Môn Độn Giáp
                </Link>
              </li>
              <li>
                <Link href="/la-ban" className="hover:opacity-65 hover:translate-x-0.5 inline-block transition-all">
                  La Bàn Phong Thủy
                </Link>
              </li>
              <li>
                <Link href="/hop-hon" className="hover:opacity-65 hover:translate-x-0.5 inline-block transition-all">
                  Hợp Hôn &amp; Đối Tác
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: 47 Bộ Cổ Thư Kinh Điển */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#175A67]">
              47 Bộ Cổ Thư Kinh Điển
            </h4>
            <ul className="space-y-2.5 text-sm text-[#175A67]">
              <li>
                <Link href="/tai-lieu?book=子平真诠" className="hover:opacity-65 hover:translate-x-0.5 inline-block transition-all">
                  Tử Bình Chân Thuyên (子平真诠)
                </Link>
              </li>
              <li>
                <Link href="/tai-lieu?book=滴天髓阐微" className="hover:opacity-65 hover:translate-x-0.5 inline-block transition-all">
                  Trích Thiên Tủy Xiển Vi (滴天髓)
                </Link>
              </li>
              <li>
                <Link href="/tai-lieu?book=三命通会" className="hover:opacity-65 hover:translate-x-0.5 inline-block transition-all">
                  Tam Mệnh Thông Hội (三命通会)
                </Link>
              </li>
              <li>
                <Link href="/tai-lieu?book=葬经" className="hover:opacity-65 hover:translate-x-0.5 inline-block transition-all">
                  Táng Kinh — Quách Phác (葬经)
                </Link>
              </li>
              <li>
                <Link href="/tai-lieu" className="font-semibold underline underline-offset-4 hover:opacity-70 inline-block pt-1">
                  Xem toàn bộ 47 bộ thư tịch &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Khí Vận Thư Tín */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#175A67]">
              Khí Vận Thư Tín
            </h4>
            <p className="text-sm text-[#175A67]/90 leading-relaxed">
              Nhận thông báo lịch tiết khí, ngày hoàng đạo và trích lục cổ thư chọn lọc mỗi tháng.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-sm border border-[#175A67] bg-white/45"
            >
              <label htmlFor="footer-email" className="sr-only">
                Địa chỉ email
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Để lại email của bạn"
                className="flex-1 min-w-0 bg-transparent px-3.5 py-2.5 text-sm text-[#175A67] placeholder:text-[#2A707C]/85 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Đăng ký nhận thư"
                className="w-12 bg-[#175A67] hover:bg-[#0F454F] text-[#EAE3DE] grid place-items-center transition-colors flex-shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-auto pt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#175A67]/15 text-xs text-[#175A67]">
          <p>&copy; {new Date().getFullYear()} Kỳ Thư Cổ Môn. Giữ gìn tinh hoa Thuật Số Đông Phương.</p>
          <div className="flex items-center space-x-6">
            <Link href="/tang-kinh-cac" className="hover:underline underline-offset-4">
              Tàng Kinh Các
            </Link>
            <Link href="/tai-lieu" className="hover:underline underline-offset-4">
              Thư Viện Cổ Thư
            </Link>
            <Link href="/tu-vi" className="hover:underline underline-offset-4">
              Lập Lá Số
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
