"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Store, Heart, ShoppingBag, Globe } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMobileMenuOpen, setSellerModalOpen } from "@/store/slices/uiSlice";
import { openCart } from "@/store/slices/cartSlice";
import { MAIN_NAV_CATEGORIES, FEATURED_NAV_COLLECTIONS } from "@/data/categories";

/**
 * Mobil Gezinme Menüsü (Mobile Slide-over Drawer)
 */
export function MobileMenu() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);
  const cartCount = useAppSelector((state) => state.cart.totalQuantity);
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") dispatch(setMobileMenuOpen(false));
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden md:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => dispatch(setMobileMenuOpen(false))}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col">
          <div className="px-5 py-4 border-b border-elonky-surface-border flex items-center justify-between">
            <Link
              href="/"
              onClick={() => dispatch(setMobileMenuOpen(false))}
              className="text-xl font-bold tracking-tight text-elonky-dark-900 flex items-center gap-1"
            >
              <span className="text-elonky-brand">demoky</span>
              <span className="text-xs text-elonky-brand font-mono">.com</span>
            </Link>
            <button
              type="button"
              onClick={() => dispatch(setMobileMenuOpen(false))}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-full"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-elonky-surface-muted border-b border-elonky-surface-border space-y-2">
            <button
              type="button"
              onClick={() => {
                dispatch(setMobileMenuOpen(false));
                dispatch(setSellerModalOpen(true));
              }}
              className="w-full py-2.5 px-3 bg-white border border-elonky-dark-900 rounded-elonky text-xs font-semibold text-elonky-dark-900 hover:bg-elonky-dark-900 hover:text-white transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Store className="w-4 h-4 text-elonky-brand" />
              <span>Sell on Demoky</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => dispatch(setMobileMenuOpen(false))}
                className="py-2 px-3 bg-white rounded-md border border-gray-200 text-xs text-elonky-dark-800 flex items-center justify-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-gray-500" />
                <span>Favorites ({wishlistCount})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  dispatch(setMobileMenuOpen(false));
                  dispatch(openCart());
                }}
                className="py-2 px-3 bg-white rounded-md border border-gray-200 text-xs text-elonky-dark-800 flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-elonky-brand" />
                <span>Cart ({cartCount})</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            <div>
              <h4 className="text-[11px] font-bold text-elonky-text-muted uppercase tracking-wider mb-2">
                Featured Collections
              </h4>
              <div className="space-y-1">
                {FEATURED_NAV_COLLECTIONS.map((col) => (
                  <Link
                    key={col.id}
                    href={col.href}
                    onClick={() => dispatch(setMobileMenuOpen(false))}
                    className="block py-2 text-xs font-medium text-elonky-dark-900 hover:text-elonky-brand"
                  >
                    {col.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-bold text-elonky-text-muted uppercase tracking-wider mb-2">
                All Categories
              </h4>
              <div className="space-y-1">
                {MAIN_NAV_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.href}
                    onClick={() => dispatch(setMobileMenuOpen(false))}
                    className="block py-2 text-xs text-gray-600 hover:text-elonky-brand"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-elonky-surface-border bg-gray-50 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>United States • USD ($)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
