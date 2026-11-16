import { EditorialMediaItem, PromoTierItem, ValuePropItem } from "@/types";

/**
 * Promo Ribbon Banner — Black Friday Kademeli Kupon Verileri
 */
export const BLACK_FRIDAY_TIERS: PromoTierItem[] = [
  { spend: "SPEND $100+", discount: "$20", label: "OFF" },
  { spend: "SPEND $450+", discount: "$150", label: "OFF" },
  { spend: "SPEND $900+", discount: "$350", label: "OFF" },
];

/**
 * Editöryal Split Banner ("Personalized Gift") Medya Kartları
 */
export const EDITORIAL_ITEMS: EditorialMediaItem[] = [
  {
    id: 1,
    src: "https://cdn.elonky.com/section-personalized-gift/bbc24073-20dc-4f72-a6e0-a2e1f85331da/b2a9f0a1-30ec-4cc3-a0df-5060e8f0915d.webp",
    alt: "Handwoven rug - Jaycee personalized embroidery",
    type: "video",
    videoSrc: "https://cdn.elonky.com/section-personalized-gift/bbc24073-20dc-4f72-a6e0-a2e1f85331da/b2a9f0a1-30ec-4cc3-a0df-5060e8f0915d.mp4",
  },
  {
    id: 2,
    src: "https://cdn.elonky.com/section-personalized-gift/442fe6af-e10c-49ae-82ad-696e6156f1f4/d5d5f7ec-dfa1-4b71-a3e8-788796301f0c.webp",
    alt: "Artisan dining table runner with festive berries",
    type: "video",
    videoSrc: "https://cdn.elonky.com/section-personalized-gift/442fe6af-e10c-49ae-82ad-696e6156f1f4/d5d5f7ec-dfa1-4b71-a3e8-788796301f0c.mp4",
  },
  {
    id: 3,
    src: "https://cdn.elonky.com/section-personalized-gift/1462cd73-1a6d-43e3-96d3-1db57ef565e6/a8202ad4-be55-4924-96df-d38581df466a.webp",
    alt: "Anatolian pink hand-knotted kilim textile",
    type: "video",
    videoSrc: "https://cdn.elonky.com/section-personalized-gift/1462cd73-1a6d-43e3-96d3-1db57ef565e6/a8202ad4-be55-4924-96df-d38581df466a.mp4",
  },
];

/**
 * Değer Önerileri & Güven Rozetleri (Value Propositions)
 */
export const VALUE_PROPS_ITEMS: ValuePropItem[] = [
  {
    id: "shipping",
    iconName: "truck",
    title: "Worldwide Shipping",
    description: "Delivery to over 50 countries",
  },
  {
    id: "security",
    iconName: "lock",
    title: "100% Payment Secure",
    description: "Guarantee secure payment with SSL",
  },
  {
    id: "support",
    iconName: "headset",
    title: "24/7 Support",
    description: "We solve instantly with 24/7 live support",
  },
  {
    id: "guarantee",
    iconName: "dollar",
    title: "100% Money Back Guarantee",
    description: "If you are not satisfied, you will get a full refund.",
  },
];
