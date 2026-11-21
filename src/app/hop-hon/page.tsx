"use client";

import { useState } from "react";
import { computeBaZi, BaZiResult } from "@/lib/bat-tu/baziService";
import { OrientalFrame } from "@/components/decorations/OrientalFrame";
import { AuspiciousSeal } from "@/components/decorations/AuspiciousSeal";
import { ChineseCloudDivider } from "@/components/decorations/XiangyunCloud";
import { HeartHandshake, Sparkles, Users, RefreshCw, ShieldCheck, Heart, Flame } from "lucide-react";

export default function HopHonPage() {
  const [mode, setMode] = useState<"hon-nhan" | "lam-an">("hon-nhan");

  // Person 1
  const [name1, setName1] = useState("Nguyễn Văn A");
  const [date1, setDate1] = useState("1988-04-16");
  const [hour1, setHour1] = useState(8);
  const [gender1, setGender1] = useState<"male" | "female">("male");

  // Person 2
  const [name2, setName2] = useState("Trần Thị B");
  const [date2, setDate2] = useState("1992-08-20");
  const [hour2, setHour2] = useState(10);
  const [gender2, setGender2] = useState<"male" | "female">("female");

  const [result, setResult] = useState<any>(null);

  const handleCalculateMatch = () => {
    try {
      const p1 = date1.split("-").map(Number);
      const p2 = date2.split("-").map(Number);

      const bazi1 = computeBaZi(p1[0], p1[1], p1[2], hour1, gender1);
      const bazi2 = computeBaZi(p2[0], p2[1], p2[2], hour2, gender2);

      // Synastry score evaluation
      // Element compatibility
      const e1 = bazi1.dayMaster.element;
      const e2 = bazi2.dayMaster.element;

      let score = 75; // baseline
      let relationType = "Tương Sinh Hòa Hợp";

      // Generating pairs
      const generatingPairs: Record<string, string> = {
        Kim: "Thủy",
        Thủy: "Mộc",
        Mộc: "Hỏa",
        Hỏa: "Thổ",
        Thổ: "Kim",
      };

      if (generatingPairs[e1] === e2 || generatingPairs[e2] === e1) {
        score += 15;
        relationType = `${e1} và ${e2} tương sinh thuận thảo (Đại Cát)`;
      } else if (e1 === e2) {
        score += 8;
        relationType = `${e1} đồng hành tương trợ (Bình Hòa)`;
      } else {
        score -= 5;
        relationType = `${e1} và ${e2} có sự khắc chế, cần nhường nhịn`;
      }

      // Check Dụng Thần synergy
      if (bazi2.elementsCount[bazi1.favorableElement.split(" ")[0] as keyof typeof bazi2.elementsCount] >= 2) {
        score += 6;
      }

      const finalScore = Math.min(98, Math.max(60, score));

      setResult({
        bazi1,
        bazi2,
        finalScore,
        relationType,
        rating: finalScore >= 85 ? "Thiên Duyên Tiền Định (Thượng Cát)" : finalScore >= 75 ? "Hòa Hợp Phát Đạt (Trung Cát)" : "Cần Tu Dưỡng Hòa Giải",
      });
    } catch (e: any) {
      alert("Lỗi tính toán: " + e.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <OrientalFrame
        variant="grand"
        cornerStyle="ruyi"
        rounded="rounded-3xl"
        innerClassName="p-6 sm:p-8 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#175A67]/15 pb-4">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-[#A98A55] flex items-center space-x-1.5 font-bold">
              <HeartHandshake className="w-4 h-4 text-[#A98A55]" />
              <span>Hợp Hôn Bát Tự &amp; So Đôi Đối Tác Chiến Lược</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#175A67] mt-1 flex items-center space-x-2">
              <span>Bát Tự Hợp Duyên • Khảo Sát Tương Hợp</span>
              <span className="font-han text-2xl text-[#966F28] font-normal">（八字合婚）</span>
            </h1>
          </div>
          <AuspiciousSeal text="合婚" subtext="HỢP DUYÊN" shape="square" />
        </div>

        <p className="text-xs sm:text-sm text-[#345258] leading-relaxed mt-1 max-w-3xl">
          Đối chiếu hai lá số theo nguyên lý <strong>Nhật Chủ Tương Tác, Ngũ Hành Bổ Khuyết, Tam Hợp Lục Hợp Cung Mệnh</strong>. Giúp nhận diện điểm tựa gắn kết, phòng ngừa xung đột và đưa ra giải pháp phong thủy hòa hợp.
        </p>

        {/* Mode Selector Menu Nhỏ Đồng Nhất */}
        <div className="pt-2">
          <div className="inline-flex rounded-xl bg-[#EAE3DE]/80 p-0.5 border border-[#175A67]/20 text-xs">
            <button
              onClick={() => setMode("hon-nhan")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                mode === "hon-nhan"
                  ? "bg-[#175A67] text-[#FAF7F2] shadow-sm"
                  : "text-[#345258] hover:text-[#175A67]"
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Hợp Hôn Tình Duyên (Vợ Chồng)</span>
            </button>

            <button
              onClick={() => setMode("lam-an")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                mode === "lam-an"
                  ? "bg-[#175A67] text-[#FAF7F2] shadow-sm"
                  : "text-[#345258] hover:text-[#175A67]"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Đối Tác Kinh Doanh (Hợp Tác Đầu Tư)</span>
            </button>
          </div>
        </div>
      </OrientalFrame>

      {/* Dual Input Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Person 1 */}
        <OrientalFrame
          variant="standard"
          rounded="rounded-2xl"
          innerClassName="p-5 sm:p-6 space-y-3"
        >
          <h3 className="font-serif font-bold text-[#175A67] text-base flex items-center space-x-2">
            <span>Người Thứ Nhất ({mode === "hon-nhan" ? "Phía Chàng" : "Chủ Thể A"})</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[#345258] font-medium block mb-1">Họ và tên</label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="w-full bg-[#EAE3DE]/60 border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] focus:outline-none focus:border-[#175A67] focus:ring-1 focus:ring-[#175A67]"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[#345258] font-medium block mb-1">Ngày sinh (Dương)</label>
                <input
                  type="date"
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                  className="w-full bg-[#EAE3DE]/60 border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] focus:outline-none focus:border-[#175A67] focus:ring-1 focus:ring-[#175A67]"
                />
              </div>
              <div>
                <label className="text-[#345258] font-medium block mb-1">Giờ sinh (0 - 23h)</label>
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={hour1}
                  onChange={(e) => setHour1(Number(e.target.value))}
                  className="w-full bg-[#EAE3DE]/60 border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] focus:outline-none focus:border-[#175A67] focus:ring-1 focus:ring-[#175A67]"
                />
              </div>
            </div>
            <div>
              <label className="text-[#345258] font-medium block mb-1">Giới tính</label>
              <select
                value={gender1}
                onChange={(e) => setGender1(e.target.value as any)}
                className="w-full bg-[#EAE3DE]/60 border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] focus:outline-none focus:border-[#175A67] focus:ring-1 focus:ring-[#175A67]"
              >
                <option value="male">Nam Mệnh</option>
                <option value="female">Nữ Mệnh</option>
              </select>
            </div>
          </div>
        </OrientalFrame>

        {/* Person 2 */}
        <OrientalFrame
          variant="standard"
          rounded="rounded-2xl"
          innerClassName="p-5 sm:p-6 space-y-3"
        >
          <h3 className="font-serif font-bold text-[#175A67] text-base flex items-center space-x-2">
            <span>Người Thứ Hai ({mode === "hon-nhan" ? "Phía Nàng" : "Đối Tác B"})</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[#345258] font-medium block mb-1">Họ và tên</label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="w-full bg-[#EAE3DE]/60 border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] focus:outline-none focus:border-[#175A67] focus:ring-1 focus:ring-[#175A67]"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[#345258] font-medium block mb-1">Ngày sinh (Dương)</label>
                <input
                  type="date"
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                  className="w-full bg-[#EAE3DE]/60 border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] focus:outline-none focus:border-[#175A67] focus:ring-1 focus:ring-[#175A67]"
                />
              </div>
              <div>
                <label className="text-[#345258] font-medium block mb-1">Giờ sinh (0 - 23h)</label>
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={hour2}
                  onChange={(e) => setHour2(Number(e.target.value))}
                  className="w-full bg-[#EAE3DE]/60 border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] focus:outline-none focus:border-[#175A67] focus:ring-1 focus:ring-[#175A67]"
                />
              </div>
            </div>
            <div>
              <label className="text-[#345258] font-medium block mb-1">Giới tính</label>
              <select
                value={gender2}
                onChange={(e) => setGender2(e.target.value as any)}
                className="w-full bg-[#EAE3DE]/60 border border-[#175A67]/25 rounded-xl px-3 py-2 text-[#12343B] focus:outline-none focus:border-[#175A67] focus:ring-1 focus:ring-[#175A67]"
              >
                <option value="female">Nữ Mệnh</option>
                <option value="male">Nam Mệnh</option>
              </select>
            </div>
          </div>
        </OrientalFrame>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={handleCalculateMatch}
          className="px-8 py-3 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#FAF7F2] font-semibold text-sm transition-all shadow-tealGlow inline-flex items-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Tiến Hành Khảo Sát Tương Hợp</span>
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <OrientalFrame
          variant="grand"
          rounded="rounded-3xl"
          innerClassName="p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#175A67]/20 pb-4">
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-[#966F28]">
                KẾT QUẢ TƯƠNG HỢP MỆNH BÀN
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#175A67] mt-1">
                {name1} &amp; {name2}
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-xs text-[#5E777D]">Chỉ Số Tương Hợp</div>
                <div className="text-3xl font-serif font-extrabold text-[#175A67]">
                  {result.finalScore}%
                </div>
              </div>
              <AuspiciousSeal text="天合" subtext="THIÊN HỢP" shape="circle" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#EAE3DE]/60 border border-[#175A67]/20 space-y-2">
              <span className="text-[#175A67] font-bold block text-sm">
                Nhật Chủ &amp; Khí Sắc:
              </span>
              <p className="text-[#12343B] leading-relaxed">
                Người 1 là <strong>{result.bazi1.dayMaster.ganVi} {result.bazi1.dayMaster.element}</strong> ({result.bazi1.strengthStatus}). <br />
                Người 2 là <strong>{result.bazi2.dayMaster.ganVi} {result.bazi2.dayMaster.element}</strong> ({result.bazi2.strengthStatus}).
              </p>
              <div className="text-[#1D6353] font-semibold pt-1">
                → {result.relationType}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#EAE3DE]/60 border border-[#175A67]/20 space-y-2">
              <span className="text-[#175A67] font-bold block text-sm">
                Đánh Giá Cách Cục:
              </span>
              <p className="text-[#12343B] leading-relaxed">
                {result.rating}. Hai bên có ngũ hành bổ khuyết lẫn nhau, giúp giảm bớt tính bảo thủ và thúc đẩy tài lộc, gia đạo hưng thịnh.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#EAE3DE]/60 border border-[#175A67]/20 space-y-2">
              <span className="text-[#B83A32] font-bold block text-sm">
                Lời Khuyên Phong Thủy Hóa Giải:
              </span>
              <p className="text-[#12343B] leading-relaxed">
                Khi gặp các năm Thổ vượng hoặc Hỏa vượng, nên tăng cường yếu tố Thủy (nước, hồ cá) và Mộc (cây xanh) trong không gian sống chung để lưu thông khí trường.
              </p>
            </div>
          </div>
        </OrientalFrame>
      )}
    </div>
  );
}
