# Demoky E-Ticaret Platformu — Mimari ve Teknik Dokümantasyon

Bu doküman, **Demoky** e-ticaret vitrin uygulamasının dosya mimarisini, mühendislik standartlarını ve kullanılan teknolojilerin proje içerisinde nerede ve nasıl uygulandığını açıklar.

---

## 1. Güncel Dizin ve Dosya Mimarisi

Proje; **Sunum (UI)**, **Durum Yönetimi (State & Hooks)** ve **Veri (Data)** katmanlarının birbirinden izole edildiği (Separation of Concerns) modüler bir yapıda kurgulanmıştır:

```text
src/
 ├── app/                                 # Next.js 14 App Router Katmanı
 │    ├── layout.tsx                      # Root Layout, SEO Metadata, Font & Provider sarmalayıcıları
 │    ├── page.tsx                        # Ana Sayfa (Server Component - RSC)
 │    └── globals.css                     # Tailwind CSS direktifleri, tasarım token'ları ve keyframe'ler
 ├── components/
 │    ├── layout/                         # Uygulama İskelet Bileşenleri
 │    │    ├── Header.tsx                 # Akıllı scroll destekli Sticky Header & Mega Menü
 │    │    ├── SearchBar.tsx              # Focus overlay ve görselli "Collections" önerili arama çubuğu
 │    │    ├── CartDrawer.tsx             # Sağdan kayan, kargo barajı hesaplamalı sepet çekmecesi
 │    │    ├── NotificationsDropdown.tsx  # Alt+T kısayol destekli canlı bildirim merkezi
 │    │    ├── MobileMenu.tsx             # Mobil gezinme çekmecesi (Slide-over Drawer)
 │    │    ├── Footer.tsx                 # Kurumsal footer, bülten aboneliği ve akordeon menüler
 │    │    └── PaymentBadges.tsx          # Yüksek kontrastlı vektörel ödeme sağlayıcı rozetleri
 │    ├── home/                           # Ana Sayfa Vitrin Bileşenleri
 │    │    ├── HeroBanner.tsx             # Responsive LCP optimize ana kampanya banner'ı
 │    │    ├── ShopYourStyle.tsx          # 60fps sürükle-kaydır (drag-scroll) dairesel kategori vitrini
 │    │    ├── PromoRibbonBanner.tsx      # 2 slaytlı animasyonlu kampanya ve kupon şeridi
 │    │    ├── AnimatedWelcomeCartSvg.tsx # Kampanya şeridi hareketli SVG market arabası illüstrasyonu
 │    │    ├── DiscountBadgeCarousel.tsx  # Yeniden kullanılabilir indirim rozetli yatay ürün slider'ı
 │    │    ├── MostLovedCategories.tsx    # Tilt & zoom mikro etkileşimli kategori kartları
 │    │    ├── CuratedProductCarousel.tsx # Küratörlü ürün vitrin listesi ve Quick View yöneticisi
 │    │    ├── EditorialSplitBanner.tsx   # Video oynatma destekli editöryal tanıtım alanı
 │    │    └── ValueProps.tsx             # Güven ve hizmet standartları bilgi kartları
 │    ├── product/                        # Ürün Bileşenleri ve Birim Testleri
 │    │    ├── ProductCard.tsx            # Standart ürün kartı (Redux sepet & favori entegrasyonlu)
 │    │    ├── CuratedProductCard.tsx     # Kart içi fotoğraf galerisi ve hover video destekli ürün kartı
 │    │    ├── QuickViewModal.tsx         # Ürün hızlı inceleme ve varyant/miktar seçici modalı
 │    │    └── __tests__/
 │    │         └── ProductCard.test.tsx  # Ürün kartı ve fiyat/indirim mantığı birim testleri
 │    ├── seller/                         # B2B Satıcı Modülleri
 │    │    └── SellerModal.tsx            # Ant Design tabanlı çok adımlı satıcı başvuru formu
 │    └── providers/                      # Global Sağlayıcılar (Providers)
 │         ├── StoreProvider.tsx          # Redux store sağlayıcısı
 │         ├── AntdConfigProvider.tsx     # Ant Design marka teması ve SSR stil kayıt sağlayıcısı
 │         └── ClientSocketListener.tsx   # Gerçek zamanlı bildirim dinleyici sarmalayıcısı
 ├── hooks/                               # Özel React Kancaları (Custom Hooks)
 │    ├── useDragScroll.ts                # useRef tabanlı, sıfır re-render fare ile sürükleme kancası
 │    └── useClickOutside.ts              # Dış tıklama ve Escape tuşu algılama kancası
 ├── store/                               # Redux Toolkit Merkezi Durum Yönetimi
 │    ├── index.ts                        # Store yapılandırması ve RootState / AppDispatch tipleri
 │    ├── hooks.ts                        # Tip güvenli useAppDispatch ve useAppSelector kancaları
 │    └── slices/
 │         ├── cartSlice.ts               # Sepet işlemleri, ücretsiz kargo ve kupon hesaplamaları
 │         ├── wishlistSlice.ts           # Favori ürünler yönetimi
 │         ├── uiSlice.ts                 # Modal, mobil menü ve bildirim durum yönetimi
 │         └── __tests__/
 │              └── cartSlice.test.ts     # Sepet reducer birim testleri
 ├── data/                                # Statik Veri ve İçerik Katmanı (Single Source of Truth)
 │    ├── products.ts                     # Ürün koleksiyonları ve kampanya veri setleri
 │    ├── categories.ts                   # Kategori ağacı, mega menü ve arama koleksiyonları
 │    ├── homeContent.ts                  # Kupon kademeleri, editöryal medya ve değer önerileri
 │    └── footer.ts                       # Masaüstü ve mobil ortak footer navigasyon verisi
 ├── services/                            # Servis ve Gerçek Zamanlı İletişim Katmanı
 │    └── useNotificationSocket.tsx       # WebSocket bildirim akışı simülasyonu
 ├── types/                               # TypeScript Domain Modelleri
 │    └── index.ts                        # Tüm veri yapılarına ait merkezi interface tanımları
 └── lib/                                 # Yardımcı Fonksiyonlar (Utilities)
      └── utils.ts                        # cn(), formatPrice(), getEffectivePrice(), hasActiveDiscount()
```

---

## 2. Teknik Yetkinlikler ve Sistemdeki Uygulama Karşılıkları

### 2.1. Ölçeklenebilir ve Modüler Mimari (Clean Code & SOLID)
* **Katmanlı Ayrıştırma (SoC):** Sayfa şablonu (`src/app/page.tsx`) yalnızca 95 satırdan oluşur ve hiçbir ham veri barındırmaz; tüm içerik `src/data/` katmanından beslenir.
* **DRY (Don't Repeat Yourself):**
  * Aynı yapıyı kullanan *"Cozy Up for Christmas"* ve *"Your Favorite Finds, for Less"* bölümleri tek bir parametrik `DiscountBadgeCarousel.tsx` bileşeninde birleştirilmiştir.
  * Birden fazla bileşende tekrar eden fareyle sürükleme mantığı `useDragScroll.ts` kancasına, dış tıklama/Escape mantığı `useClickOutside.ts` kancasına taşınmıştır.
  * Masaüstü ve mobil footer menüleri `src/data/footer.ts` içindeki tek bir veri kaynağından (`FOOTER_COLUMNS`) dinamik olarak üretilir.

### 2.2. JavaScript (ES6+) ve TypeScript
* **Strict Type Checking:** `tsconfig.json` üzerinde `strict: true` aktif olup, projede `any` tipi kullanılmamıştır.
* **Merkezi Domain Modellemesi (`src/types/index.ts`):** `Product`, `DealCarouselItem`, `CircularCategory`, `NavCategory`, `CartItem`, `AppNotification` ve `FooterColumn` arayüzleri ile tüm bileşen prop'ları ve Redux payload'ları tip güvencesi altına alınmıştır.
* **Saf Yardımcı Fonksiyonlar (`src/lib/utils.ts`):** İndirim doğrulama (`hasActiveDiscount`), geçerli fiyat hesaplama (`getEffectivePrice`) ve para birimi formatlama (`formatPrice`) işlemleri merkezi saf fonksiyonlar olarak yazılmıştır.

### 2.3. React.js, Redux Toolkit ve Next.js 14 (App Router)
* **Next.js Server & Client Component Ayrımı:**
  * `src/app/layout.tsx`, `src/app/page.tsx`, `HeroBanner.tsx`, `MostLovedCategories.tsx` ve `ValueProps.tsx` bileşenleri **Server Component (RSC)** olarak çalışır; tarayıcıya sıfır ekstra JS yüküyle doğrudan SEO uyumlu HTML gönderir.
  * Yalnızca tarayıcı olayları ve state gerektiren bileşenler (`Header`, `SearchBar`, `CartDrawer`, `CuratedProductCarousel`, `SellerModal`) `'use client'` ile sınırlandırılmıştır.
* **Redux Toolkit (`src/store/`):**
  * `cartSlice.ts`: Sepete ürün ekleme/çıkarma, miktar güncelleme, $50 ücretsiz kargo barajı ve $11 hoş geldin kredisi hesaplamalarını yönetir.
  * `wishlistSlice.ts`: Ürün kartları üzerindeki favori durumlarını senkronize eder.
  * `uiSlice.ts`: Satıcı başvuru modalı, mobil menü ve bildirim listesini kontrol eder.

### 2.4. Tailwind CSS ve Ant Design Hibrit Kullanımı
* **Tailwind CSS (Müşteri Vitrini - B2C):** `tailwind.config.ts` ve `globals.css` içerisinde tanımlanan marka renk paleti (`#cb5810`, `#061D21`, `#A8D97A`), özel keyframe animasyonları ve 1400px genişlikli responsive grid sistemiyle tüm mağaza vitrini oluşturulmuştur.
* **Ant Design v5 (Satıcı İşlemleri - B2B):** `src/components/seller/SellerModal.tsx` bileşeninde çok adımlı satıcı başvuru süreci için Ant Design'ın `Modal`, `Steps`, `Form`, `Input`, `Select` ve `Upload` bileşenleri kullanılmıştır.
* **SSR Stil Entegrasyonu:** `@ant-design/nextjs-registry` ve `AntdConfigProvider.tsx` kullanılarak Ant Design bileşenlerinin sunucu tarafı (SSR) render sırasında stil kaybı (FOUC) yaşamaması ve marka renkleriyle uyumlu çalışması sağlanmıştır.

### 2.5. Micro Frontend Mimarisi (Next.js Multi-Zones)
* **Konum:** `next.config.mjs`
* **Uygulama:** Büyük ölçekli e-ticaret sistemlerinde ana vitrin (`home`), satıcı paneli (`dashboard`) ve ödeme (`checkout`) modüllerinin farklı ekiplerce bağımsız geliştirilip dağıtılabilmesi için `rewrites()` tabanlı **Next.js Multi-Zones** mimari altyapısı tanımlanmıştır.

### 2.6. REST Veri Yapısı ve WebSocket Gerçek Zamanlı Bildirimler
* **Konum:** `src/services/useNotificationSocket.tsx` & `src/components/layout/NotificationsDropdown.tsx`
* **Uygulama:** Arka planda çalışan socket simülasyon kancası, belirli aralıklarla canlı pazar yeri etkinliklerini (yeni sipariş, flaş indirim, stok uyarısı) dinler. Gelen her olay hem Ant Design `notification` toast mesajı olarak ekranda gösterilir hem de Redux `uiSlice` içerisine kaydedilerek bildirim merkezindeki okunmamış sayacını günceller.

### 2.7. Kullanıcı Odaklı Arayüz (UI/UX) ve Erişilebilirlik (A11y)
* **Etkileşimli Arama Çubuğu (`SearchBar.tsx`):** Arama alanına tıklandığında Header beyaz kalırken sayfanın geri kalanı hafifçe kararır (`backdrop`), arama çubuğu turuncu odak halkası alır ve altında görselli **"Collections"** önerileri açılır.
* **Akıllı Sticky Header (`Header.tsx`):** Aşağı kaydırma hareketinde alt kategori satırını gizleyerek ekran alanı kazandırır; yukarı kaydırmada tekrar sabitler. Koleksiyon linkleri üzerinde soldan sağa akan hover çizgi animasyonu bulunur.
* **Zengin Ürün Kartları (`CuratedProductCard.tsx` & `QuickViewModal.tsx`):** Kart üzerinde çoklu görsel geçiş okları, üzerine gelindiğinde otomatik oynayan ürün videoları ve sayfa değiştirmeden ürün inceleme imkanı sunan Quick View modalı yer alır.
* **Erişilebilirlik:** `Alt+T` bildirim kısayolu, `Escape` ile tüm modal/menü kapatma desteği, `aria-label` etiketleri ve kampanya animasyonlarını duraklatma (`Play/Pause`) kontrolü mevcuttur.

### 2.8. Unit Test (Jest & React Testing Library)
* **Konum:** `jest.config.js`, `jest.setup.js`
* **Test Kapsamı (2 Test Suite, 10 Birim Test):**
  1. `src/store/slices/__tests__/cartSlice.test.ts`: Başlangıç durumu, ürün ekleme, miktar artırma, ürün silme ve toplam fiyat hesaplama testleri.
  2. `src/components/product/__tests__/ProductCard.test.tsx`: Ürün bilgilerinin, indirim/ücretsiz kargo rozetlerinin doğru render edilmesi ve indirimli fiyat normal fiyata eşit olduğunda üstü çizili mükerrer fiyat gösterilmemesi (`hasActiveDiscount`) testleri.

### 2.9. CI/CD, Kalite Kontrol ve Dağıtım (Vercel)
* **Sürekli Entegrasyon & Dağıtım:** Proje, GitHub ve Vercel CI/CD boru hattına doğrudan uyumludur.
* **Derleme Doğrulaması:** Her üretim derlemesinde (`npm run build`) Next.js tarafından otomatik olarak TypeScript tip kontrolü (`tsc --noEmit`) ve ESLint kod kalitesi denetimi çalıştırılır; statik sayfalar optimize edilerek sunulur.
