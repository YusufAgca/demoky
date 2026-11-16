"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Play,
  ShoppingCart,
  Eye,
  Check,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { Product } from "@/types";
import { cn, hasActiveDiscount, getEffectivePrice } from "@/lib/utils";

interface CuratedProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

/**
 * Tekil Küratörlü Ürün Kartı (İç Görsel Galerisi, Hover Video ve Hızlı Aksiyonlar)
 * 
 * Mimari Açıklama:
 * - Kart içi çoklu görsel geçiş okları, hover durumunda otomatik oynayan kısa video,
 *   "Add to Cart" ve "Quick View" aksiyon butonlarını barındırır.
 * - `hasActiveDiscount` ile yalnızca gerçek indirimli ürünlerde üstü çizili fiyat gösterir.
 */
export function CuratedProductCard({ product, onQuickView }: CuratedProductCardProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isFavorited = wishlistItems.some((w) => w.id === product.id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const addedTimerRef = useRef<NodeJS.Timeout | null>(null);

  const images =
    product.images && product.images.length > 0 ? product.images : [product.image];
  const activeImage = images[currentImageIndex] || product.image;
  const isDiscounted = hasActiveDiscount(product.price, product.discountedPrice);
  const effectivePrice = getEffectivePrice(product.price, product.discountedPrice);

  useEffect(() => {
    return () => {
      if (addedTimerRef.current) clearTimeout(addedTimerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.videoUrl && videoRef.current && currentImageIndex === 0) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (product.videoUrl && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem({ product, quantity: 1 }));
    setJustAdded(true);
    if (addedTimerRef.current) clearTimeout(addedTimerRef.current);
    addedTimerRef.current = setTimeout(() => setJustAdded(false), 1200);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden focus:outline-none"
    >
      {/* 1. Ürün Medya Kapsayıcısı */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
        <Link href={`/product/${product.link}`} className="block w-full h-full relative">
          <Image
            src={activeImage}
            alt={product.title}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered && !product.videoUrl && "scale-105"
            )}
            sizes="(max-width: 640px) 50vw, 25vw"
          />

          {/* Hover'da Oynatılan Kısa Video */}
          {product.videoUrl && (
            <video
              ref={videoRef}
              src={product.videoUrl}
              muted
              loop
              playsInline
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none",
                isHovered && currentImageIndex === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            />
          )}
        </Link>

        {/* Sağ Üst Kalp / Favori Butonu */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(toggleWishlist(product));
          }}
          className={cn(
            "absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-20 shadow-sm",
            isFavorited
              ? "bg-rose-50 text-rose-500"
              : "bg-white/80 hover:bg-white text-gray-600 hover:text-rose-500"
          )}
          aria-label="Wishlist"
        >
          <Heart className={cn("w-4 h-4", isFavorited && "fill-rose-500 text-rose-500")} />
        </button>

        {/* Sağ Alt Video Rozeti */}
        {product.hasVideo && !isHovered && (
          <span className="pointer-events-none absolute bottom-3 right-3 z-20 hidden h-8.5 w-8.5 items-center justify-center rounded-full bg-white text-gray-900 shadow-md md:flex group-hover:opacity-0 transition-opacity">
            <Play className="w-3.5 h-3.5 fill-gray-900 ml-0.5" />
          </span>
        )}

        {/* Kart İçerisinde Sağ-Sol Görsel Geçiş Okları */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              className={cn(
                "pointer-events-auto cursor-pointer absolute left-2.5 top-1/2 z-20 hidden h-8.5 w-8.5 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-all duration-200 hover:bg-black/70 hover:text-white focus-visible:outline-none md:flex active:scale-95",
                isHovered
                  ? "visible opacity-100"
                  : "invisible opacity-0 group-hover:visible group-hover:opacity-100"
              )}
              aria-label="Previous image"
              title="Previous image"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={handleNextImage}
              className={cn(
                "pointer-events-auto cursor-pointer absolute right-2.5 top-1/2 z-20 hidden h-8.5 w-8.5 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-all duration-200 hover:bg-black/70 hover:text-white focus-visible:outline-none md:flex active:scale-95",
                isHovered
                  ? "visible opacity-100"
                  : "invisible opacity-0 group-hover:visible group-hover:opacity-100"
              )}
              aria-label="Next image"
              title="Next image"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Galeri İndikatör Noktaları */}
            <div
              className={cn(
                "absolute bottom-16 inset-x-0 z-20 flex justify-center gap-1 transition-opacity pointer-events-none",
                isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}
            >
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    idx === currentImageIndex ? "w-3 bg-white shadow-sm" : "w-1.5 bg-white/60"
                  )}
                />
              ))}
            </div>
          </>
        )}

        {/* Kart Altı Hover Aksiyon Butonları: "Add to Cart" & "Quick View" */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-20 hidden transition-opacity duration-300 md:block",
            isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 pointer-events-auto">
            <button
              type="button"
              onClick={handleAddToCart}
              className={cn(
                "flex items-center justify-center gap-1.5 px-2 h-11 flex-1 rounded-md text-[13px] font-medium shadow-md transition-colors cursor-pointer disabled:cursor-not-allowed",
                justAdded
                  ? "bg-[#108239] text-white hover:bg-[#0e7031]"
                  : "bg-black text-white hover:bg-black/90 active:scale-95"
              )}
              aria-label="Add to cart"
              title="Add to cart"
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 text-current" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 text-current" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleOpenQuickView}
              className="flex cursor-pointer px-2 h-11 flex-1 items-center justify-center gap-1.5 rounded-md bg-white text-[13px] font-medium text-gray-900 shadow-md transition-colors hover:bg-gray-50 active:scale-95"
              aria-label="Quick View"
              title="Quick View"
            >
              <Eye className="w-4 h-4 text-current" />
              <span>Quick View</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Ürün Bilgi Alanı */}
      <div className="pt-2.5 flex flex-col">
        <Link href={`/product/${product.link}`}>
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-elonky-brand line-clamp-1 transition-colors">
            {product.title}
          </h3>
        </Link>

        <span className="text-[11px] text-gray-500 mt-0.5">
          {product.sellerName || "ArtisanStudio"}
        </span>

        {/* Fiyat ve İndirim (hasActiveDiscount ile yalnızca gerçek indirim varsa çizili fiyat gösterir) */}
        <div className="flex items-baseline gap-1.5 mt-1">
          <span
            className={cn(
              "text-xs sm:text-sm font-extrabold",
              isDiscounted ? "text-[#0D542B]" : "text-gray-900"
            )}
          >
            ${effectivePrice}
          </span>
          {isDiscounted && (
            <>
              <span className="text-[11px] text-gray-400 line-through">
                ${product.price}
              </span>
              {product.discountPercentage && (
                <span className="text-[10px] text-emerald-700 font-semibold">
                  ({product.discountPercentage}% Off)
                </span>
              )}
            </>
          )}
        </div>

        {product.isFreeShipping && (
          <span className="text-[10px] text-gray-500 mt-0.5 font-medium">
            Free Shipping
          </span>
        )}
      </div>
    </div>
  );
}
