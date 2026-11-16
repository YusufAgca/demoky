import React from "react";

/**
 * 1:1 Elonky Hoş Geldin Kampanyası Hareketli Market Arabası SVG İllüstrasyonu
 * 
 * Mimari Açıklama:
 * PromoRibbonBanner içerisinden tek sorumluluk prensibi (SRP) gereği ayrıştırılmıştır.
 * İçerisinde hareketli çanta (`animate-bag-settle`), hediye kutusu (`animate-gift-settle`)
 * ve dönen tekerlek (`animate-wheel-roll`) katmanlarını barındırır.
 */
export function AnimatedWelcomeCartSvg() {
  return (
    <div className="relative w-44 sm:w-52 h-32 sm:h-36 animate-cart-roll">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="24 -2 222 182"
        className="w-full h-full overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="eb-bag" x1="70" y1="42" x2="120" y2="113" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffbf35" />
            <stop offset=".5" stopColor="#ff9a13" />
            <stop offset="1" stopColor="#ed6c08" />
          </linearGradient>
          <linearGradient id="eb-bag-side" x1="51" y1="52" x2="77" y2="112" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff990c" />
            <stop offset="1" stopColor="#e9650a" />
          </linearGradient>
          <linearGradient id="eb-cream" x1="90" y1="65" x2="143" y2="153" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff7e9" />
            <stop offset=".47" stopColor="#ffe3b9" />
            <stop offset="1" stopColor="#ffc58f" />
          </linearGradient>
          <linearGradient id="eb-rim" x1="52" y1="78" x2="201" y2="83" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffe5c7" />
            <stop offset=".5" stopColor="#fff8e9" />
            <stop offset="1" stopColor="#ffe8cb" />
          </linearGradient>
          <linearGradient id="eb-gift" x1="141" y1="61" x2="181" y2="113" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fffdf2" />
            <stop offset="1" stopColor="#ffe1bb" />
          </linearGradient>
          <linearGradient id="eb-orange" x1="145" y1="45" x2="179" y2="116" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff8d12" />
            <stop offset=".6" stopColor="#ff4d08" />
            <stop offset="1" stopColor="#d73b06" />
          </linearGradient>
          <linearGradient id="eb-handle" x1="196" y1="24" x2="230" y2="29" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff9d23" />
            <stop offset=".5" stopColor="#ff7210" />
            <stop offset="1" stopColor="#ec4d08" />
          </linearGradient>
          <radialGradient id="eb-wheel">
            <stop stopColor="#505853" />
            <stop offset=".52" stopColor="#3c423c" />
            <stop offset="1" stopColor="#202721" />
          </radialGradient>
        </defs>

        {/* Zemin Gölgesi */}
        <ellipse cx="131" cy="167" rx="73" ry="5" fill="#b87646" opacity=".16" />

        {/* Arka Tekerlek & Alt Şasi */}
        <ellipse cx="68" cy="151" rx="10" ry="12" fill="#373b32" />
        <ellipse cx="71" cy="151" rx="6" ry="8" fill="#5c6052" />
        <path d="M81 140 88 153 177 151" stroke="#e4a46f" strokeWidth="8" strokeLinecap="round" />

        {/* HAREKETLİ ÇANTA (eb-bag-settle) */}
        <g className="animate-bag-settle">
          <path d="m54 49 14 5 16 65-15-5z" fill="url(#eb-bag-side)" />
          <path d="m68 54 60-13 16 68-60 10z" fill="url(#eb-bag)" />
          <path d="m54 49 60-13 14 5-60 13z" fill="#ffc54c" />
          <path d="M76 52c-10-33-3-45 8-45 13 0 22 17 26 38" stroke="#f1640c" strokeWidth="4.3" strokeLinecap="round" />
          <path d="M85 51C77 21 79 11 89 10c12-1 18 13 23 35" stroke="#ff8c12" strokeWidth="3.7" strokeLinecap="round" />
        </g>

        {/* HAREKETLİ HEDİYE KUTUSU (eb-gift-settle) */}
        <g className="animate-gift-settle">
          <path d="m147 66 42 7-11 45-42-9z" fill="url(#eb-gift)" />
          <path d="m189 73 8-7-11 43-8 9z" fill="#f3c695" />
          <path d="m147 66 8-7 42 7-8 7z" fill="#fff6e5" />
          <path d="m161 68 9 2-11 44-9-2z" fill="url(#eb-orange)" />
          <path d="m141 89 43 9-2 8-43-9z" fill="#ff6310" />
          <path d="M169 65c-22-4-23-18-16-20 9-3 16 9 16 20Zm0 0c4-20 18-23 20-16 3 8-11 15-20 16Z" stroke="url(#eb-orange)" strokeWidth="5.5" strokeLinejoin="round" />
        </g>

        {/* Sepet Metal Telleri & Kolu */}
        <path d="m179 133 34-107 15-2" stroke="#ffcda2" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m193 25 39-3" stroke="url(#eb-handle)" strokeWidth="11" strokeLinecap="round" />
        <path d="m45 78 15 7 19 61-15-6z" fill="#ffca9c" />
        <path d="m59 85 142-20-19 75-103 6z" fill="#fff0d5" fillOpacity=".1" stroke="url(#eb-cream)" strokeWidth="8" strokeLinejoin="round" />
        <path d="m64 105 132-20M71 126l119-17M87 82l11 61m16-65 5 63m23-66-4 65m30-70-12 68" stroke="url(#eb-cream)" strokeWidth="7" strokeLinejoin="round" />
        <path d="m45 78 14 7 143-20" stroke="url(#eb-rim)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />

        {/* DÖNEN TEKERLEK (animate-wheel-roll) */}
        <ellipse cx="100" cy="159" rx="13" ry="14" fill="url(#eb-wheel)" />
        <g transform="translate(102 159)" className="animate-wheel-roll">
          <circle r="6.5" fill="transparent" />
          <path d="M0-5V-2.5M2.4 1.2l2.4 1.2M-2 2l-2.2 2.7" stroke="#a8ad91" strokeWidth="1.2" strokeLinecap="round" opacity=".76" />
        </g>
        <ellipse cx="174" cy="155" rx="13" ry="14" fill="url(#eb-wheel)" />
        <g transform="translate(176 155)" className="animate-wheel-roll">
          <circle r="6.5" fill="transparent" />
          <path d="M0-5V-2.5M2.4 1.2l2.4 1.2M-2 2l-2.2 2.7" stroke="#a8ad91" strokeWidth="1.2" strokeLinecap="round" opacity=".76" />
        </g>
      </svg>
    </div>
  );
}
