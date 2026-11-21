export interface VanKhanItem {
  id: string;
  title: string;
  monthTag: string; // "Hàng tháng" | "Tháng 1" ... "Tháng 12" | "Gia sự" | "Kinh doanh"
  category: "hang-thang" | "tet" | "le-tiet" | "gia-su" | "kinh-doanh";
  categoryLabel: string;
  occasion: string;
  offerings: string[];
  note: string;
  needsDeceasedName?: boolean;
  content: string;
}

export const VAN_KHAN_CATEGORIES = [
  { id: "all", label: "Tất cả (24 bài)" },
  { id: "hang-thang", label: "Mùng 1 & Rằm" },
  { id: "tet", label: "Tết & Tháng Giêng" },
  { id: "le-tiet", label: "Lễ Tiết 12 Tháng" },
  { id: "gia-su", label: "Giỗ, Đầy Tháng, Cưới" },
  { id: "kinh-doanh", label: "Động Thổ, Nhập Trạch, Khai Trương" },
] as const;

export const VAN_KHAN_LIST: VanKhanItem[] = [
  {
    id: "mung-1-ram-gia-tien",
    title: "Văn Khấn Gia Tiên & Thổ Công Ngày Mùng 1, Ngày Rằm",
    monthTag: "Hàng tháng",
    category: "hang-thang",
    categoryLabel: "Mùng 1 & Rằm",
    occasion: "Sáng hoặc chiều ngày Mùng 1 (Sóc) và ngày Rằm (Vọng) cả 12 tháng",
    offerings: ["Hương thơm, hoa tươi (cúc, huệ, sen)", "Trầu cau, nước sạch, trà tươi", "Đĩa trái cây ngũ quả theo mùa", "Xôi chè hoặc mâm cơm chay/mặn tùy tâm"],
    note: "Lau dọn ban thờ sạch sẽ, thay nước chén, ăn mặc chỉnh tề, giữ tâm thanh tịnh trước khi thắp hương.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ địa, ngài Bản gia Táo quân cùng chư vị Tôn thần.
Con kính lạy Tổ tiên, Hiển khảo, Hiển tỷ, chư vị Hương linh nội ngoại họ tộc.

Tín chủ (chúng) con là: {{GIA_CHU}}
Ngụ tại: {{DIA_CHI}}

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}}.
Tín chủ con thành tâm sắm sửa hương hoa lễ vật, kim ngân trà quả, thắp nén tâm hương dâng lên trước án.

Chúng con kính mời: Ngài Bản cảnh Thành hoàng Chư vị Đại vương, ngài Bản xứ Thần linh Thổ địa, ngài Bản gia Táo quân, Ngũ phương, Long mạch, Tài thần. Cúi xin các ngài giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật.

Chúng con kính mời các cụ Tổ khảo, Tổ tỷ, chư vị Hương linh gia tiên nội ngoại, cúi xin thương xót con cháu, linh thiêng hiện về, chứng giám tâm thành, thụ hưởng lễ vật.

Nguyện cầu chư vị Tôn thần, Gia tiên phù hộ độ trì cho toàn gia chúng con sức khỏe dồi dào, bình an khang thái, công việc hanh thông, gia đạo hòa thuận, vạn sự cát tường.

Chúng con lễ bạc tâm thành, trước án kính lễ, cúi xin được phù hộ độ trì.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "giao-thua-ngoai-troi",
    title: "Văn Khấn Giao Thừa Ngoài Trời (Trừ Tịch — Đêm 30 Tết)",
    monthTag: "Tháng 1",
    category: "tet",
    categoryLabel: "Tết & Tháng Giêng",
    occasion: "Đúng giờ Tý (0h00 đêm Giao Thừa — chuyển giao năm cũ sang năm mới)",
    offerings: ["Gà trống luộc ngậm hoa hồng hoặc xôi gấc, bánh chưng/bánh tét", "Hương, hoa tươi, đèn/nến, trầu cau, rượu, nước sạch", "Ngũ quả, muối gạo"],
    note: "Cúng ngoài trời trước để tiễn vị Hành Khiển năm cũ và nghênh đón vị Hành Khiển năm mới cai quản hạ giới.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con kính lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Đức Đương Lai Hạ Sinh Di Lặc Tôn Phật.
Con kính lạy Hoàng Thiên, Hậu Thổ, chư vị Tôn thần.
Con kính lạy Ngài Cựu Niên Đương Cai Hành Khiển, Cựu Niên Hành Binh Chi Thần, Cựu Niên Phán Quan.
Con kính lạy Ngài Đương Niên Hành Khiển, Đương Niên Hành Binh Chi Thần, Đương Niên Phán Quan năm mới.

Nay là phút giao thừa thiêng liêng, ngày {{NGAY_AM}}, năm {{NAM_AM}}.
Tín chủ (chúng) con là: {{GIA_CHU}}
Ngụ tại: {{DIA_CHI}}

Phút giao thừa vừa điểm, năm cũ qua đi, năm mới đón về, tam dương khai thái, vạn tượng canh tân.
Nhân buổi tân xuân, tín chủ chúng con thành tâm sắm sửa hương hoa phẩm vật, nghi lễ cung trần, dâng lên trước án, kính cẩn tiễn đưa Thần cũ, nghênh đón Thần mới.

Cúi xin chư vị Tôn thần giáng lâm thụ hưởng, phù hộ độ trì cho toàn gia chúng con năm mới an khang thịnh vượng, sức khỏe dồi dào, gia đình hòa thuận, vạn sự cát tường.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "giao-thua-trong-nha",
    title: "Văn Khấn Giao Thừa Trong Nhà (Cúng Thổ Công & Gia Tiên)",
    monthTag: "Tháng 1",
    category: "tet",
    categoryLabel: "Tết & Tháng Giêng",
    occasion: "Ngay sau khi cúng Giao Thừa ngoài trời (0h00 – 0h30 sáng Mùng 1)",
    offerings: ["Mâm ngũ quả, bánh chưng/bánh tét, giò chả, xôi gấc", "Hương, hoa tươi, đèn nến, trầu cau, rượu trắng, trà nóng"],
    note: "Thực hiện ngay tại bàn thờ gia tiên trong nhà để đón tổ tiên cùng bước sang năm mới.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con kính lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Đức Đương Lai Hạ Sinh Di Lặc Tôn Phật.
Con kính lạy Hoàng Thiên, Hậu Thổ chư vị Tôn thần.
Con kính lạy Bản cảnh Thành hoàng, Bản xứ Thổ địa, Long mạch, Táo quân, Tài thần.
Con kính lạy các cụ Tổ khảo, Tổ tỷ, bá thúc huynh đệ, cô di tỷ muội, chư vị Hương linh nội ngoại gia tiên.

Hôm nay là phút Giao Thừa bước sang năm {{NAM_AM}}, ngày {{NGAY_AM}}.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Năm cũ đã qua, năm mới vừa sang, chúng con thành tâm sắm sửa hương hoa phẩm vật, mâm cỗ tân niên dâng lên trước án. Kính mời chư vị Tôn thần và Gia tiên nội ngoại giáng lâm linh sàng, thụ hưởng lễ vật, chứng giám lòng hiếu kính.

Cúi xin phù hộ độ trì cho toàn gia chúng con năm mới thân tâm an lạc, tai qua nạn khỏi, công việc hanh thông, tài lộc dồi dào, con cháu hiếu thuận thành đạt.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "mung-1-tet-nguyen-dan",
    title: "Văn Khấn Sáng Mùng 1 Tết Nguyên Đán",
    monthTag: "Tháng 1",
    category: "tet",
    categoryLabel: "Tết & Tháng Giêng",
    occasion: "Sáng ngày Mùng 1 tháng Giêng Âm lịch",
    offerings: ["Mâm cỗ mặn hoặc chay đầu năm, bánh chưng/bánh tét, mứt Tết", "Hương, hoa tươi, trà nóng, rượu xuân, trầu cau"],
    note: "Cúng sáng Mùng 1 mang ý nghĩa chúc Tết tổ tiên, khởi đầu một năm mới hòa thuận và may mắn.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Đức Đương Lai Hạ Sinh Di Lặc Tôn Phật.
Con kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy Ngài Bản cảnh Thành hoàng, Bản xứ Thổ địa, Bản gia Táo quân cùng chư vị Tôn thần.
Con kính lạy Tổ tiên nội ngoại gia tiên họ tộc.

Hôm nay là ngày Mùng 1 tháng Giêng (Ngày {{NGAY_AM}}), năm {{NAM_AM}} — Tiết Nguyên Đán đầu xuân.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Nhân ngày đầu năm mới, đất trời khai xuân, vạn vật sinh sôi, chúng con thành tâm kính dâng hương hoa trà quả, mâm cơm đầu năm lên trước án, kính chúc chư vị Tôn thần và Tổ tiên tân xuân hoan hỷ.

Nguyện cầu chư vị chứng giám lòng thành, ban phúc ban lộc, phù hộ cho toàn gia chúng con suốt bốn mùa bình an vô sự, sức khỏe dồi dào, gia đạo hưng long, vạn sự như ý.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "le-hoa-vang-tet",
    title: "Văn Khấn Lễ Hóa Vàng (Lễ Tạ Năm Mới — Mùng 3 / Mùng 4 Tết)",
    monthTag: "Tháng 1",
    category: "tet",
    categoryLabel: "Tết & Tháng Giêng",
    occasion: "Sáng hoặc trưa Mùng 3, Mùng 4 hoặc Mùng 5 tháng Giêng",
    offerings: ["Mâm cơm tạ Tết (gà luộc, bánh chưng, xôi, nem/chả)", "2 cây mía nguyên ngọn (tượng trưng gậy cho tổ tiên gánh lộc, phổ biến ở miền Bắc)", "Hương, hoa, trà, rượu, trầu cau"],
    note: "Nghi lễ tiễn đưa ông bà tổ tiên sau những ngày sum vầy ăn Tết cùng con cháu; nên hóa lượng vàng mã tượng trưng gọn gàng, tránh khói bụi.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con kính lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy Ngài Đương niên Thái Tuế, ngài Bản cảnh Thành hoàng, Bản xứ Thổ địa, Táo quân.
Con kính lạy chư vị Gia tiên nội ngoại, Cửu huyền Thất tổ.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}}.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Nay tiết xuân đã mãn, lễ Tết đã tròn, chúng con thành tâm sửa biện hương hoa lễ vật, mâm cơm tạ lễ dâng lên trước án, kính cẩn tiễn đưa chư vị Gia tiên nội ngoại hồi quy âm cảnh.

Cúi xin Tổ tiên và chư vị Tôn thần chứng giám tâm thành, lưu phúc lưu ân, phù hộ độ trì cho toàn gia con cháu bước vào năm mới làm ăn thuận lợi, học hành tiến bộ, thân tâm an lạc, gia đạo bình an.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "khai-ha-via-ngoc-hoang",
    title: "Văn Khấn Lễ Khai Hạ (Mùng 7) & Vía Ngọc Hoàng (Mùng 9 Tháng Giêng)",
    monthTag: "Tháng 1",
    category: "tet",
    categoryLabel: "Tết & Tháng Giêng",
    occasion: "Mùng 7 (Hạ nêu, khai xuân) hoặc Mùng 9 tháng Giêng (Vía Trời / Ngọc Hoàng)",
    offerings: ["Hương, hoa tươi, đèn nến, 5 chén trà, đường phèn/chè ngọt", "Trái cây ngũ quả, trầu cau, lễ chay thanh tịnh"],
    note: "Ngày Mùng 9 tháng Giêng (Vía Ngọc Hoàng) rất được coi trọng tại miền Nam và cộng đồng người Việt gốc Hoa, cúng ngoài sân hoặc trước hiên nhà hướng lên trời.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con kính lạy Hoàng Thiên Thượng Đế — Ngọc Hoàng Đại Thiên Tôn.
Con kính lạy Nam Tào Bắc Đẩu tinh quân cùng chư vị Thiên thần.
Con kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần cai quản hạ giới.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}}.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Nhân ngày đầu xuân cát lành (Lễ Khai Hạ / Vía Ngọc Hoàng), tín chủ con thành tâm sắm sửa hương hoa trà quả, lễ vật thanh tịnh kính dâng lên Thiên đình.

Cúi xin Ngọc Hoàng Thượng Đế cùng chư vị Tôn thần từ bi chứng giám, ban cho mưa thuận gió hòa, quốc thái dân an; phù hộ cho gia đình chúng con năm mới trí tuệ sáng suốt, công việc hanh thông, sức khỏe bền lâu, vạn sự cát tường.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "ram-thang-gieng-thuong-nguyen",
    title: "Văn Khấn Rằm Tháng Giêng (Tết Nguyên Tiêu / Lễ Thượng Nguyên)",
    monthTag: "Tháng 1",
    category: "tet",
    categoryLabel: "Tết & Tháng Giêng",
    occasion: "Ngày 15 tháng Giêng Âm lịch ('Cúng cả năm không bằng Rằm tháng Giêng')",
    offerings: ["Mâm lễ chay dâng Phật (xôi gấc, chè trôi nước, bánh trôi, hoa quả)", "Mâm cơm gia tiên tươm tất, đèn nến sáng rực rỡ"],
    note: "Rằm tháng Giêng là đêm trăng tròn đầu tiên của năm mới, trọng nhất là tâm thiện lành, cầu bình an và khởi đầu sáng sủa.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ địa, ngài Bản gia Táo quân.
Con kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương linh gia tiên nội ngoại.

Hôm nay là ngày Rằm tháng Giêng ({{NGAY_AM}}), năm {{NAM_AM}} — Tiết Nguyên Tiêu Thượng Nguyên.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Nhân ngày trăng tròn đầu tiên của năm mới, tín chủ con thành tâm sửa biện hương hoa đăng trà quả thực, thắp nén tâm hương dâng lên trước án.

Cúi xin mười phương Chư Phật từ bi gia hộ, chư vị Tôn thần và Gia tiên nội ngoại giáng lâm chứng giám lòng thành, thụ hưởng lễ vật; phù hộ độ trì cho toàn gia chúng con một năm mới bình an vô sự, sức khỏe dồi dào, tài lộc vượng tiến, tâm trí sáng suốt, vạn sự hanh thông.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "via-quan-the-am-thang-2",
    title: "Văn Khấn Vía Đức Quán Thế Âm Bồ Tát (19 Tháng 2 Âm Lịch)",
    monthTag: "Tháng 2",
    category: "le-tiet",
    categoryLabel: "Lễ Tiết 12 Tháng",
    occasion: "Ngày 19/2 (Đản sinh), 19/6 (Thành đạo), 19/9 (Xuất gia) Âm lịch",
    offerings: ["Hoa sen hoặc hoa huệ trắng, trái cây tươi", "Nước tinh khiết, đèn nến, lễ chay hoàn toàn (tuyệt đối không cúng đồ mặn)"],
    note: "Ngày vía Quán Thế Âm Bồ Tát đề cao lòng từ bi, ăn chay, phóng sinh đúng cách và làm việc thiện lành.",
    content: `Nam mô Đại Từ Đại Bi Cứu Khổ Cứu Nạn Quảng Đại Linh Cảm Quán Thế Âm Bồ Tát! (3 lần)

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}} — Ngày vía Đức Quán Thế Âm Bồ Tát.
Đệ tử (tín chủ) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Thành tâm sắm sửa hương thơm, hoa tươi, nước sạch, phẩm vật thanh chay kính dâng trước Phật đài.
Cúi xin Đức Quán Thế Âm Bồ Tát rủ lòng từ bi gia hộ, soi sáng tâm trí cho chúng con biết tu dưỡng đạo đức, sống thiện lành bao dung; cầu nguyện cho cha mẹ, gia quyến và muôn loài đều được bình an, tiêu trừ bệnh tật phiền não, gia đạo an khang hòa thuận.

Nam mô Đại Bi Quán Thế Âm Bồ Tát! (3 lần)`,
  },
  {
    id: "tet-han-thuc-3-3",
    title: "Văn Khấn Tết Hàn Thực (Mùng 3 Tháng 3 — Bánh Trôi Bánh Chay)",
    monthTag: "Tháng 3",
    category: "le-tiet",
    categoryLabel: "Lễ Tiết 12 Tháng",
    occasion: "Ngày Mùng 3 tháng 3 Âm lịch",
    offerings: ["3 hoặc 5 bát bánh trôi nước, 3 hoặc 5 bát bánh chay", "Hương, hoa tươi, trầu cau, nước sạch, trái cây"],
    note: "Tết Hàn Thực ở Việt Nam mang đậm ý nghĩa hướng về cội nguồn tổ tiên, gắn liền với hình ảnh bánh trôi nước tròn đầy nghĩa tình.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ địa, ngài Bản gia Táo quân.
Con kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương linh gia tiên nội ngoại.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}} — Tiết Hàn Thực mùng 3 tháng 3.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Theo lệ cổ truyền, chúng con thành tâm làm đĩa bánh trôi, bát bánh chay, sắm sửa hương hoa trà quả dâng lên trước án để tưởng nhớ công đức tổ tiên, ông bà.

Kính mời chư vị Tôn thần và Gia tiên nội ngoại giáng lâm thụ hưởng lễ vật, chứng giám tấm lòng thành kính; phù hộ độ trì cho toàn gia chúng con sức khỏe bình an, con cháu sum vầy hiếu thuận, mọi sự cát lành.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "tiet-thanh-minh-tao-mo",
    title: "Văn Khấn Tiết Thanh Minh (Tảo Mộ Ngoài Phần Mộ & Tại Gia)",
    monthTag: "Tháng 3",
    category: "le-tiet",
    categoryLabel: "Lễ Tiết 12 Tháng",
    occasion: "Tiết Thanh Minh (khoảng mùng 4–5/4 Dương lịch, thường trong Tháng 3 Âm lịch)",
    offerings: ["Hương, đèn nến, hoa tươi, trầu cau, trái cây, rượu, trà", "Xôi, gà luộc hoặc bánh trái thanh đạm (khi ra mộ)"],
    note: "Khi tảo mộ cần cắt tỉa cỏ dại, đắp lại phần đất sụt lở, thắp hương ở đài Thổ Thần/Thần Linh nghĩa trang trước rồi mới thắp ở phần mộ gia tiên.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Hoàng Thiên Hậu Thổ, Chư vị Tôn thần.
Con kính lạy các ngài Thần linh bản xứ, Long mạch, Sơn thần, Thổ địa cai quản tại khu vực phần mộ này.
Con kính lạy Hương linh Tổ tiên nội ngoại, ông bà cha mẹ yên nghỉ nơi đây.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}} — Nhân tiết Thanh Minh trong sáng.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Tưởng nhớ công đức sinh thành dưỡng dục của Tổ tiên, chúng con về đây sửa sang phần mộ, dọn dẹp cỏ cây, thành tâm dâng nén hương thơm, hoa tươi lễ vật lên chư vị Thần linh và chân linh Gia tiên.

Cúi xin chư vị Thần linh cai quản nơi đây thương tình che chở cho phần mộ tổ tiên chúng con luôn được yên ổn, vượng khí. Kính mời chân linh Tổ tiên chứng giám lòng hiếu thảo của con cháu, phù hộ độ trì cho dòng tộc hưng thịnh, con cháu mạnh khỏe, bình an, đoàn kết.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "gio-to-hung-vuong-10-3",
    title: "Văn Khấn Ngày Giỗ Tổ Hùng Vương (Mùng 10 Tháng 3 Âm Lịch)",
    monthTag: "Tháng 3",
    category: "le-tiet",
    categoryLabel: "Lễ Tiết 12 Tháng",
    occasion: "Ngày Mùng 10 tháng 3 Âm lịch (Quốc Giỗ Việt Nam)",
    offerings: ["Bánh chưng, bánh giầy (biểu tượng Trời Tròn Đất Vuông)", "Hương, hoa tươi, trái cây, nước sạch, trầu cau"],
    note: "Dâng hương tại gia hướng về Đất Tổ Phú Thọ và tổ tiên dòng họ để bày tỏ lòng biết ơn các Vua Hùng đã có công dựng nước.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con kính lạy Quốc Tổ Hùng Vương — Mười tám đời Vua Hùng đã có công dựng nước Văn Lang.
Con kính lạy Lạc Long Quân, Quốc Mẫu Âu Cơ cùng chư vị Tiên liệt, Anh hùng dân tộc.
Con kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần và Gia tiên nội ngoại họ tộc.

Hôm nay là ngày Mùng 10 tháng 3 ({{NGAY_AM}}), năm {{NAM_AM}} — Ngày Quốc Giỗ Tổ Hùng Vương.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Uống nước nhớ nguồn, ăn quả nhớ kẻ trồng cây, chúng con thành tâm dâng cặp bánh chưng bánh giầy, hương hoa trà quả kính bái Quốc Tổ và Gia tiên tiền tổ.

Nguyện cầu Quốc Tổ anh linh phù hộ cho non sông đất nước Việt Nam thái bình thịnh vượng; phù hộ cho gia đình chúng con luôn giữ gìn truyền thống hiếu nghĩa, sức khỏe an khang, công việc hanh thông, con cháu nên người hữu ích cho xã hội.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "le-phat-dan-15-4",
    title: "Văn Khấn Lễ Phật Đản (Rằm Tháng Tư — 15/4 Âm Lịch)",
    monthTag: "Tháng 4",
    category: "le-tiet",
    categoryLabel: "Lễ Tiết 12 Tháng",
    occasion: "Từ Mùng 8 đến Rằm tháng 4 Âm lịch (Đức Phật Thích Ca Đản Sinh)",
    offerings: ["Hoa sen/cúc vàng, 5 loại trái cây tươi, nước sạch", "Mâm cỗ chay thanh tịnh, đèn hoa đăng"],
    note: "Mùa Phật Đản nên giữ ngũ giới, ăn chay, lan tỏa năng lượng từ bi và tri ân trí tuệ giác ngộ.",
    content: `Nam mô Bổn Sư Thích Ca Mâu Ni Phật! (3 lần)

Kính lạy Đức Từ Phụ Bổn Sư Thích Ca Mâu Ni Phật, mười phương Chư Phật, Chư Đại Bồ Tát, Chư Hiền Thánh Tăng.
Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}} — Đại lễ Phật Đản thiêng liêng.
Đệ tử (tín chủ) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Nhân ngày Đức Phật thị hiện đản sinh vì hạnh phúc an lạc của chư thiên và loài người, chúng con thành tâm sắm sửa hương hoa đăng trà quả thực thanh chay kính dâng lên Phật đài.

Nguyện cầu ánh sáng từ bi và trí tuệ của Đức Phật soi chiếu cho thế giới hòa bình, chúng sinh an lạc; gia hộ cho cha mẹ, ông bà và toàn gia chúng con thân khỏe tâm an, biết sống tỉnh thức, gieo nhân lành, gặt quả ngọt.

Nam mô Bổn Sư Thích Ca Mâu Ni Phật! (3 lần)`,
  },
  {
    id: "tet-doan-ngo-5-5",
    title: "Văn Khấn Tết Đoan Ngọ (Mùng 5 Tháng 5 — Tết Diệt Sâu Bọ)",
    monthTag: "Tháng 5",
    category: "le-tiet",
    categoryLabel: "Lễ Tiết 12 Tháng",
    occasion: "Giờ Ngọ (11h00 – 13h00) ngày Mùng 5 tháng 5 Âm lịch",
    offerings: ["Cơm rượu nếp (cái rượu nếp trắng/nếp cẩm)", "Trái cây mùa hạ: mận, vải, dưa hấu, xoài", "Bánh ú tro (miền Trung, Nam), vịt quay hoặc chè kê (miền Trung)"],
    note: "Giờ Ngọ ngày 5/5 là lúc dương khí cực thịnh trong năm, người Việt cúng tổ tiên rồi cả nhà cùng thưởng thức cơm rượu nếp và hoa quả để kiện tỳ, phòng bệnh mùa hè.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy ngài Bản cảnh Thành hoàng, Bản xứ Thổ địa, Bản gia Táo quân.
Con kính lạy Tổ tiên nội ngoại gia tiên họ tộc.

Hôm nay là ngày Mùng 5 tháng 5 ({{NGAY_AM}}), năm {{NAM_AM}} — Tết Đoan Ngọ chính dương.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Nhân tiết Đoan Ngọ dương khí sung mãn, chúng con thành tâm sắm sửa hương hoa trà quả, cơm rượu nếp, bánh ú tro và hoa trái mùa hạ dâng lên trước án, kính mời chư vị Tôn thần và Gia tiên nội ngoại giáng lâm thụ hưởng.

Cúi xin chứng giám lòng thành, phù hộ độ trì cho toàn gia chúng con vượt qua mùa nắng nóng bình an, tiêu trừ bệnh tật dịch lệ, thân thể khỏe mạnh, công việc thuận buồm xuôi gió, gia đình hạnh phúc.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "le-giua-nam-thang-6",
    title: "Văn Khấn Tiết Hạ Chí & Rằm Tháng 6 (Cầu An Nửa Năm)",
    monthTag: "Tháng 6",
    category: "le-tiet",
    categoryLabel: "Lễ Tiết 12 Tháng",
    occasion: "Ngày Mùng 6/6 hoặc Rằm tháng 6 Âm lịch (đánh dấu nửa năm)",
    offerings: ["Hương, hoa sen mùa hạ, trái cây tươi, chè hạt sen", "Nước sạch, trà thơm, cơm canh thanh đạm"],
    note: "Lễ giữa năm mang ý nghĩa tạ ơn nửa đầu năm bình an và cầu nguyện nửa cuối năm thuận lợi, mưa thuận gió hòa.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con kính lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy ngài Bản cảnh Thành hoàng, Bản xứ Thổ địa, Táo quân và Tổ tiên nội ngoại gia tiên.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}} — Tiết giữa năm tháng Sáu.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Trải qua nửa năm trời đất vận chuyển, ơn nhờ chư vị Tôn thần và Gia tiên che chở cho gia đạo yên ổn. Hôm nay chúng con thành tâm dâng hương hoa trà quả tạ ơn và cầu nguyện cho sáu tháng cuối năm mưa thuận gió hòa, sức khỏe an khang, công việc suôn sẻ, gia đình hòa mục.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "vu-lan-ram-thang-7",
    title: "Văn Khấn Lễ Vu Lan Báo Hiếu Gia Tiên (Rằm Tháng 7)",
    monthTag: "Tháng 7",
    category: "le-tiet",
    categoryLabel: "Lễ Tiết 12 Tháng",
    occasion: "Từ mùng 1 đến Rằm tháng 7 Âm lịch (Mùa Vu Lan Báo Hiếu)",
    offerings: ["Mâm lễ chay thanh tịnh dâng Phật", "Mâm cơm gia tiên tươm tất", "Hoa sen/cúc vàng, trái cây tươi, hương đèn, trà nước"],
    note: "Mùa Vu Lan trọng nhất là tấm lòng hiếu đạo với cha mẹ hiện tiền và tưởng nhớ tổ tiên; hạn chế đốt vàng mã gây ô nhiễm.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Đức Đại Hiếu Mục Kiền Liên Tôn Giả.
Con kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy chư vị Tổ tiên nội ngoại, Cửu huyền Thất tổ.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}} — Tiết Trung Nguyên, mùa Vu Lan Báo Hiếu.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Nhân ngày lễ Vu Lan thắng hội, chúng con tưởng nhớ công ơn trời biển của cha mẹ sinh thành, tổ tiên tạo dựng. Thành tâm sắm sửa hương hoa trà quả, mâm lễ thanh tịnh dâng lên trước án.

Cúi xin mười phương Chư Phật từ bi gia hộ, chư vị Tổ tiên nội ngoại giáng lâm chứng giám lòng thành, thụ hưởng lễ vật. Nguyện cầu cửu huyền thất tổ sớm siêu sinh tịnh độ; nguyện cầu cha mẹ hiện tiền tăng long phước thọ, thân tâm an lạc; toàn gia con cháu hiếu thuận bình an.

Nam mô Đại Hiếu Mục Kiền Liên Bồ Tát Ma Ha Tát! (3 lần)`,
  },
  {
    id: "cung-chung-sinh-thang-7",
    title: "Văn Khấn Cúng Chúng Sinh / Xá Tội Vong Nhân Ngoài Trời (Tháng 7)",
    monthTag: "Tháng 7",
    category: "le-tiet",
    categoryLabel: "Lễ Tiết 12 Tháng",
    occasion: "Chiều tối (17h–19h) từ Mùng 2 đến 15 tháng 7 Âm lịch — Cúng ngoài sân/trước cửa",
    offerings: ["Cháo trắng loãng (12 bát nhỏ), muối, gạo", "Bỏng ngô, bánh kẹo, khoai lang/ngô luộc, mía cắt khúc", "Nước sạch, hương thơm (chỉ cúng đồ chay, không cúng đồ mặn)"],
    note: "Cúng chúng sinh thể hiện lòng từ bi bố thí cho các vong linh không nơi nương tựa; đặt mâm cúng ngoài sân hoặc trước cửa nhà, không cúng trong nhà.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con kính lạy Đức Địa Tạng Vương Bồ Tát, Đức Quán Thế Âm Bồ Tát.
Con kính lạy Bản cảnh Thành hoàng, Bản xứ Thổ địa, Thần linh cai quản trong xứ này.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}} — Tiết Trung Nguyên xá tội vong nhân.
Tín chủ con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Khởi tâm từ bi, chúng con sửa biện cháo trắng, muối gạo, bỏng bánh, trà nước thanh chay bày ngoài thềm sân, kính mời các vị cô hồn, thập loại chúng sinh không nơi nương tựa lai lâm thụ hưởng.

Nguyện cầu các vị nương nhờ ánh sáng từ bi của Tam Bảo mà sớm buông bỏ chấp niệm, được siêu thoát về cõi lành; cùng phù hộ cho khu phố xóm làng và gia đình chúng con được bình an yên ổn.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "tet-trung-thu-15-8",
    title: "Văn Khấn Tết Trung Thu (Rằm Tháng 8 — Trông Trăng Đoàn Viên)",
    monthTag: "Tháng 8",
    category: "le-tiet",
    categoryLabel: "Lễ Tiết 12 Tháng",
    occasion: "Chiều hoặc tối ngày 15 tháng 8 Âm lịch",
    offerings: ["Bánh nướng, bánh dẻo, cốm mới (miền Bắc)", "Mâm ngũ quả mùa thu (bưởi, hồng đỏ, na, chuối, thanh long)", "Trà sen, hương, hoa cúc vàng"],
    note: "Cúng tổ tiên trước vào chiều/tối Rằm tháng 8 rồi cả gia đình cùng phá cỗ trông trăng, tạo ký ức đoàn viên ấm áp cho trẻ nhỏ.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy ngài Bản cảnh Thành hoàng, Bản xứ Thổ địa, Táo quân và Tổ tiên nội ngoại gia tiên.

Hôm nay là ngày Rằm tháng Tám ({{NGAY_AM}}), năm {{NAM_AM}} — Tiết Trung Thu trăng tròn viên mãn.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Nhân đêm trăng sáng nhất mùa thu, chúng con thành tâm sắm sửa hương hoa, bánh nướng bánh dẻo, trà thơm và hoa quả mùa thu dâng lên trước án, kính mời chư vị Tôn thần và Gia tiên về chung vui đoàn viên cùng con cháu.

Cúi xin chứng giám lòng thành, phù hộ độ trì cho toàn gia chúng con luôn sum vầy ấm êm, con cháu thông minh học giỏi, người lớn bình an mạnh khỏe, công việc viên mãn như trăng rằm.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "tet-trung-cuu-9-9",
    title: "Văn Khấn Tết Trùng Cửu (Mùng 9 Tháng 9 — Kính Lão Trường Thọ)",
    monthTag: "Tháng 9",
    category: "le-tiet",
    categoryLabel: "Lễ Tiết 12 Tháng",
    occasion: "Ngày Mùng 9 tháng 9 Âm lịch",
    offerings: ["Hoa cúc vàng, trà hoa cúc, bánh ngọt hoặc xôi chè", "Trái cây mùa thu, hương thơm, nước sạch"],
    note: "Số 9 (Cửu) đồng âm với 'trường cửu' (bền lâu), là dịp con cháu kính chúc ông bà cha mẹ sống lâu trăm tuổi và tưởng nhớ tổ tiên.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con kính lạy chín phương Trời, mười phương Chư Phật, Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy Bản cảnh Thành hoàng, Thổ địa, Táo quân và Tổ tiên nội ngoại gia tiên.

Hôm nay là ngày Mùng 9 tháng 9 ({{NGAY_AM}}), năm {{NAM_AM}} — Tiết Trùng Cửu cát lành.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Nhân ngày cửu dương trường cửu, chúng con dâng chén trà cúc, hương hoa lễ vật kính mời chư vị Tôn thần và Gia tiên thụ hưởng. Nguyện cầu cho các bậc cao niên, ông bà cha mẹ trong gia đình luôn trường thọ mạnh khỏe, tinh thần minh mẫn; con cháu hiếu thảo, gia đạo bình an bền vững.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "tet-com-moi-ha-nguyen-thang-10",
    title: "Văn Khấn Tết Cơm Mới (10/10) & Tết Hạ Nguyên (Rằm Tháng 10)",
    monthTag: "Tháng 10",
    category: "le-tiet",
    categoryLabel: "Lễ Tiết 12 Tháng",
    occasion: "Ngày 10/10 (Tết Cơm Mới / Trùng Thập) và 15/10 Âm lịch (Tết Hạ Nguyên)",
    offerings: ["Cơm nấu từ gạo nếp mới hoặc gạo tẻ mới đầu mùa", "Xôi gấc/xôi đỗ, bánh dày, canh rau củ, hoa quả tươi", "Hương, trà thơm, trầu cau"],
    note: "Một trong ba tiết lớn trong năm (Thượng Nguyên – Trung Nguyên – Hạ Nguyên), bày tỏ lòng biết ơn đất trời và tổ tiên sau mùa thu hoạch.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con kính lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Hoàng Thiên Hậu Thổ, Thần Nông, Thành hoàng, Thổ địa, Táo quân chư vị Tôn thần.
Con kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương linh gia tiên nội ngoại.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}} — Tiết Cơm Mới / Lễ Hạ Nguyên tháng Mười.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Nhờ ơn trời đất mưa thuận gió hòa, tổ tiên phù hộ cho mùa màng và công việc cả năm gặt hái thành quả. Hôm nay chúng con kính dâng bát cơm gạo mới, hương hoa trà quả lên trước án để tạ ơn chư vị Tôn thần và Gia tiên.

Cúi xin chứng giám lòng thành, phù hộ cho gia đình chúng con quanh năm no ấm đủ đầy, sức khỏe dồi dào, tâm an trí sáng, mọi sự hanh thông.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "tiet-dong-chi-thang-11",
    title: "Văn Khấn Tiết Đông Chí & Cúng Rằm Tháng Mười Một",
    monthTag: "Tháng 11",
    category: "le-tiet",
    categoryLabel: "Lễ Tiết 12 Tháng",
    occasion: "Tiết Đông Chí (khoảng 21–22/12 Dương lịch) hoặc Rằm tháng 11 Âm lịch",
    offerings: ["Chè trôi nước nóng (tượng trưng sự đoàn viên ấm áp giữa mùa đông)", "Hương, hoa tươi, trái cây, trà nóng"],
    note: "Đông Chí đánh dấu điểm 'Nhất dương sinh' — từ đây ngày bắt đầu dài dần ra, gia đình quây quần ăn chè nóng cầu bình an đón năm mới.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con kính lạy chín phương Trời, mười phương Chư Phật, Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy ngài Bản cảnh Thành hoàng, Thổ địa, Táo quân và Tổ tiên nội ngoại gia tiên.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}} — Tiết Đông Chí dương khí sơ sinh.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Thành tâm sắm sửa hương hoa trà quả, bát chè trôi nước nóng ấm dâng lên trước án. Kính mời chư vị Tôn thần và Gia tiên giáng lâm thụ hưởng, phù hộ độ trì cho toàn gia chúng con giữa mùa đông lạnh giá luôn ấm êm mạnh khỏe, chuẩn bị bước sang năm mới bình an cát tường.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "ta-mo-cuoi-nam-thang-12",
    title: "Văn Khấn Lễ Chạp Mộ / Tạ Mộ Cuối Năm (Tháng Chạp)",
    monthTag: "Tháng 12",
    category: "le-tiet",
    categoryLabel: "Lễ Tiết 12 Tháng",
    occasion: "Từ Rằm đến 25 tháng Chạp hàng năm",
    offerings: ["Hương, hoa cúc tươi, đèn nến, trầu cau, rượu trà, trái cây", "Xôi, gà luộc hoặc bánh chưng sớm"],
    note: "Con cháu đi dọn cỏ, sơn sửa phần mộ tổ tiên sạch đẹp và mời ông bà về nhà ăn Tết Tất Niên cùng gia đình.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con kính lạy chín phương Trời, mười phương Chư Phật, Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy chư vị Sơn thần, Thổ địa, Long mạch cai quản nơi nghĩa trang phần mộ này.
Con kính lạy Hương linh Tổ tiên nội ngoại yên nghỉ tại đây.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}} — Tiết cuối năm tháng Chạp.
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Năm hết Tết đến, chúng con thành tâm về đây tu sửa dọn dẹp phần mộ tổ tiên sạch sẽ, kính dâng hương hoa lễ vật tạ ơn chư vị Thần linh đã che chở suốt một năm qua; đồng thời kính mời chân linh ông bà Tổ tiên về nhà sum họp đón Tết Nguyên Đán cùng con cháu.

Cúi xin chư vị chứng giám lòng hiếu kính và phù hộ độ trì cho gia tộc bình an hưng thịnh.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "ong-cong-ong-tao",
    title: "Văn Khấn Cúng Ông Công Ông Táo (23 Tháng Chạp)",
    monthTag: "Tháng 12",
    category: "tet",
    categoryLabel: "Tết & Tháng Giêng",
    occasion: "Trước 12 giờ trưa ngày 23 tháng Chạp (Âm lịch)",
    offerings: ["3 bộ mũ áo Táo Quân (2 ông, 1 bà)", "3 con cá chép sống phóng sinh (miền Bắc) hoặc chè trôi nước, kẹo mè xửng (miền Trung, Nam)", "Hương, hoa tươi, ngũ quả, trầu cau, rượu trà"],
    note: "Cúng xong trước giờ Ngọ ngày 23 Chạp. Phóng sinh cá chép nhẹ tay ở vùng nước sạch, không thả túi nilon xuống sông hồ.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân.

Tín chủ (chúng) con là: {{GIA_CHU}}
Ngụ tại: {{DIA_CHI}}

Hôm nay, ngày {{NGAY_AM}}, năm {{NAM_AM}}.
Tín chủ con thành tâm sắm sửa hương hoa phẩm vật, xiêm hài áo mũ, kính dâng Tôn thần. Thắp nén tâm hương tín chủ con thành tâm kính bái.

Chúng con kính mời ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân hiển linh trước án hưởng thụ lễ vật. Cúi xin Tôn thần gia ân xá tội cho mọi sơ suất trong năm qua, tấu trình những điều tốt lành lên Thiên đình và phù hộ toàn gia chúng con năm mới sức khỏe dồi dào, an khang thịnh vượng, vạn sự tốt lành.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "tat-nien-30-tet",
    title: "Văn Khấn Lễ Tất Niên (Chiều 30 Tết)",
    monthTag: "Tháng 12",
    category: "tet",
    categoryLabel: "Tết & Tháng Giêng",
    occasion: "Chiều ngày cuối cùng của năm Âm lịch (29 hoặc 30 tháng Chạp)",
    offerings: ["Mâm ngũ quả, hương hoa, đèn nến, trầu cau, rượu trà", "Bánh chưng (miền Bắc) hoặc bánh tét (miền Trung, Nam)", "Mâm cỗ Tết truyền thống sum vầy"],
    note: "Nghi lễ khép lại năm cũ, tạ ơn thần linh và mời tổ tiên về ăn Tết cùng gia đình.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con kính lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy ngài Kim Niên Đương Cai Thái Tuế, ngài Bản cảnh Thành hoàng, Bản xứ Thổ địa, Thần Tài, Táo quân.
Con kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương linh nội ngoại gia tiên.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}} (Chiều Tất Niên).
Tín chủ (chúng) con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Đông tàn sắp hết, xuân tiết gần kề. Hôm nay ngày Tất Niên, chúng con sắm sửa hương hoa lễ vật, trà quả, mâm cơm thịnh soạn dâng lên trước án. Kính mời chư vị Tôn thần và Gia tiên nội ngoại giáng lâm linh sàng, thụ hưởng lễ vật và chung vui đón Tết cùng con cháu.

Nguyện xin phù hộ độ trì cho toàn gia bước sang năm mới bình an vô sự, sức khỏe dồi dào, gia đạo hưng thịnh, công danh tài lộc hanh thông.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "cung-gio-gia-tien",
    title: "Văn Khấn Lễ Cúng Giỗ (Giỗ Đầu / Giỗ Hết / Giỗ Thường)",
    monthTag: "Gia sự",
    category: "gia-su",
    categoryLabel: "Giỗ, Đầy Tháng, Cưới",
    occasion: "Ngày kỵ nhật (ngày mất theo Âm lịch) hàng năm của người thân",
    offerings: ["Hương, hoa tươi, đèn nến, trầu cau, rượu, trà", "Mâm cơm cúng giỗ gồm các món truyền thống và món người khuất từng yêu thích"],
    note: "Thường làm lễ Tiên Thường vào chiều hôm trước để cáo yết Thổ Công, sau đó cúng Chính Kỵ vào đúng ngày giỗ.",
    needsDeceasedName: true,
    content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Đức Địa Tạng Vương Bồ Tát.
Con kính lạy ngài Bản cảnh Thành hoàng, Bản xứ Thổ địa, Bản gia Táo quân cùng chư vị Tôn thần.
Con kính lạy chư vị Tổ tiên nội ngoại gia tiên họ tộc.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}} — Chính ngày kỵ nhật của: {{NGUOI_GIO}}.
Tín chủ (chúng) con là: {{GIA_CHU}}, cùng toàn thể con cháu, ngụ tại: {{DIA_CHI}}.

Nhân ngày giỗ kỵ, chúng con thiết tưởng công đức sinh thành dưỡng dục và ân tình sâu nặng của {{NGUOI_GIO}}, lòng không nguôi thương nhớ. Thành tâm sắm sửa hương hoa trà quả, mâm cơm đạm bạc dâng lên trước linh tọa.

Cúi xin chư vị Tôn thần chứng giám, cho phép chân linh {{NGUOI_GIO}} cùng chư vị Gia tiên nội ngoại giáng lâm linh sàng, thụ hưởng lễ vật. Nguyện cầu hương linh {{NGUOI_GIO}} an nhàn nơi cõi tịnh độ; phù hộ độ trì cho con cháu luôn đoàn kết, hiếu thuận, sức khỏe bình an, giữ vững gia phong.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "day-thang-thoi-noi",
    title: "Văn Khấn Lễ Cúng Đầy Tháng & Thôi Nôi (12 Bà Mụ & Đức Ông)",
    monthTag: "Gia sự",
    category: "gia-su",
    categoryLabel: "Giỗ, Đầy Tháng, Cưới",
    occasion: "Tròn 1 tháng tuổi (Đầy tháng) hoặc tròn 1 năm tuổi (Thôi nôi) của bé",
    offerings: ["12 chén chè nhỏ + 1 tô chè lớn (chè trôi nước cho bé gái, chè đậu trắng cho bé trai ở miền Nam)", "12 đĩa xôi nhỏ + 1 đĩa xôi lớn, gà luộc chéo cánh", "Hương, hoa tươi, trầu têm cánh phượng, mâm đồ vật chọn nghề (lễ Thôi Nôi)"],
    note: "Tục 'Gái lùi 2, trai lùi 1' theo Âm lịch trong lễ Đầy Tháng/Thôi Nôi; lễ Thôi Nôi kèm nghi thức cho bé bốc đồ vật chọn nghề vui vẻ, ấm cúng.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con kính lạy Đệ nhất Thiên tỷ đại tiên chúa, Đệ nhị Thiên đế đại tiên chúa, Đệ tam Thiên Mụ đại tiên chúa.
Con kính lạy Tam thập lục cung chư vị Tiên Nương và 12 vị Bà Mụ nặn ra hình hài.
Con kính lạy 3 vị Đức Ông (Thánh Sư, Tổ Sư, Tiên Sư) cùng chư vị Tôn thần, Gia tiên nội ngoại.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}}.
Gia đình tín chủ chúng con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Nhân dịp cháu nhỏ của gia đình chúng con tròn Đầy Tháng (hoặc Thôi Nôi), chúng con thành tâm sắm sửa hương hoa, xôi chè, lễ vật dâng lên cảm tạ công ơn 12 Bà Mụ, Đức Ông và Tổ tiên đã che chở cho mẹ tròn con vuông, cháu lớn khôn khỏe mạnh.

Cúi xin các Ngài chứng giám lòng thành, thụ hưởng lễ vật; tiếp tục phù hộ độ trì cho cháu luôn mạnh khỏe, hay ăn chóng lớn, ngoan ngoãn thông minh, bình an hạnh phúc trọn đời.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "cuoi-hoi-gia-tien",
    title: "Văn Khấn Gia Tiên Lễ Ăn Hỏi / Vu Quy / Tân Hôn",
    monthTag: "Gia sự",
    category: "gia-su",
    categoryLabel: "Giỗ, Đầy Tháng, Cưới",
    occasion: "Ngày tổ chức lễ Đính Hôn (Ăn Hỏi), lễ Vu Quy (nhà gái) và lễ Tân Hôn (nhà trai)",
    offerings: ["Trầu cau tươi, rượu, chè, bánh phu thê / bánh cốm, mâm ngũ quả rồng phượng", "Hương, đèn nến long phụng, hoa tươi"],
    note: "Nghi lễ ra mắt tổ tiên thiêng liêng để cô dâu chú rể chính thức báo cáo gia tiên hai họ và đón nhận phúc lành hôn nhân.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con kính lạy chín phương Trời, mười phương Chư Phật, Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy ngài Bản cảnh Thành hoàng, Bản xứ Thổ địa, Táo quân.
Con kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương linh gia tiên nội ngoại họ tộc.

Hôm nay là ngày lành tháng tốt ({{NGAY_AM}}), năm {{NAM_AM}}.
Tín chủ chúng con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.

Nhân dịp đại hỷ của hai cháu (tên chú rể & cô dâu) làm lễ Ăn Hỏi / Vu Quy / Tân Hôn thành gia lập thất, gia đình chúng con thành tâm sắm sửa trầu cau, trà rượu, hương hoa lễ vật dâng lên trước án cáo yết chư vị Tôn thần và Gia tiên nội ngoại.

Cúi xin Tổ tiên chứng giám cho đôi trẻ nên duyên vợ chồng, phù hộ độ trì cho hai cháu trăm năm hạnh phúc, thuận hòa kính nhường, làm ăn phát đạt, sớm sinh quý tử, giữ gìn nếp nhà hiếu thuận.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "dong-tho-xay-dung",
    title: "Văn Khấn Lễ Động Thổ Xây Dựng / Sửa Chữa Nhà Cửa",
    monthTag: "Kinh doanh",
    category: "kinh-doanh",
    categoryLabel: "Động Thổ, Nhập Trạch, Khai Trương",
    occasion: "Giờ hoàng đạo khởi công xây nhà mới hoặc sửa chữa lớn",
    offerings: ["Bộ tam sên (thịt luộc, trứng, tôm), gà luộc, đĩa xôi hoặc bánh chưng", "Hương, hoa tươi, ngũ quả, trầu cau, rượu trắng, muối gạo, nước sạch"],
    note: "Gia chủ (hoặc người được mượn tuổi) tự tay cuốc 5 hoặc 7 nhát đất tượng trưng sau khi khấn xong để chính thức khởi công.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con kính lạy chín phương Trời, mười phương Chư Phật, Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy Quan Đương niên Thái Tuế, ngài Bản cảnh Thành hoàng, Bản xứ Thổ địa, Thổ công, Long mạch, Táo quân cai quản trong khu vực này.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}}.
Tín chủ con là: {{GIA_CHU}}, tại khu đất địa chỉ: {{DIA_CHI}}.

Nhân chọn được ngày lành tháng tốt, tín chủ con thành tâm sắm sửa hương hoa lễ vật dâng lên trước án, kính xin phép chư vị Thần linh Thổ địa, Long mạch cho gia đình chúng con được khởi công động thổ xây dựng (hoặc tu sửa) ngôi nhà tại nơi đây.

Cúi xin chư vị Tôn thần giáng lâm chứng giám, phù hộ độ trì cho quá trình thi công từ đầu đến cuối được suôn sẻ an toàn, thợ thuyền bình an vô sự, công trình bền vững khang trang, sớm ngày hoàn thành mỹ mãn.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "nhap-trach-nha-moi",
    title: "Văn Khấn Lễ Nhập Trạch (Về Nhà Mới)",
    monthTag: "Kinh doanh",
    category: "kinh-doanh",
    categoryLabel: "Động Thổ, Nhập Trạch, Khai Trương",
    occasion: "Ngày giờ hoàng đạo dọn vào nhà mới / căn hộ mới",
    offerings: ["Mâm ngũ quả, hoa tươi, hương, đèn nến, trầu cau", "Bếp lửa / ấm nước đun sôi pha trà khai hỏa tại nhà mới", "3 hũ Muối – Gạo – Nước sạch, xôi, gà luộc, rượu trà"],
    note: "Gia chủ mang bát hương/bài vị gia tiên vào nhà trước, mở rộng cửa đón sinh khí, bật đèn sáng và đun ấm nước sôi pha trà.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy các ngài Thần linh Thổ địa, Long mạch, Táo quân cai quản trong khu vực này.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}}.
Tín chủ (chúng) con là: {{GIA_CHU}}, nay chuyển về ngôi gia mới tại: {{DIA_CHI}}.

Nhân ngày lành tháng tốt, tín chủ con thành tâm sắm sửa hương hoa lễ vật, trà quả thanh tịnh dâng lên trước án, kính xin các ngài cho phép gia đình chúng con làm lễ Nhập Trạch, rước linh vị Gia tiên về thờ phụng và an cư lạc nghiệp tại đây.

Cúi xin chư vị Tôn thần phù hộ độ trì cho ngôi nhà luôn vượng khí bình an, gia đạo hưng long, mọi thành viên mạnh khỏe, làm ăn phát đạt, vạn sự hanh thông.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "khai-truong-kinh-doanh",
    title: "Văn Khấn Lễ Khai Trương Cửa Hàng / Doanh Nghiệp",
    monthTag: "Kinh doanh",
    category: "kinh-doanh",
    categoryLabel: "Động Thổ, Nhập Trạch, Khai Trương",
    occasion: "Sáng ngày khai trương cửa hàng, văn phòng, công ty hoặc mở hàng đầu xuân",
    offerings: ["Lọ hoa tươi (đồng tiền, cúc vàng, hướng dương)", "Mâm ngũ quả, hương, đèn nến, trầu cau, muối gạo", "Xôi gấc, gà luộc hoặc heo quay, 3 chén nước, 3 chén trà, 3 chén rượu"],
    note: "Đặt bàn cúng khai trương ngoài sân hoặc phía trước cửa chính thoáng đãng, chọn giờ hoàng đạo hợp mệnh người đứng đầu.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Quan Đương niên Thái Tuế Chí Đức Tôn thần.
Con kính lạy các ngài Bản cảnh Thành hoàng, Ngũ phương, Ngũ thổ, Long mạch, Tài thần, Táo quân cai quản trong khu vực này.

Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}}.
Tín chủ con là: {{GIA_CHU}}, địa chỉ kinh doanh tại: {{DIA_CHI}}.

Nay chọn được ngày lành tháng tốt, chúng con thành tâm sắm sửa hương hoa lễ vật làm lễ Khai Trương khởi đầu việc kinh doanh. Kính mời chư vị Tôn thần giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật; phù hộ độ trì cho công việc buôn bán hanh thông, khách hàng đông vui tín nhiệm, đối tác hiền lương, tài lộc dồi dào, vạn sự cát tường.

Nam mô A Di Đà Phật! (3 lần)`,
  },
  {
    id: "than-tai-tho-dia",
    title: "Văn Khấn Thần Tài – Thổ Địa (Mùng 10 & Hàng Tháng)",
    monthTag: "Tháng 1",
    category: "kinh-doanh",
    categoryLabel: "Động Thổ, Nhập Trạch, Khai Trương",
    occasion: "Ngày vía Thần Tài (Mùng 10 tháng Giêng), Mùng 10 hàng tháng, Mùng 1 & Rằm",
    offerings: ["Hoa cúc/đồng tiền, trái cây tươi, 5 chén nước sạch, rượu trà", "Bộ tam sên (thịt luộc, tôm/cua, trứng luộc) hoặc cá lóc nướng (miền Nam) ngày vía Thần Tài"],
    note: "Giữ ban thờ Thần Tài – Thổ Địa sạch sẽ, thoáng sáng, hướng nhìn ra cửa chính.",
    content: `Nam mô A Di Đà Phật! (3 lần)

Con lạy chín phương Trời, mười phương Chư Phật, Hoàng Thiên Hậu Thổ chư vị Tôn thần.
Con kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân, ngài Thần Tài vị tiền và ngài Thổ Địa Tôn thần.

Tín chủ con là: {{GIA_CHU}}, ngụ tại: {{DIA_CHI}}.
Hôm nay là ngày {{NGAY_AM}}, năm {{NAM_AM}}.

Tín chủ thành tâm sửa biện hương hoa, lễ vật, trà quả bày ra trước án kính mời ngài Thần Tài và ngài Thổ Địa giáng lâm chứng giám lòng thành, thụ hưởng lễ vật; phù hộ độ trì cho gia chủ an ninh khang thái, buôn bán hanh thông, lộc tài tăng tiến, tâm đạo mở mang, sở cầu tất ứng.

Nam mô A Di Đà Phật! (3 lần)`,
  },
];
