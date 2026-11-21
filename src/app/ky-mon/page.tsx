"use client";

import { useState, useEffect } from "react";
import { computeQiMenChart, QiMenChartResult } from "@/lib/qimen/qimenService";
import { QiMenGrid } from "@/components/ky-mon/QiMenGrid";
import { AIChatModal } from "@/components/AIChatModal";
import { OrientalFrame } from "@/components/decorations/OrientalFrame";
import { Shield, RefreshCw, MessageSquareQuote, Clock } from "lucide-react";

export default function QiMenPage() {
  const [now, setNow] = useState(new Date());
  const [qimenData, setQimenData] = useState<QiMenChartResult | null>(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const handleComputeNow = () => {
    const current = new Date();
    setNow(current);
    const res = computeQiMenChart(
      current.getFullYear(),
      current.getMonth() + 1,
      current.getDate(),
      current.getHours(),
      current.getMinutes()
    );
    setQimenData(res);
  };

  useEffect(() => {
    handleComputeNow();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Form */}
      <OrientalFrame
        variant="standard"
        cornerStyle="huiwen"
        rounded="rounded-2xl"
        innerClassName="p-5 sm:p-6 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#175A67]/15 pb-3">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-[#A98A55] flex items-center space-x-1.5 font-bold">
              <Shield className="w-3.5 h-3.5 text-[#A98A55]" />
              <span>Thời Gia Kỳ Môn • Cửu Cung Bát Môn Bát Thần</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#175A67]">
              Bấm Bàn Kỳ Môn Độn Giáp
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleComputeNow}
              className="px-3.5 py-2 rounded-xl bg-[#EAE3DE]/80 border border-[#175A67]/25 text-[#175A67] hover:bg-[#EAE3DE] font-semibold text-xs transition-colors flex items-center space-x-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Bấm Giờ Hiện Tại</span>
            </button>

            <button
              onClick={() => setIsAIChatOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#FAF7F2] font-semibold text-xs sm:text-sm transition-all flex items-center space-x-2 shadow-tealGlow"
            >
              <MessageSquareQuote className="w-4 h-4 text-[#FAF7F2]" />
              <span>Hỏi Thầy Kỳ Môn AI</span>
            </button>
          </div>
        </div>

        <div className="text-xs text-[#345258] leading-relaxed">
          Kỳ Môn Độn Giáp là môn học tối cao về <strong>thời không và phương vị</strong>. Bàn tính trên ứng dụng cho việc chọn thời khắc khai trương, xuất hành, đàm phán ký kết, cầu tài hoặc tránh né hướng xung sát.
        </div>
      </OrientalFrame>

      {/* Render QiMen Grid */}
      {qimenData && <QiMenGrid data={qimenData} />}

      {/* AI Chat Consultation Modal */}
      {qimenData && (
        <AIChatModal
          isOpen={isAIChatOpen}
          onClose={() => setIsAIChatOpen(false)}
          systemType="ky-mon"
          chartData={qimenData}
        />
      )}
    </div>
  );
}
