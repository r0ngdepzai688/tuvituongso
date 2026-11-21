export interface RegionDetail {
  title: string;
  highlights: string[];
  specialDishOrItem: string;
}

export interface PhongTucItem {
  id: string;
  lunarMonth: string; // "Cốt Lõi" | "Tháng 1" ... "Tháng 12" | "Đời Người"
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  imageCaption: string;
  relatedPrayerId: string;
  origin: string;
  humanisticValue: string;
  regions: {
    bac: RegionDetail;
    trung: RegionDetail;
    nam: RegionDetail;
  };
  checklist: string[];
  mythsToAvoid: string[];
}

export const PHONG_TUC_LIST: PhongTucItem[] = [
  {
    id: "ban-tho-gia-tien",
    lunarMonth: "Cốt Lõi",
    title: "Văn Hóa Bàn Thờ Gia Tiên & Ý Nghĩa Bát Hương",
    subtitle: "Trái tim tâm linh của mọi nếp nhà Việt — Nơi kết nối quá khứ và hiện tại",
    badge: "Cốt Lõi Đạo Hiếu",
    image: "/images/culture/ban-tho-gia-tien.jpg",
    imageCaption: "Không gian bàn thờ gia tiên truyền thống với đỉnh đồng, bát hương, hoa tươi và mâm ngũ quả.",
    relatedPrayerId: "mung-1-ram-gia-tien",
    origin:
      "Người Việt không coi bàn thờ là nơi 'cầu xin thần quyền' mà là nơi ông bà tổ tiên vẫn hiện diện ấm áp giữa con cháu. Đèn nến là Hỏa, bát nước là Thủy, tro thơm là Thổ, đỉnh đồng là Kim, bài vị và hoa quả là Mộc — hội tụ đủ Ngũ Hành hài hòa.",
    humanisticValue:
      "Thắp nén hương mỗi ngày Rằm, Mùng 1 giúp người trẻ chậm lại 5 phút giữa nhịp sống hối hả để biết ơn cội nguồn, tự soi lại cách sống và giữ sự gắn kết gia đình.",
    regions: {
      bac: {
        title: "Miền Bắc — Trang Nghiêm & Chuẩn Mực",
        specialDishOrItem: "3 bát hương (Thổ Công giữa, Gia Tiên phải, Bà Cô Ông Mãnh trái) + Hoành phi câu đối",
        highlights: [
          "Đặt bàn thờ ở gian giữa trang trọng nhất (hoặc vị trí cao ráo, thoáng sáng ở phòng khách chung cư).",
          "Bài trí đối xứng nghiêm ngặt: đỉnh đồng tam sự/ngũ sự, đôi hạc chầu, lục bình cắm hoa đào/hoa cúc.",
          "Ưa dùng gỗ mít, gỗ gụ sơn son thếp vàng hoặc gốm men rạn Bát Tràng cổ điển.",
        ],
      },
      trung: {
        title: "Miền Trung — Cung Đình & Nghi Lễ Chặt Chẽ",
        specialDishOrItem: "Tủ thờ gỗ chạm khảm tỉ mỉ, khay trầu cau têm cánh phượng & trầm nụ dịu nhẹ",
        highlights: [
          "Chịu ảnh hưởng lễ nghi cố đô Huế, bàn thờ luôn sạch bóng, dùng trầm hương tự nhiên dịu nhẹ.",
          "Thường thờ riêng ban thờ Phật ở tầng cao hơn hoặc gian riêng biệt, tách bạch rõ với ban thờ Cửu Huyền Thất Tổ.",
          "Rất coi trọng việc giữ lửa ấm trên bàn thờ suốt 3 ngày Tết và các dịp kỵ chạp dòng họ.",
        ],
      },
      nam: {
        title: "Miền Nam — Phóng Khoáng & Ấm Cúng",
        specialDishOrItem: "Liễn 'Cửu Huyền Thất Tổ' bằng đồng/kính + Bàn thờ Ông Thiên ngoài sân",
        highlights: [
          "Bàn thờ gia tiên luôn nổi bật với bức liễn 'Cửu Huyền Thất Tổ' bằng đồng hoặc kính vẽ sơn mài.",
          "Nhiều gia đình có thêm bàn thờ Ông Thiên (Thông Thiên) ngoài sân trước để khấn vái trời đất.",
          "Lễ vật gần gũi: ly cà phê đá, trái cây vườn nhà — thể hiện tình cảm mộc mạc 'trần sao âm vậy'.",
        ],
      },
    },
    checklist: [
      "Lau dọn mặt bàn thờ bằng khăn riêng sạch thấm nước ấm hoặc nước lá bưởi/quế.",
      "Thay nước trên chén thờ mỗi khi thắp hương; không để hoa héo úa trên ban thờ.",
      "Thắp hương số lẻ (1 hoặc 3 nén) tượng trưng cho dương khí và sự thanh tịnh.",
    ],
    mythsToAvoid: [
      "Hiểu lầm rằng phải sắm đồ thờ thật đắt tiền hay đốt thật nhiều vàng mã mới linh: Cổ nhân dạy 'Lễ bạc tâm thành', lòng hiếu thảo mới là gốc.",
    ],
  },
  {
    id: "mam-ngu-qua-3-mien",
    lunarMonth: "Tháng 1",
    title: "Tết Nguyên Đán, Mâm Ngũ Quả & Rằm Tháng Giêng",
    subtitle: "Khởi đầu mùa xuân mới — Giao Thừa, Chúc Tết, Hóa Vàng và Tết Thượng Nguyên",
    badge: "Tháng Giêng (1/1 – 15/1)",
    image: "/images/culture/mam-ngu-qua-3-mien.jpg",
    imageCaption: "Nghệ thuật bày mâm ngũ quả 3 miền: Chuối ôm bưởi (Bắc), Thanh long & quýt (Trung), Cầu – Dừa – Đủ – Xoài – Sung (Nam).",
    relatedPrayerId: "mung-1-tet-nguyen-dan",
    origin:
      "Tháng Giêng là tháng thiêng liêng nhất trong năm với chuỗi nghi lễ Giao Thừa (trừ tịch), Mùng 1 chúc Tết gia tiên, Hóa Vàng, Vía Thần Tài (10/1) và Rằm Tháng Giêng (Thượng Nguyên). Mâm ngũ quả tượng trưng cho Ngũ Hành và Ngũ Phúc Lâm Môn.",
    humanisticValue:
      "Hiểu sự khác biệt Tết 3 miền giúp người trẻ trân trọng sự đa dạng văn hóa Việt Nam: không có miền nào 'đúng hơn' miền nào — tất cả đều xuất phát từ thổ nhưỡng và tâm hồn địa phương.",
    regions: {
      bac: {
        title: "Miền Bắc — Bánh Chưng Vuông, Hoa Đào & Chuối Ôm Bưởi",
        specialDishOrItem: "Bánh chưng xanh, thịt đông, giò lụa, canh măng khô, nải chuối xanh nâng quả bưởi vàng",
        highlights: [
          "Mâm ngũ quả đặt nải chuối xanh quả lẻ ở dưới như bàn tay che chở, chính giữa là quả bưởi hoặc phật thủ.",
          "Sáng Mùng 1 cúng gia tiên rồi đi chúc Tết họ hàng; Mùng 3–4 làm lễ Hóa Vàng kèm 2 cây mía nguyên ngọn.",
          "Rằm tháng Giêng ('Cúng cả năm không bằng Rằm tháng Giêng') rất trọng lễ cầu an tại gia và đi lễ chùa đầu xuân.",
        ],
      },
      trung: {
        title: "Miền Trung — Bánh Tét, Dưa Món & Mâm Cỗ Cung Đình",
        specialDishOrItem: "Bánh tét nhân đậu xanh thịt mỡ, dưa món củ kiệu, nem chua, tré, thịt ngâm mắm",
        highlights: [
          "Khí hậu miền Trung khắc nghiệt nên người dân không câu nệ tên gọi trái cây; có sản vật gì ngon đẹp nhất đều thành tâm dâng cúng.",
          "Mâm cỗ Tết chia từng đĩa nhỏ tinh tế, đủ vị mặn – ngọt – chua – cay, thường có thêm bánh tổ, bánh in.",
          "Giữ rất kỹ tục cúng Giao Thừa ngoài sân và lễ đưa ông bà rất trang nghiêm vào Mùng 3.",
        ],
      },
      nam: {
        title: "Miền Nam — Hoa Mai Vàng, Thịt Kho Hột Vịt & 'Cầu Dừa Đủ Xài'",
        specialDishOrItem: "Bánh tét lá cẩm/nhân chuối, thịt kho tàu, canh khổ qua nhồi thịt, mâm Cầu – Sung – Dừa – Đủ – Xoài",
        highlights: [
          "Chơi chữ dân gian dí dỏm: Mãng cầu – Sung – Dừa – Đu đủ – Xoài ('Cầu sung vừa đủ xài'), kiêng bày chuối và cam quýt.",
          "Canh khổ qua mang ước vọng mọi nỗi khổ năm cũ qua đi; nồi thịt kho hột vịt vuông tròn tượng trưng sự đầy đặn.",
          "Rất coi trọng Mùng 9 Vía Ngọc Hoàng và Mùng 10 Vía Thần Tài (có tục cúng cá lóc nướng nguyên con).",
        ],
      },
    },
    checklist: [
      "Chọn quả tươi, chín tới, chỉ lau bằng khăn ẩm (không ngâm nước lâu) để chưng đẹp suốt Tết.",
      "Cúng Giao Thừa ngoài trời trước, trong nhà sau; giữ hòa khí, nói lời tốt lành suốt 3 ngày đầu năm.",
    ],
    mythsToAvoid: [
      "Tranh cãi miền nào bày mâm ngũ quả 'đúng phong thủy' hơn: mỗi vùng có nét đẹp ngôn ngữ và thổ nhưỡng riêng đáng trân quý.",
    ],
  },
  {
    id: "thang-2-via-quan-am",
    lunarMonth: "Tháng 2",
    title: "Vía Quán Thế Âm (19/2) & Mùa Lễ Hội Xuân 3 Miền",
    subtitle: "Tháng Hai trẩy hội cầu an, hướng thiện và gieo duyên từ bi",
    badge: "Tháng Hai (15/2 – 19/2)",
    image: "/images/culture/han-thuc-thanh-minh.jpg",
    imageCaption: "Không gian xuân thanh tịnh với hoa đào và mái đình chùa cổ kính trong tiết trời Tháng Hai.",
    relatedPrayerId: "via-quan-the-am-thang-2",
    origin:
      "Tháng Hai Âm lịch gắn với tiết Kinh Trập và Xuân Phân — thời điểm mưa xuân phơi phới, hàng trăm lễ hội truyền thống mở hội trên cả nước, đặc biệt là ngày Vía Đức Quán Thế Âm Bồ Tát đản sinh (19/2).",
    humanisticValue:
      "Nhắc nhở người trẻ thực tập lòng trắc ẩn, lắng nghe gia đình và giữ tâm tĩnh lặng giữa guồng quay công việc đầu năm.",
    regions: {
      bac: {
        title: "Miền Bắc — Mùa Hội Làng & Lễ Chùa Hương, Yên Tử",
        specialDishOrItem: "Oản phẩm, hoa huệ trắng, trầu cau têm cánh phượng dâng cửa Phật",
        highlights: [
          "Các dòng họ và làng xã tổ chức lễ tế Thành Hoàng cầu mưa thuận gió hòa, mùa màng tươi tốt.",
          "Người dân hành hương về Chùa Hương, Yên Tử, Đền Trần với lễ chay thanh đạm.",
        ],
      },
      trung: {
        title: "Miền Trung — Lễ Hội Quán Thế Âm Ngũ Hành Sơn (Đà Nẵng)",
        specialDishOrItem: "Đèn hoa đăng, mâm cỗ chay ngũ sắc và trà sen thanh tịnh",
        highlights: [
          "Lễ hội Quán Thế Âm tại Ngũ Hành Sơn (19/2 ÂL) là lễ hội văn hóa – tâm linh lớn bậc nhất miền Trung.",
          "Các gia đình ăn chay ngày 19/2, dâng hoa sen/hoa huệ lên bàn thờ Phật tại gia cầu bình an.",
        ],
      },
      nam: {
        title: "Miền Nam — Lễ Kỳ Yên Đình Làng & Cúng Vía Quan Âm",
        specialDishOrItem: "Xôi chè chay, bánh ít trần, trái cây miệt vườn dâng lễ",
        highlights: [
          "Nhiều đình làng Nam Bộ mở lễ Kỳ Yên đầu năm hát Bội, cầu quốc thái dân an.",
          "Phật tử đi viếng các ngôi chùa cổ, tham gia hoạt động thiện nguyện và phóng sinh đúng cách.",
        ],
      },
    },
    checklist: [
      "Khi cúng ngày Vía Bồ Tát (19/2), chỉ dâng lễ chay (hoa tươi, trái cây, nước tinh khiết).",
      "Ưu tiên làm việc thiện thiết thực thay vì chen lấn cầu xin.",
    ],
    mythsToAvoid: [
      "Không đặt tiền lẻ lên tay tượng Phật hay thả chim/cá phóng sinh theo phong trào gây hại hệ sinh thái.",
    ],
  },
  {
    id: "han-thuc-thanh-minh-hung-vuong",
    lunarMonth: "Tháng 3",
    title: "Tết Hàn Thực (3/3), Tiết Thanh Minh & Giỗ Tổ Hùng Vương (10/3)",
    subtitle: "Tháng Ba tri ân nguồn cội — Từ gia tộc đến Quốc Tổ dân tộc",
    badge: "Tháng Ba (3/3 • Thanh Minh • 10/3)",
    image: "/images/culture/han-thuc-thanh-minh.jpg",
    imageCaption: "Bánh trôi, bánh chay trắng ngần điểm mè vàng trong không khí tiết Thanh Minh tháng Ba.",
    relatedPrayerId: "tet-han-thuc-3-3",
    origin:
      "Tháng Ba quy tụ 3 đại lễ hướng về cội nguồn: Mùng 3/3 Tết Hàn Thực (bánh trôi, bánh chay tượng trưng sự vẹn tròn và bọc trăm trứng Âu Cơ), Tiết Thanh Minh (tảo mộ tri ân người khuất) và Mùng 10/3 Giỗ Tổ Hùng Vương.",
    humanisticValue:
      "Dù đi đâu làm gì, Tháng Ba nhắc mỗi người Việt câu ca dao: 'Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng Mười tháng Ba' — nuôi dưỡng niềm tự hào và lòng biết ơn tổ tiên.",
    regions: {
      bac: {
        title: "Miền Bắc — Bánh Trôi Bánh Chay & Hội Tảo Mộ Thanh Minh",
        specialDishOrItem: "Bánh trôi nhân đường phên, bánh chay nước đường bột sắn hoa bưởi, cặp bánh chưng bánh giầy 10/3",
        highlights: [
          "Cả nhà cùng nặn bánh trôi bánh chay sáng Mùng 3/3 dâng gia tiên — không kiêng lửa mà chủ yếu nhớ cội nguồn.",
          "Tiết Thanh Minh cả họ rủ nhau đi tảo mộ, phát cỏ, đắp đất, thắp hương rồi về nhà thờ họ liên hoan.",
          "Dịp 10/3 hướng về Đền Hùng (Phú Thọ) với lễ vật truyền thống bánh chưng – bánh giầy.",
        ],
      },
      trung: {
        title: "Miền Trung — Tảo Mộ Gia Tộc & Cúng Chạp Thanh Minh",
        specialDishOrItem: "Xôi đậu, gà luộc, bánh ít lá gai, trầu cau và hoa cúc vàng tảo mộ",
        highlights: [
          "Rất trọng nghi thức chạp mộ Thanh Minh; con cháu đi làm ăn xa thường cố gắng sắp xếp về quê họp họ.",
          "Tết Hàn Thực cúng bánh trôi hoặc chè trôi nước gừng ấm thanh đạm.",
        ],
      },
      nam: {
        title: "Miền Nam — Chè Trôi Nước & Tảo Mộ Thanh Minh Sum Vầy",
        specialDishOrItem: "Chè trôi nước nhân đậu xanh nước cốt dừa, vịt quay/heo quay tảo mộ",
        highlights: [
          "Vào tiết Thanh Minh, gia đình nhiều thế hệ mang theo chiếu, đồ ăn ra nghĩa trang dọn dẹp mộ phần và ăn bữa cơm sum họp.",
          "Dịp 10/3 nhiều địa phương tổ chức lễ dâng hương Quốc Tổ trang trọng tại các Đền thờ Vua Hùng.",
        ],
      },
    },
    checklist: [
      "Khi đi tảo mộ Thanh Minh: mang dụng cụ cắt cỏ gọn gàng, thắp hương đài Thần Linh trước rồi mới thắp tại mộ gia tiên.",
      "Gìn giữ vệ sinh khu mộ phần, không xả rác hay đốt vàng mã gây cháy cỏ khô.",
    ],
    mythsToAvoid: [
      "Đừng nhầm Tết Hàn Thực ở Việt Nam phải ăn đồ nguội cả ngày: người Việt đã Việt hóa hoàn toàn thành dịp sum vầy làm bánh trôi bánh chay dâng tổ tiên.",
    ],
  },
  {
    id: "phat-dan-thang-4",
    lunarMonth: "Tháng 4",
    title: "Đại Lễ Phật Đản (15/4) & Văn Hóa Ăn Chay Tịnh Tâm",
    subtitle: "Mùa sen nở đón ánh sáng từ bi và trí tuệ giác ngộ",
    badge: "Tháng Tư (8/4 – 15/4)",
    image: "/images/culture/trung-thu-vu-lan.jpg",
    imageCaption: "Ánh đèn hoa đăng và hoa sen thanh khiết trong mùa Đại Lễ Phật Đản Rằm Tháng Tư.",
    relatedPrayerId: "le-phat-dan-15-4",
    origin:
      "Rằm tháng Tư Âm lịch (Vesak) kỷ niệm ngày Đức Phật Thích Ca Mâu Ni đản sinh. Đây không chỉ là ngày lễ của Phật tử mà còn trở thành nét đẹp văn hóa hướng thiện, ăn chay và thả hoa đăng của người Việt.",
    humanisticValue:
      "Giúp người trẻ học cách sống chậm (mindfulness), ăn uống thanh đạm 1–2 ngày trong tháng để thanh lọc cơ thể và nuôi dưỡng tâm bình an.",
    regions: {
      bac: {
        title: "Miền Bắc — Lễ Tắm Phật & Cỗ Chay Mùa Sen",
        specialDishOrItem: "Xôi vò chè hoa cau, nem chay, canh nấm hạt sen, hoa sen trắng/hồng",
        highlights: [
          "Các chùa cổ tổ chức lễ Mộc Dục (tắm Phật) trang nghiêm từ mùng 8 đến rằm tháng 4.",
          "Gia đình chuẩn bị mâm cơm chay thanh tịnh dâng Phật và gia tiên vào ngày Rằm.",
        ],
      },
      trung: {
        title: "Miền Trung — 7 Đóa Sen Khổng Lồ Trên Sông Hương (Huế)",
        specialDishOrItem: "Cơm chay cung đình Huế tinh xảo, hoa sen hồng xứ Huế & đèn hoa đăng",
        highlights: [
          "Huế là trung tâm tổ chức Tuần lễ Phật Đản rực rỡ nhất với 7 đóa hoa sen hồng thắp sáng dòng sông Hương.",
          "Nhiều gia đình treo cờ Phật giáo, thiết lễ đài nhỏ sạch đẹp ngay trước hiên nhà.",
        ],
      },
      nam: {
        title: "Miền Nam — Diễu Hành Xe Hoa & Bữa Cơm Chay Cộng Đồng",
        specialDishOrItem: "Hủ tiếu chay, gỏi ngó sen chay, bánh bò, chè hạt sen nhãn nhục",
        highlights: [
          "TP.HCM và các tỉnh Nam Bộ tổ chức diễu hành xe hoa lung linh và nhiều quán ăn phát cơm chay miễn phí đầy nghĩa tình.",
        ],
      },
    },
    checklist: [
      "Chọn hoa sen hoặc hoa cúc tươi dâng ban thờ; chuẩn bị bữa ăn chay nhẹ nhàng cho cả nhà.",
    ],
    mythsToAvoid: [
      "Ăn chay không cần cầu kỳ mua đồ chay giả mặn nhiều hóa chất — rau củ, đậu hạt tự nhiên mới đúng tinh thần thanh tịnh và tốt cho sức khỏe.",
    ],
  },
  {
    id: "tet-doan-ngo-5-5",
    lunarMonth: "Tháng 5",
    title: "Tết Đoan Ngọ (Mùng 5/5) — Tục 'Diệt Sâu Bọ' 3 Miền",
    subtitle: "Ngày chính dương giữa mùa hạ — Trí tuệ dưỡng sinh dân gian Việt Nam",
    badge: "Tháng Năm (5/5 ÂL)",
    image: "/images/culture/mam-ngu-qua-3-mien.jpg",
    imageCaption: "Hoa quả đầu hạ và lễ vật Tết Đoan Ngọ — nét đẹp dưỡng sinh cổ truyền của người Việt.",
    relatedPrayerId: "tet-doan-ngo-5-5",
    origin:
      "Đoan là mở đầu, Ngọ là giờ giữa trưa (11h–13h) — thời điểm dương khí mạnh nhất trong năm, thời tiết chuyển nắng nóng dễ sinh dịch bệnh tiêu hóa. Dân gian hình tượng hóa việc ăn rượu nếp, trái cây chua ngọt vào sáng sớm 5/5 là 'giết sâu bọ' để kích thích tiêu hóa và tăng đề kháng.",
    humanisticValue:
      "Cho thấy sự thông minh của ông cha trong việc lồng ghép kiến thức y học dự phòng (dưỡng sinh theo tiết khí) vào một ngày lễ vui vẻ, gắn kết cả nhà.",
    regions: {
      bac: {
        title: "Miền Bắc — Cơm Rượu Nếp Cẩm, Mận Hậu & Vải Thiều",
        specialDishOrItem: "Cái rượu nếp trắng / nếp cẩm lên men thơm, mận hậu, vải thiều, bánh gio mật mía",
        highlights: [
          "Sáng sớm ngủ dậy, cả nhà ăn ngay 1 bát nhỏ cơm rượu nếp và vài quả mận/vải trước khi ăn sáng.",
          "Bữa trưa đúng giờ Ngọ cúng tổ tiên rồi quây quần thưởng thức thịt vịt (tính mát giải nhiệt mùa hạ) và bánh gio.",
        ],
      },
      trung: {
        title: "Miền Trung — Chè Kê, Thịt Vịt & Bánh Ú Tro",
        specialDishOrItem: "Thịt vịt luộc/quay, chè kê ăn kèm bánh tráng nướng, bánh ú tro chấm đường",
        highlights: [
          "Từ Thanh Hóa đến Quảng Nam, Huế rất chuộng ăn thịt vịt ngày 5/5 vì vịt vào mùa béo ngon và có tính hàn giải nắng nóng.",
          "Người dân còn có tục hái lá thuốc nam đúng 12h trưa 5/5 phơi khô uống quanh năm (tục hái lá mùng 5).",
        ],
      },
      nam: {
        title: "Miền Nam — Bánh Ú Bá Trạng, Cơm Rượu Viên Tròn & Chè Trôi Nước",
        specialDishOrItem: "Cơm rượu viên tròn ngâm nước đường, bánh ú nước tro nhân đậu xanh/sầu riêng, bánh ú bá trạng",
        highlights: [
          "Cơm rượu miền Nam được vo thành từng viên tròn nhỏ ngọt dịu, ăn kèm bánh ú nước tro mát ruột.",
          "Nhiều gia đình nấu chè trôi nước và bày mâm trái cây miệt vườn (chôm chôm, măng cụt, sầu riêng) cúng tổ tiên.",
        ],
      },
    },
    checklist: [
      "Cúng Tết Đoan Ngọ tốt nhất vào sáng hoặc đúng giờ Ngọ (11h–13h) ngày 5/5 Âm lịch.",
      "Ăn lượng cơm rượu nếp vừa phải (đặc biệt lưu ý không lái xe ngay sau khi ăn rượu nếp lên men!).",
    ],
    mythsToAvoid: [
      "Không nên hiểu 'diệt sâu bọ' theo nghĩa mê tín — đây đơn thuần là kinh nghiệm dưỡng sinh kích thích men tiêu hóa lúc giao mùa nắng nóng.",
    ],
  },
  {
    id: "thang-6-ky-yen",
    lunarMonth: "Tháng 6",
    title: "Lễ Cúng Giữa Năm (Tháng 6) & Tục Kỳ Yên Cầu Mùa",
    subtitle: "Điểm dừng giữa năm nhìn lại hành trình và cầu bình an mùa mưa bão",
    badge: "Tháng Sáu (6/6 – 15/6)",
    image: "/images/culture/ban-tho-gia-tien.jpg",
    imageCaption: "Nén hương thanh tịnh giữa năm tại gia — tạ ơn nửa năm bình an và cầu nửa cuối năm hanh thông.",
    relatedPrayerId: "le-giua-nam-thang-6",
    origin:
      "Tháng Sáu đánh dấu chặng giữa của năm Âm lịch (tiết Hạ Chí – Tiểu Thử), cũng là thời điểm nhiều vùng nông nghiệp và ngư nghiệp tổ chức lễ Kỳ Yên, cúng Thần Nông cầu mưa thuận gió hòa trước mùa bão.",
    humanisticValue:
      "Là cột mốc 'Mid-Year Review' tinh thần rất hay cho người trẻ: thắp hương tưởng nhớ ông bà, kiểm điểm mục tiêu 6 tháng đầu năm và điều chỉnh kế hoạch cho 6 tháng cuối năm.",
    regions: {
      bac: {
        title: "Miền Bắc — Cúng Rằm Tháng 6 & Chè Hạt Sen Mùa Hạ",
        specialDishOrItem: "Chè sen long nhãn, hoa sen hồng, trái cây mùa hè",
        highlights: ["Các gia đình cúng rằm tháng 6 thanh đạm với chè sen, cầu bình an qua mùa mưa ngâu sắp tới."],
      },
      trung: {
        title: "Miền Trung — Lễ Cầu Ngư & Tạ Thần Biển",
        specialDishOrItem: "Hương hoa, bánh ít, sản vật địa phương dâng đình làng và gia tiên",
        highlights: ["Vùng duyên hải miền Trung giữ tục cầu ngư, cầu cho tàu thuyền ra khơi bình an, tránh bão tố."],
      },
      nam: {
        title: "Miền Nam — Lễ Cúng Nửa Năm (Mùng 6/6) & Vía Quan Âm Thành Đạo (19/6)",
        specialDishOrItem: "Xôi chè, trái cây miệt vườn mùa thu hoạch rộ",
        highlights: ["Nhiều gia đình làm mâm cơm cúng nửa năm gọn nhẹ và ăn chay ngày 19/6 Vía Quan Âm thành đạo."],
      },
    },
    checklist: ["Dọn dẹp lại ban thờ, kiểm tra mái nhà/cửa sổ trước mùa mưa bão tháng 7–9."],
    mythsToAvoid: ["Không cần bày vẽ cúng bái tốn kém — sự gọn gàng và tâm biết ơn là đủ."],
  },
  {
    id: "vu-lan-thang-7",
    lunarMonth: "Tháng 7",
    title: "Đại Lễ Vu Lan Báo Hiếu & Cúng Chúng Sinh (Rằm Tháng 7)",
    subtitle: "Mùa Hiếu Hạnh lớn nhất năm — Cài hoa hồng nhớ ơn cha mẹ",
    badge: "Tháng Bảy (1/7 – 15/7)",
    image: "/images/culture/trung-thu-vu-lan.jpg",
    imageCaption: "Hoa đăng mùa Vu Lan — ánh sáng của lòng hiếu thảo và tình thương lan tỏa.",
    relatedPrayerId: "vu-lan-ram-thang-7",
    origin:
      "Rằm tháng Bảy hội tụ hai truyền thống nhân văn lớn: Lễ Vu Lan (bắt nguồn từ tích Bồ Tát Mục Kiền Liên cứu mẹ, tôn vinh đạo hiếu) và Tiết Trung Nguyên (Xá tội vong nhân, khởi lòng từ bi bố thí cho các vong linh không nơi nương tựa).",
    humanisticValue:
      "Tháng Bảy hoàn toàn KHÔNG phải 'tháng xui xẻo đáng sợ' mà là **Tháng Báo Hiếu**! Một bữa cơm nấu cho cha mẹ, một cuộc gọi hỏi thăm hay cài bông hồng đỏ lên ngực áo quý giá hơn ngàn vàng mã.",
    regions: {
      bac: {
        title: "Miền Bắc — Cúng Phật, Gia Tiên Trong Nhà & Cháo Trắng Ngoài Sân",
        specialDishOrItem: "Mâm cỗ chay dâng Phật, mâm cơm gia tiên và 12 bát cháo loãng, bỏng ngô cúng chúng sinh",
        highlights: [
          "Thường cúng Phật và gia tiên vào ban ngày, cúng chúng sinh ngoài sân/trước cửa vào chiều tối (17h–19h).",
          "Tục rải muối gạo và cháo trắng thể hiện lòng thương người, không cúng đồ mặn cho chúng sinh.",
        ],
      },
      trung: {
        title: "Miền Trung — Rằm Tháng 7 'Ăn To Hơn Tết' & Thả Hoa Đăng",
        specialDishOrItem: "Cỗ chay tinh tế, bánh ít, mía, khoai sắn và đèn hoa đăng thả sông",
        highlights: [
          "Ở Huế và nhiều tỉnh miền Trung, Rằm tháng 7 cực kỳ thiêng liêng; nhiều gia đình con cháu tụ họp đông đủ không kém ngày Tết.",
          "Buổi tối tổ chức lễ Bông Hồng Cài Áo tại chùa và thả hoa đăng cầu siêu trang nghiêm.",
        ],
      },
      nam: {
        title: "Miền Nam — Lễ Vu Lan Chùa Chiền & Tục 'Giật Cô Hồn' Vui Tươi",
        specialDishOrItem: "Cháo trắng, muối gạo, mía cắt khúc, khoai lang luộc, bánh kẹo, hoa hồng cài áo",
        highlights: [
          "Rất phổ biến nghi lễ Cài Hoa Hồng (hoa đỏ cho người còn mẹ, hoa trắng cho người đã mất mẹ).",
          "Các gia đình, cửa hàng cúng cô hồn ngoài trời với bánh kẹo, cháo trắng rồi chia sẻ vui vẻ cho trẻ em và người khó khăn quanh xóm.",
        ],
      },
    },
    checklist: [
      "Tách biệt rõ 2 mâm cúng: Mâm thờ Phật/Gia tiên đặt trong nhà; Mâm cúng chúng sinh đặt ngoài trời (chỉ cúng đồ chay).",
      "Dành thời gian thực sự bên cha mẹ hiện tiền trong tháng Vu Lan.",
    ],
    mythsToAvoid: [
      "Sợ hãi 'tháng cô hồn' không dám làm việc gì hay đốt quá nhiều nhà lầu xe hơi vàng mã: Phật giáo và cổ nhân không khuyến khích đốt vàng mã lãng phí; hiếu đạo và làm thiện mới là phước lớn nhất.",
    ],
  },
  {
    id: "tet-trung-thu-15-8",
    lunarMonth: "Tháng 8",
    title: "Tết Trung Thu (Rằm Tháng 8) — Cúng Trăng & Tết Đoàn Viên",
    subtitle: "Đêm trăng sáng nhất năm — Sum vầy gia đình và ký ức tuổi thơ Việt",
    badge: "Tháng Tám (15/8 ÂL)",
    image: "/images/culture/trung-thu-vu-lan.jpg",
    imageCaption: "Đèn ông sao, bánh trung thu và ấm trà sen dưới ánh trăng rằm tháng Tám.",
    relatedPrayerId: "tet-trung-thu-15-8",
    origin:
      "Vốn xuất phát từ lễ tế trăng tạ ơn mùa thu hoạch của cư dân lúa nước, Tết Trung Thu dần trở thành Tết Đoàn Viên (cả gia đình quây quần phá cỗ) và Tết Thiếu Nhi với đèn ông sao, múa lân.",
    humanisticValue:
      "Trong nhịp sống số, cùng nhau bày một mâm cỗ trông trăng, nhâm nhi miếng bánh nướng với tách trà nóng là cách tuyệt vời để giữ gìn sự ấm áp giữa các thế hệ.",
    regions: {
      bac: {
        title: "Miền Bắc — Cốm Làng Vòng, Hồng Đỏ, Bưởi & Đèn Ông Sao",
        specialDishOrItem: "Bánh nướng thập cẩm lá chanh, bánh dẻo hoa bưởi, cốm mới, hồng ngâm, bưởi tạo hình chú chó",
        highlights: [
          "Mâm cỗ trông trăng có bưởi tách múi tạo hình chú chó bông, hồng đỏ, chuối tiêu chín trứng cuốc và cốm xanh.",
          "Chiều Rằm cúng gia tiên trước, tối cả nhà và trẻ nhỏ cùng rước đèn ông sao, phá cỗ dưới trăng.",
        ],
      },
      trung: {
        title: "Miền Trung — Đêm Hội Đèn Lồng Phố Cổ Hội An & Múa Lân",
        specialDishOrItem: "Bánh trung thu nhân truyền thống, trà sen Huế, đèn lồng lụa nhiều màu sắc",
        highlights: [
          "Phố cổ Hội An tắt đèn điện, thắp sáng hàng ngàn đèn lồng thủ công và thả hoa đăng rực rỡ sông Hoài.",
          "Các đội múa lân rộn ràng khắp phố phường chúc phúc từng gia đình.",
        ],
      },
      nam: {
        title: "Miền Nam — Phố Lồng Đèn Rực Rỡ & Tặng Bánh Gắn Kết Thân Tình",
        specialDishOrItem: "Bánh trung thu thập cẩm gà quay / trứng muối, trà ô long, trái cây miệt vườn",
        highlights: [
          "Không khí rước đèn, múa lân sư rồng vô cùng sôi động tại khu Chợ Lớn và các tỉnh miền Tây.",
          "Rất trọng văn hóa biếu tặng bánh trung thu tri ân cha mẹ, thầy cô, đối tác và bạn bè.",
        ],
      },
    },
    checklist: ["Bày mâm cúng gia tiên nhỏ gọn với bánh nướng, bánh dẻo, trà nóng và hoa quả mùa thu trước khi phá cỗ."],
    mythsToAvoid: ["Không cần mua hộp bánh quá xa hoa tốn kém — một ấm trà ngon và sự hiện diện đủ đầy bên gia đình mới là tinh thần Đoàn Viên."],
  },
  {
    id: "tet-trung-cuu-9-9",
    lunarMonth: "Tháng 9",
    title: "Tết Trùng Cửu (9/9) — Đạo Kính Lão & Thưởng Trà Ngắm Cúc",
    subtitle: "Hai số 9 trùng phùng — Lời chúc trường thọ gửi đến ông bà cha mẹ",
    badge: "Tháng Chín (9/9 ÂL)",
    image: "/images/culture/ban-tho-gia-tien.jpg",
    imageCaption: "Chén trà hoa cúc thanh tao và nén hương kính lễ bậc cao niên trong tiết Trùng Cửu.",
    relatedPrayerId: "tet-trung-cuu-9-9",
    origin:
      "Trong Kinh Dịch, số 9 là số Dương cực đại ('Cửu' đồng âm với 'Trường Cửu' — bền lâu). Ngày mùng 9 tháng 9 là dịp thưởng ngoạn tiết thu trong lành, uống trà hoa cúc và chúc thọ người lớn tuổi.",
    humanisticValue:
      "Một ngày lễ nhẹ nhàng, thanh tao rất hợp để người trẻ đưa ông bà đi dạo công viên, biếu hộp trà ngon và chúc sức khỏe bậc sinh thành.",
    regions: {
      bac: {
        title: "Miền Bắc — Thưởng Trà Cúc & Leo Núi Ngắm Thu",
        specialDishOrItem: "Trà hoa cúc chi, bánh cốm/bánh khảo, hoa cúc vàng dâng ban thờ",
        highlights: ["Giới văn nhân và các gia đình truyền thống dâng hoa cúc vàng, uống trà cúc cầu trường thọ."],
      },
      trung: {
        title: "Miền Trung — Tĩnh Tâm & Chúc Thọ Bậc Cao Niên",
        specialDishOrItem: "Trà cung đình thảo mộc, bánh ngọt truyền thống Huế",
        highlights: ["Con cháu quây quần hỏi thăm sức khỏe ông bà trước khi bước vào mùa mưa lạnh miền Trung."],
      },
      nam: {
        title: "Miền Nam — Họp Mặt Gia Đình & Cúng Vía Quan Âm Xuất Gia (19/9)",
        specialDishOrItem: "Bánh trái mùa thu, chè dưỡng nhan, lễ chay ngày 19/9",
        highlights: ["Kết hợp ngày 9/9 kính lão và ngày 19/9 Vía Quan Âm xuất gia để ăn chay cầu bình an cho người lớn tuổi."],
      },
    },
    checklist: ["Cắm bình cúc vàng tươi trên ban thờ và pha ấm trà cúc mời ông bà cha mẹ."],
    mythsToAvoid: ["Không mang yếu tố kiêng kỵ nặng nề — hãy đón Tết Trùng Cửu như một ngày 'Kính Lão' ấm áp."],
  },
  {
    id: "tet-com-moi-ha-nguyen-thang-10",
    lunarMonth: "Tháng 10",
    title: "Tết Cơm Mới (10/10) & Tết Hạ Nguyên (Rằm Tháng 10)",
    subtitle: "Dâng hạt gạo mới đầu mùa — Tri ân đất trời và tổ tiên",
    badge: "Tháng Mười (10/10 • 15/10)",
    image: "/images/culture/le-gio-to-tien.jpg",
    imageCaption: "Bữa cơm gạo mới sum vầy trong Tết Trùng Thập (10/10) và Tết Hạ Nguyên Rằm Tháng Mười.",
    relatedPrayerId: "tet-com-moi-ha-nguyen-thang-10",
    origin:
      "Tháng Mười là mùa gặt lúa nếp mới thơm nhất trong năm. Người Việt làm Tết Cơm Mới (10/10 — Trùng Thập) và Tết Hạ Nguyên (15/10) để dâng bát cơm đầu mùa lên Thần Nông và Tổ tiên trước khi con cháu thưởng thức.",
    humanisticValue:
      "Dạy thế hệ trẻ biết trân trọng từng hạt gạo, biết ơn công sức lao động của nông dân và thành quả mồ hôi nước mắt suốt một năm làm việc.",
    regions: {
      bac: {
        title: "Miền Bắc — Xôi Nếp Mới, Bánh Dày & Cơm Gạo Tám Thơm",
        specialDishOrItem: "Cơm gạo tám mới, xôi lúa nếp cái hoa vàng, bánh dày giò, chè kho",
        highlights: [
          "Dân gian có câu 'Tháng Mười có Tết Cơm Mới', nhà nhà nấu nồi cơm gạo mới hoặc xôi nếp cái hoa vàng dâng tổ tiên.",
          "Nhiều nơi tổ chức lễ cúng Thần Nông tại đình làng tạ ơn vụ mùa bội thu.",
        ],
      },
      trung: {
        title: "Miền Trung — Cúng Cơm Mới & Bánh Đập / Bánh Ướt Gạo Mới",
        specialDishOrItem: "Cơm gạo mới dẻo thơm, bánh ướt, cá kho tộ, canh rau tập tàng",
        highlights: ["Dâng mâm cơm mới mộc mạc đậm tình quê hương để tạ ơn đất trời sau mùa gặt."],
      },
      nam: {
        title: "Miền Nam — Lễ Cúng Cơm Mới & Lễ Hội Ok Om Bok (Cúng Trăng)",
        specialDishOrItem: "Cốm dẹp trộn dừa đường, cơm gạo mới ST25/nàng thơm, chè bắp",
        highlights: [
          "Tại ĐBSCL, Rằm tháng 10 còn trùng với lễ hội Ok Om Bok (cúng trăng, ăn cốm dẹp, đua ghe ngo) vô cùng đặc sắc của đồng bào Khmer Nam Bộ.",
        ],
      },
    },
    checklist: ["Nấu một nồi cơm gạo mới thơm dẻo dâng lên ban thờ gia tiên trước khi cả nhà dùng bữa."],
    mythsToAvoid: ["Tránh lãng phí cơm thừa — giữ đúng tinh thần trân quý 'hạt ngọc trời' của Tết Cơm Mới."],
  },
  {
    id: "dong-chi-thang-11",
    lunarMonth: "Tháng 11",
    title: "Tiết Đông Chí & Mùa Chạp Họ Cuối Năm (Tháng 11)",
    subtitle: "Đêm dài nhất năm — 'Nhất dương sinh' khởi đầu chu kỳ mới ấm áp",
    badge: "Tháng Mười Một (Đông Chí)",
    image: "/images/culture/le-gio-to-tien.jpg",
    imageCaption: "Bữa cơm đoàn viên và bát chè nóng ấm áp trong tiết Đông Chí tháng Mười Một.",
    relatedPrayerId: "tiet-dong-chi-thang-11",
    origin:
      "Đông Chí (khoảng 21–22/12 Dương lịch, thường rơi vào tháng 11 Âm lịch) là một trong 4 tiết khí lớn nhất năm theo Dịch học: sau đêm dài nhất này, dương khí bắt đầu sinh trở lại ('Nhất dương phục').",
    humanisticValue:
      "Nhắc nhở triết lý lạc quan của người xưa: 'Hết bĩ cực đến thái lai' — giữa lúc lạnh giá tối tăm nhất cũng chính là lúc ánh sáng mùa xuân bắt đầu nảy mầm.",
    regions: {
      bac: {
        title: "Miền Bắc — Cúng Đông Chí & Sắm Sửa Giỗ Chạp Dòng Họ",
        specialDishOrItem: "Bánh trôi tàu gừng nóng, chè bà cốt, mâm cơm gia tiên ấm áp",
        highlights: ["Thời điểm các dòng họ họp bàn tu sửa nhà thờ tổ, lên lịch chạp mộ cuối năm."],
      },
      trung: {
        title: "Miền Trung — Tụ Họp Gia Đình & Cúng Rằm Tháng 11",
        specialDishOrItem: "Chè trôi nước gừng ấm, trà nóng, bánh gói truyền thống",
        highlights: ["Giữ ấm cho người cao tuổi, chuẩn bị tinh thần và tài chính đón Tết sắp cận kề."],
      },
      nam: {
        title: "Miền Nam — Ăn Chè Trôi Nước Cầu Đoàn Viên Đông Chí",
        specialDishOrItem: "Chè trôi nước ngũ sắc nước cốt dừa gừng nóng",
        highlights: ["Rất phổ biến phong tục nấu nồi chè trôi nước cúng tổ tiên ngày Đông Chí — tượng trưng gia đình tròn đầy, gắn bó."],
      },
    },
    checklist: ["Nấu một nồi chè trôi nước nóng hoặc bữa lẩu/cơm ấm cho cả nhà quây quần."],
    mythsToAvoid: ["Không có kiêng kỵ tiêu cực — Đông Chí là tiết khí cát lành của sự tái sinh dương khí."],
  },
  {
    id: "ong-cong-ong-tao",
    lunarMonth: "Tháng 12",
    title: "Tạ Mộ Cuối Năm, Cúng Ông Công Ông Táo (23 Chạp) & Tất Niên",
    subtitle: "Khúc dạo đầu rộn ràng nhất năm — Dọn bếp, rước tổ tiên về ăn Tết",
    badge: "Tháng Chạp (15/12 – 30/12)",
    image: "/images/culture/ong-cong-ong-tao.jpg",
    imageCaption: "Hình tượng cá chép hóa rồng vượt mây đưa Táo Quân về chầu Ngọc Hoàng ngày 23 tháng Chạp.",
    relatedPrayerId: "ong-cong-ong-tao",
    origin:
      "Tháng Chạp khép lại vòng tuần hoàn 12 tháng với 3 nghi lễ lớn: Tạ Mộ mời tổ tiên (từ Rằm Chạp), Tiễn Ông Công Ông Táo (23 Chạp) và Lễ Tất Niên (chiều 30 Tết) sum họp đại gia đình.",
    humanisticValue:
      "Lễ cúng Ông Táo không phải để 'hối lộ báo cáo tốt', mà là dịp cả nhà cùng dọn dẹp gian bếp sạch sẽ, khép lại những bộn bề năm cũ và tự nhắc nhau giữ lửa hạnh phúc gia đình.",
    regions: {
      bac: {
        title: "Miền Bắc — Phóng Sinh 3 Cá Chép Sống & Mâm Cỗ Đủ Đầy",
        specialDishOrItem: "3 con cá chép đỏ sống + 3 bộ mũ áo hia hài giấy + Xôi gấc, gà luộc, nem rán",
        highlights: [
          "Cúng trước 12h trưa ngày 23 Chạp; thả cá chép sống nhẹ tay ở sông hồ sạch ('cá chép vượt Vũ Môn').",
          "Đặt mâm lễ trên bàn thờ chính (gia tiên/Thổ Công), không đặt dưới nền bếp.",
        ],
      },
      trung: {
        title: "Miền Trung — Ngựa Giấy Yên Cương & Thay Tượng Táo Quân",
        specialDishOrItem: "Ngựa giấy có yên cương đầy đủ, mũ áo Táo Quân, chè trôi nước, kẹo mè xửng",
        highlights: [
          "Người miền Trung thường cúng ngựa giấy yên cương cùng mũ áo Táo Quân và dựng cây nêu đón Tết.",
          "Chú trọng làm sạch bàn thờ, tỉa chân nhang (bao sái) gọn gàng sau ngày 23 Chạp.",
        ],
      },
      nam: {
        title: "Miền Nam — Kẹo Thèo Lèo, Chè Trôi Nước & 'Cò Bay Ngựa Chạy'",
        specialDishOrItem: "Đĩa kẹo thèo lèo (đậu phộng, mè đen), chè trôi nước, giấy in hình 'cò bay ngựa chạy'",
        highlights: [
          "Thường cúng tối 22 hoặc sáng 23 Chạp sau khi nấu nướng xong để gian bếp tinh tươm.",
          "Dùng giấy cúng 'cò bay ngựa chạy' gọn nhẹ, chuộng đồ ngọt cầu lời tấu trình êm đẹp.",
        ],
      },
    },
    checklist: [
      "Dọn dẹp gian bếp sạch sẽ trước giờ cúng 23 Chạp.",
      "Khi phóng sinh cá chép, tuyệt đối không vứt túi nilon xuống sông hồ.",
      "Bao sái bàn thờ nhẹ nhàng sau ngày 23 Chạp, giữ lại số lẻ chân nhang đẹp (3 hoặc 5 chân).",
    ],
    mythsToAvoid: [
      "Không cần đốt vàng mã khổng lồ hay lo lắng quá mức về giờ 'bao sái': chỉ cần thành tâm, sạch sẽ và an toàn phòng cháy.",
    ],
  },
  {
    id: "nghi-le-doi-nguoi-gia-su",
    lunarMonth: "Đời Người",
    title: "Cúng Giỗ, Đầy Tháng – Thôi Nôi & Lễ Gia Tiên Cưới Hỏi 3 Miền",
    subtitle: "Những cột mốc thiêng liêng đi cùng vòng đời mỗi người Việt Nam",
    badge: "Vòng Đời & Gia Phong",
    image: "/images/culture/le-gio-to-tien.jpg",
    imageCaption: "Mâm cỗ gia đình sum vầy — sợi dây kết nối nhiều thế hệ con cháu người Việt.",
    relatedPrayerId: "cung-gio-gia-tien",
    origin:
      "Từ lúc chào đời (Đầy Tháng – Thôi Nôi tạ ơn 12 Bà Mụ), lúc trưởng thành lập gia đình (Lễ Gia Tiên Ăn Hỏi – Vu Quy – Tân Hôn) cho đến khi tưởng nhớ người đi trước (Giỗ Đầu, Giỗ Hết, Giỗ Thường), mọi cột mốc đời người Việt đều có sự chứng giám ấm áp của gia tiên.",
    humanisticValue:
      "Giúp người trẻ hiểu rằng đám giỗ không phải ngày buồn, lễ thôi nôi không phải mê tín 'định đoạt tương lai', mà tất cả đều là dịp để đại gia đình trao nhau lời chúc phúc và tình thương.",
    regions: {
      bac: {
        title: "Miền Bắc — Cỗ Giỗ 4 Bát 4 Đĩa & Lễ Ăn Hỏi Tráp Lẻ",
        specialDishOrItem: "Xôi gấc, gà luộc lá chanh, nem rán, canh bóng/canh măng; lễ ăn hỏi số tráp lẻ (5, 7, 9 tráp)",
        highlights: [
          "Cúng giỗ làm lễ Tiên Thường chiều hôm trước và Chính Kỵ hôm sau rất chuẩn mực.",
          "Lễ cưới miền Bắc chọn số tráp lẻ (tượng trưng sinh sôi), trong tráp có bánh cốm, bánh phu thê, chè sen.",
        ],
      },
      trung: {
        title: "Miền Trung — Nghi Thức Họ Tộc Trang Trọng & Bánh Ít Lá Gai",
        specialDishOrItem: "Bánh ít lá gai, nem chả Huế, thịt luộc cuốn bánh tráng; lễ cưới chú trọng trầu cau & nến tơ hồng",
        highlights: [
          "Rất coi trọng thứ bậc tôn ti khi vào lễ bái tổ tiên trong đám giỗ và lễ cưới hỏi.",
          "Lễ Đầy Tháng / Thôi Nôi bày mâm xôi chè nhỏ gọn, tinh tế dâng 12 Bà Mụ và 3 Đức Ông.",
        ],
      },
      nam: {
        title: "Miền Nam — 'Đám Giỗ' Nhóm Họ Sum Vầy & Tráp Cưới Số Chẵn",
        specialDishOrItem: "Thịt kho tàu, canh khổ qua, gỏi ngó sen; Thôi Nôi có chè đậu trắng (trai) / chè trôi nước (gái); Tráp cưới số chẵn (6, 8 tráp)",
        highlights: [
          "'Đám giỗ' miền Nam cực kỳ cởi mở, hàng xóm và bạn bè cùng phụ nấu nướng từ chiều hôm trước, ra về có 'gói phần' mang lộc.",
          "Lễ cưới miền Nam chọn số tráp chẵn (tượng trưng có đôi có cặp), nổi bật với nghi thức thắp cặp đèn cầy Long Phụng trên bàn thờ gia tiên.",
          "Lễ Thôi Nôi rất vui với mâm 'bốc đồ chọn nghề' (bút, sách, gương, máy tính, ống nghe...) để cả nhà chúc phúc cho bé.",
        ],
      },
    },
    checklist: [
      "Lễ Đầy Tháng/Thôi Nôi tính theo lịch Âm ('Gái lùi 2, trai lùi 1').",
      "Trong đám giỗ, hãy kể lại những kỷ niệm đẹp về ông bà cho thế hệ nhỏ cùng nghe.",
    ],
    mythsToAvoid: [
      "Tổ chức cưới hỏi hay đám giỗ linh đình vượt khả năng tài chính vì 'sợ người ngoài chê': sự ấm cúng, văn minh và hiếu thuận mới là điều tổ tiên mong muốn nhất.",
    ],
  },
];
