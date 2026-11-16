"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeCart,
  removeItem,
  updateQuantity,
  clearCart,
} from "@/store/slices/cartSlice";
import { formatPrice, hasActiveDiscount, getEffectivePrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 50;
const WELCOME_CREDIT_AMOUNT = 11;
const STANDARD_SHIPPING_FEE = 4.99;

/**
 * Sağdan Kayan Sepet Çekmecesi (Cart Drawer / Slide-over)
 */
export function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, isOpen, totalQuantity, totalAmount } = useAppSelector(
    (state) => state.cart
  );

  // Escape tuşuna basıldığında çekmeceyi kapatma
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") dispatch(closeCart());
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalAmount);
  const freeShippingProgress = Math.min(
    100,
    (totalAmount / FREE_SHIPPING_THRESHOLD) * 100
  );
  const shippingCost = remainingForFreeShipping === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const estimatedTotal = Math.max(
    0,
    totalAmount - WELCOME_CREDIT_AMOUNT + shippingCost
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Cart">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => dispatch(closeCart())}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Çekmece Başlığı */}
          <div className="px-6 py-4 border-b border-elonky-surface-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-elonky-brand" />
              <h2 className="text-lg font-semibold text-elonky-dark-900">
                Shopping Cart ({totalQuantity})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => dispatch(closeCart())}
              className="p-2 text-elonky-text-muted hover:text-elonky-dark-900 rounded-full hover:bg-elonky-surface-subtle transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Kargo İlerleme Çubuğu */}
          <div className="px-6 py-3 bg-elonky-surface-muted border-b border-elonky-surface-border text-xs">
            {remainingForFreeShipping === 0 ? (
              <span className="font-medium text-emerald-700 flex items-center gap-1.5">
                🎉 Congratulations! You unlocked <strong className="font-bold">FREE Shipping</strong>!
              </span>
            ) : (
              <p className="text-elonky-text-secondary">
                Add{" "}
                <strong className="font-bold text-elonky-brand">
                  {formatPrice(remainingForFreeShipping)}
                </strong>{" "}
                more to get <strong className="text-elonky-dark-900">FREE Shipping</strong>!
              </p>
            )}
            <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-elonky-brand transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Sepet İçeriği */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-elonky-surface-border">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-elonky-brand/10 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-elonky-brand" />
                </div>
                <h3 className="text-base font-semibold text-elonky-dark-900">
                  Your cart is empty
                </h3>
                <p className="text-xs text-elonky-text-muted mt-1 max-w-xs">
                  Looks like you haven&apos;t added any handmade items yet. Explore our curated collections!
                </p>
                <button
                  type="button"
                  onClick={() => dispatch(closeCart())}
                  className="mt-6 px-6 py-2.5 rounded-elonky bg-elonky-brand text-white text-xs font-medium hover:bg-elonky-brand-hover transition-colors shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => {
                const isDiscounted = hasActiveDiscount(
                  item.product.price,
                  item.product.discountedPrice
                );
                const unitPrice = getEffectivePrice(
                  item.product.price,
                  item.product.discountedPrice
                );

                return (
                  <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-elonky-surface-border">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-xs font-medium text-elonky-dark-900 line-clamp-2 leading-snug">
                            {item.product.title}
                          </h4>
                          <button
                            type="button"
                            onClick={() => dispatch(removeItem(item.product.id))}
                            className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                            aria-label={`Remove ${item.product.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-elonky-brand">
                            {formatPrice(unitPrice)}
                          </span>
                          {isDiscounted && (
                            <span className="text-[11px] text-gray-400 line-through">
                              {formatPrice(item.product.price)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  productId: item.product.id,
                                  quantity: item.quantity - 1,
                                })
                              )
                            }
                            className="p-1.5 hover:bg-gray-100 text-gray-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-elonky-dark-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  productId: item.product.id,
                                  quantity: item.quantity + 1,
                                })
                              )
                            }
                            className="p-1.5 hover:bg-gray-100 text-gray-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-semibold text-elonky-dark-900">
                          {formatPrice(unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Alt Bölüm (Checkout & Subtotal) */}
          {items.length > 0 && (
            <div className="border-t border-elonky-surface-border p-6 bg-elonky-surface-muted space-y-4">
              <div className="flex justify-between items-center text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-md">
                <span>Welcome Credit</span>
                <span className="font-bold">-{formatPrice(WELCOME_CREDIT_AMOUNT)} AUTO-APPLIED</span>
              </div>

              <div className="space-y-1.5 text-xs text-elonky-text-secondary">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-elonky-dark-900">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-700 font-medium">
                    {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-elonky-dark-900 pt-2 border-t border-gray-200">
                  <span>Estimated Total</span>
                  <span className="text-elonky-brand text-base">
                    {formatPrice(estimatedTotal)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full py-3.5 px-4 bg-elonky-brand hover:bg-elonky-brand-hover text-white rounded-elonky font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => dispatch(clearCart())}
                className="w-full text-center text-xs text-elonky-text-muted hover:text-red-600 transition-colors"
              >
                Clear cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
