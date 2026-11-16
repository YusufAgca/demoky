/**
 * Elonky Domain Models & Type Definitions
 * 
 * Mimari Açıklama:
 * Uygulama genelinde kullanılan veri modellerinin TypeScript tip tanımlarıdır.
 * Tüm vitrin, sepet, navigasyon, editöryal içerik ve bildirim yapıları
 * merkezi olarak burada tanımlanmıştır.
 */

export interface Product {
  id: number;
  productId: number;
  title: string;
  link: string;
  image: string;
  images?: string[];
  videoUrl?: string;
  hasVideo?: boolean;
  price: number;
  discountedPrice?: number;
  currencySymbol: string;
  discountPercentage?: number | null;
  rating?: number;
  reviewsCount?: number;
  sellerName?: string;
  isFreeShipping?: boolean;
}

export interface DealCarouselItem {
  id: number;
  title: string;
  link: string;
  image: string;
  discount: string;
  price: string;
  oldPrice: string;
}

export interface CircularCategory {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  displayOrder?: number;
}

export interface NavCategory {
  id: string;
  name: string;
  slug: string;
  href: string;
  isFeatured?: boolean;
}

export interface SearchCollectionItem {
  id: string;
  name: string;
  href: string;
  image: string;
}

export interface MostLovedCategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface EditorialMediaItem {
  id: number;
  src: string;
  alt: string;
  type: "video" | "image";
  videoSrc?: string;
  link?: string;
}

export interface PromoTierItem {
  spend: string;
  discount: string;
  label: string;
}

export interface ValuePropItem {
  id: string;
  iconName: "truck" | "lock" | "headset" | "dollar";
  title: string;
  description: string;
}

export interface FooterLinkItem {
  label: string;
  href?: string;
  isExternal?: boolean;
  action?: "openSellerModal";
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLinkItem[];
}

export interface PaymentMethodBadge {
  id: string;
  label: string;
  bgClass: string;
  textClass: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "order" | "discount" | "info";
  read: boolean;
}
