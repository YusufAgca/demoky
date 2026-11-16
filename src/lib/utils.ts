import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Modern CSS Class Birleştirici (cn utility)
 * 
 * Mimari Açıklama:
 * Tailwind sınıflarının dinamik olarak birleştirilmesinde çakışan sınıfları (ör: p-2 ile p-4)
 * temizlemek ve koşullu sınıfları güvenle yönetmek için clsx ve tailwind-merge bir arada kullanılır.
 * 
 * @param inputs - CSS sınıf dizgeleri, objeler veya koşullu değerler
 * @returns Çakışmasız, temizlenmiş tekil CSS sınıf dizgesi
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Fiyat Formatlayıcı Utility
 * 
 * @param price - Sayısal fiyat değeri
 * @param currency - Para birimi sembolü (Varsayılan: '$')
 * @returns Formatlanmış fiyat dizgesi ($15.00)
 */
export function formatPrice(price: number, currency: string = "$"): string {
  return `${currency}${price.toFixed(2)}`;
}

/**
 * İndirim Aktiflik Kontrolü
 * 
 * Mimari Açıklama:
 * İndirimsiz ürünlerde `price === discountedPrice` verildiğinde üstü çizili
 * aynı fiyatın gösterilmesini engeller; yalnızca gerçek bir indirim varsa true döner.
 */
export function hasActiveDiscount(price: number, discountedPrice?: number): boolean {
  return typeof discountedPrice === "number" && discountedPrice > 0 && discountedPrice < price;
}

/**
 * Ürünün Geçerli (Etkin) Satış Fiyatını Döndürür
 */
export function getEffectivePrice(price: number, discountedPrice?: number): number {
  return hasActiveDiscount(price, discountedPrice) && discountedPrice !== undefined
    ? discountedPrice
    : price;
}
