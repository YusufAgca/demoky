"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ShoppingCart, Heart, Star, Truck, ShieldCheck, Check } from "lucide-react";
import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { cn, formatPrice, hasActiveDiscount, getEffectivePrice } from "@/lib/utils";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

/**
 * 1:1 Elonky Quick View (Hızlı İnceleme) Modalı
 * 
 * Mimari Açıklama:
 * - Seçilen ürün değiştiğinde (`product?.id`) galeri indeksini ve adedi otomatik sıfırlar.
 * - `Escape` tuşu ile kapatma ve `hasActiveDiscount` ile doğru fiyat gösterimi sunar.
 */
export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Ürün değiştiğinde modal iç durumunu sıfırla
  useEffect(() => {
    setSelectedImageIdx(0);
    setQuantity(1);
    setIsAdded(false);
  }, [product?.id]);

  // Escape tuşu dinleyicisi ve timer temizliği
  useEffect(() => {
    if (!product) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [product, onClose]);

  if (!product) return null;

  const isFavorited = wishlistItems.some((w) => w.id === product.id);
  const images =
    product.images && product.images.length > 0 ? product.images : [product.image];
  const activeImage = images[selectedImageIdx] || product.image;
  const isDiscounted = hasActiveDiscount(product.price, product.discountedPrice);
  const effectivePrice = getEffectivePrice(product.price, product.discountedPrice);

  const handleAddToCart = () => {
    dispatch(addItem({ product, quantity }));
    setIsAdded(true);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-md flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sol Sütun: Görsel Galerisi & Video */}
        <div className="w-full md:w-1/2 bg-gray-50 p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
            {product.videoUrl && selectedImageIdx === 0 ? (
              <video
                src={product.videoUrl}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={activeImage}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}

            {product.discountPercentage && product.discountPercentage > 0 && (
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-[#A0E193] text-[#0D542B] shadow-sm">
                {product.discountPercentage}% OFF
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto max-w-full pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIdx(idx)}
                  className={cn(
                    "relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0",
                    selectedImageIdx === idx
                      ? "border-elonky-brand scale-105"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sağ Sütun: Ürün Detayları & Satın Alma */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span className="font-medium text-elonky-brand underline">
                {product.sellerName || "ArtisanStudio"}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>{product.rating || 4.9}</span>
                <span className="text-gray-400">({product.reviewsCount || 42})</span>
              </div>
            </div>

            <h2
              id="quick-view-title"
              className="text-lg sm:text-xl font-bold text-gray-900 font-serif leading-snug"
            >
              {product.title}
            </h2>

            <div className="flex items-baseline gap-2.5 mt-3">
              <span className="text-2xl font-extrabold text-[#0D542B]">
                {formatPrice(effectivePrice)}
              </span>
              {isDiscounted && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {product.isFreeShipping
                  ? "Free worldwide express shipping on orders over $50"
                  : "Standard insured shipping"}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-2 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>100% Buyer Protection & 30-Day Money Back Guarantee</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-700">Quantity</span>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-gray-900 min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdded}
                className="flex-1 py-3 px-4 rounded-xl bg-elonky-brand hover:bg-elonky-brand-hover text-white text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 disabled:bg-emerald-600"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>
                      Add to Cart • {formatPrice(effectivePrice * quantity)}
                    </span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => dispatch(toggleWishlist(product))}
                className={cn(
                  "p-3 rounded-xl border transition-all",
                  isFavorited
                    ? "bg-rose-50 border-rose-200 text-rose-500"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                )}
                aria-label="Wishlist"
              >
                <Heart className={cn("w-5 h-5", isFavorited && "fill-rose-500 text-rose-500")} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
