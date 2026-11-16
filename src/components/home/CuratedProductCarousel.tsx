"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { CuratedProductCard } from "@/components/product/CuratedProductCard";
import { QuickViewModal } from "@/components/product/QuickViewModal";

interface CuratedProductCarouselProps {
  title: string;
  items: Product[];
}

/**
 * 1:1 Elonky Küratörlü Ürün Vitrin Bileşeni
 * 
 * Mimari Açıklama:
 * "A Little Something for You", "Gifts for Everyone on Your List" ve
 * "Furniture Finds You'll Fall For" alanlarında 4 sütunlu küratörlü ızgarayı
 * ve Quick View ön izleme modalını orkestre eder.
 */
export function CuratedProductCarousel({
  title,
  items,
}: CuratedProductCarouselProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <section className="w-full py-6 sm:py-8 relative" aria-label={title}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif tracking-tight mb-5">
          {title}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pb-2">
          {items.map((product) => (
            <CuratedProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
