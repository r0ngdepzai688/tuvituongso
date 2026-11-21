"use client";

import { LuopanCompass } from "@/components/la-ban/LuopanCompass";
import { OrientalFrame } from "@/components/decorations/OrientalFrame";
import { Compass, BookOpen } from "lucide-react";

export default function LaBanPage() {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <OrientalFrame
        variant="grand"
        cornerStyle="ruyi"
        rounded="rounded-2xl"
        innerClassName="p-5 sm:p-6 space-y-3"
      >
        <div className="text-xs uppercase font-mono tracking-wider text-[#A98A55] flex items-center space-x-1.5 font-bold">
          <Compass className="w-3.5 h-3.5 text-[#A98A55]" />
          <span>Địa Lý Phong Thủy • 24 Sơn Hướng • Bát Trạch &amp; Huyền Không</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#175A67] flex items-center space-x-2">
          <span>La Bàn Số Phong Thủy Điện Tử</span>
          <span className="font-han text-xl text-[#966F28] opacity-85 font-normal">（羅盤風水）</span>
        </h1>
        <p className="text-xs text-[#345258] leading-relaxed max-w-3xl">
          Đo đạc độ số chính xác của cửa chính, phòng làm việc hoặc mảnh đất. Kết hợp nguyên lý <strong>Hạ Nguyên Cửu Vận (2024 - 2043)</strong> để định vị cung Sinh Khí, Vượng Khí, đón Cát tránh Hung.
        </p>
      </OrientalFrame>

      {/* Render Luopan Compass */}
      <LuopanCompass />

      {/* Feng Shui Rule Reference Box */}
      <OrientalFrame
        variant="standard"
        cornerStyle="huiwen"
        rounded="rounded-2xl"
        innerClassName="p-6 space-y-4"
      >
        <h3 className="text-sm font-serif font-bold text-[#175A67] flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-[#A98A55]" />
          <span>NGUYÊN TẮC KHẢO SÁT PHONG THỦY VẬN 9 (2024 - 2043)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#345258] leading-relaxed">
          <div className="p-3.5 rounded-xl bg-[#EAE3DE]/60 border border-[#175A67]/15 space-y-1.5">
            <strong className="text-[#966F28] block text-sm">Cửu Tử Hỏa Tinh Đương Quyền:</strong>
            <p>
              Vận 9 thuộc quẻ Ly (Hỏa). Các ngành công nghệ, trí tuệ nhân tạo, văn hóa, năng lượng mới bùng nổ. Trong nhà ở, phương Nam đón vượng khí lớn nhất, cần giữ sạch sẽ, thông thoáng, đón nhận ánh sáng tự nhiên.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#EAE3DE]/60 border border-[#175A67]/15 space-y-1.5">
            <strong className="text-[#1D6353] block text-sm">Chính Thần &amp; Linh Thần:</strong>
            <p>
              "Chính thần chính vị trang, Linh thần kiến thủy cát". Phương Nam là Chính thần ưa thấy núi, gò cao hoặc điểm tựa vững chãi; phương Bắc là Linh thần ưa thấy nước (hồ bơi, bể cá, đài phun nước) để chiêu tài tụ khí.
            </p>
          </div>
        </div>
      </OrientalFrame>
    </div>
  );
}
