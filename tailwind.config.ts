import type { Config } from "tailwindcss";

/**
 * Tailwind CSS Configuration for Elonky Frontend Clone
 * 
 * Mimari Açıklama:
 * Bu yapılandırma dosyası, elonky.com platformundan tersine mühendislik ile çıkarılan
 * özgün tasarım token'larını (design tokens), marka renk paletini ve tipografik
 * hiyerarşiyi Tailwind CSS ekosistemine entegre eder.
 * 
 * - Marka Rengi: Terracotta / Yanık Turuncu (#cb5810)
 * - Derin Arka Plan / Başlık Tonları: Koyu Petrol Yeşili / Siyah (#061D21, #0B3137)
 * - Vurgu Renkleri: Pastel Çim Yeşili (#D9EDBF, #A0E193)
 * - Yuvarlatma (Border Radius): 0.625rem (10px)
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        elonky: {
          // Birincil Marka Rengi (Terracotta / Yanık Turuncu)
          brand: {
            DEFAULT: "#cb5810",
            hover: "#b54c0b",
            light: "#fbf2ed",
            dark: "#8d3907",
          },
          // Derin Arka Plan & Tipografi Renkleri
          dark: {
            900: "#061D21", // En koyu petrol tonu (Header / Dark banner)
            800: "#0B3137", // İkincil koyu ton
            700: "#184449", // Kart & border kontrastı
            600: "#2a595f",
          },
          // Canlı & Pastel Vurgu Renkleri (İndirim rozetleri, sepet hediyeleri)
          accent: {
            greenLight: "#D9EDBF",
            greenMedium: "#A8D97A",
            greenBright: "#A0E193",
          },
          // Nötr Yüzey & Çerçeve Renkleri
          surface: {
            DEFAULT: "#FFFFFF",
            muted: "#F9FAFB",
            subtle: "#F2F4F7",
            border: "#E4E7EC",
          },
          // Metin Renkleri
          text: {
            primary: "#0C0C0C",
            secondary: "#475467",
            muted: "#667085",
            placeholder: "#98A2B3",
          },
        },
      },
      borderRadius: {
        elonky: "0.625rem", // 10px standart kart/buton yuvarlatması
      },
      fontFamily: {
        sans: ["var(--font-graphik)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["var(--font-guardian)", "Georgia", "Cambria", "Times New Roman", "serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(16, 24, 40, 0.1), 0 1px 2px 0 rgba(16, 24, 40, 0.06)",
        dropdown: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        header: "0 2px 8px rgba(0, 0, 0, 0.06)",
      },
      aspectRatio: {
        "product-card": "4 / 5",
        banner: "16 / 5",
      },
    },
  },
  plugins: [],
};

export default config;
