"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { cn, formatPrice, hasActiveDiscount, getEffectivePrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

/**
 * 1:1 Elonky Ürün Kartı Bileşeni (Product Card Component)
 * 
 * Mimari Açıklama:
 * - Redux Toolkit entegrasyonu (Sepete ekleme & Favori durumu).
 * - `hasActiveDiscount` ile yalnızca gerçek indirimli ürünlerde üstü çizili fiyat gösterir.
 */
export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const cartItems = useAppSelector((state) => state.cart.items);

  const isFavorited = wishlistItems.some((item) => item.id === product.id);
  const isInCart = cartItems.some((item) => item.product.id === product.id);
  const isDiscounted = hasActiveDiscount(product.price, product.discountedPrice);
  const effectivePrice = getEffectivePrice(product.price, product.discountedPrice);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem({ product, quantity: 1 }));
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-xl border border-elonky-surface-border overflow-hidden hover:shadow-card transition-all duration-300">
      <Link href={`/product/${product.link}`} className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 block">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* İndirim ve Kargo Rozetleri */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discountPercentage && product.discountPercentage > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-elonky-brand text-white shadow-sm tracking-wide">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isFreeShipping && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-elonky-accent-greenBright text-elonky-dark-900 shadow-sm">
              FREE SHIPPING
            </span>
          )}
        </div>

        {/* Favori Butonu */}
        <button
          type="button"
          onClick={handleToggleFavorite}
          className={cn(
            "absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-sm",
            isFavorited
              ? "bg-rose-50 text-rose-500"
              : "bg-white/80 hover:bg-white text-gray-600 hover:text-rose-500"
          )}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("w-4 h-4", isFavorited && "fill-rose-500 text-rose-500")} />
        </button>

        {/* Masaüstü Hover Hızlı Sepete Ekle Butonu */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hidden sm:block">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-2 px-3 rounded-lg bg-elonky-dark-900 hover:bg-elonky-brand text-white text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            {isInCart ? (
              <Check className="w-3.5 h-3.5 text-elonky-accent-greenBright" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5" />
            )}
            <span>{isInCart ? "In Cart (Add +1)" : "Quick Add"}</span>
          </button>
        </div>
      </Link>

      {/* Ürün Bilgileri */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {product.sellerName && (
            <span className="text-[11px] font-medium text-elonky-text-muted hover:text-elonky-dark-900 transition-colors block mb-1">
              {product.sellerName}
            </span>
          )}

          <Link href={`/product/${product.link}`} className="block">
            <h3 className="text-xs sm:text-sm font-medium text-elonky-dark-900 hover:text-elonky-brand line-clamp-2 leading-snug transition-colors">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="mt-2.5 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1 text-[11px] text-elonky-text-muted mb-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
            </div>
            <span className="font-semibold text-elonky-dark-900">{product.rating || "4.8"}</span>
            <span>({product.reviewsCount || "28"})</span>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-extrabold text-elonky-brand">
                {formatPrice(effectivePrice)}
              </span>
              {isDiscounted && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="sm:hidden p-1.5 rounded-full bg-elonky-surface-muted hover:bg-elonky-brand hover:text-white text-elonky-dark-900 transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
