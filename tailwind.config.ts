import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        oriental: {
          // Phương án A: Giấy Xuyến Chỉ Ấm & Mực Lam Thủy Mặc (Warm Cream & Teal Ink)
          ink: "#175A67",          // Mực lam thủy mặc chính tông
          inkSoft: "#2A707C",      // Mực lam khói mềm
          inkDark: "#0F454F",      // Mực lam đậm sâu (hover)
          cream: "#EAE3DE",        // Giấy xuyến chỉ mây ngà (đồng bộ 100% video nền)
          creamDark: "#DFD6CE",    // Giấy cổ trầm

          // Surfaces (Warm Rice Paper Hierarchy)
          dark: "#EAE3DE",         // Nền trang chính giấy xuyến chỉ ấm
          darker: "#E2D9D1",       // Nền lõm cho input / vùng phụ
          card: "#F8F4F0",         // Nền thẻ giấy xuyến chỉ sáng sạch
          cardLight: "#F0EAE4",    // Nền thẻ nổi / hover
          border: "#D5C9BE",       // Viền mảnh giấy cổ
          borderGold: "#C2A675",   // Viền đồng thau cổ tinh tế

          // Royal & Traditional Accents (High-contrast on Warm Cream)
          gold: "#966F28",         // Vàng đồng trầm cổ điển
          goldBright: "#175A67",   // Mực lam chính cho tiêu đề (tương phản chuẩn AAA)
          goldMuted: "#7E6642",    // Đồng nhũ cổ
          red: "#B83A32",          // Chu sa son đỏ ấn triện
          redBright: "#9B2921",    // Son đỏ đậm sắc nét
          amber: "#A85D1A",        // Hổ phách trầm ấm
          amberLight: "#C96D1E",   // Hổ phách sáng
          jade: "#175A67",         // Ngọc bích thủy mặc
          jadeBright: "#226B5E",   // Ngọc bích thanh tú

          // High-contrast readable typography on Warm Cream
          textPrimary: "#12343B",  // Mực tàu lam đậm (dễ đọc tối đa)
          textSecondary: "#345258",// Mực lam trung tính cho nội dung
          textMuted: "#5E777D",    // Mực lam nhạt cho chú thích
        },
      },
      fontFamily: {
        brand: ["var(--font-brand)", "'Cormorant Garamond'", "'Lora'", "Georgia", "serif"],
        serif: ["var(--font-serif)", "'Lora'", "'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["var(--font-sans)", "'Poppins'", "'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        han: ["'Ma Shan Zheng'", "'ZCOOL XiaoWei'", "'STKaiti'", "'Kaiti SC'", "serif"],
        calligraphy: ["'Charm'", "cursive", "serif"],
        decorative: ["var(--font-brand)", "'Cormorant Garamond'", "'Lora'", "Georgia", "serif"],
      },
      boxShadow: {
        goldGlow: "0 6px 22px -6px rgba(150, 111, 40, 0.22)",
        tealGlow: "0 8px 24px -6px rgba(23, 90, 103, 0.18)",
        cardWarm: "0 10px 30px -12px rgba(23, 90, 103, 0.12), 0 2px 6px -2px rgba(150, 111, 40, 0.06)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
