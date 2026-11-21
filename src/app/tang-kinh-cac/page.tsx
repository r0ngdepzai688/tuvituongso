"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Search, Sparkles, Scroll, Shield, Compass, ChevronRight, Library } from "lucide-react";
import { OrientalFrame } from "@/components/decorations/OrientalFrame";
import { AuspiciousSeal } from "@/components/decorations/AuspiciousSeal";
import { ChineseCloudDivider } from "@/components/decorations/XiangyunCloud";

interface GrimoireItem {
  id: string;
  name: string;
  hanz: string;
  category: "tu-vi" | "bat-tu" | "ky-mon" | "phong-thuy" | "classics";
  element: string;
  nature: string;
  verse: string; // Câu phú cổ
  meaning: string; // Giải nghĩa
  actionAdvice: string; // Lời khuyên hành động
}

const GRIMOIRE_DATA: GrimoireItem[] = [
  // === 35 BỘ CỔ THƯ KINH ĐIỂN ĐÔNG PHƯƠNG ===
  {
    id: "classic-tu-binh-chan-thuyen",
    name: "Tử Bình Chân Thuyên",
    hanz: "子平真诠",
    category: "classics",
    element: "Bát Tự Mệnh Lý • Định Cách Cục",
    nature: "Thẩm Triều Phổ / Trầm Hiếu Chiêm • Triều Thanh (Tứ Khố Toàn Thư)",
    verse: "Bát tự dĩ nguyệt lệnh dụng thần vi bổn, hữu sở dụng tắc hữu sở kỵ. Hữu định tắc hữu biến, thành bại cứu ứng thấu triệt vô dư.",
    meaning: "Bộ sách chuẩn mực kinh điển bậc nhất của trường phái Bát Tự Tử Bình chính thống, chuyên luận về Thành - Bại - Cứu - Ứng của Nguyệt Lệnh Dụng Thần và Bát Cách (Quan, Sát, Ấn, Kiêu, Tài, Kiếp, Thực, Thương). Được Khâm Định Tứ Khố Toàn Thư đánh giá cao nhất.",
    actionAdvice: "Bản văn đầy đủ lưu tại docs/references/classics/子平真诠/. AI dùng làm cơ sở chuẩn để định cách cục và xác lập Dụng Thần chân thực.",
  },
  {
    id: "classic-trich-thien-tuy",
    name: "Trích Thiên Tủy Sỉ Vi",
    hanz: "滴天髓阐微",
    category: "classics",
    element: "Bát Tự Khí Thế • Âm Dương Ngũ Hành",
    nature: "Lưu Bá Ôn soạn • Nhậm Thiết Tiều chú giải • Triều Thanh",
    verse: "Đái thiên lý địa nhân vi quý, thuận nghịch hành tàng khán đắc thất. Giáp mộc tham thiên, thoát thai yếu hỏa; Ất mộc căn cai, hoài đinh bão bính.",
    meaning: "Đỉnh cao triết học mệnh lý phương Đông, giải mã khí thế can chi, thuận sinh phản sinh, tòng cách hóa cách. Phá tan quan niệm hình xung khắc hại máy móc, đưa mệnh lý lên tầm biện chứng duy vật cổ đại.",
    actionAdvice: "Bản văn đầy đủ lưu tại docs/references/classics/滴天髓阐微/. AI dùng để phân tích khí tượng và nguồn gốc biến hóa của Nhật Chủ.",
  },
  {
    id: "classic-uyen-hai-tu-binh",
    name: "Uyên Hải Tử Bình",
    hanz: "渊海子平",
    category: "classics",
    element: "Tổ Môn Tử Bình • Ca Phú Thi Quyết",
    nature: "Tống • Từ Tử Bình sáng lập • Từ Thăng biên tập",
    verse: "Uyên hải thâm sâu tàng ảo diệu, tử bình lập số định càn khôn. Bát tự ngũ hành tương cứu ứng, thiên cơ hà tất vấn quỷ thần.",
    meaning: "Bộ sách đầu tiên hệ thống hóa phương pháp luận mệnh Tử Bình (lấy Nhật Can làm trung tâm thay vì Niên Trụ của Lộc Mệnh pháp thời Đường). Chứa đựng toàn bộ các bài phú kinh điển luận lục thân, nữ mệnh, tiểu nhi và thần sát.",
    actionAdvice: "Bản văn đầy đủ lưu tại docs/references/classics/渊海子平/. AI dùng để trích dẫn ca quyết và kinh nghiệm tiền nhân.",
  },
  {
    id: "classic-tam-menh-thong-hoi",
    name: "Tam Mệnh Thông Hội",
    hanz: "三命通会",
    category: "classics",
    element: "Đại Bách Khoa Thuật Số Mệnh Lý",
    nature: "Minh • Tiến sĩ Vạn Dân Anh • Ngự Định Tứ Khố Toàn Thư",
    verse: "Tam mệnh thông hội tập đại thành, vạn lưu quy hải hiển tinh anh. Nạp âm chánh khí tương dung hội, thế sự cùng thông nhất lãm minh.",
    meaning: "Tác phẩm đồ sộ bậc nhất trong lịch sử mệnh học Trung Hoa (12 quyển), quy tụ toàn bộ tinh hoa thuật số từ đời Hán, Đường, Tống, Nguyên đến Minh. Kết hợp nhuần nhuyễn Chính Ngũ Hành và Nạp Âm Lục Thập Giáp Tý.",
    actionAdvice: "Bản văn đầy đủ lưu tại docs/references/classics/三命通会/. AI dùng làm từ điển đối chiếu cách cục phức hợp.",
  },
  {
    id: "classic-dau-so-cot-tuy-phu",
    name: "Đẩu Số Cốt Tủy Phú",
    hanz: "斗数骨髓赋",
    category: "classics",
    element: "Tử Vi Đẩu Số • Tông Môn Khẩu Quyết",
    nature: "Trần Hy Di • Toàn Thư Trích Yếu",
    verse: "Thái dương cư ngọ, nhật lệ trung thiên, phú quý long vinh. Vũ khúc miếu viên, uy danh hiển hách. Kình dương hỏa tinh, uy quyền xuất chúng.",
    meaning: "Thiên phú ngắn gọn súc tích nhưng chứa đựng cốt tủy của 14 chính tinh và quần tinh Tử Vi Đẩu Số, quy chuẩn hóa các thế củng chiếu, hội hợp, giáp mệnh và cứu giải khi gặp hung sát tinh.",
    actionAdvice: "Bản văn đầy đủ lưu tại docs/references/classics/斗数骨髓赋/. AI dùng để trích dẫn câu phú cổ khi giải đoán cung Mệnh/Thân.",
  },
  {
    id: "classic-ky-mon-bi-kip",
    name: "Kỳ Môn Độn Giáp Bí Kíp Đại Toàn",
    hanz: "奇门遁甲秘笈大全",
    category: "classics",
    element: "Kỳ Môn Độn Giáp • Binh Pháp & Thời Không",
    nature: "Lưu Bá Ôn san định • Khâm Thiên Giám truyền bản",
    verse: "Âm dương cửu cục phân thuận nghịch, tam kỳ lục nghi định phương ngung. Bát môn thần tướng tương giao hội, quyết sách cơ mưu vạn lý thông.",
    meaning: "Toàn thư về Kỳ Môn Độn Giáp 1080 cục âm dương, phương pháp phi cung, lập bàn, định Trực Phù Trực Sử, phối Bát Môn Cửu Tinh Bát Thần để tính toán thời điểm và phương hướng hành động tối ưu.",
    actionAdvice: "Bản văn đầy đủ lưu tại docs/references/classics/奇门遁甲秘笈大全/. AI dùng để xác định cát hung phương vị và thời khắc xuất hành.",
  },
  {
    id: "classic-tang-kinh",
    name: "Táng Kinh (Quách Phác)",
    hanz: "葬经",
    category: "classics",
    element: "Cội Nguồn Phong Thủy Khí Học",
    nature: "Tấn • Quách Phác trứ tác • Vạn Thế Phong Thủy Chi Tổ",
    verse: "Khí thừa phong tắc tán, giới thủy tắc chỉ. Cổ nhân tụ chi sử bất tán, hành chi sử hữu chỉ, cố vị chi phong thủy.",
    meaning: "Nguồn gốc khai sinh thuật ngữ 'Phong Thủy' trong văn hóa phương Đông. Định nghĩa kinh điển về Sinh Khí: tụ khí tàng phong, nạp thủy đắc lộc, lấy âm dương hài hòa với địa lý làm căn bản phúc lộc.",
    actionAdvice: "Bản văn đầy đủ lưu tại docs/references/classics/葬经/. AI dùng làm nền tảng lý luận phong thủy hình thế và khí trường.",
  },
  {
    id: "classic-mai-hoa-dich-so",
    name: "Mai Hoa Dịch Số",
    hanz: "梅花易数",
    category: "classics",
    element: "Dịch Học Chiêm Bốc • Tâm Pháp Khởi Quẻ",
    nature: "Tống • Thiệu Khang Tiết (Thiệu Ung)",
    verse: "Vạn vật giai hữu số, tâm động tức quái sinh. Thể dụng minh sinh khắc, thiên cơ tại mục tiền.",
    meaning: "Phương pháp chiêm đoán vi diệu lấy trực giác và vạn vật xung quanh (thời gian, âm thanh, phương hướng, màu sắc) để lập quẻ Dịch mà không cần dùng cỏ thi hay đồng tiền. Biện giải tương tác Thể - Dụng để đoán định tương lai trong chớp mắt.",
    actionAdvice: "Bản văn đầy đủ lưu tại docs/references/classics/梅花易数/. AI dùng để phân tích quẻ tượng và ứng nghiệm thời cơ.",
  },
  {
    id: "classic-boc-phe-chinh-tong",
    name: "Bốc Phệ Chính Tông",
    hanz: "卜筮正宗",
    category: "classics",
    element: "Lục Hào Dịch Học • Văn Vương Bát Quái",
    nature: "Thanh • Vương Hồng Húc san định",
    verse: "Hào động định biến thông, thế ứng khán tiêu trưởng. Ngũ hành sinh khắc định vinh khô, nguyệt kiến nhật thần ty họa phúc.",
    meaning: "Tác phẩm kinh điển hoàn thiện nhất của môn Lục Hào Bốc Phệ, hướng dẫn tường tận cách gieo quẻ 3 đồng xu, an Can Chi, Lục Thần, Thế Ứng, Tuần Không, Nguyệt Phá và Phi Thần Phục Thần để đoán sự vụ chuẩn xác.",
    actionAdvice: "Bản văn đầy đủ lưu tại docs/references/classics/卜筮正宗/. AI dùng để phân tích cát hung của từng quẻ Lục Hào.",
  },
  {
    id: "tu-vi-star",
    name: "Sao Tử Vi (Đế Tinh)",
    hanz: "紫微星",
    category: "tu-vi",
    element: "Âm Thổ (Kỷ Thổ)",
    nature: "Bắc Đẩu Chủ Tinh • Tôn Quý • Lãnh Đạo",
    verse: "Tử vi nguyên thị đế vương tinh, mệnh ngộ anh hùng lập hiển vinh. Hỷ đắc phụ bật lai củng chiếu, bình bộ thanh vân nhập đế đình.",
    meaning: "Tử Vi là ngôi sao đứng đầu 14 chính tinh, tượng trưng cho bậc minh quân, quyền uy, lòng tự trọng cao và năng lực tổ chức. Nếu cung Mệnh có Tử Vi hội cùng Tả Phù, Hữu Bật, Văn Xương, Văn Khúc thì như vua có quần thần phò tá, sự nghiệp hanh thông tột bực.",
    actionAdvice: "Rèn luyện phẩm chất lãnh đạo bao dung, tránh độc đoán chuyên quyền; nên chủ động gầy dựng ê-kíp cộng sự trung thành để phát huy uy lực.",
  },
  {
    id: "thien-phu",
    name: "Sao Thiên Phủ (Lệnh Tinh)",
    hanz: "天府星",
    category: "tu-vi",
    element: "Dương Thổ (Mậu Thổ)",
    nature: "Nam Đẩu Chủ Tinh • Kho Báu • Điềm Đạm",
    verse: "Thiên phủ lâm cung phúc lộc tường, tài quan song mỹ thế vô song. Ôn nhu đôn hậu nhân hòa mục, mãn thất kim ngân tích trữ trường.",
    meaning: "Thiên Phủ là kho bạc của trời đất, chủ về tích lũy tài sản, tính tình điềm tĩnh, cẩn trọng, biết giữ chữ tín. Khác với Tử Vi thích xông pha khai phá, Thiên Phủ giỏi giữ gìn giang sơn, cai quản tài chính gia tộc hoặc doanh nghiệp lớn.",
    actionAdvice: "Ưu tiên tích lũy tài sản dài hạn, bất động sản; tránh đầu cơ mạo hiểm khi chưa nắm chắc số liệu.",
  },
  {
    id: "that-sat",
    name: "Sao Thất Sát (Dũng Tinh)",
    hanz: "七杀星",
    category: "tu-vi",
    element: "Dương Kim (Canh Kim)",
    nature: "Nam Đẩu Ngũ Tinh • Đại Tướng Quân • Đột Phá",
    verse: "Thất sát uy danh trấn tứ phương, tranh vanh cốt cách xuất quần phương. Lâm nguy bất cụ năng thành đại, bạt tụy siêu quần tác đống lương.",
    meaning: "Thất Sát là biểu tượng của thanh bảo kiếm tiên phong, dũng mãnh, quyết đoán, không ngại nghịch cảnh, dám xông pha vào nơi khó khăn nhất để kiến tạo cơ đồ. Đời người ắt phải trải qua sóng gió trước khi đạt đỉnh cao vinh quang.",
    actionAdvice: "Biến áp lực thành động lực; khi gặp thời cơ lớn cần hành động dứt khoát, rèn luyện sự kiên nhẫn để tránh sát phạt quá đà.",
  },
  {
    id: "thuc-than",
    name: "Thực Thần (Thần Phúc Lộc)",
    hanz: "食神",
    category: "bat-tu",
    element: "Ngũ Hành sinh xuất đồng tính",
    nature: "Cát Thần Bát Tự • Trí Tuệ • Ẩm Thực • Thư Thái",
    verse: "Thực thần hữu khí thắng tài quan, phúc thọ song toàn độ tuế hàn. Thông minh hòa ái nhân giai kính, tiêu dao tự tại định thân an.",
    meaning: "Trong Bát Tự, Thực Thần là con cái do bản thân sinh ra, tượng trưng cho trí tuệ sáng tạo, sự ung dung, hưởng thụ cuộc sống, có duyên với nghệ thuật, ẩm thực và đầu tư sinh lời bền vững (*Thực thần sinh tài*).",
    actionAdvice: "Phát huy sở trường sáng tạo, nghiên cứu chuyên sâu hoặc dịch vụ khách hàng; giữ tâm thế an nhiên sẽ tự khắc thu hút tài lộc.",
  },
  {
    id: "thuong-quan",
    name: "Thương Quan (Tài Năng Đột Phá)",
    hanz: "伤官",
    category: "bat-tu",
    element: "Ngũ Hành sinh xuất dị tính",
    nature: "Hùng Tinh Bát Tự • Sắc Sảo • Phá Cách • Danh Tiếng",
    verse: "Thương quan thông minh mạo tuyệt luân, tài hoa cái thế chấn nhân gian. Phối ấn hữu tình thành đại khí, kiến quan hữu chế định siêu phàm.",
    meaning: "Thương Quan đại diện cho tư duy phản biện sắc bén, khả năng hùng biện và sự bất phục tùng khuôn sáo cũ. Nếu được Chính Ấn phối hợp (*Thương quan phối ấn*) thì học vấn uyên bác, vang danh bốn biển.",
    actionAdvice: "Học cách khiêm nhường trong giao tiếp; hướng tài năng vào việc giải quyết những bài toán hóc búa của xã hội.",
  },
  {
    id: "sinh-mon",
    name: "Sinh Môn (Cửa Cát Tường Nhất)",
    hanz: "生门",
    category: "ky-mon",
    element: "Thổ (Cung Cấn 8)",
    nature: "Đại Cát Môn Kỳ Môn • Sinh Khí • Cầu Tài • Khởi Nghiệp",
    verse: "Sinh môn vượng vị đắc thiên thời, mưu sự thông hanh phúc tự tùy. Cầu tài tiến bảo hưng gia nghiệp, giá thú nghênh tường bách sự nghi.",
    meaning: "Sinh Môn là cánh cửa của sự sinh sôi nảy nở, tài lộc dồi dào. Trong Kỳ Môn Độn Giáp, bất kể xuất hành, ký hợp đồng hay khai trương buôn bán, nếu hướng về phương vị có Sinh Môn lâm cung ắt đạt thắng lợi trọn vẹn.",
    actionAdvice: "Đặt bàn làm việc hoặc hướng xuất hành về phương vị có Sinh Môn trong thời khắc hoàng đạo để đón nhận sinh khí đắc lộc.",
  },
  {
    id: "van-9",
    name: "Cửu Tử Hỏa Tinh (Vận 9: 2024 - 2043)",
    hanz: "九紫离火",
    category: "phong-thuy",
    element: "Hỏa (Quẻ Ly ☲)",
    nature: "Tam Nguyên Cửu Vận • Đương Quyền Vượng Khí",
    verse: "Cửu tử đương quyền chiếu thế gian, văn minh trí tuệ phá mê man. Hỏa quang tương chiếu sinh huy hoắc, bách nghiệp hưng long định hiển ban.",
    meaning: "Hạ Nguyên Vận 9 kéo dài 20 năm từ 2024 đến 2043, thuộc quẻ Ly Hỏa. Đây là thời đại bùng nổ của trí tuệ nhân tạo, công nghệ cao, văn hóa tâm linh, y học năng lượng và sắc đẹp. Phương Nam đón vượng khí bậc nhất.",
    actionAdvice: "Đón nhận công nghệ mới; bài trí phương Nam nhà ở sáng sủa, thoáng đãng; kích hoạt phương Bắc bằng thủy cảnh để đạt thế Thủy Hỏa Ký Tế.",
  },
];

export default function TangKinhCacPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<GrimoireItem>(GRIMOIRE_DATA[0]);

  const filtered = GRIMOIRE_DATA.filter((item) => {
    const matchCat = category === "all" || item.category === category;
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hanz.includes(searchTerm) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <OrientalFrame
        variant="grand"
        rounded="rounded-2xl"
        innerClassName="p-6 sm:p-8 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#175A67]/15 pb-4">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-[#966F28] flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-[#966F28]" />
              <span>TÀNG KINH CÁC • THƯ VIỆN ĐỐI CHIẾU CỔ THƯ HUYỀN MÔN</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#175A67] mt-1">
              Bách Khoa Toàn Thư Thuật Số Đông Phương
            </h1>
          </div>
          <AuspiciousSeal text="经阁" subtext="TÀNG KINH CÁC" shape="square" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
          <p className="text-xs sm:text-sm text-[#345258] leading-relaxed max-w-2xl">
            Tra cứu câu phú gốc chữ Hán, dịch nghĩa kinh điển và ứng dụng hiện đại từ các bộ kỳ thư cổ: 
            <em> Tử Vi Đẩu Số Toàn Thư, Trích Thiên Tủy, Tử Bình Chân Thuyên, Kỳ Môn Bí Kíp, Thẩm Thị Huyền Không</em>.
          </p>

          <Link
            href="/tai-lieu"
            className="px-4 py-2 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#FAF7F2] font-semibold text-xs shadow-tealGlow transition-all flex items-center space-x-1.5"
          >
            <Library className="w-3.5 h-3.5" />
            <span>Mở Thư Viện Đọc &amp; Tải Về 47 Bộ Cổ Thư</span>
          </Link>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#966F28] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên sao, thập thần, cửa kỳ môn, câu phú..."
              className="w-full bg-[#EAE3DE]/60 border border-[#175A67]/25 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#12343B] placeholder-[#5E777D] focus:outline-none focus:border-[#175A67] focus:ring-1 focus:ring-[#175A67]"
            />
          </div>

          <div className="flex space-x-1.5 overflow-x-auto pb-1 bg-[#EAE3DE]/70 p-1 rounded-xl border border-[#175A67]/20">
            {[
              { id: "all", label: "Tất Cả" },
              { id: "classics", label: "47 Bộ Cổ Thư Kinh Điển" },
              { id: "tu-vi", label: "Tử Vi Đẩu Số" },
              { id: "bat-tu", label: "Bát Tự Thập Thần" },
              { id: "ky-mon", label: "Kỳ Môn Cửu Cung" },
              { id: "phong-thuy", label: "Phong Thủy Vận 9" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  category === tab.id
                    ? "bg-[#175A67] text-[#FAF7F2] shadow-sm"
                    : "text-[#345258] hover:text-[#175A67]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </OrientalFrame>

      {/* Main Encyclopedia Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List Column */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
          {filtered.map((item) => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? "bg-[#175A67]/10 border-[#175A67] shadow-sm"
                    : "bg-[#FAF7F2]/90 border-[#175A67]/15 hover:border-[#175A67]/40 hover:bg-[#FAF7F2]"
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-serif font-bold text-sm sm:text-base text-[#175A67]">
                      {item.name}
                    </span>
                    <span className="font-han text-sm text-[#966F28]">
                      {item.hanz}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#5E777D] mt-0.5">
                    {item.nature}
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "text-[#175A67] translate-x-1" : "text-[#5E777D]"}`} />
              </div>
            );
          })}
        </div>

        {/* Right Detail Pane */}
        {selectedItem && (
          <OrientalFrame
            variant="grand"
            rounded="rounded-2xl"
            className="lg:col-span-7"
            innerClassName="p-6 sm:p-8 space-y-5"
          >
            <div className="flex items-center justify-between border-b border-[#175A67]/15 pb-3">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-[#966F28] block">
                  Trích Lục Cổ Thư Kinh Điển
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#175A67] mt-1 flex items-center space-x-2">
                  <span>{selectedItem.name}</span>
                  <span className="font-han text-xl text-[#966F28] font-normal">（{selectedItem.hanz}）</span>
                </h2>
              </div>
              <AuspiciousSeal text="真诀" subtext="CHÂN QUYẾT" shape="circle" />
            </div>

            {/* Ancient Verse Calligraphy Card */}
            <div className="p-4.5 rounded-xl bg-[#EAE3DE]/60 border border-[#175A67]/20 shadow-inner space-y-2">
              <span className="text-[10px] text-[#966F28] font-mono uppercase tracking-widest block">
                Cổ Thư Thi Quyết (Khẩu Quyết Cổ Điển):
              </span>
              <p className="font-serif italic text-base sm:text-lg text-[#175A67] leading-relaxed tracking-wide">
                &ldquo;{selectedItem.verse}&rdquo;
              </p>
            </div>

            {/* Detailed Meaning */}
            <div className="space-y-1.5 text-xs sm:text-sm text-[#345258] leading-relaxed">
              <strong className="text-[#175A67] block font-semibold text-sm">
                Bình Luận &amp; Luận Giải Ý Nghĩa:
              </strong>
              <p>{selectedItem.meaning}</p>
            </div>

            {/* Action Advice (Xu Cát Tị Hung) */}
            <div className="p-4 rounded-xl bg-[#1D6353]/10 border border-[#1D6353]/25 text-xs sm:text-sm text-[#12343B] leading-relaxed">
              <strong className="text-[#165B46] font-bold block mb-1">
                Ứng Dụng Đời Sống (Xu Cát Tị Hung):
              </strong>
              <p>{selectedItem.actionAdvice}</p>
            </div>

            {/* Direct Link to Read Full Text Online in Library */}
            <div className="pt-1">
              <Link
                href={`/tai-lieu?book=${encodeURIComponent(selectedItem.hanz)}`}
                className="w-full py-2.5 px-4 rounded-xl bg-[#175A67] hover:bg-[#0F454F] text-[#FAF7F2] font-semibold text-xs sm:text-sm shadow-tealGlow transition-all flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Đọc Trọn Vẹn Toàn Văn Trong Thư Viện Cổ Thư</span>
              </Link>
            </div>
          </OrientalFrame>
        )}
      </div>
    </div>
  );
}
