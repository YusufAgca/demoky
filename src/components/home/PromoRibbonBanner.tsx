"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingCart, ArrowUpRight, Play, Pause } from "lucide-react";
import { BLACK_FRIDAY_TIERS } from "@/data/homeContent";
import { AnimatedWelcomeCartSvg } from "./AnimatedWelcomeCartSvg";
import { cn } from "@/lib/utils";

const SLIDE_INTERVAL_MS = 6000;

/**
 * 1:1 Elonky Çok Slaytlı Kampanya & Promosyon Şerit Carousel'i
 * 
 * Mimari Açıklama:
 * - Slide 1: Hoş Geldin Teklifi ($11 Kredi, `AnimatedWelcomeCartSvg` ve süzülen kupon kartı).
 * - Slide 2: Black Friday İndirimleri (Açılı turuncu poligon, `BLACK_FRIDAY_TIERS` kuponları).
 * - 6 saniyede bir otomatik geçiş yapar; fare üzerine gelindiğinde veya sağ alt butonla duraklatılabilir.
 */
export function PromoRibbonBanner() {
  const [activeSlide, setActiveSlide] = useState<0 | 1>(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, SLIDE_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <section className="w-full py-2.5 sm:py-4" aria-label="Campaign Promotion Carousel">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div
          className="w-full relative overflow-hidden bg-[#FFF7ED] border border-orange-200/80 select-none shadow-xs"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full grid grid-cols-1 [grid-template-areas:'stack'] min-h-[155px] sm:min-h-[165px] lg:min-h-[175px]">
            {/* SLAYT 1: Hoş Geldin Teklifi ($11 Kredi & Hareketli Sepet Sahnesi) */}
            <div
              className={cn(
                "[grid-area:stack] w-full flex items-center transition-opacity duration-700",
                activeSlide === 0
                  ? "opacity-100 z-10 pointer-events-auto"
                  : "opacity-0 z-0 pointer-events-none"
              )}
            >
              <div className="absolute right-[22%] top-1/2 -translate-y-1/2 text-8xl sm:text-9xl font-black text-[#F5E2D0]/40 pointer-events-none select-none tracking-tighter hidden md:block">
                hello
              </div>

              <div className="w-full px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                {/* Sol: Metin Başlığı */}
                <div className="flex flex-col text-center md:text-left max-w-md shrink-0">
                  <div className="text-[10px] font-extrabold text-[#C04D20] tracking-wider uppercase flex items-center justify-center md:justify-start gap-1.5 mb-1">
                    <span className="text-[#E85508]">✦</span>
                    <span>NEW HERE?</span>
                    <span className="text-gray-500 font-semibold">HERE&apos;S A LITTLE WELCOME.</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D1D13] leading-tight tracking-tight">
                    Your first order.
                    <span className="italic font-serif block text-elonky-brand font-semibold text-xl sm:text-2xl mt-0.5">
                      $11 credit. Automatically.
                    </span>
                  </h3>
                  <p className="text-xs text-[#715341] mt-1.5 leading-relaxed">
                    Create an account. Get an $11 credit automatically{" "}
                    <strong className="text-[#3A2519]">in your cart.</strong>
                  </p>
                </div>

                {/* Orta: Hareketli SVG Sepet & Yüzen Kupon Bileşeni */}
                <div className="relative flex items-center justify-center py-2 shrink-0">
                  <AnimatedWelcomeCartSvg />

                  {/* Hareketli Süzülen $11 Kredi Kartı */}
                  <div className="absolute -right-6 sm:-right-10 top-2 sm:top-3 z-20 animate-summary-float">
                    <div className="relative overflow-hidden bg-white/95 backdrop-blur-sm rounded-xl border border-orange-200/90 shadow-md p-2.5 sm:p-3 min-w-[140px] sm:min-w-[160px]">
                      <div className="absolute inset-0 w-8 bg-white/60 blur-[3px] pointer-events-none animate-card-light" />

                      <div className="flex items-center justify-between text-[9px] font-bold text-[#8B5130] tracking-wider mb-1">
                        <span className="flex items-center gap-1">
                          <ShoppingCart className="w-2.5 h-2.5 text-elonky-brand" />
                          IN YOUR CART
                        </span>
                        <span className="text-amber-500">★</span>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-1">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-semibold text-gray-700">Welcome credit</span>
                          <span className="text-[8px] text-gray-400">Your first order</span>
                        </div>
                        <div className="flex items-baseline gap-0.5 text-elonky-brand font-black">
                          <span className="text-xs">$</span>
                          <span className="text-xl leading-none">11</span>
                          <span className="text-[8px] tracking-tight">CREDIT</span>
                        </div>
                      </div>

                      <div className="mt-1.5 pt-1 border-t border-gray-100 flex items-center gap-1 text-[8px] text-emerald-700 font-semibold">
                        <span>✓</span>
                        <span>Applies automatically</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sağ: Aksiyon Butonu */}
                <div className="flex flex-col items-center md:items-end text-center shrink-0">
                  <span className="text-[9px] font-bold text-[#703313] tracking-widest uppercase mb-1.5 hidden sm:block">
                    A WARM WELCOME. LESS TO PAY.
                  </span>
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-full text-xs font-bold transition-all shadow-sm group hover:scale-[1.02]"
                  >
                    <span>Sign Up Now</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                  <span className="text-[10px] text-gray-500 mt-1.5 flex items-center gap-1">
                    <span className="text-elonky-brand">✦</span>
                    <span>No code needed.</span>
                  </span>
                </div>
              </div>
            </div>

            {/* SLAYT 2: Black Friday İndirimleri */}
            <div
              className={cn(
                "[grid-area:stack] w-full flex items-center transition-opacity duration-700",
                activeSlide === 1
                  ? "opacity-100 z-10 pointer-events-auto"
                  : "opacity-0 z-0 pointer-events-none"
              )}
            >
              <div
                className="absolute inset-0 left-[35%] bg-gradient-to-r from-[#FF9C52] via-[#FF762E] to-[#FF651E] pointer-events-none hidden md:block"
                style={{
                  clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)",
                }}
              />

              <div className="w-full px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 relative z-10">
                {/* Sol: Metin Başlığı */}
                <div className="flex flex-col text-center md:text-left max-w-sm shrink-0">
                  <div className="text-[10px] font-extrabold text-[#C04D20] tracking-wider uppercase flex items-center justify-center md:justify-start gap-1.5 mb-1">
                    <span className="text-[#E85508]">✦</span>
                    <span>BLACK FRIDAY</span>
                    <span className="text-gray-600 font-semibold">OUR BIGGEST DEALS</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-black leading-tight tracking-tight">
                    Black Friday Savings.
                    <span className="text-elonky-brand block text-xl sm:text-2xl mt-0.5">
                      Bigger Discounts in Your Cart.
                    </span>
                  </h3>
                  <p className="text-xs text-gray-600 mt-1.5">
                    Automatic discount based on <strong className="text-gray-900">your cart total.</strong>
                  </p>
                </div>

                {/* Orta: 3 Kupon Sekmesi */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 justify-center shrink-0">
                  {BLACK_FRIDAY_TIERS.map((tier) => (
                    <div
                      key={tier.spend}
                      className="bg-white rounded-xl border border-orange-200/90 px-3 sm:px-4 py-2 sm:py-2.5 flex flex-col items-center shadow-sm min-w-[95px] sm:min-w-[115px] hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-1 text-[9px] font-bold text-gray-500 tracking-wider">
                        <ShoppingCart className="w-3 h-3 text-elonky-brand" />
                        <span>{tier.spend}</span>
                      </div>
                      <div className="flex items-baseline gap-0.5 mt-0.5">
                        <span className="text-lg sm:text-xl font-extrabold text-[#E03A00] leading-none">
                          {tier.discount}
                        </span>
                        <span className="text-[10px] font-extrabold text-[#E03A00]">
                          {tier.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sağ: Siyah Aksiyon Butonu */}
                <div className="flex flex-col items-center md:items-end text-center shrink-0">
                  <span className="text-[9px] font-bold text-white md:text-[#703313] tracking-widest uppercase mb-1.5 hidden sm:block">
                    MORE YOU SHOP, MORE YOU SAVE.
                  </span>
                  <Link
                    href="/featured/black-friday-finds"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-full text-xs font-bold transition-all shadow-sm group hover:scale-[1.02]"
                  >
                    <span>Shop Black Friday</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                  <span className="text-[10px] text-gray-700 md:text-white mt-1.5 flex items-center gap-1 font-medium">
                    <span>✦</span>
                    <span>Automatic at checkout.</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Alt: Oynat / Durdur Kontrol Düğmesi */}
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            title={isPaused ? "Play animation" : "Pause animation"}
            aria-label={isPaused ? "Play animation" : "Pause animation"}
            className="absolute z-20 right-3 bottom-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-black border border-orange-200/60 shadow-xs transition-colors"
          >
            {isPaused ? <Play className="w-2.5 h-2.5 fill-current" /> : <Pause className="w-2.5 h-2.5 fill-current" />}
          </button>
        </div>
      </div>
    </section>
  );
}
