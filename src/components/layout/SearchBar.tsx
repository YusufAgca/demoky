"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { SEARCH_COLLECTIONS } from "@/data/categories";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";

/**
 * 1:1 Elonky Arama Çubuğu Bileşeni (Search Bar with Orange Tone Ring & Collections Dropdown)
 * 
 * Mimari Açıklama:
 * - Arama kutusuna tıklandığında (focus):
 *   1. Searchbar çerçevesi turuncu ton renk alır (`border-elonky-brand ring-4 ring-elonky-brand/15`).
 *   2. Header alanı `z-50` ile %100 bembeyaz kalırken, `document.body` üzerine portal ile açılan
 *      backdrop (`z-40 bg-black/40`) sadece sayfanın geri kalanını karartır.
 *   3. Searchbar altında "Collections" başlığıyla görselli koleksiyon kartları listelenir.
 */
export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      {isOpen &&
        mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-200 pointer-events-auto"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />,
          document.body
        )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsOpen(false);
        }}
        className="relative flex items-center w-full z-10"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for anything from local to global"
          className={cn(
            "w-full h-11 pl-5 pr-14 bg-white rounded-full text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none",
            isOpen
              ? "border-2 border-elonky-brand ring-4 ring-elonky-brand/15 shadow-sm"
              : "border border-gray-900 focus:ring-1 focus:ring-gray-900"
          )}
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-12 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
            aria-label="Clear search query"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-elonky-brand hover:bg-elonky-brand-hover text-white flex items-center justify-center transition-colors shadow-sm"
          aria-label="Search"
        >
          <Search className="w-4 h-4 stroke-[2.5]" />
        </button>
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-100 shadow-[0_12px_36px_rgba(0,0,0,0.12)] p-4 z-50 animate-in fade-in-50 duration-150">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Collections
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-1 pt-0.5">
            {SEARCH_COLLECTIONS.map((col) => (
              <Link
                key={col.id}
                href={col.href}
                onClick={() => setIsOpen(false)}
                className="w-24 sm:w-28 flex-shrink-0 group flex flex-col items-center text-center focus:outline-none"
              >
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    sizes="(max-width: 640px) 96px, 112px"
                    className="object-cover"
                  />
                </div>
                <span className="mt-2 text-[11px] sm:text-xs font-medium text-gray-800 group-hover:text-elonky-brand transition-colors line-clamp-1">
                  {col.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
