"use client";

import React from "react";

/**
 * Kurumsal Footer Ödeme Sağlayıcı Rozetleri (Payment Method Badges)
 * 
 * Mimari Açıklama:
 * - Orijinal marka renk ve tipografilerini yansıtan SVG/HTML mikro-rozetler.
 * - Yüksek kontrast, standartlaştırılmış yükseklik (24px) ve koyu petrol footer zemininde
 *   mükemmel okunabilirlik sağlar.
 */
export function PaymentBadges() {
  return (
    <div className="flex items-center gap-1.5 flex-wrap" aria-label="Supported Payment Methods">
      {/* 1. VISA */}
      <div
        className="h-6 px-2 bg-white rounded flex items-center justify-center shadow-xs select-none"
        title="Visa"
      >
        <span className="font-black italic text-[#1434CB] text-[11px] tracking-tight leading-none">
          VISA
        </span>
      </div>

      {/* 2. Mastercard */}
      <div
        className="h-6 px-2 bg-white rounded flex items-center justify-center shadow-xs select-none"
        title="Mastercard"
      >
        <svg className="w-6 h-4" viewBox="0 0 32 20" fill="none" aria-hidden="true">
          <circle cx="11" cy="10" r="9" fill="#EB001B" />
          <circle cx="21" cy="10" r="9" fill="#F79E1B" fillOpacity="0.88" />
        </svg>
      </div>

      {/* 3. AMEX */}
      <div
        className="h-6 px-2 bg-[#006FCF] rounded flex items-center justify-center shadow-xs select-none"
        title="American Express"
      >
        <span className="font-extrabold text-white text-[9px] tracking-tight leading-none">
          AMEX
        </span>
      </div>

      {/* 4. PayPal */}
      <div
        className="h-6 px-2 bg-white rounded flex items-center justify-center shadow-xs select-none"
        title="PayPal"
      >
        <span className="font-black italic text-[10px] tracking-tight leading-none">
          <span className="text-[#003087]">Pay</span>
          <span className="text-[#0079C1]">Pal</span>
        </span>
      </div>

      {/* 5. Klarna */}
      <div
        className="h-6 px-2 bg-[#FFB3C7] rounded flex items-center justify-center shadow-xs select-none"
        title="Klarna"
      >
        <span className="font-bold text-black text-[9px] tracking-tight leading-none">
          Klarna.
        </span>
      </div>

      {/* 6. Apple Pay */}
      <div
        className="h-6 px-2 bg-white rounded flex items-center justify-center shadow-xs select-none"
        title="Apple Pay"
      >
        <svg
          className="w-3.5 h-3.5 text-black fill-current mr-0.5"
          viewBox="0 0 170 170"
          aria-hidden="true"
        >
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-5.77-8.73-10.23-18.73-13.39-30.01-3.15-11.28-4.73-22.19-4.73-32.74 0-14.88 3.73-27.18 11.2-36.9 7.47-9.72 16.89-14.67 28.27-14.85 4.8 0 10.12 1.34 15.96 4.02 5.84 2.68 9.63 4.08 11.37 4.19 1.36-.21 5.37-1.74 12.04-4.59 6.67-2.85 12.35-4.06 17.03-3.63 13.06 1.07 23.36 5.89 30.9 14.46-11.45 6.94-17.07 16.64-16.86 29.1.21 9.8 4.08 17.99 11.6 24.58 7.52 6.59 16.48 10.22 26.88 10.9-2.12 6.33-4.59 12.51-7.42 18.53zM119.22 31.84c0-7.39 2.68-14.36 8.04-20.91 5.36-6.55 12.06-10.51 20.1-11.89.21 1.07.32 2.14.32 3.21 0 7.39-2.79 14.39-8.36 21.01-5.57 6.62-12.44 10.54-20.61 11.76-.11-1.07-.16-2.14-.16-3.18z" />
        </svg>
        <span className="font-semibold text-black text-[10px] tracking-tight leading-none">
          Pay
        </span>
      </div>

      {/* 7. Google Pay */}
      <div
        className="h-6 px-2 bg-white rounded flex items-center justify-center shadow-xs select-none"
        title="Google Pay"
      >
        <span className="font-bold text-[10px] tracking-tight leading-none flex items-center gap-0.5">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#5F6368] font-semibold">Pay</span>
        </span>
      </div>
    </div>
  );
}
