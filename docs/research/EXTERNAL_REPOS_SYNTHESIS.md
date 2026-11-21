# Nghiên Cứu Chuyên Sâu & Kế Hoạch Tích Hợp 6 Kho Mã Nguồn Mở Thuật Số

> **Thư mục lưu trữ cục bộ:** `docs/references/external-repos/`
> **Đồng bộ tri thức dài hạn:** `LLM Wiki v2 (C:\Users\Anh Thu\llm-wiki)`

---

## 1. Bảng So Sánh Kiến Trúc 6 Kho Mã Nguồn Mở

| # | Repository | Ngôn ngữ | Quy mô | Điểm mạnh cốt lõi | Mức độ tích hợp vào Kỳ Thư Cổ Môn |
|---|---|---|---|---|---|
| 1 | `ai-freer/fortune-skill` | Python + Markdown/JSON | 172 files | **Chân Thái Dương Thời (True Solar Time - NOAA)**, Song kiếm hợp bích Bát Tự + Tử Vi, bộ quy tắc JSON (`classical-rules.json`, `methodology-framework.json`) | Đã lưu cục bộ + Tích hợp Prompt 6 bước & Quy tắc Cổ Thư vào `metaphysicsPromptEngine.ts` |
| 2 | `xuemian168/bazi-skill` | Python + Multi-Agent | 102 files | **Kiểm chứng chống ảo giác (`validate_citations.py`, `validate_analysis_result.py`)**, Đa trường phái hợp luận, **Biểu đồ nến K-line vận mệnh (Fortune K-line JSON)** | Đã lưu cục bộ + Tích hợp Citation Guardrails & chuẩn bị module K-line Đại Vận |
| 3 | `AdrianBOM/bazi-ziwei-skill` | **TypeScript (100%)** | 65 files | **Bazi Enricher (`gan-relations.ts`, `ge-ju.ts`, `enrich.ts`)** tự động định Cách Cục, Điều Hầu, Vượng Suy + **Poster Báo Cáo Tổng Hợp HTML chia sẻ** | Đã lưu cục bộ — Tương thích 100% TypeScript Next.js, ưu tiên porting `bazi-enrich` trực tiếp vào `src/lib/bat-tu/` |
| 4 | `jinchenma94/bazi-skill` | Python + Markdown | 13 files | Quy trình phỏng vấn thu thập thông tin gọn gàng + Bảng tra **Thần Sát (`shensha-table.md`)** & Quy tắc Đại Vận (`dayun-rules.md`) | Đã lưu cục bộ + Áp dụng vào luồng Trợ Lý Diệu Toán AI |
| 5 | `SylarLong/iztro` | TypeScript | 700 files | Thư viện an sao Tử Vi Đẩu Số chuẩn công nghiệp (`astro.bySolar`, `horoscope` Đại Vận / Lưu Niên / Lưu Nhật) + mẫu `examples/chat-api/` | **Đang chạy trực tiếp** (`iztro@^2.6.5` trong `package.json`) |
| 6 | `6tail/lunar-python` | Python (chị em của `lunar-typescript`) | 68 files | Chuẩn mực Lịch Pháp: Tiết khí, Bát Tự, Nạp Âm, 12 Kiến Trừ, Nhị Thập Bát Tú, Hoàng Đạo, Bành Tổ Bách Kỵ | **Đang chạy trực tiếp** qua bản TypeScript (`lunar-typescript@^1.8.7`), đồng bộ chuẩn Python cho script offline/AI |

---

## 2. Những Tinh Hoa Kỹ Thuật Đáng Vận Dụng Ngay

### A. Tách Bạch Tất Định & Chống Ảo Giác (Deterministic Engine + Citation Validator)
* Học từ `xuemian168/bazi-skill` và `ai-freer/fortune-skill`:
  * **100% tính toán bằng code** (`iztro`, `lunar-typescript`, `bazi-enrich`) — tuyệt đối không để LLM tự tính Can Chi, Tiết Khí hay vị trí sao.
  * Mọi luận giải của AI đều phải bám sát dữ liệu JSON đã xuất và trích dẫn đúng nguyên lý từ kho 47 bộ cổ thư (*Tử Bình Chân Thuyên, Trích Thiên Tủy, Cùng Thông Bảo Giám, Tử Vi Đẩu Số Toàn Thư*).

### B. Hiệu Chỉnh Chân Thái Dương Thời (True Solar Time — 34 Tỉnh/Thành Phố Mới Nhất Việt Nam)
* Học từ `ai-freer/fortune-skill` (`scripts/timezone-resolve.py`, `scripts/calendar_basis.py`):
  * Xây dựng bảng tọa độ kinh độ chuẩn theo **34 đơn vị hành chính cấp tỉnh mới sau sáp nhập** (gồm các TP trực thuộc TW như Hà Nội, TP.HCM [gộp Bình Dương & BR-VT], Hải Phòng [gộp Hải Dương], Đà Nẵng [gộp Quảng Nam], Huế, Cần Thơ [gộp Hậu Giang & Sóc Trăng]... và 25 tỉnh), đồng thời **hỗ trợ ánh xạ tương thích ngược (alias)** tên tỉnh cũ trước 2025 để người sinh các thế hệ trước gõ tên quê cũ vẫn tra đúng kinh độ chính xác tới từng phút!

### C. Bazi Enricher 100% TypeScript (Từ `AdrianBOM/bazi-ziwei-skill`)
* Port trực tiếp các module `gan-relations.ts` (Thiên Can ngũ hợp, địa chi lục hợp/tam hợp/tam hội/hình xung phá hại) và `ge-ju.ts` (tự động định Bát Cách Tử Bình: Chính Quan Cách, Thực Thần Cách, Thất Sát Cách...) vào `src/lib/bat-tu/` mà không cần backend Python!

### D. Biểu Đồ Nến K-Line Vận Mệnh & Poster Báo Cáo Song Kiếm Hợp Bích
* Học từ `xuemian168/bazi-skill` (**K-line Fortune Chart**) và `AdrianBOM/bazi-ziwei-skill` (**Zonghe Poster**):
  * Vẽ biểu đồ thăng trầm vận khí 10 đại vận (0–90 tuổi) trực quan như biểu đồ tài chính giúp người dùng nhìn 5 giây hiểu ngay "chu kỳ vàng" và "giai đoạn phòng thủ".
  * Nút **Xuất Poster Tổng Hợp (Bát Tự + Tử Vi đối chiếu chéo)** thiết kế theo đúng phong cách Giấy Xuyến Chỉ & Mực Lam để người dùng tải ảnh chia sẻ hoặc lưu giữ.
