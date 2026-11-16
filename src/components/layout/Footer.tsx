"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Youtube, Facebook, Globe, ChevronDown } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { setSellerModalOpen } from "@/store/slices/uiSlice";
import { FOOTER_COLUMNS, LEGAL_LINKS } from "@/data/footer";
import { FooterLinkItem } from "@/types";
import { PaymentBadges } from "./PaymentBadges";
import { cn } from "@/lib/utils";

/**
 * 1:1 Elonky Kurumsal Footer Bileşeni
 * 
 * Mimari Açıklama:
 * - Masaüstü 4 sütunlu menü ve mobil `<details>` akordeon menüleri, DRY prensibi gereği
 *   tek bir `FOOTER_COLUMNS` veri kaynağından (`src/data/footer.ts`) dinamik olarak üretilir.
 */
export function Footer() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const subscribeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (subscribeTimerRef.current) clearTimeout(subscribeTimerRef.current);
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    if (subscribeTimerRef.current) clearTimeout(subscribeTimerRef.current);
    subscribeTimerRef.current = setTimeout(() => setSubscribed(false), 4000);
  };

  const renderFooterLink = (link: FooterLinkItem, className: string) => {
    if (link.action === "openSellerModal") {
      return (
        <button
          type="button"
          onClick={() => dispatch(setSellerModalOpen(true))}
          className={cn("text-left transition-colors", className)}
        >
          {link.label}
        </button>
      );
    }

    if (link.isExternal && link.href) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("transition-colors", className)}
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link href={link.href || "/"} className={cn("transition-colors", className)}>
        {link.label}
      </Link>
    );
  };

  return (
    <footer className="w-full mt-auto" aria-label="Site Footer">
      {/* 1. E-BÜLTEN ABONELİK ŞERİDİ */}
      <div className="w-full bg-[#184449] px-4 py-6 md:py-9">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-relaxed md:w-1/2 text-center md:text-left">
            Be the first to know about{" "}
            <span className="font-semibold text-white">
              exclusive discounts, seasonal campaigns
            </span>
            , and special offers.
          </p>

          <div className="flex flex-col items-end w-full md:w-1/2 max-w-md">
            <form
              onSubmit={handleSubscribe}
              className="flex items-center w-full h-14 sm:h-16 rounded-[20px] border border-white/40 overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-white/80 bg-[#184449]"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Your email address"
                required
                className="flex-1 bg-transparent text-white text-[15px] sm:text-[16px] px-5 placeholder:text-gray-300 focus:outline-none border-none min-w-0"
              />
              <button
                type="submit"
                className="shrink-0 cursor-pointer h-full px-6 text-[15px] sm:text-[16px] font-medium text-white transition-opacity hover:opacity-80 bg-transparent disabled:opacity-60"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 2. SÜRDÜRÜLEBİLİRLİK BANDI */}
      <div className="w-full bg-[#D9EDBF] py-4 sm:py-3.5 px-4 flex items-center justify-center">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-center gap-2.5 text-center text-[#0D542B]">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
            aria-hidden="true"
          >
            <path
              d="M10.9265 15.9677L15.1455 12.1993C15.2832 12.0768 15.3218 11.9318 15.2615 11.7645C15.2013 11.5972 15.0776 11.4968 14.8903 11.4635L11.5885 11.152L13.575 8.41725C13.6185 8.34675 13.6412 8.27558 13.6432 8.20375C13.6452 8.13208 13.6192 8.06608 13.5652 8.00575C13.4986 7.92892 13.4195 7.89433 13.328 7.902C13.2365 7.9095 13.1526 7.94383 13.0763 8.005L8.88875 11.7665C8.75142 11.8888 8.71125 12.0353 8.76825 12.2058C8.82525 12.3763 8.94742 12.4782 9.13475 12.5115L12.4365 12.823L10.4442 15.5577C10.4006 15.6283 10.3804 15.6994 10.3838 15.7713C10.3869 15.8429 10.417 15.9089 10.474 15.9692C10.5312 16.0294 10.6017 16.0595 10.6858 16.0595C10.7698 16.0595 10.85 16.0289 10.9265 15.9677ZM12.0095 19.5C11.1017 19.5 10.2465 19.3509 9.444 19.0527C8.64167 18.7548 7.91483 18.3391 7.2635 17.8057L5.79225 19.277C5.71742 19.3513 5.63317 19.4071 5.5395 19.4443C5.44583 19.4814 5.34908 19.5 5.24925 19.5C5.03692 19.5 4.859 19.428 4.7155 19.284C4.57183 19.1398 4.5 18.9613 4.5 18.7485C4.5 18.6482 4.51858 18.5516 4.55575 18.4587C4.59292 18.3657 4.64867 18.2821 4.723 18.2078L6.19425 16.7365C5.66092 16.0852 5.24525 15.3583 4.94725 14.556C4.64908 13.7535 4.5 12.8983 4.5 11.9905C4.5 9.89933 5.2285 8.12817 6.6855 6.677C8.14267 5.22567 9.91733 4.5 12.0095 4.5H17.6923C18.1894 4.5 18.615 4.677 18.969 5.031C19.323 5.385 19.5 5.81058 19.5 6.30775V11.9905C19.5 14.0827 18.7743 15.8573 17.323 17.3145C15.8718 18.7715 14.1007 19.5 12.0095 19.5Z"
              fill="#0D542B"
            />
          </svg>
          <span className="text-[14px] sm:text-[16px] md:text-[17px] font-medium">
            We promote <strong className="font-bold">sustainable</strong> growth and{" "}
            <strong className="font-bold">empower</strong> local producers worldwide
          </span>
        </div>
      </div>

      {/* 3. KOYU KURUMSAL FOOTER GÖVDESİ */}
      <div className="w-full bg-[#061D21] text-white pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Masaüstü Navigasyon Izgarası */}
          <div className="hidden md:flex flex-row justify-between gap-8 pb-10 border-b border-[#15343A]">
            <div className="w-1/4 pr-8 border-r-2 border-[#15343A] space-y-4">
              <Link href="/" className="flex items-center gap-2.5 group focus:outline-none">
                <Image
                  src="https://cdn.elonky.com/public/logo/elonky_logo_light.webp"
                  alt="Demoky Spiral Logo"
                  width={36}
                  height={36}
                  priority
                  className="object-contain brightness-110 group-hover:scale-105 transition-transform"
                />
                <span className="text-3xl font-serif font-extrabold tracking-tight text-white group-hover:text-[#A8D97A] transition-colors select-none">
                  Demoky
                </span>
              </Link>
              <p className="text-xs sm:text-sm text-[#9CA8AA] leading-relaxed">
                Global marketplace connecting local producers with the world.
              </p>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.id} className="space-y-3">
                <div className="space-y-1.5">
                  <h4 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-white">
                    {col.title}
                  </h4>
                  <div className="w-8 h-0.5 bg-[#A8D97A]" />
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {renderFooterLink(link, "hover:text-white")}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobil Görünüm: Akordeon Menüler (Aynı FOOTER_COLUMNS verisinden beslenir) */}
          <div className="md:hidden space-y-3 pb-8 border-b border-[#15343A]">
            <div className="text-center pb-4">
              <Link href="/" className="inline-flex items-center gap-2.5 justify-center group focus:outline-none">
                <Image
                  src="https://cdn.elonky.com/public/logo/elonky_logo_light.webp"
                  alt="Demoky Spiral Logo"
                  width={32}
                  height={32}
                  className="object-contain brightness-110"
                />
                <span className="text-2xl font-serif font-extrabold tracking-tight text-white select-none">
                  Demoky
                </span>
              </Link>
              <p className="text-xs text-[#9CA8AA] mt-2">
                Global marketplace connecting local producers with the world.
              </p>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <details
                key={col.id}
                className="group border border-[#15343A] rounded-xl overflow-hidden bg-[#0a2327]"
              >
                <summary className="list-none flex items-center justify-between p-3.5 cursor-pointer text-sm font-semibold text-white group-open:bg-[#123338]">
                  <span>{col.title}</span>
                  <ChevronDown className="w-4 h-4 text-gray-300 group-open:rotate-180 transition-transform duration-200" />
                </summary>
                <div className="p-3.5 space-y-2 text-xs text-gray-300 border-t border-[#15343A]">
                  {col.links.map((link) => (
                    <div key={link.label}>
                      {renderFooterLink(link, "block hover:text-white")}
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>

          {/* 4. ALT ARAÇ ÇUBUĞU (Ödeme, Sosyal Medya & Ülke Seçici) */}
          <div className="pt-6 pb-6 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center flex-wrap gap-3 justify-center md:justify-start">
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0d2a2f] border border-[#1b3e44] text-xs font-semibold text-white hover:border-[#A8D97A] transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-gray-300" />
                <span>Türkiye</span>
              </button>

              <PaymentBadges />
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <a
                href="https://www.instagram.com/demokycom"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#0d2a2f] border border-[#1b3e44] flex items-center justify-center hover:text-white hover:border-[#A8D97A] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@Demokycom"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#0d2a2f] border border-[#1b3e44] flex items-center justify-center hover:text-white hover:border-[#A8D97A] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#0d2a2f] border border-[#1b3e44] flex items-center justify-center hover:text-white hover:border-[#A8D97A] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#0d2a2f] border border-[#1b3e44] flex items-center justify-center hover:text-white hover:border-[#A8D97A] transition-colors text-xs font-bold"
                aria-label="Pinterest"
              >
                P
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#0d2a2f] border border-[#1b3e44] flex items-center justify-center hover:text-white hover:border-[#A8D97A] transition-colors text-xs font-bold"
                aria-label="TikTok"
              >
                ♪
              </a>
            </div>
          </div>

          {/* 5. TELİF & YASAL SÖZLEŞMELER */}
          <div className="border-t border-[#15343A] pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9CA8AA]">
            <p>© 2026 Demoky. All rights reserved.</p>

            <div className="flex items-center gap-3 flex-wrap justify-center">
              {LEGAL_LINKS.map((item, idx) => (
                <React.Fragment key={item.href}>
                  {idx > 0 && <span>|</span>}
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
