import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CelestialBackground } from "@/components/decorations/CelestialBackground";
import { LeftMetaphysicalWing } from "@/components/layout/LeftMetaphysicalWing";
import { RightMetaphysicalWing } from "@/components/layout/RightMetaphysicalWing";

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kỳ Thư Cổ Môn | Nền Tảng Trí Tuệ Nhân Tạo Thuật Số Đông Phương",
  description: "Hệ thống Tử Vi Đẩu Số, Tứ Trụ Bát Tự, Kỳ Môn Độn Giáp, La Bàn Phong Thủy, Lịch Vạn Niên, Văn Khấn & 47 Bộ Cổ Thư Song Ngữ.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${lora.variable} ${plusJakarta.variable}`}>
      <body className="bg-oriental-cream min-h-screen flex flex-col bg-warm-mystic text-oriental-textPrimary antialiased selection:bg-oriental-ink selection:text-oriental-cream">
        {/* Hand-drawn Teal Ink Landscape & Celestial Video Backdrop */}
        <CelestialBackground />

        {/* Global Navigation Header */}
        <Navbar />

        {/* Main Content Area with Left & Right Metaphysical Wings (Thanh Long & Bạch Hổ) */}
        <div className="flex-1 w-full max-w-[1920px] mx-auto px-3 sm:px-5 lg:px-6 py-5 z-10">
          <div className="flex justify-between items-start gap-5 xl:gap-6 w-full">
            {/* Left Metaphysical Wing (Tả Thanh Long) */}
            <LeftMetaphysicalWing />

            {/* Central Master Canvas (Trung Ương Thái Cực) */}
            <main className="flex-1 min-w-0 max-w-full">
              {children}
            </main>

            {/* Right Metaphysical Wing (Hữu Bạch Hổ) */}
            <RightMetaphysicalWing />
          </div>
        </div>

        {/* Global Metaphysical Teal Landscape Footer */}
        <Footer />
      </body>
    </html>
  );
}
