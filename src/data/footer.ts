import { FooterColumn, PaymentMethodBadge } from "@/types";

/**
 * Kurumsal Footer 4 Sütunlu Navigasyon Yapısı
 * Hem masaüstü sütunlarında hem de mobil akordeonlarda tek kaynaktan (Single Source of Truth) kullanılır.
 */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: "demoky",
    title: "Demoky",
    links: [
      { label: "Our World", href: "/about/our-world" },
      { label: "Contact Us", href: "/contact" },
      {
        label: "Demoky Catalog",
        href: "https://cdn.elonky.com/public/ElonkyKatalog.pdf",
        isExternal: true,
      },
    ],
  },
  {
    id: "what-we-do",
    title: "What We Do",
    links: [
      { label: "Personalized Gift", href: "/gifts/personalized" },
      { label: "Handmade Crafts", href: "/crafts/handmade" },
      { label: "Exclusive Collections", href: "/collection/exclusive-collections" },
      { label: "Satisfied Customers", href: "/satisfied-customers" },
      { label: "Our Story", href: "/ourstory" },
    ],
  },
  {
    id: "partnership",
    title: "Partnership",
    links: [
      { label: "Sell On Demoky", action: "openSellerModal" },
      { label: "Sellers Policy", href: "/contract/seller-policy" },
      { label: "Career", href: "/career" },
    ],
  },
  {
    id: "help",
    title: "Help",
    links: [
      { label: "Frequently Asked Questions", href: "/faq" },
      { label: "Transaction Guidelines", href: "/support/transaction-guidelines" },
    ],
  },
];

/**
 * Footer Alt Araç Çubuğu Ödeme Sağlayıcı Rozetleri
 */
export const PAYMENT_METHODS: PaymentMethodBadge[] = [
  { id: "visa", label: "VISA", bgClass: "bg-white", textClass: "text-[#1A1F71]" },
  { id: "mastercard", label: "Mastercard", bgClass: "bg-white", textClass: "text-[#EB001B]" },
  { id: "amex", label: "AMEX", bgClass: "bg-[#006FCF]", textClass: "text-white" },
  { id: "paypal", label: "PayPal", bgClass: "bg-white", textClass: "text-[#003087]" },
  { id: "klarna", label: "Klarna", bgClass: "bg-[#FFB3C7]", textClass: "text-black" },
  { id: "apple-pay", label: "Pay", bgClass: "bg-white", textClass: "text-black" },
  { id: "google-pay", label: "GPay", bgClass: "bg-white", textClass: "text-gray-800" },
];

/**
 * Footer Alt Telif & Yasal Sözleşme Bağlantıları
 */
export const LEGAL_LINKS = [
  { label: "Cookie Policy", href: "/contract/cookie-policy" },
  { label: "Terms of Use", href: "/contract/terms-of-use" },
  { label: "Privacy Policy", href: "/contract/privacy-policy" },
  { label: "Distance Sales Agreement", href: "/contract/distance-sales" },
];
