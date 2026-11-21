"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  Download,
  Search,
  ChevronRight,
  ChevronLeft,
  X,
  FileText,
  Bookmark,
  Layers,
  ZoomIn,
  ZoomOut,
  ArrowDownToLine,
  RefreshCw,
  AlertCircle,
  Type,
  AlignLeft,
} from "lucide-react";
import { OrientalFrame } from "@/components/decorations/OrientalFrame";
import { AuspiciousSeal } from "@/components/decorations/AuspiciousSeal";

interface ClassicBook {
  id: string;
  titleVi: string;
  titleHanz: string;
  category: string;
  categoryVi: string;
  language?: "zh" | "vi" | "bilingual";
  author: string;
  dynasty: string;
  summary: string;
  chapterCount: number;
}

interface ChapterItem {
  relativePath: string;
  fileName: string;
  title: string;
}

// Inline formatting helper for bold (**text**) and italic (*text*)
function renderInlineFormatting(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index));
    }
    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={match.index} className="font-bold text-[#175A67]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      parts.push(
        <em key={match.index} className="italic text-[#966F28]">
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIdx = regex.lastIndex;
  }

  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }

  return parts.length > 0 ? parts : text;
}

// Classical Text Markdown Renderer with standardized Vietnamese typography
function ClassicContentRenderer({
  content,
  fontFamily,
  fontSize,
  lineSpacing,
}: {
  content: string;
  fontFamily: "serif" | "sans";
  fontSize: number;
  lineSpacing: "normal" | "relaxed" | "loose";
}) {
  const lineHeights = {
    normal: "1.7",
    relaxed: "1.95",
    loose: "2.2",
  };

  const paragraphs = useMemo(() => content.split(/\n\s*\n/), [content]);

  return (
    <div
      className={`max-w-3xl mx-auto space-y-5 text-[#12343B] select-text selection:bg-[#175A67] selection:text-[#F8F4F0] ${
        fontFamily === "serif" ? "font-serif" : "font-sans"
      }`}
      style={{ fontSize: `${fontSize}px`, lineHeight: lineHeights[lineSpacing] }}
    >
      {paragraphs.map((p, pIdx) => {
        const trimmed = p.trim();
        if (!trimmed) return null;

        // Heading 1: # Title
        if (trimmed.startsWith("# ")) {
          return (
            <h1
              key={pIdx}
              className="text-2xl sm:text-3xl font-serif font-bold text-[#175A67] border-b border-[#175A67]/25 pb-3 pt-4 mb-4"
            >
              {trimmed.replace(/^#\s+/, "")}
            </h1>
          );
        }

        // Heading 2: ## Section
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={pIdx}
              className="text-xl sm:text-2xl font-serif font-bold text-[#966F28] border-b border-[#966F28]/20 pb-2 pt-4 mb-3"
            >
              {trimmed.replace(/^##\s+/, "")}
            </h2>
          );
        }

        // Heading 3: ### Sub-section
        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={pIdx}
              className="text-lg sm:text-xl font-serif font-semibold text-[#175A67] pt-3 mb-2"
            >
              {trimmed.replace(/^###\s+/, "")}
            </h3>
          );
        }

        // Horizontal divider: --- or ***
        if (trimmed === "---" || trimmed === "***") {
          return (
            <div key={pIdx} className="my-6 flex items-center justify-center space-x-3 opacity-60">
              <div className="h-px bg-gradient-to-r from-transparent via-[#175A67] to-transparent flex-1" />
              <span className="text-xs text-[#966F28] font-mono">✦ ✦ ✦</span>
              <div className="h-px bg-gradient-to-r from-transparent via-[#175A67] to-transparent flex-1" />
            </div>
          );
        }

        // Blockquote / Ancient Verse / Thi Quyết / Hán văn (> ...)
        if (trimmed.startsWith(">")) {
          const quoteLines = trimmed
            .split("\n")
            .map((l) => l.replace(/^>\s?/, "").trim())
            .join("\n");
          return (
            <div
              key={pIdx}
              className="my-4 p-4 sm:p-5 rounded-2xl bg-[#EAE3DE]/60 border-l-4 border-[#966F28] shadow-sm space-y-2"
            >
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#966F28] flex items-center space-x-1.5">
                <Bookmark className="w-3.5 h-3.5 text-[#966F28]" />
                <span>Trích Dẫn Kinh Văn • Khẩu Quyết Cổ Điển</span>
              </div>
              <div className="italic text-[#12343B] font-medium leading-relaxed whitespace-pre-wrap">
                {renderInlineFormatting(quoteLines)}
              </div>
            </div>
          );
        }

        // Regular paragraph with inline formatting
        return (
          <p
            key={pIdx}
            className="leading-relaxed tracking-wide text-[#12343B] whitespace-pre-wrap"
          >
            {renderInlineFormatting(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function TaiLieuContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [books, setBooks] = useState<ClassicBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("all");
  const [languageFilter, setLanguageFilter] = useState<"all" | "vi" | "zh">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Reader Modal State
  const [activeBook, setActiveBook] = useState<ClassicBook | null>(null);
  const [chapters, setChapters] = useState<ChapterItem[]>([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [chapterContent, setChapterContent] = useState<string>("");
  const [loadingChapter, setLoadingChapter] = useState(false);
  const [fontSize, setFontSize] = useState<number>(16);
  const [fontFamily, setFontFamily] = useState<"serif" | "sans">("serif");
  const [lineSpacing, setLineSpacing] = useState<"normal" | "relaxed" | "loose">("relaxed");
  const [chapterSearch, setChapterSearch] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchBooks = () => {
    setLoading(true);
    fetch("/api/classics")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.books) {
          setBooks(data.books);
        }
      })
      .catch((err) => {
        console.error("Lỗi tải danh mục cổ thư:", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle URL query parameter ?book=... to auto-open
  useEffect(() => {
    const bookParam = searchParams.get("book");
    if (bookParam && books.length > 0) {
      const decodedParam = decodeURIComponent(bookParam).trim().toLowerCase();
      const found = books.find(
        (b) =>
          b.id.toLowerCase() === decodedParam ||
          b.titleVi.toLowerCase() === decodedParam ||
          b.titleHanz.toLowerCase() === decodedParam ||
          decodedParam.includes(b.id.toLowerCase())
      );
      if (found) {
        openBookReader(found);
      }
    }
  }, [books, searchParams]);

  // Lock background body scroll when reader modal is open
  useEffect(() => {
    if (activeBook) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeBook]);

  // Keyboard navigation inside reader modal (Esc to close, Left/Right for chapters)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeBook) return;
      if (e.key === "Escape") {
        setActiveBook(null);
      } else if (e.key === "ArrowLeft" && activeChapterIndex > 0) {
        loadChapter(activeBook.id, chapters[activeChapterIndex - 1].relativePath, activeChapterIndex - 1);
      } else if (e.key === "ArrowRight" && activeChapterIndex < chapters.length - 1) {
        loadChapter(activeBook.id, chapters[activeChapterIndex + 1].relativePath, activeChapterIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeBook, activeChapterIndex, chapters]);

  const openBookReader = async (book: ClassicBook) => {
    setActiveBook(book);
    setLoadingChapter(true);
    setChapters([]);
    setActiveChapterIndex(0);
    setChapterContent("");
    setErrorMessage(null);
    setChapterSearch("");

    try {
      const res = await fetch(`/api/classics?book=${encodeURIComponent(book.id)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data.chapters && data.chapters.length > 0) {
        setChapters(data.chapters);
        await loadChapter(book.id, data.chapters[0].relativePath, 0);
      } else if (data.previewContent) {
        setChapterContent(data.previewContent);
        setLoadingChapter(false);
      } else {
        setChapterContent("Văn bản của tác phẩm này đang được cập nhật.");
        setLoadingChapter(false);
      }
    } catch (err: any) {
      console.error("Lỗi mở sách:", err);
      setErrorMessage(`Không thể kết nối đến máy chủ tài liệu (${err.message}). Bạn có thể bấm Thử lại hoặc Tải về trọn bộ file.`);
      setLoadingChapter(false);
    }
  };

  const loadChapter = async (bookId: string, relPath: string, index: number) => {
    setActiveChapterIndex(index);
    setLoadingChapter(true);
    setErrorMessage(null);
    try {
      const res = await fetch(`/api/classics?book=${encodeURIComponent(bookId)}&file=${encodeURIComponent(relPath)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.content) {
        setChapterContent(data.content);
      } else {
        setChapterContent("Thiên này chưa có văn bản nội dung.");
      }
    } catch (err: any) {
      console.error("Lỗi tải chương:", err);
      setErrorMessage(`Lỗi tải thiên (${err.message}). Vui lòng chọn thiên khác hoặc tải file trọn bộ.`);
    } finally {
      setLoadingChapter(false);
    }
  };

  const handleDownloadBook = (bookId: string) => {
    window.open(`/api/classics?book=${encodeURIComponent(bookId)}&download=true`, "_blank");
  };

  const filteredBooks = books.filter((b) => {
    const matchCat = category === "all" || b.category === category;
    const bookLang = b.language || "zh";
    const matchLang =
      languageFilter === "all" ||
      (languageFilter === "vi" && (bookLang === "vi" || bookLang === "bilingual")) ||
      (languageFilter === "zh" && bookLang === "zh");
    const term = searchTerm.toLowerCase();
    const matchSearch =
      (b.titleVi || "").toLowerCase().includes(term) ||
      (b.titleHanz || "").toLowerCase().includes(term) ||
      (b.author || "").toLowerCase().includes(term) ||
      (b.summary || "").toLowerCase().includes(term);
    return matchCat && matchLang && matchSearch;
  });

  const viCount = books.filter((b) => b.language === "vi" || b.language === "bilingual").length;
  const zhCount = books.filter((b) => !b.language || b.language === "zh").length;

  const categories = [
    { id: "all", label: `Tất Cả (${books.length || 47} Bộ)` },
    { id: "tu-vi", label: "Tử Vi Đẩu Số" },
    { id: "bat-tu", label: "Tứ Trụ Bát Tự" },
    { id: "ky-mon", label: "Kỳ Môn Độn Giáp" },
    { id: "phong-thuy", label: "Địa Lý Phong Thủy" },
    { id: "dich-hoc", label: "Dịch Học & Chiêm Bốc" },
    { id: "tuong-thuat", label: "Tướng Thuật & Tinh Học" },
  ];

  const filteredChapters = chapters.filter((c) =>
    chapterSearch ? c.title.toLowerCase().includes(chapterSearch.toLowerCase()) : true
  );

  return (
    <div className="space-y-8 animate-rise-in">
      {/* Top Banner */}
      <OrientalFrame
        variant="grand"
        cornerStyle="ruyi"
        rounded="rounded-3xl"
        innerClassName="p-6 sm:p-8 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#175A67]/15 pb-4">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-[#A98A55] flex items-center space-x-1.5 font-bold">
              <BookOpen className="w-4 h-4 text-[#A98A55]" />
              <span>Kho Tài Liệu Cổ Thư Song Ngữ • Đối Chiếu Thuật Số</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#175A67] mt-1 flex items-center space-x-3">
              <span>Thư Viện Cổ Thư Kinh Điển</span>
              <span className="font-serif text-2xl text-[#966F28] font-normal opacity-80">（古籍秘庫）</span>
            </h1>
          </div>
          <AuspiciousSeal text="古籍" subtext="CỔ TỊCH" shape="square" />
        </div>

        <p className="text-xs sm:text-sm text-[#345258] leading-relaxed mt-1 max-w-3xl">
          Lưu trữ <strong>{books.length || 47} trước tác kinh điển</strong> Đông Phương chia làm 2 hệ ngôn ngữ:{" "}
          <strong>Nguyên bản Hán văn ({zhCount || 35} bộ)</strong> và{" "}
          <strong>Bản Tiếng Việt / Song ngữ Trung–Việt ({viCount || 12} bộ)</strong> phủ đủ cả 6 bộ môn, hỗ trợ đọc trực tuyến chuẩn mực và tải trọn bộ về máy.
        </p>

        {/* Language Switcher Menu Nhỏ Đồng Nhất */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-mono text-[#5E777D] mr-1">Ngôn ngữ tài liệu:</span>
          <div className="inline-flex rounded-xl bg-[#EAE3DE]/80 p-0.5 border border-[#175A67]/20 text-xs">
            {[
              { id: "all", label: `Tất cả (${books.length || 47})` },
              { id: "vi", label: `Tiếng Việt & Song ngữ (${viCount || 12})` },
              { id: "zh", label: `Nguyên tác Tiếng Trung 中文 (${zhCount || 35})` },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguageFilter(lang.id as "all" | "vi" | "zh")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  languageFilter === lang.id
                    ? "bg-[#175A67] text-[#FAF7F2] shadow-sm"
                    : "text-[#345258] hover:text-[#175A67]"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#A98A55] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo tên sách Hán-Việt, chữ Hán, tác giả (Trần Hy Di, Lưu Bá Ôn, Từ Tử Bình...)"
              className="w-full bg-[#EAE3DE]/70 border border-[#175A67]/25 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#12343B] placeholder-[#5E777D] focus:outline-none focus:border-[#175A67] transition-all"
            />
          </div>

          <div className="flex space-x-1.5 overflow-x-auto pb-1 bg-[#EAE3DE]/70 p-1 rounded-xl border border-[#175A67]/20">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  category === cat.id
                    ? "bg-[#175A67] text-[#FAF7F2] shadow-sm"
                    : "text-[#345258] hover:text-[#175A67]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </OrientalFrame>

      {/* Book Grid */}
      {loading ? (
        <div className="p-16 text-center text-oriental-textMuted text-sm font-mono flex flex-col items-center justify-center space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin text-oriental-gold" />
          <span>Đang thỉnh nạp danh mục 47 bộ cổ thư kinh điển...</span>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="p-16 text-center text-oriental-textMuted text-sm">
          Không tìm thấy bộ sách nào khớp với từ khóa tìm kiếm.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="relative group bg-[#FAF7F2]/95 p-5 sm:p-6 rounded-2xl border border-[#175A67]/20 hover:border-[#175A67]/50 card-hover-lift transition-all duration-300 shadow-cardWarm flex flex-col justify-between overflow-hidden"
            >
              <div className="space-y-3">
                {/* Header Tag + Language Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center flex-wrap gap-1.5">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-oriental-dark/80 text-oriental-gold border border-oriental-borderGold/30">
                      {book.categoryVi}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                        book.language === "vi"
                          ? "bg-[#1D6353]/12 text-[#165B46] border-[#1D6353]/30"
                          : book.language === "bilingual"
                          ? "bg-[#175A67]/12 text-[#175A67] border-[#175A67]/30"
                          : "bg-[#966F28]/12 text-[#7D5A1C] border-[#966F28]/30"
                      }`}
                    >
                      {book.language === "vi"
                        ? "Tiếng Việt"
                        : book.language === "bilingual"
                        ? "Song ngữ 中-越"
                        : "Hán văn 中文"}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-oriental-textMuted whitespace-nowrap">
                    {book.dynasty}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-serif font-bold text-oriental-goldBright group-hover:text-oriental-gold transition-colors flex items-center justify-between">
                    <span>{book.titleVi}</span>
                    <span className="font-serif text-lg text-oriental-gold opacity-80">
                      {book.titleHanz}
                    </span>
                  </h3>
                  <div className="text-[11px] text-oriental-textMuted mt-1">
                    Tác giả: <strong className="text-oriental-textSecondary">{book.author}</strong>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-oriental-textSecondary leading-relaxed line-clamp-3">
                  {book.summary}
                </p>

                {/* Chapter Count Badge */}
                <div className="pt-2 flex items-center space-x-2 text-[11px] text-oriental-textMuted font-mono">
                  <Layers className="w-3.5 h-3.5 text-oriental-gold" />
                  <span>Quy mô: {book.chapterCount} thiên / chương văn bản</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-oriental-border/60 flex items-center gap-2">
                <button
                  onClick={() => openBookReader(book)}
                  className="flex-1 py-2 px-3 rounded-xl bg-oriental-ink hover:bg-oriental-inkDark text-oriental-cream border border-oriental-ink/80 font-semibold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-tealGlow"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Xem Trực Tuyến</span>
                </button>

                <button
                  onClick={() => handleDownloadBook(book.id)}
                  title="Tải toàn bộ cuốn sách về máy (.txt)"
                  className="py-2 px-3 rounded-xl bg-oriental-cardLight border border-oriental-border text-oriental-textSecondary hover:text-oriental-goldBright hover:border-oriental-gold/50 text-xs transition-all flex items-center space-x-1"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tải Về</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Online Reader Modal mounted via Portal to document.body (Immune to parent transforms) */}
      {mounted &&
        activeBook &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveBook(null);
            }}
          >
            <div
              className="relative w-full max-w-6xl h-[92vh] max-h-[96vh] bg-[#FAF7F2] rounded-2xl border border-[#A98A55]/40 shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Reader Header */}
              <div className="p-3.5 sm:p-5 border-b border-oriental-border/70 flex flex-wrap items-center justify-between gap-3 bg-oriental-cardLight/90">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-oriental-gold/15 border border-oriental-gold/40 flex items-center justify-center text-oriental-gold font-serif font-bold text-xl">
                    {(activeBook.titleHanz || activeBook.titleVi || "C").replace(/[《》]/g, "").charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-base sm:text-xl font-serif font-bold text-[#175A67]">
                        {activeBook.titleVi}
                      </h2>
                      <span className="font-serif text-base sm:text-lg text-[#966F28] opacity-85">
                        （{activeBook.titleHanz}）
                      </span>
                    </div>
                    <div className="text-[11px] text-oriental-textMuted">
                      {activeBook.author} • Triều {activeBook.dynasty} • {chapters.length} thiên/chương văn bản
                    </div>
                  </div>
                </div>

                {/* Reader Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Font Family Switcher (Serif vs Sans) */}
                  <div className="flex items-center bg-oriental-dark rounded-xl border border-oriental-border p-0.5 text-xs">
                    <button
                      onClick={() => setFontFamily("serif")}
                      className={`px-2.5 py-1 rounded-lg font-serif transition-all ${
                        fontFamily === "serif"
                          ? "bg-[#175A67] text-[#EAE3DE] font-bold shadow-sm"
                          : "text-[#345258] hover:text-[#175A67]"
                      }`}
                      title="Phông chữ Thư viện cổ điển (Lora Serif)"
                    >
                      Thư viện (Serif)
                    </button>
                    <button
                      onClick={() => setFontFamily("sans")}
                      className={`px-2.5 py-1 rounded-lg font-sans transition-all ${
                        fontFamily === "sans"
                          ? "bg-[#175A67] text-[#EAE3DE] font-bold shadow-sm"
                          : "text-[#345258] hover:text-[#175A67]"
                      }`}
                      title="Phông chữ Hiện đại sắc nét (Sans-serif)"
                    >
                      Hiện đại (Sans)
                    </button>
                  </div>

                  {/* Font Size Adjuster */}
                  <div className="flex items-center space-x-1 bg-oriental-dark px-2 py-1 rounded-xl border border-oriental-border">
                    <button
                      onClick={() => setFontSize(Math.max(13, fontSize - 1))}
                      className="p-1 text-oriental-textMuted hover:text-oriental-gold transition-colors"
                      title="Giảm cỡ chữ"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-mono text-oriental-gold px-1 font-semibold">{fontSize}px</span>
                    <button
                      onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                      className="p-1 text-oriental-textMuted hover:text-oriental-gold transition-colors"
                      title="Tăng cỡ chữ"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Spacing Adjuster */}
                  <div className="hidden sm:flex items-center bg-oriental-dark rounded-xl border border-oriental-border p-0.5 text-xs">
                    <button
                      onClick={() => setLineSpacing("normal")}
                      className={`px-2 py-1 rounded-lg text-[11px] transition-all ${
                        lineSpacing === "normal"
                          ? "bg-[#966F28] text-white font-bold"
                          : "text-[#345258] hover:text-[#175A67]"
                      }`}
                      title="Giãn dòng gọn gàng"
                    >
                      Gọn
                    </button>
                    <button
                      onClick={() => setLineSpacing("relaxed")}
                      className={`px-2 py-1 rounded-lg text-[11px] transition-all ${
                        lineSpacing === "relaxed"
                          ? "bg-[#966F28] text-white font-bold"
                          : "text-[#345258] hover:text-[#175A67]"
                      }`}
                      title="Giãn dòng thư thái vừa vặn"
                    >
                      Vừa
                    </button>
                    <button
                      onClick={() => setLineSpacing("loose")}
                      className={`px-2 py-1 rounded-lg text-[11px] transition-all ${
                        lineSpacing === "loose"
                          ? "bg-[#966F28] text-white font-bold"
                          : "text-[#345258] hover:text-[#175A67]"
                      }`}
                      title="Giãn dòng rộng thoáng"
                    >
                      Thoáng
                    </button>
                  </div>

                  {/* Download Full Book */}
                  <button
                    onClick={() => handleDownloadBook(activeBook.id)}
                    className="px-3 py-1.5 rounded-xl bg-oriental-gold text-oriental-dark font-bold text-xs hover:brightness-110 transition-all flex items-center space-x-1.5 shadow-goldGlow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Tải Sách (.txt)</span>
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={() => setActiveBook(null)}
                    className="p-2 rounded-xl bg-oriental-cardLight hover:bg-[#B83A32] text-[#345258] hover:text-white transition-colors"
                    title="Đóng cửa sổ đọc (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Reader Body: Two-Column Layout */}
              <div className="flex-1 flex overflow-hidden">
                {/* Left Column: Chapter List */}
                <div className="w-64 sm:w-72 border-r border-oriental-border/60 bg-oriental-dark/40 flex flex-col flex-shrink-0">
                  <div className="p-3 border-b border-oriental-border/50 text-xs font-mono text-oriental-gold uppercase tracking-wider flex items-center justify-between">
                    <span>Mục Lục Các Thiên</span>
                    <span className="text-[10px] text-oriental-textMuted">{chapters.length} bài</span>
                  </div>

                  {/* Chapter Quick Search */}
                  {chapters.length > 5 && (
                    <div className="p-2 border-b border-oriental-border/40">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-oriental-textMuted absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={chapterSearch}
                          onChange={(e) => setChapterSearch(e.target.value)}
                          placeholder="Lọc thiên / chương..."
                          className="w-full bg-oriental-card border border-oriental-border/70 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-oriental-textPrimary placeholder-oriental-textMuted focus:outline-none focus:border-oriental-gold"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {chapters.length === 0 ? (
                      <div className="p-4 text-xs text-oriental-textMuted text-center">
                        Đang tải danh mục...
                      </div>
                    ) : filteredChapters.length === 0 ? (
                      <div className="p-4 text-xs text-oriental-textMuted text-center">
                        Không tìm thấy thiên khớp từ khóa.
                      </div>
                    ) : (
                      filteredChapters.map((chap) => {
                        const originalIdx = chapters.findIndex((c) => c.relativePath === chap.relativePath);
                        const isCurrent = activeChapterIndex === originalIdx;
                        return (
                          <button
                            key={chap.relativePath}
                            onClick={() => loadChapter(activeBook.id, chap.relativePath, originalIdx)}
                            className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                              isCurrent
                                ? "bg-[#175A67] text-[#EAE3DE] font-bold shadow-sm"
                                : "text-oriental-textSecondary hover:bg-[#EAE3DE]/80 hover:text-[#175A67]"
                            }`}
                          >
                            <span className="truncate pr-2">{chap.title}</span>
                            <ChevronRight
                              className={`w-3.5 h-3.5 flex-shrink-0 ${
                                isCurrent ? "text-oriental-gold" : "text-oriental-textMuted"
                              }`}
                            />
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Right Column: Text Content Viewer */}
                <div className="flex-1 flex flex-col bg-oriental-card overflow-hidden">
                  {/* Chapter Header Sub-bar */}
                  {chapters.length > 0 && (
                    <div className="p-3 px-6 border-b border-oriental-border/40 flex items-center justify-between text-xs bg-oriental-cardLight/50">
                      <span className="text-[#175A67] font-serif font-bold truncate max-w-md">
                        {chapters[activeChapterIndex]?.title || "Văn bản cổ tịch"}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          disabled={activeChapterIndex <= 0}
                          onClick={() =>
                            loadChapter(
                              activeBook.id,
                              chapters[activeChapterIndex - 1].relativePath,
                              activeChapterIndex - 1
                            )
                          }
                          className="px-2.5 py-1 rounded-lg bg-oriental-card border border-oriental-border text-oriental-textSecondary disabled:opacity-40 hover:text-[#175A67] flex items-center space-x-1"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Thiên trước</span>
                        </button>
                        <span className="text-oriental-textMuted font-mono">
                          {activeChapterIndex + 1} / {chapters.length}
                        </span>
                        <button
                          disabled={activeChapterIndex >= chapters.length - 1}
                          onClick={() =>
                            loadChapter(
                              activeBook.id,
                              chapters[activeChapterIndex + 1].relativePath,
                              activeChapterIndex + 1
                            )
                          }
                          className="px-2.5 py-1 rounded-lg bg-oriental-card border border-oriental-border text-oriental-textSecondary disabled:opacity-40 hover:text-[#175A67] flex items-center space-x-1"
                        >
                          <span>Thiên sau</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Content Reading Canvas */}
                  <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-12 select-text leading-relaxed bg-[#F8F4F0]">
                    {errorMessage ? (
                      <div className="p-6 rounded-2xl bg-oriental-red/15 border border-oriental-red/40 text-oriental-textPrimary space-y-3 max-w-lg mx-auto my-12 text-center">
                        <AlertCircle className="w-8 h-8 text-oriental-redBright mx-auto" />
                        <p className="text-xs sm:text-sm text-oriental-redBright font-medium">{errorMessage}</p>
                        <div className="flex justify-center gap-3 pt-2">
                          <button
                            onClick={() => openBookReader(activeBook)}
                            className="px-4 py-2 rounded-xl bg-oriental-gold text-oriental-dark font-bold text-xs hover:brightness-110 flex items-center space-x-1.5"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Thử Lại</span>
                          </button>
                          <button
                            onClick={() => handleDownloadBook(activeBook.id)}
                            className="px-4 py-2 rounded-xl bg-oriental-cardLight border border-oriental-border text-oriental-gold text-xs font-semibold"
                          >
                            Tải File Về Máy
                          </button>
                        </div>
                      </div>
                    ) : loadingChapter ? (
                      <div className="py-24 text-center text-oriental-textMuted text-sm font-mono flex flex-col items-center justify-center space-y-3">
                        <RefreshCw className="w-7 h-7 animate-spin text-oriental-gold" />
                        <span>Đang thỉnh nạp nội dung cổ tịch kinh điển...</span>
                      </div>
                    ) : (
                      <ClassicContentRenderer
                        content={chapterContent}
                        fontFamily={fontFamily}
                        fontSize={fontSize}
                        lineSpacing={lineSpacing}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default function TaiLieuPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-oriental-textMuted font-mono">Đang tải thư viện cổ thư...</div>}>
      <TaiLieuContent />
    </Suspense>
  );
}
