import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { CLASSICS_CATALOG } from "@/lib/classics/classicsData";

export const dynamic = "force-dynamic";

const CLASSICS_BASE_DIR = path.resolve(process.cwd(), "docs", "references", "classics");

// In-memory TTL cache for the 47-book catalog (avoids recursive fs.readdirSync on every page load)
const CATALOG_CACHE_TTL_MS = 10 * 60 * 1000;
const catalogCache = new Map<string, { payload: { total: number; books: any[] }; expiresAt: number }>();

// Helper: Find matching folder on disk handling NFC/NFD unicode variations
function findBookFolder(baseDir: string, targetId: string): string | null {
  if (!fs.existsSync(baseDir)) return null;
  const direct = path.join(baseDir, targetId);
  if (fs.existsSync(direct)) return targetId;

  const targetNFC = targetId.normalize("NFC");
  const targetNFD = targetId.normalize("NFD");
  const entries = fs.readdirSync(baseDir);

  for (const entry of entries) {
    if (
      entry === targetId ||
      entry.normalize("NFC") === targetNFC ||
      entry.normalize("NFD") === targetNFD ||
      entry.toLowerCase() === targetId.toLowerCase()
    ) {
      return entry;
    }
  }
  return null;
}

// Helper: Recursively collect all markdown files in a book folder
function collectMarkdownFiles(dir: string, relPrefix = ""): { relativePath: string; fileName: string; title: string }[] {
  let results: { relativePath: string; fileName: string; title: string }[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const rel = relPrefix ? `${relPrefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results = results.concat(collectMarkdownFiles(fullPath, rel));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      // Skip root index.md if there are other chapter files
      if (entry.name.toLowerCase() === "index.md" && entries.length > 1) {
        continue;
      }
      const title = entry.name.replace(/\.md$/, "").replace(/^\d+/, "");
      results.push({
        relativePath: rel.replace(/\\/g, "/"),
        fileName: entry.name,
        title: title || entry.name.replace(/\.md$/, ""),
      });
    }
  }

  return results.sort((a, b) => a.fileName.localeCompare(b.fileName, undefined, { numeric: true, sensitivity: "base" }));
}

// Helper: Find exact file path in book folder handling slashes and unicode
function findFileInFolder(bookDir: string, requestedFile: string): string | null {
  const direct = path.join(bookDir, requestedFile);
  if (fs.existsSync(direct)) return direct;

  const norm = path.normalize(requestedFile);
  const directNorm = path.join(bookDir, norm);
  if (fs.existsSync(directNorm)) return directNorm;

  const targetNFC = requestedFile.normalize("NFC").replace(/\\/g, "/");
  const targetNFD = requestedFile.normalize("NFD").replace(/\\/g, "/");
  const baseName = path.basename(requestedFile).normalize("NFC");

  function search(dir: string, prefix = ""): string | null {
    if (!fs.existsSync(dir)) return null;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      const rel = prefix ? `${prefix}/${e.name}` : e.name;
      const relNorm = rel.replace(/\\/g, "/");
      if (e.isDirectory()) {
        const found = search(full, rel);
        if (found) return found;
      } else if (e.isFile()) {
        if (
          relNorm.normalize("NFC") === targetNFC ||
          relNorm.normalize("NFD") === targetNFD ||
          e.name.normalize("NFC") === baseName
        ) {
          return full;
        }
      }
    }
    return null;
  }

  return search(bookDir);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let bookId = searchParams.get("book") || "";
    let filePath = searchParams.get("file") || "";
    const isDownload = searchParams.get("download") === "true";

    // Normalize input parameters
    if (bookId) {
      try {
        bookId = decodeURIComponent(bookId).trim();
      } catch {}
    }
    if (filePath) {
      try {
        filePath = decodeURIComponent(filePath).trim();
      } catch {}
    }

    // 1. Download full book consolidated text
    if (bookId && isDownload) {
      const matchedFolder = findBookFolder(CLASSICS_BASE_DIR, bookId);
      if (!matchedFolder) {
        return NextResponse.json({ error: "Không tìm thấy thư mục sách: " + bookId }, { status: 404 });
      }

      const bookFolder = path.join(CLASSICS_BASE_DIR, matchedFolder);
      const meta = CLASSICS_CATALOG.find((b) => b.id === bookId || b.id === matchedFolder);
      const files = collectMarkdownFiles(bookFolder);

      let consolidatedContent = `========================================================================\n`;
      consolidatedContent += `KỲ THƯ CỔ MÔN • THƯ VIỆN CỔ THƯ NGUYÊN BẢN ĐÔNG PHƯƠNG\n`;
      consolidatedContent += `Tác phẩm: ${meta?.titleVi || matchedFolder} (${meta?.titleHanz || matchedFolder})\n`;
      consolidatedContent += `Tác giả: ${meta?.author || "Cổ nhân"} • Triều đại: ${meta?.dynasty || "Cổ đại"}\n`;
      consolidatedContent += `Thể loại: ${meta?.categoryVi || "Huyền Học Cổ Thư"}\n`;
      consolidatedContent += `Tóm lược: ${meta?.summary || ""}\n`;
      consolidatedContent += `Tổng số thiên/chương: ${files.length}\n`;
      consolidatedContent += `========================================================================\n\n\n`;

      for (const f of files) {
        const fullFilePath = path.join(bookFolder, f.relativePath);
        if (fs.existsSync(fullFilePath)) {
          const content = fs.readFileSync(fullFilePath, "utf-8");
          consolidatedContent += `------------------------------------------------------------------------\n`;
          consolidatedContent += `【 ${f.title} 】\n`;
          consolidatedContent += `------------------------------------------------------------------------\n\n`;
          consolidatedContent += content + `\n\n\n`;
        }
      }

      const filename = `${meta?.titleVi || matchedFolder}`.replace(/[\/\\?%*:|"<>]/g, "_") + ".txt";

      return new NextResponse(consolidatedContent, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
        },
      });
    }

    // 2. Read specific chapter content
    if (bookId && filePath) {
      const matchedFolder = findBookFolder(CLASSICS_BASE_DIR, bookId);
      if (!matchedFolder) {
        return NextResponse.json({ error: "Không tìm thấy sách: " + bookId }, { status: 404 });
      }

      const bookFolder = path.join(CLASSICS_BASE_DIR, matchedFolder);
      const fullFilePath = findFileInFolder(bookFolder, filePath);

      if (!fullFilePath || !fs.existsSync(fullFilePath)) {
        return NextResponse.json({ error: "Không tìm thấy chương này: " + filePath }, { status: 404 });
      }

      const content = fs.readFileSync(fullFilePath, "utf-8");
      return NextResponse.json({
        bookId,
        filePath,
        content,
      });
    }

    // 3. Return book metadata and chapter list
    if (bookId) {
      const matchedFolder = findBookFolder(CLASSICS_BASE_DIR, bookId);
      if (!matchedFolder) {
        return NextResponse.json({ error: "Không tìm thấy sách: " + bookId }, { status: 404 });
      }

      const bookFolder = path.join(CLASSICS_BASE_DIR, matchedFolder);
      const meta = CLASSICS_CATALOG.find((b) => b.id === bookId || b.id === matchedFolder);
      const files = collectMarkdownFiles(bookFolder);

      let previewContent = "";
      if (files.length > 0) {
        const firstFile = path.join(bookFolder, files[0].relativePath);
        if (fs.existsSync(firstFile)) {
          previewContent = fs.readFileSync(firstFile, "utf-8");
        }
      }

      return NextResponse.json({
        meta: meta || {
          id: matchedFolder,
          titleVi: matchedFolder,
          titleHanz: matchedFolder,
          category: "bat-tu",
          categoryVi: "Cổ Thư",
          author: "Cổ nhân",
          dynasty: "Cổ đại",
          summary: "Tài liệu cổ thư nguyên bản.",
        },
        chapters: files,
        previewContent,
      });
    }

    // 4. Default: Return list of all 47 books with chapter counts (served from in-memory TTL cache)
    const now = Date.now();
    const cached = catalogCache.get("catalog");
    if (cached && cached.expiresAt > now) {
      return NextResponse.json(cached.payload, {
        headers: { "X-Cache": "HIT" },
      });
    }

    const catalogWithCounts = CLASSICS_CATALOG.map((book) => {
      const matchedFolder = findBookFolder(CLASSICS_BASE_DIR, book.id);
      let chapterCount = 0;
      if (matchedFolder) {
        const bookFolder = path.join(CLASSICS_BASE_DIR, matchedFolder);
        const files = collectMarkdownFiles(bookFolder);
        chapterCount = files.length;
      }
      return {
        ...book,
        chapterCount,
      };
    });

    const payload = {
      total: catalogWithCounts.length,
      books: catalogWithCounts,
    };
    catalogCache.set("catalog", { payload, expiresAt: now + CATALOG_CACHE_TTL_MS });

    return NextResponse.json(payload, {
      headers: { "X-Cache": "MISS" },
    });
  } catch (error: any) {
    console.error("API Classics Error:", error);
    return NextResponse.json({ error: "Lỗi xử lý tài liệu: " + error.message }, { status: 500 });
  }
}
