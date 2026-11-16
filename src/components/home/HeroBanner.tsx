import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * 1:1 Elonky Orijinal Hero Banner Bileşeni (Server Component - RSC)
 * 
 * Mimari Açıklama:
 * - Hiçbir istemci state'i barındırmadığı için saf Server Component olarak çalışır.
 * - Masaüstünde 2172x724 (3:1) ve mobilde 1373x1145 (1.2:1) orijinal CDN WebP
 *   varlıklarını LCP önceliğiyle (`priority`) sunar.
 */
export function HeroBanner() {
  return (
    <section className="w-full pt-3 sm:pt-5 pb-3 sm:pb-5" aria-label="Black Friday Hero Banner">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <Link
          href="/featured/black-friday-finds"
          className="relative block w-full aspect-[1.2/1] sm:aspect-[1.5/1] md:aspect-[3.5/1] md:max-h-[390px] rounded-xl md:rounded-2xl overflow-hidden shadow-sm bg-neutral-100 group focus:outline-none"
        >
          {/* Masaüstü Görünümü (md: 768px ve üstü) */}
          <div className="hidden md:block absolute inset-0 w-full h-full">
            <Image
              src="https://cdn.elonky.com/section-banner-file/image/350695cb-ef12-4f2e-8698-9c613ea0f20a.webp"
              alt="Black Friday Biggest Deals of the Year - Spend More Save More"
              fill
              priority
              className="object-cover object-center group-hover:scale-[1.005] transition-transform duration-500"
              sizes="(min-width: 1400px) 1400px, 100vw"
            />
          </div>

          {/* Mobil Görünümü (md altı ekranlar) */}
          <div className="md:hidden absolute inset-0 w-full h-full">
            <Image
              src="https://cdn.elonky.com/section-banner-file/image/7b5dd03c-cf9f-4171-8924-e2f0c1c83c8f.webp"
              alt="Black Friday Deals Mobile"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
