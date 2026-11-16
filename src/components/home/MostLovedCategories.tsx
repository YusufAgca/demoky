import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MOST_LOVED_CATEGORIES } from "@/data/categories";

/**
 * 1:1 Elonky "Most-Loved Categories" Bölümü (Server Component - RSC)
 * 
 * Mimari Açıklama:
 * - Saf Server Component olarak çalışır; verilerini `MOST_LOVED_CATEGORIES` sabitinden alır.
 * - Kart üzerine gelindiğinde (hover) görsel hafif çapraz dönerek (`scale-110 rotate-2`) yaklaşır.
 */
export function MostLovedCategories() {
  return (
    <section className="w-full py-6 sm:py-8" aria-label="Most-Loved Categories">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif tracking-tight mb-5">
          Most-Loved Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-5">
          {MOST_LOVED_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center focus:outline-none"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100 group-hover:shadow-md transition-all duration-300">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-110 group-hover:rotate-2"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-elonky-brand text-center mt-2.5 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
