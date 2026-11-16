"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DealCarouselItem } from "@/types";
import { useDragScroll } from "@/hooks/useDragScroll";

interface DiscountBadgeCarouselProps {
  title: string;
  items: DealCarouselItem[];
}

const SCROLL_STEP_PX = 340;

/**
 * 1:1 Elonky İndirim Rozetli Yatay Ürün Slider'ı (Discount Badge Carousel)
 * 
 * Mimari Açıklama:
 * "Cozy Up for Christmas" ve "Your Favorite Finds, for Less" bölümlerinin
 * ortak kullandığı parametrik bileşendir (DRY prensibi).
 * - `useDragScroll` kancası ile sıfır re-render 60fps fareyle sürükleme sunar.
 * - Masaüstünde kapsayıcı üzerine gelindiğinde (hover) sol ve sağ ok butonları belirir.
 * - Sol alt köşede iki tonlu yeşil/beyaz kapsül indirim rozeti yer alır.
 */
export function DiscountBadgeCarousel({ title, items }: DiscountBadgeCarouselProps) {
  const { scrollRef, dragHandlers, onLinkClick, scrollByOffset } = useDragScroll({
    speedMultiplier: 1.5,
    dragThreshold: 6,
  });

  return (
    <section className="w-full py-6 sm:py-8" aria-label={title}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif tracking-tight mb-5">
          {title}
        </h2>

        <div className="relative group/container">
          {/* Sol Gezinme Ok Butonu (Hover'da belirir) */}
          <button
            type="button"
            onClick={() => scrollByOffset(-SCROLL_STEP_PX)}
            className="hidden md:flex absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-gray-900 shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-gray-200/80 items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 opacity-0 pointer-events-none group-hover/container:opacity-100 group-hover/container:pointer-events-auto"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800 stroke-[2.5]" />
          </button>

          {/* Sağ Gezinme Ok Butonu (Hover'da belirir) */}
          <button
            type="button"
            onClick={() => scrollByOffset(SCROLL_STEP_PX)}
            className="hidden md:flex absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-gray-900 shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-gray-200/80 items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 opacity-0 pointer-events-none group-hover/container:opacity-100 group-hover/container:pointer-events-auto"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-800 stroke-[2.5]" />
          </button>

          {/* Yatay Akıcı Kart Şeridi */}
          <div
            ref={scrollRef}
            {...dragHandlers}
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((item) => (
              <div key={item.id} className="shrink-0 w-[260px] sm:w-[290px] md:w-[315px]">
                <Link
                  href={item.link}
                  onClick={onLinkClick}
                  draggable={false}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm block focus:outline-none"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    draggable={false}
                    className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    sizes="(max-width: 640px) 260px, 320px"
                  />

                  {/* Sol Alt Köşe İki Tonlu Yeşil/Beyaz Kapsül Rozet */}
                  <div className="absolute left-3 bottom-3 z-10 inline-flex items-center rounded-full overflow-hidden shadow-md text-xs font-bold bg-white/95 backdrop-blur-sm border border-black/5">
                    <span className="bg-[#A0E193] text-[#0D542B] px-2.5 py-1 font-extrabold">
                      {item.discount}
                    </span>
                    <span className="px-2.5 py-1 text-gray-900 font-extrabold flex items-center gap-1.5">
                      <span>{item.price}</span>
                      <span className="line-through text-gray-400 font-normal text-[11px]">
                        {item.oldPrice}
                      </span>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
