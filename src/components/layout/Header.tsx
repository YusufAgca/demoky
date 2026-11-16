"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, Heart, ShoppingBag, Store, ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMobileMenuOpen, setSellerModalOpen } from "@/store/slices/uiSlice";
import { openCart } from "@/store/slices/cartSlice";
import { SearchBar } from "./SearchBar";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { MAIN_NAV_CATEGORIES, FEATURED_NAV_COLLECTIONS } from "@/data/categories";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";

const SCROLL_DOWN_HIDE_THRESHOLD = 50;
const SCROLL_UP_SHOW_THRESHOLD = 20;
const TOP_SAFE_OFFSET = 30;
const MIN_HIDE_SCROLL_Y = 100;

/**
 * 1:1 Elonky Sticky Header Bileşeni
 * 
 * Mimari Açıklama:
 * - `useClickOutside` hook'u ile Mega Menü dış tıklama ve Escape yönetimi.
 * - Akümüle delta eşikli kaydırma dinleyicisi ile titreşimsiz kategori satırı gizleme/gösterme.
 * - Koleksiyon linkleri üzerinde soldan sağa doğru akan hover animasyon çizgisi.
 */
export function Header() {
  const dispatch = useAppDispatch();
  const cartTotalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
  const [showCategoryNav, setShowCategoryNav] = useState(true);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(megaMenuRef, () => setIsAllCategoriesOpen(false));

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let accumulatedDelta = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY <= TOP_SAFE_OFFSET) {
        setShowCategoryNav(true);
        accumulatedDelta = 0;
        lastScrollY = currentScrollY;
        return;
      }

      if ((delta > 0 && accumulatedDelta < 0) || (delta < 0 && accumulatedDelta > 0)) {
        accumulatedDelta = 0;
      }
      accumulatedDelta += delta;

      if (accumulatedDelta > SCROLL_DOWN_HIDE_THRESHOLD && currentScrollY > MIN_HIDE_SCROLL_Y) {
        setShowCategoryNav(false);
        setIsAllCategoriesOpen(false);
        accumulatedDelta = 0;
      } else if (accumulatedDelta < -SCROLL_UP_SHOW_THRESHOLD) {
        setShowCategoryNav(true);
        accumulatedDelta = 0;
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* 1. ÜST SATIR (Logo, Arama Çubuğu, Aksiyonlar) */}
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          <Link href="/" className="flex items-baseline focus:outline-none">
            <span className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight text-elonky-brand">
              Demoky
            </span>
          </Link>

          <div className="hidden md:flex flex-1 justify-center px-4 lg:px-8">
            <SearchBar />
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => dispatch(setSellerModalOpen(true))}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-black hover:bg-neutral-800 text-white rounded-full text-xs font-semibold transition-all shadow-sm"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Sell on Demoky</span>
            </button>

            <span className="hidden sm:inline-block text-gray-300 text-sm">|</span>

            <button
              type="button"
              className="hidden sm:inline-block text-xs font-semibold text-gray-900 hover:text-elonky-brand transition-colors"
            >
              Sign in
            </button>

            <div className="hidden sm:block">
              <NotificationsDropdown />
            </div>

            <button
              type="button"
              className="relative p-2 text-gray-900 hover:text-elonky-brand rounded-full transition-colors hidden sm:block"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5 stroke-[2]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => dispatch(openCart())}
              className="relative p-2 text-gray-900 hover:text-elonky-brand rounded-full transition-colors hidden sm:block"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2]" />
              {cartTotalQuantity > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-elonky-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartTotalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MOBİL 2. SATIR: Hamburger & Arama */}
        <div className="flex items-center gap-3 pb-3 md:hidden">
          <button
            type="button"
            onClick={() => dispatch(setMobileMenuOpen(true))}
            className="p-1.5 text-gray-900 hover:text-elonky-brand transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 stroke-[2]" />
          </button>
          <div className="flex-1">
            <SearchBar />
          </div>
        </div>

        {/* 2. MASAÜSTÜ KATEGORİ & KOLEKSİYON SATIRI */}
        <div
          className={cn(
            "hidden md:flex items-center gap-8 text-sm font-medium text-gray-800 transition-all duration-300 ease-in-out",
            showCategoryNav
              ? "max-h-16 h-[50px] opacity-100 border-t border-gray-100 overflow-visible pointer-events-auto"
              : "max-h-0 h-0 opacity-0 border-t-0 overflow-hidden pointer-events-none -translate-y-1"
          )}
        >
          <div ref={megaMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setIsAllCategoriesOpen((prev) => !prev)}
              aria-expanded={isAllCategoriesOpen}
              aria-haspopup="true"
              className="flex items-center gap-1.5 py-1 text-sm text-gray-900 font-semibold hover:text-elonky-brand transition-colors"
            >
              <Menu className="w-4 h-4" />
              <span>All Categories</span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-gray-500 transition-transform duration-200",
                  isAllCategoriesOpen && "rotate-180"
                )}
              />
            </button>

            {isAllCategoriesOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl border border-gray-200 shadow-dropdown p-2 z-50 animate-in fade-in-50 duration-150">
                <div className="max-h-80 overflow-y-auto no-scrollbar space-y-0.5">
                  {MAIN_NAV_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={cat.href}
                      onClick={() => setIsAllCategoriesOpen(false)}
                      className="px-3 py-2 text-xs text-gray-800 hover:bg-gray-50 hover:text-elonky-brand rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-gray-400">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-8">
            {FEATURED_NAV_COLLECTIONS.map((col) => (
              <Link
                key={col.id}
                href={col.href}
                className="group relative py-1 text-sm font-medium text-gray-700 hover:text-elonky-brand transition-colors whitespace-nowrap focus:outline-none"
              >
                <span>{col.name}</span>
                {/* Soldan sağa doğru akan hover animasyon çizgisi */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-elonky-brand rounded-full transition-all duration-300 ease-out group-hover:w-full pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
