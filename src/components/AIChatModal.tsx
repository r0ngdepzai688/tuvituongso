"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, Bot, User, AlertCircle, BookOpen } from "lucide-react";

interface AIChatMessage {
  role: "user" | "assistant";
  content: string;
  validation?: {
    isValid: boolean;
    warnings: string[];
  };
}

/**
 * Component hiển thị nội dung đàm thoại học thuật chuyên biệt cho Huyền Học Cổ Môn.
 * Tự động phân tách và định dạng trang nhã:
 * - Tiêu đề đề mục mộc bản
 * - Các tọa độ và nhận định sắc nét (loại bỏ ký tự markdown thô)
 * - Khối trích dẫn cổ thư đóng gói trong hộp thư tịch cổ trang trọng
 */
function MetaphysicsMessageContent({ content, isUser }: { content: string; isUser: boolean }) {
  if (isUser) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  // Tách phần phân tích chính và phần trích dẫn cổ thư (nếu có)
  const classicSplitRegex = /\n\n(?:\*\*)?(?:Đối chiếu cổ thư|Cổ thư đối chiếu)/i;
  const parts = content.split(classicSplitRegex);
  const mainBody = parts[0] || content;
  const citationRaw = parts.length > 1 ? parts[1] : null;

  // Xử lý các dòng trong phần nội dung chính
  const lines = mainBody.split("\n");

  return (
    <div className="space-y-2.5 text-xs sm:text-sm text-[#2D2A26] leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        // 1. Tiêu đề mục (### Tiêu đề)
        if (trimmed.startsWith("###")) {
          const title = trimmed.replace(/^###\s*/, "").replace(/\(Dữ liệu đã ẩn danh PII\)/g, "").trim();
          return (
            <div
              key={idx}
              className="font-serif font-bold text-[#175A67] text-sm sm:text-base border-b border-[#175A67]/20 pb-1.5 pt-0.5 mb-2 flex items-center space-x-2"
            >
              <span className="text-oriental-gold text-xs">☯</span>
              <span>{title}</span>
            </div>
          );
        }

        // 2. Điểm gạch đầu dòng (- **Nhãn:** Nội dung)
        if (trimmed.startsWith("- **") || trimmed.startsWith("* **")) {
          const match = trimmed.match(/^[-*]\s*\*\*(.*?)\*\*[:\-—]?\s*(.*)$/);
          if (match) {
            const label = match[1].replace(/[:\-—]$/, "").trim();
            const body = match[2].trim();
            return (
              <div key={idx} className="flex items-start space-x-2 pl-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-oriental-gold mt-2 shrink-0" />
                <div className="flex-1">
                  <span className="font-semibold text-[#175A67]">{label}: </span>
                  <span className="text-[#33312E]">{body}</span>
                </div>
              </div>
            );
          }
        }

        // 3. Đoạn văn xuôi thông thường
        return (
          <p key={idx} className="text-[#33312E]">
            {trimmed.replace(/\*\*(.*?)\*\*/g, "$1")}
          </p>
        );
      })}

      {/* 4. Khối thư tịch cổ (Classical Domain RAG Citation) */}
      {citationRaw && (
        <div className="mt-3.5 pt-2.5 border-t border-[#C2A675]/35 bg-[#F7F3EE] rounded-xl p-3 border border-[#C2A675]/30 shadow-inner">
          <div className="flex items-center space-x-1.5 text-[11px] font-bold text-[#966F28] uppercase tracking-wider font-serif mb-1.5">
            <BookOpen className="w-3.5 h-3.5 shrink-0 text-[#966F28]" />
            <span>
              Đối chiếu cổ thư:{" "}
              {citationRaw
                .match(/\((.*?)\)/)?.[1]
                ?.replace(/\*\*/g, "") || "Kinh Điển Cổ Bản"}
            </span>
          </div>
          {citationRaw.split("\n").map((cLine, cIdx) => {
            const cTrim = cLine.trim();
            if (!cTrim || cTrim.startsWith("**Đối chiếu") || cTrim.startsWith("Đối chiếu")) return null;

            if (cTrim.startsWith("> *") || cTrim.startsWith(">*")) {
              const chap = cTrim.replace(/^>\s*\*?/, "").replace(/\*?$/, "").trim();
              return (
                <div key={cIdx} className="text-xs font-serif italic font-semibold text-[#175A67] mb-1">
                  {chap}
                </div>
              );
            }

            if (cTrim.startsWith(">") || cTrim.startsWith('"')) {
              const quote = cTrim.replace(/^>\s*"?/, "").replace(/"?$/, "").trim();
              return (
                <div
                  key={cIdx}
                  className="text-xs text-[#2D2A26] leading-relaxed pl-2.5 border-l-2 border-[#C2A675] font-serif bg-white/50 p-2 rounded-r-lg italic"
                >
                  "{quote}"
                </div>
              );
            }

            return (
              <p key={cIdx} className="text-xs text-[#5C554E] italic">
                {cTrim.replace(/[>*]/g, "").trim()}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemType?: "tu-vi" | "bat-tu" | "ky-mon";
  chartData?: any;
}

export function AIChatModal({ isOpen, onClose, systemType = "tu-vi", chartData = null }: AIChatModalProps) {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      role: "assistant",
      content: `Kính chào quý bạn! Tôi là Trợ Lý Huyền Học Cổ Môn. Dữ liệu lá số của bạn đã được tính toán đầy đủ theo chuẩn lịch pháp. Bạn muốn chiêm nghiệm sâu về phương diện nào (Sự nghiệp, Tài vận, Tình duyên, Sức khỏe hay Xu Cát Tị Hung)?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemType,
          data: chartData,
          query: userMessage,
        }),
      });

      const json = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: json.reply || "Không có phản hồi từ máy chủ.",
          validation: json.validation,
        },
      ]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12343B]/50 backdrop-blur-sm">
      <div className="bg-oriental-card border border-oriental-gold/50 rounded-2xl w-full max-w-2xl h-[600px] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-oriental-border bg-oriental-cardLight/60 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-oriental-gold/20 flex items-center justify-center text-oriental-gold">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-serif font-bold text-oriental-goldBright">
                ĐÀM THOẠI CÙNG THẦY HUYỀN HỌC AI
              </div>
              <div className="text-[10px] text-oriental-textMuted font-mono">
                Hệ thống: {systemType.toUpperCase()} • Đối thoại dựa trên dữ liệu chuẩn xác
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-oriental-textMuted hover:text-[#175A67]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-oriental-gold/20 border border-oriental-gold/40 flex items-center justify-center text-oriental-gold text-xs flex-shrink-0 mt-0.5 shadow-sm">
                  ☯
                </div>
              )}
              <div
                className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-[#175A67] text-[#F8F4F0] font-medium rounded-tr-none shadow-sm"
                    : "bg-[#FDFBF7] border border-[#175A67]/20 text-[#2D2A26] rounded-tl-none shadow-sm"
                }`}
              >
                <MetaphysicsMessageContent content={m.content} isUser={m.role === "user"} />

                {/* Ground Truth Validation Warning Card */}
                {m.validation && !m.validation.isValid && m.validation.warnings.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#9E2A2B]/20 text-[11px] text-[#9E2A2B] bg-[#9E2A2B]/8 p-2 rounded-xl space-y-1">
                    <div className="flex items-center space-x-1 font-semibold uppercase tracking-wider text-[10px]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Lưu ý kiểm chứng thuật số (Hậu kiểm tất định)</span>
                    </div>
                    {m.validation.warnings.map((w, wIdx) => (
                      <p key={wIdx} className="leading-snug text-[#7A1F20]">
                        • {w}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              {m.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-oriental-cardLight border border-oriental-border flex items-center justify-center text-oriental-textSecondary text-xs flex-shrink-0 mt-0.5 shadow-sm">
                  <User className="w-3.5 h-3.5 text-[#175A67]" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-oriental-gold italic pl-2">
              <Sparkles className="w-4 h-4 animate-spin text-[#966F28]" />
              <span className="text-[#966F28]">Đang đối chiếu cổ thư và tính toán luận giải...</span>
            </div>
          )}
          <div ref={messagesEndRef} className="h-2" />
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-oriental-border bg-oriental-card flex items-center space-x-2.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Hỏi về công danh, tài lộc, tình duyên hoặc năm hạn..."
            className="flex-1 bg-white/70 border border-[#175A67]/25 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#12343B] placeholder-[#5E777D] focus:outline-none focus:border-[#175A67] focus:ring-1 focus:ring-[#175A67]"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#FAF7F2] disabled:opacity-40 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
