"use client";

import { useState } from "react";
import { Compass, Shield, MapPin } from "lucide-react";
import { ChineseCorners } from "../decorations/ChineseCorners";
import { AuspiciousSeal } from "../decorations/AuspiciousSeal";
import { TaijiBaguaOrnament } from "../decorations/TaijiBaguaOrnament";

interface DirectionInfo {
  directionName: string;
  mountain24: string;
  trigram: string;
  element: string;
  fortuneV9: string; // Vận 9 (2024-2043)
  batTrach: string;
}

export function LuopanCompass() {
  const [heading, setHeading] = useState<number>(0); // 0 to 360 degrees
  const [isSensorActive, setIsSensorActive] = useState<boolean>(false);

  // 24 Sơn Hướng (Mỗi sơn 15 độ)
  const getMountain24 = (deg: number): DirectionInfo => {
    const normalized = (deg % 360 + 360) % 360;
    
    if (normalized >= 352.5 || normalized < 7.5) return { directionName: "Chính Bắc (Khảm)", mountain24: "Tý Sơn (子)", trigram: "Khảm (☵)", element: "Thủy", fortuneV9: "Nhất Bạch Thủy Tinh (Cát vừa)", batTrach: "Phục Vị / Diên Niên tùy quái mệnh" };
    if (normalized >= 7.5 && normalized < 22.5) return { directionName: "Bắc Thiên Đông (Khảm)", mountain24: "Quý Sơn (癸)", trigram: "Khảm (☵)", element: "Thủy", fortuneV9: "Thủy hỏa ký tế", batTrach: "Khảm Thủy chính vị" };
    if (normalized >= 22.5 && normalized < 37.5) return { directionName: "Đông Bắc (Cấn)", mountain24: "Sửu Sơn (丑)", trigram: "Cấn (☶)", element: "Thổ", fortuneV9: "Bát Bạch thoái khí", batTrach: "Cấn Thổ môn" };
    if (normalized >= 37.5 && normalized < 52.5) return { directionName: "Chính Đông Bắc (Cấn)", mountain24: "Cấn Sơn (艮)", trigram: "Cấn (☶)", element: "Thổ", fortuneV9: "Sơn tinh vượng vị", batTrach: "Thiên Y / Sinh Khí" };
    if (normalized >= 52.5 && normalized < 67.5) return { directionName: "Đông Bắc Thiên Đông (Cấn)", mountain24: "Dần Sơn (寅)", trigram: "Cấn (☶)", element: "Thổ", fortuneV9: "Khí khởi mộc", batTrach: "Đông Bắc môn" };
    if (normalized >= 67.5 && normalized < 82.5) return { directionName: "Đông Thiên Bắc (Chấn)", mountain24: "Giáp Sơn (甲)", trigram: "Chấn (☳)", element: "Mộc", fortuneV9: "Tam Bích thị phi", batTrach: "Chấn Mộc vị" };
    if (normalized >= 82.5 && normalized < 97.5) return { directionName: "Chính Đông (Chấn)", mountain24: "Mão Sơn (卯)", trigram: "Chấn (☳)", element: "Mộc", fortuneV9: "Đào hoa tinh quy tụ", batTrach: "Sinh Khí Đông Tứ Mệnh" };
    if (normalized >= 97.5 && normalized < 112.5) return { directionName: "Đông Thiên Nam (Chấn)", mountain24: "Ất Sơn (乙)", trigram: "Chấn (☳)", element: "Mộc", fortuneV9: "Mộc vượng sinh hỏa", batTrach: "Đông Môn vị" };
    if (normalized >= 112.5 && normalized < 127.5) return { directionName: "Đông Nam (Tốn)", mountain24: "Thìn Sơn (辰)", trigram: "Tốn (☴)", element: "Mộc", fortuneV9: "Tứ Lục Văn Xương", batTrach: "Văn Xương Tinh vị" };
    if (normalized >= 127.5 && normalized < 142.5) return { directionName: "Chính Đông Nam (Tốn)", mountain24: "Tốn Sơn (巽)", trigram: "Tốn (☴)", element: "Mộc", fortuneV9: "Học nghiệp, danh tiếng", batTrach: "Diên Niên vị" };
    if (normalized >= 142.5 && normalized < 157.5) return { directionName: "Đông Nam Thiên Nam (Tốn)", mountain24: "Tỵ Sơn (巳)", trigram: "Tốn (☴)", element: "Mộc", fortuneV9: "Tiến khí Cửu Tử", batTrach: "Tốn Môn vị" };
    if (normalized >= 157.5 && normalized < 172.5) return { directionName: "Nam Thiên Đông (Ly)", mountain24: "Bính Sơn (丙)", trigram: "Ly (☲)", element: "Hỏa", fortuneV9: "Cửu Tử Đương Lệnh (ĐẠI CÁT)", batTrach: "Chính Nam cát vị" };
    if (normalized >= 172.5 && normalized < 187.5) return { directionName: "Chính Nam (Ly)", mountain24: "Ngọ Sơn (午)", trigram: "Ly (☲)", element: "Hỏa", fortuneV9: "Cửu Tử Tinh Vượng (CỰC CÁT VẬN 9)", batTrach: "Phục Vị / Sinh Khí" };
    if (normalized >= 187.5 && normalized < 202.5) return { directionName: "Nam Thiên Tây (Ly)", mountain24: "Đinh Sơn (丁)", trigram: "Ly (☲)", element: "Hỏa", fortuneV9: "Hỏa quang chiếu diệu", batTrach: "Ly Hỏa vị" };
    if (normalized >= 202.5 && normalized < 217.5) return { directionName: "Tây Nam Thiên Nam (Khôn)", mountain24: "Mùi Sơn (未)", trigram: "Khôn (☷)", element: "Thổ", fortuneV9: "Nhị Hắc bệnh phù (Chú ý)", batTrach: "Tây Nam môn" };
    if (normalized >= 217.5 && normalized < 232.5) return { directionName: "Chính Tây Nam (Khôn)", mountain24: "Khôn Sơn (坤)", trigram: "Khôn (☷)", element: "Thổ", fortuneV9: "Hóa giải Thổ sát", batTrach: "Thiên Y Tây Tứ Mệnh" };
    if (normalized >= 232.5 && normalized < 247.5) return { directionName: "Tây Nam Thiên Tây (Khôn)", mountain24: "Thân Sơn (申)", trigram: "Khôn (☷)", element: "Thổ", fortuneV9: "Kim sinh thủy dưỡng", batTrach: "Khôn vị" };
    if (normalized >= 247.5 && normalized < 262.5) return { directionName: "Tây Thiên Nam (Đoài)", mountain24: "Canh Sơn (庚)", trigram: "Đoài (☱)", element: "Kim", fortuneV9: "Thất Xích thoái khí", batTrach: "Đoài Kim môn" };
    if (normalized >= 262.5 && normalized < 277.5) return { directionName: "Chính Tây (Đoài)", mountain24: "Dậu Sơn (酉)", trigram: "Đoài (☱)", element: "Kim", fortuneV9: "Kim khí thu liễm", batTrach: "Diên Niên vị" };
    if (normalized >= 277.5 && normalized < 292.5) return { directionName: "Tây Thiên Bắc (Đoài)", mountain24: "Tân Sơn (辛)", trigram: "Đoài (☱)", element: "Kim", fortuneV9: "Châu báu tàng ẩn", batTrach: "Tây môn" };
    if (normalized >= 292.5 && normalized < 307.5) return { directionName: "Tây Bắc Thiên Tây (Càn)", mountain24: "Tuất Sơn (戌)", trigram: "Càn (☰)", element: "Kim", fortuneV9: "Lục Bạch quan quý", batTrach: "Càn môn vị" };
    if (normalized >= 307.5 && normalized < 322.5) return { directionName: "Chính Tây Bắc (Càn)", mountain24: "Càn Sơn (乾)", trigram: "Càn (☰)", element: "Kim", fortuneV9: "Lãnh đạo, quyền quý", batTrach: "Sinh Khí Tây Tứ Mệnh" };
    return { directionName: "Tây Bắc Thiên Bắc (Càn)", mountain24: "Hợi Sơn (亥)", trigram: "Càn (☰)", element: "Kim", fortuneV9: "Quý nhân phù trợ", batTrach: "Thiên Môn vị" };
  };

  const currentInfo = getMountain24(heading);

  const toggleCompassSensor = () => {
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      if ((DeviceOrientationEvent as any).requestPermission) {
        (DeviceOrientationEvent as any)
          .requestPermission()
          .then((response: string) => {
            if (response === "granted") {
              window.addEventListener("deviceorientation", handleOrientation);
              setIsSensorActive(true);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
        setIsSensorActive(true);
      }
    } else {
      alert("Thiết bị không hỗ trợ cảm biến con quay hồi chuyển.");
    }
  };

  const handleOrientation = (e: DeviceOrientationEvent) => {
    if (e.alpha !== null) {
      setHeading(Math.round(e.alpha));
    }
  };

  return (
    <div className="space-y-6">
      {/* Compass Controls & Degree Readout */}
      <div className="relative bg-gradient-to-br from-oriental-card via-oriental-cardLight to-oriental-card p-6 rounded-2xl border border-oriental-gold/50 shadow-cardWarm flex flex-wrap items-center justify-between gap-4 overflow-hidden">
        <ChineseCorners size={22} color="#D4AF37" />

        <div>
          <div className="text-xs uppercase font-mono tracking-wider text-oriental-gold flex items-center space-x-1.5">
            <Compass className="w-4 h-4 text-oriental-gold" />
            <span>La Bàn Phong Thủy Tam Nguyên Cửu Vận (罗盘)</span>
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-oriental-goldBright mt-1">
            {heading}° • {currentInfo.mountain24}
          </div>
          <div className="text-xs text-oriental-textSecondary font-mono mt-0.5">
            {currentInfo.directionName} • Quái: {currentInfo.trigram}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <AuspiciousSeal text="九运" subtext="HẠ NGUYÊN VẬN 9" shape="square" />
          <button
            onClick={toggleCompassSensor}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 border transition-colors shadow-sm ${
              isSensorActive
                ? "bg-oriental-jade text-white border-oriental-jade shadow-mysticGlow"
                : "bg-oriental-cardLight text-oriental-gold border-oriental-borderGold hover:bg-oriental-cardLight/80"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{isSensorActive ? "Cảm Biến Bật" : "Kích Hoạt Con Quay Mobile"}</span>
          </button>
        </div>
      </div>

      {/* Interactive Compass Dial with Chinese Styling */}
      <div className="relative flex flex-col items-center justify-center p-6 sm:p-10 bg-oriental-darker rounded-2xl border-2 border-oriental-borderGold/60 shadow-cardWarm overflow-hidden">
        <ChineseCorners size={28} color="#D4AF37" />

        {/* Needle Marker (Kim Chỉ Nam Màu Đỏ Chu Sa) */}
        <div className="absolute top-8 sm:top-10 z-20 flex flex-col items-center pointer-events-none">
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-oriental-redBright drop-shadow-md"></div>
          <div className="text-[10px] font-mono font-bold text-oriental-redBright tracking-widest mt-0.5 uppercase">
            CHỈ NAM
          </div>
        </div>

        {/* Dial Body with Rotating Transform */}
        <div
          className="w-72 h-72 sm:w-96 sm:h-96 rounded-full border-4 border-oriental-borderGold/80 bg-gradient-to-br from-oriental-card via-oriental-darker to-oriental-cardLight shadow-goldGlow flex items-center justify-center relative transition-transform duration-150 select-none cursor-grab active:cursor-grabbing flame-glow"
          style={{ transform: `rotate(${-heading}deg)` }}
        >
          {/* Inner Trigrams & 8 directions */}
          <div className="absolute inset-4 sm:inset-5 rounded-full border-2 border-oriental-borderGold/40 flex items-center justify-center">
            {/* North */}
            <span className="absolute top-2 font-serif font-extrabold text-oriental-redBright text-sm">BẮC (Khảm ☵)</span>
            {/* South */}
            <span className="absolute bottom-2 font-serif font-extrabold text-oriental-goldBright text-sm">NAM (Ly ☲)</span>
            {/* East */}
            <span className="absolute right-2 font-serif font-extrabold text-[#1D6353] text-sm">ĐÔNG (Chấn ☳)</span>
            {/* West */}
            <span className="absolute left-2 font-serif font-extrabold text-[#966F28] text-sm">TÂY (Đoài ☱)</span>

            {/* Northwest */}
            <span className="absolute top-9 left-9 text-[11px] text-oriental-textSecondary font-mono">TÂY BẮC (Càn ☰)</span>
            {/* Northeast */}
            <span className="absolute top-9 right-9 text-[11px] text-oriental-textSecondary font-mono">ĐÔNG BẮC (Cấn ☶)</span>
            {/* Southwest */}
            <span className="absolute bottom-9 left-9 text-[11px] text-oriental-textSecondary font-mono">TÂY NAM (Khôn ☷)</span>
            {/* Southeast */}
            <span className="absolute bottom-9 right-9 text-[11px] text-oriental-textSecondary font-mono">ĐÔNG NAM (Tốn ☴)</span>

            {/* Center Taiji Symbol */}
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-oriental-gold flex items-center justify-center text-oriental-gold text-3xl font-serif bg-oriental-card shadow-goldGlow">
              ☯
            </div>
          </div>
        </div>

        {/* Manual Degree Slider */}
        <div className="w-full max-w-md mt-8 space-y-2">
          <div className="flex justify-between text-xs text-oriental-textMuted font-mono">
            <span>0° (Bắc)</span>
            <span>90° (Đông)</span>
            <span>180° (Nam)</span>
            <span>270° (Tây)</span>
            <span>360°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={heading}
            onChange={(e) => setHeading(Number(e.target.value))}
            className="w-full h-2.5 bg-oriental-cardLight rounded-lg appearance-none cursor-pointer accent-oriental-gold border border-oriental-border"
          />
        </div>
      </div>

      {/* Feng Shui Analysis Cards for Current Direction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative bg-gradient-to-br from-oriental-card to-oriental-cardLight p-5 sm:p-6 rounded-2xl border border-oriental-gold/40 shadow-cardWarm space-y-2 overflow-hidden">
          <ChineseCorners size={18} color="#D4AF37" />

          <div className="flex items-center space-x-2 text-xs font-mono uppercase text-oriental-gold font-bold">
            <Shield className="w-4 h-4" />
            <span>Huyền Không Phi Tinh (Hạ Nguyên Vận 9: 2024 - 2043)</span>
          </div>
          <div className="text-base font-bold text-oriental-goldBright">
            {currentInfo.fortuneV9}
          </div>
          <p className="text-xs text-oriental-textSecondary leading-relaxed">
            Trong Vận 9 (Bát Thuần Ly - Cửu Tử Hỏa Tinh đương quyền), các hướng đón nhận ánh sáng phương Nam hoặc có thế nước (thủy) tại phương Bắc mang lại cát khí lớn về danh vọng, công nghệ và trí tuệ.
          </p>
        </div>

        <div className="relative bg-gradient-to-br from-oriental-card to-oriental-cardLight p-5 sm:p-6 rounded-2xl border border-oriental-borderGold/40 shadow-cardWarm space-y-2 overflow-hidden">
          <ChineseCorners size={18} color="#D4AF37" />

          <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#1D6353] font-bold">
            <MapPin className="w-4 h-4" />
            <span>Bát Trạch Khí Hướng</span>
          </div>
          <div className="text-base font-bold text-oriental-textPrimary">
            {currentInfo.batTrach}
          </div>
          <p className="text-xs text-oriental-textSecondary leading-relaxed">
            Phân định hướng Sinh Khí, Thiên Y, Diên Niên, Phục Vị nhằm bố trí phòng khách, ban thờ, cửa chính; hướng Tuyệt Mệnh, Họa Hại nên đặt bếp hoặc nhà kho để trấn áp hung khí.
          </p>
        </div>
      </div>
    </div>
  );
}
