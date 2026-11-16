"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CIRCULAR_CATEGORIES } from "@/data/categories";
import { useDragScroll } from "@/hooks/useDragScroll";
import { cn } from "@/lib/utils";

/**
 * 1:1 Elonky Orijinal "Shop Your Style" Dairesel Kategori Vitrini & Slider Bileşeni
 * 
 * Mimari & Performans Açıklaması:
 * - `useDragScroll` kancası ile sıfır re-render (60-120fps) fareyle kaydırma sunar.
 * - Mobilde 3 sütunlu kompakt grid (ilk 6 öğe), masaüstünde tüm kategoriler yatay şerit halindedir.
 */
export function ShopYourStyle() {
  const { scrollRef, dragHandlers, onLinkClick } = useDragScroll();

  return (
    <section className="w-full pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 bg-white" aria-label="Shop Your Style">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Mobil Başlık */}
        <div className="flex md:hidden mb-3">
          <span className="text-[18px] tracking-[0.5px] leading-7 font-bold text-gray-900">
            Shop Your Style
          </span>
        </div>

        {/* Sürüklenebilir Akışkan Slider & Mobil Grid */}
        <div
          ref={scrollRef}
          {...dragHandlers}
          className="grid grid-cols-3 gap-2.5 md:flex md:flex-nowrap md:gap-9 lg:gap-11 md:overflow-x-auto min-h-44 pt-4 pb-4 md:pt-5 md:pb-5 md:select-none no-scrollbar cursor-grab active:cursor-grabbing touch-pan-x"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {CIRCULAR_CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              onClick={onLinkClick}
              draggable={false}
              className={cn(
                "group flex-col items-center shrink-0 touch-manipulation focus:outline-none",
                idx < 6 ? "flex" : "hidden md:flex"
              )}
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 overflow-hidden rounded-full bg-gray-100 shadow-[0px_0px_8px_2px_rgba(0,0,0,0.16)] group-hover:shadow-[0px_0px_16px_3px_rgba(0,0,0,0.32)] group-hover:scale-105 transition-all duration-300">
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  draggable={false}
                  className="object-cover pointer-events-none"
                  sizes="(min-width: 768px) 128px, 96px"
                />
                <div className="absolute inset-1 rounded-full border border-white/80 pointer-events-none" />
              </div>

              <p className="w-full max-w-[120px] md:max-w-[130px] block truncate mt-2.5 md:mt-3.5 text-center font-medium text-xs md:text-sm text-gray-900 group-hover:text-elonky-brand transition-colors pointer-events-none">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
