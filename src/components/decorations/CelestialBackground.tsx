"use client";

import React from "react";
import { MetaphysicalVectorLayers } from "./MetaphysicalVectorLayers";

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260901_122529_931c22c8-8d2d-47c0-ad51-b97f56a91e42.mp4";
const POSTER_URL = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4f690bd1-881a-4192-82f2-d714d34c8fb9.png";

/**
 * Panorama Sơn Thủy Thủy Mặc Đa Tầng (Refined Scholarly Landscape Panorama)
 * - Nền giấy ngà cổ Warm Ivory / Aged Rice Paper (#F4EFEA) làm gốc.
 * - Tranh thủy mặc mềm mại (sắc mực đạm loãng, opacity ~38%-42%) giàu không gian âm (Negative Space).
 * - Trung tâm: Núi xa mờ ảo, mặt nước phẳng lặng, sương khói bồng bềnh che mờ dịu êm (~90% che phủ) để tôn vinh Hero & Form.
 * - Hai biên sườn: Cụm tùng bách và vách núi cổ thụ tự nhiên ôm trọn thư phòng.
 * - Chân trang: Núi và mặt nước mờ dần vào nền giấy dó bằng dải sương mù sâu rộng (loại bỏ hoàn toàn dải đá dày đặc).
 */
export function CelestialBackground() {
  return (
    <>
      <div
        className="fixed inset-x-0 top-0 h-[100vh] pointer-events-none z-0 overflow-hidden select-none bg-[#F4EFEA]"
        aria-hidden="true"
      >
        {/* Layer Tranh Thủy Mặc Mực Đạm — Tinh Chế Độ Đậm & Chi Tiết */}
        <video
          className="w-full h-full object-cover object-bottom opacity-40 motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER_URL}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>

        {/* Fallback khi người dùng bật reduced-motion */}
        <div
          className="hidden motion-reduce:block absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${POSTER_URL})` }}
        />

        {/* 1. Lớp Sương Mù Trung Tâm & Không Gian Âm (Central Negative Space & Atmospheric Mist)
            Bảo đảm khu vực Hero và Form sáng trong, tĩnh lặng tuyệt đối */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 72% 65% at 50% 36%, rgba(244, 239, 234, 0.94) 0%, rgba(244, 239, 234, 0.88) 50%, rgba(244, 239, 234, 0.35) 85%, transparent 100%)",
          }}
        />

        {/* 2. Dải Sương Khói Mặt Nước Chân Trang (Bottom Horizon Lake Mist)
            Chiều cao 55vh che hoàn toàn khối đá đen dày đặc ở đáy, tạo cảm giác mặt nước hồ mờ dần vào giấy dó */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55vh] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #F4EFEA 0%, #F4EFEA 25%, rgba(244,239,234,0.92) 55%, rgba(244,239,234,0.5) 80%, transparent 100%)",
          }}
        />

        {/* 3. Lớp Lụa Mỏng Cân Bằng Thị Giác Hai Bên Sườn (Flank Diffusion)
            Làm dịu độ gắt của cây tùng hai bên để tạo điểm nhấn vừa đủ, không lấn át Sidebar & Right Panel */}
        <div
          className="absolute inset-y-0 left-0 w-80 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(244,239,234,0.7) 0%, rgba(244,239,234,0.2) 70%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-80 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, rgba(244,239,234,0.7) 0%, rgba(244,239,234,0.2) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* Layer Tinh Đồ Thiên Văn Khắc Đồng Cổ Bản */}
      <MetaphysicalVectorLayers />
    </>
  );
}
