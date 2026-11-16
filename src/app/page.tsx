import React from "react";
import { Header } from "@/components/layout/Header";
import { HeroBanner } from "@/components/home/HeroBanner";
import { ShopYourStyle } from "@/components/home/ShopYourStyle";
import { PromoRibbonBanner } from "@/components/home/PromoRibbonBanner";
import { DiscountBadgeCarousel } from "@/components/home/DiscountBadgeCarousel";
import { MostLovedCategories } from "@/components/home/MostLovedCategories";
import { CuratedProductCarousel } from "@/components/home/CuratedProductCarousel";
import { EditorialSplitBanner } from "@/components/home/EditorialSplitBanner";
import { ValueProps } from "@/components/home/ValueProps";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SellerModal } from "@/components/seller/SellerModal";
import { ClientSocketListener } from "@/components/providers/ClientSocketListener";
import {
  COZY_HOLIDAY_ITEMS,
  FAVORITE_FINDS_ITEMS,
  SOMETHING_FOR_YOU_ITEMS,
  GIFTS_FOR_EVERYONE_ITEMS,
  FURNITURE_ITEMS,
} from "@/data/products";

/**
 * 1:1 Elonky Ana Sayfası (Pixel-Accurate Home Page - Next.js RSC)
 * 
 * Mimari Açıklama (Clean Code & Single Responsibility):
 * Bu Server Component yalnızca sayfa seviyesindeki katmanların (Header, Vitrin Blokları,
 * Footer ve Global Çekmeceler/Modallar) kompozisyonundan sorumludur. Tüm veri kümeleri
 * `src/data/` katmanında, etkileşim mantıkları ise `src/hooks/` altında izole edilmiştir.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-elonky-brand/10 selection:text-elonky-brand">
      {/* 1. Canlı WebSocket Bildirim Dinleyicisi */}
      <ClientSocketListener />

      {/* 2. Sticky Header & Kategori Menüsü */}
      <Header />

      {/* 3. Ana Vitrin Akışı */}
      <main className="flex-1 flex flex-col">
        <HeroBanner />

        <ShopYourStyle />

        <PromoRibbonBanner />

        <DiscountBadgeCarousel
          title="Cozy Up for Christmas"
          items={COZY_HOLIDAY_ITEMS}
        />

        <MostLovedCategories />

        <DiscountBadgeCarousel
          title="Your Favorite Finds, for Less"
          items={FAVORITE_FINDS_ITEMS}
        />

        <CuratedProductCarousel
          title="A Little Something for You"
          items={SOMETHING_FOR_YOU_ITEMS}
        />

        <CuratedProductCarousel
          title="Gifts for Everyone on Your List"
          items={GIFTS_FOR_EVERYONE_ITEMS}
        />

        <CuratedProductCarousel
          title="Furniture Finds You'll Fall For"
          items={FURNITURE_ITEMS}
        />

        <EditorialSplitBanner />

        <ValueProps />
      </main>

      {/* 4. Kurumsal 4 Sütunlu Footer & E-Bülten */}
      <Footer />

      {/* 5. Global Modallar & Çekmeceler */}
      <CartDrawer />
      <MobileMenu />
      <SellerModal />
    </div>
  );
}
