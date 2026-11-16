# 🛠️ Elonky Frontend — Kapsamlı Clean Code, Mimari ve Kod Kalitesi Denetim Raporu (`duzenleme.md`)

> **Denetim Kapsamı:** `src/` altındaki tüm sayfalar, bileşenler, Redux store dilimleri, servisler, veri katmanı ve yapılandırma dosyaları (40 dosya).  
> **Değerlendirme Kriterleri:** Clean Code (Robert C. Martin), SOLID Prensipleri, DRY (Don't Repeat Yourself), KISS, Next.js 14 App Router En İyi Pratikleri, TypeScript Katı Tip Güvenliği ve Kurumsal Okunabilirlik.

---

## 📊 1. Yönetici Özeti & Genel Sağlık Tablosu

Yapılan derinlemesine inceleme sonucunda uygulamanın görsel sadakati ve temel mimari kurgusu yüksek kalitede olmakla birlikte, **hızlı prototipleme ve iteratif görsel revizyonlar sırasında oluşan teknik borçlar (technical debt)** tespit edilmiştir.

| Kategori | Mevcut Durum | Hedeflenen Uzman Seviyesi | Öncelik |
| :--- | :--- | :--- | :--- |
| **Ana Sayfa (`page.tsx`) Sorumluluğu** | 364 satır (260 satırı gömülü ham veri) | ~65 satır saf kompozisyon (Veriler `src/data/` altında) | 🔴 Kritik |
| **Mantıksal Odak & DRY Prensibi** | Slider, Drag-to-Scroll ve Click-Outside kodları 3-4 kez kopyalanmış | Custom Hook (`useDragScroll`, `useClickOutside`) ve ortak bileşenler | 🔴 Kritik |
| **Fiyat & İndirim Mantığı Hatası** | `discountedPrice === price` olduğunda üstü çizili aynı fiyat görünüyor | `hasDiscount = discountedPrice < price` yardımcı kontrolü | 🔴 Kritik |
| **Ölü Kod (Dead Code) Temizliği** | Kullanılmayan 3 bileşen (`HeroBannerCarousel`, `FeaturedProducts`, `CategoryNav`) ve `banners.ts` | %0 ölü kod, yalnızca aktif prodüksiyon modülleri | 🟠 Yüksek |
| **Bileşen Boyutları (Component Size)** | `Footer.tsx` (453 satır), `PromoRibbonBanner.tsx` (344 satır), `CuratedProductCarousel.tsx` (317 satır) | Alt bileşenlere ve sabit veri dosyalarına bölünmüş (<150 satır/dosya) | 🟠 Yüksek |
| **Server vs. Client Component Sınırları** | Statik bileşenlerde gereksiz `"use client"` kullanımı (`HeroBanner`, `MostLovedCategories`) | Yalnızca state/event barındıran yapraklarda `"use client"` | 🟡 Orta |
| **Stil & Utility Kullanımı (`cn`)** | `src/lib/utils.ts` içinde `cn()` tanımlı ama hiçbir yerde kullanılmamış | Karmaşık template string'ler yerine `cn()` ile temiz sınıf yönetimi | 🟡 Orta |

---

## 🔴 2. Kritik Bulgular ve Mimari İhlaller

### 2.1. `src/app/page.tsx` — Tek Sorumluluk Prensibi (SRP) İhlali
* **Tespit:** `src/app/page.tsx` dosyası toplam **364 satırdan** oluşmaktadır. Bunun **42 ile 300. satırları arasındaki 258 satırlık kısmı**, doğrudan `HomePage` fonksiyonunun gövdesine yazılmış `somethingForYouItems`, `giftsForEveryoneItems` ve `furnitureItems` ürün dizileridir.
* **Neden Sorun?**
  1. Sayfa bileşeninin asıl görevi olan **katman orkestrasyonunu** (hangi bileşenin hangi sırayla render edileceğini) okumayı zorlaştırır.
  2. Her render çağrısında (Server Component olsa dahi) fonksiyon kapsamı içinde devasa nesne dizileri yeniden tanımlanır.
  3. Veri modelleri değiştiğinde sayfa bileşenine müdahale edilmesini zorunlu kılar (Open/Closed ve Single Responsibility ihlali).
* **Uzman Çözümü:**
  * Bu 3 veri kümesi `src/data/curatedCollections.ts` dosyasına taşınmalıdır.
  * `page.tsx` yalnızca bileşenleri ve ilgili veri sabitlerini import edip birleştiren **~60 satırlık** yalın bir dosya haline getirilmelidir:

```tsx
// ✅ Önerilen Temiz src/app/page.tsx Yapısı
import {
  SOMETHING_FOR_YOU_ITEMS,
  GIFTS_FOR_EVERYONE_ITEMS,
  FURNITURE_ITEMS,
} from "@/data/curatedCollections";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <ClientSocketListener />
      <Header />
      <main className="flex-1 flex flex-col">
        <HeroBanner />
        <ShopYourStyle />
        <PromoRibbonBanner />
        <CozyHolidayGrid />
        <MostLovedCategories />
        <FavoriteFindsGrid />
        <CuratedProductCarousel title="A Little Something for You" items={SOMETHING_FOR_YOU_ITEMS} />
        <CuratedProductCarousel title="Gifts for Everyone on Your List" items={GIFTS_FOR_EVERYONE_ITEMS} />
        <CuratedProductCarousel title="Furniture Finds You'll Fall For" items={FURNITURE_ITEMS} />
        <EditorialSplitBanner />
        <ValueProps />
      </main>
      <Footer />
      <CartDrawer />
      <MobileMenu />
      <SellerModal />
    </div>
  );
}
```

---

### 2.2. İndirimli Fiyat Gösterim Hatası (Mantıksal Bug)
* **Tespit:** `page.tsx` içindeki birçok üründe indirim olmamasına rağmen `price: 130, discountedPrice: 130` şeklinde tanımlama yapılmıştır (Örn: *Ivy Pearl Bracelet*, *Baroque Freshwater Pearl Bracelet*, *Navy Blue Handmade Beaded Clutch Bag*).
* **Etkilenen Dosyalar:**
  * `src/components/home/CuratedProductCarousel.tsx` (Satır 247–256)
  * `src/components/product/ProductCard.tsx` (Satır 138–142)
  * `src/components/layout/CartDrawer.tsx` (Satır 148–152)
* **Neden Sorun?**
  Bileşenlerde indirim kontrolü `product.discountedPrice` değerinin *truthy* olmasına (`{product.discountedPrice && (<span className="line-through">${product.price}</span>)}`) bağlanmıştır. `discountedPrice` `130` olduğunda (yani `0` olmadığında) koşul `true` döner ve ekranda **`$130` yanında üstü çizili `$130`** görünür! (Not: `QuickViewModal.tsx` satır 143'te `product.discountedPrice < product.price` doğru yazılmışken diğer 3 bileşende eksik bırakılmıştır).
* **Uzman Çözümü:**
  `src/lib/utils.ts` içerisine merkezi bir yardımcı fonksiyon eklenmeli ve tüm fiyat gösterimlerinde standartlaştırılmalıdır:

```ts
// src/lib/utils.ts
export function hasActiveDiscount(price: number, discountedPrice?: number): boolean {
  return typeof discountedPrice === "number" && discountedPrice < price;
}
```

---

### 2.3. `%95` Kopya Bileşenler: `CozyHolidayGrid.tsx` ve `FavoriteFindsGrid.tsx` (DRY İhlali)
* **Tespit:**
  * `src/components/home/CozyHolidayGrid.tsx` (264 satır)
  * `src/components/home/FavoriteFindsGrid.tsx` (245 satır)
* **Neden Sorun?**
  1. Her iki dosya da **birebir aynı JSX iskeletini, aynı CSS sınıflarını, aynı sol/sağ ok butonlarını, aynı yeşil kapsül rozet tasarımını ve aynı mouse sürükleme (drag-to-scroll) kodunu** barındırmaktadır. Tek fark başlık metni ve içerideki `items` dizisidir!
  2. Üstelik her iki dosyada da `const [canScrollLeft, setCanScrollLeft] = useState(false);` ve `canScrollRight` state'leri tanımlanmış, `useEffect` içinde `scroll` ve `resize` event'leri ile sürekli güncellenmekte (`setCanScrollLeft`), fakat **JSX içerisinde hiçbir yerde kullanılmamaktadır!** Bu durum her kaydırmada gereksiz React re-render tetikleyen ölü bir state'tir.
* **Uzman Çözümü:**
  * İki bileşen kaldırılıp yerine tek bir yeniden kullanılabilir `<FeaturedDealCarousel title="..." items={...} />` bileşeni oluşturulmalı, verileri ise `src/data/dealCarousels.ts` dosyasına alınmalıdır. Bu hamle tek başına **~220 satır kopya kodu** ortadan kaldırır.

---

### 2.4. Tekrarlanan Davranışların Custom Hook'lara Çıkarılmaması
Kod tabanında iki temel etkileşim deseni farklı bileşenlerde tekrar tekrar sıfırdan yazılmıştır:

1. **Mouse Drag-to-Scroll (Sürükle ve Kaydır):**
   * `ShopYourStyle.tsx` (Satır 32–79)
   * `CozyHolidayGrid.tsx` (Satır 26–29, 158–186)
   * `FavoriteFindsGrid.tsx` (Satır 25–29, 139–167)
   * **Çözüm:** `src/hooks/useDragScroll.ts` hook'u oluşturularak `scrollRef` ve `{ onMouseDown, onMouseMove, onMouseUp, onMouseLeave, onClickCapture }` döndürülmelidir.

2. **Click Outside (Dışarı Tıklama Algılayıcısı):**
   * `Header.tsx` (Satır 44–52)
   * `SearchBar.tsx` (Satır 75–83)
   * `NotificationsDropdown.tsx` (Satır 42–53)
   * **Çözüm:** `src/hooks/useClickOutside.ts` hook'u ile tek satırda (`useClickOutside(containerRef, () => setIsOpen(false))`) yönetilmelidir.

---

## 🟠 3. Ölü Kodlar (Dead Code) ve Veri Tutarsızlıkları

Projede önceki iterasyonlardan kalan ve aktif uygulama ağacında (`layout.tsx` -> `page.tsx`) hiçbir şekilde çağrılmayan dosyalar mevcuttur:

| Dosya Yolu | Satır Sayısı | Durum / Tespit | Aksiyon Önerisi |
| :--- | :---: | :--- | :--- |
| `src/components/home/HeroBannerCarousel.tsx` | 187 | `HeroBanner.tsx` yazıldıktan sonra boşa çıktı; hiçbir yerde import edilmiyor. | 🗑️ Silinmeli |
| `src/data/banners.ts` | 31 | Yalnızca ölü `HeroBannerCarousel.tsx` tarafından kullanılıyor. | 🗑️ Silinmeli |
| `src/components/home/FeaturedProducts.tsx` | 114 | `CuratedProductCarousel` ve `CozyHolidayGrid` sonrası boşa çıktı; kullanılmıyor. | 🗑️ Silinmeli |
| `src/components/layout/CategoryNav.tsx` | 116 | Kategori satırı `Header.tsx` içine taşındıktan sonra boşa çıktı; kullanılmıyor. | 🗑️ Silinmeli |
| `src/data/products.ts` (Satır 19, 34...) | 476 | Tüm ürünlerde `"currencySymbol": "$$"` (çift dolar) hatası var ve sadece testte 1 öğesi kullanılıyor. | 🔧 Temizlenmeli & Normalize Edilmeli |

---

## 📂 4. Dosya Bazlı Derinlemesine İnceleme & İyileştirme Listesi

### 4.1. Layout Bileşenleri (`src/components/layout/`)

#### 📄 `Header.tsx`
* **Satır 11 (`Sparkles` import):** `lucide-react` içinden import edilmiş ancak JSX içinde hiç kullanılmamış. Kaldırılmalı.
* **Satır 59–60 (`DOWN_THRESHOLD = 50`, `UP_THRESHOLD = 20`):** Sihirli sayılar (magic numbers) bileşen dışında anlamlı sabitler (`SCROLL_DOWN_HIDE_THRESHOLD`, `SCROLL_UP_SHOW_THRESHOLD`, `TOP_SAFE_OFFSET`) olarak tanımlanmalı.
* **Satır 208 (`All Categories` Butonu):** Erişilebilirlik (A11y) için `aria-expanded={isAllCategoriesOpen}` ve `aria-haspopup="true"` nitelikleri eklenmeli.

#### 📄 `SearchBar.tsx`
* **Satır 15–52 (`SEARCH_COLLECTIONS`):** Sabit koleksiyon dizisi `src/data/categories.ts` içerisine taşınmalı.
* **Redux Senkronizasyonu:** `uiSlice.ts` içerisinde `isSearchOpen` ve `setSearchOpen` tanımlanmış olmasına rağmen `SearchBar.tsx` kendi lokal `useState(false)` durumunu kullanıyor. Ya `uiSlice` içindeki atıl `isSearchOpen` kaldırılmalı ya da global state ile senkronize edilmeli (Lokal state yeterlidir, `uiSlice` sadeleştirilmelidir).
* **Klavye Erişilebilirliği:** Kullanıcı arama kutusundayken `Escape` tuşuna bastığında açılır menü ve karartma katmanı kapanmalıdır (`onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}`).

#### 📄 `Footer.tsx`
* **Satır 149–346 (Ağır Kod Tekrarı):** `Elonky`, `What We Do`, `Partnership` ve `Help` sütunlarındaki başlık ve linkler hem masaüstü görünüm için (satır 149–270) hem de mobil `<details>` akordeon görünümü için (satır 294–346) **iki kez elle yazılmıştır**.
* **Satır 364–372 (Ödeme Rozetleri) & Satır 376–422 (Sosyal Medya):** Sabit diziler üzerinden `.map()` ile render edilmek yerine tek tek HTML olarak kopyalanmıştır.
* **Satır 48 (`setTimeout`):** Bileşen unmount olduğunda temizlenmeyen `setTimeout` mevcuttur.
* **Çözüm:** Link grupları `FOOTER_COLUMNS` sabitine çıkarılarak hem masaüstü hem mobil akordeon aynı veri kaynağından beslenmeli; dosya boyutu **453 satırdan ~170 satıra** düşürülmelidir.

#### 📄 `CartDrawer.tsx` & `MobileMenu.tsx`
* **Eksik ESC Dinleyicisi:** `CartDrawer.tsx` JSDoc açıklamasında (satır 24) *"Dış alana tıklandığında veya ESC basıldığında kapanır"* yazmasına rağmen kodda `Escape` tuşu dinleyicisi bulunmamaktadır.
* **Magic Numbers:** `CartDrawer.tsx` içindeki `freeShippingThreshold = 50`, `welcomeCredit = 11` ve `standardShippingCost = 4.99` değerleri satır aralarından (`totalAmount - 11 + (... ? 0 : 4.99)`) çıkarılıp dosya başında `FREE_SHIPPING_THRESHOLD = 50`, `WELCOME_CREDIT_AMOUNT = 11`, `STANDARD_SHIPPING_FEE = 4.99` sabitleri olarak adlandırılmalıdır.

---

### 4.2. Ana Sayfa Vitrin Bileşenleri (`src/components/home/`)

#### 📄 `HeroBanner.tsx` & `MostLovedCategories.tsx`
* **Gereksiz `"use client"` Direktifi:** Her iki bileşen de tamamen statik JSX, Next.js `<Image>` ve `<Link>` bileşenlerinden oluşmaktadır. İçlerinde hiçbir React Hook (`useState`, `useEffect`) veya tarayıcı olayı (`onClick`) yoktur. Başlarındaki `"use client"` kaldırılarak **React Server Component (RSC)** olarak çalışmaları sağlanmalı, istemci JS yükü azaltılmalıdır.

#### 📄 `PromoRibbonBanner.tsx`
* **Dosya Karmaşıklığı (344 Satır):** Satır 98–193 arasındaki 95 satırlık karmaşık `<svg>` (hareketli market arabası, çanta, hediye kutusu ve dönen tekerlekler) doğrudan ana bileşenin ortasında yer almaktadır.
* **Çözüm:** SVG çizimi `AnimatedWelcomeCartSvg` adlı ayrı bir alt bileşene (veya `src/components/icons/AnimatedWelcomeCartSvg.tsx` dosyasına) ayrıştırılmalıdır. Böylece `PromoRibbonBanner` okunabilirliği üst düzeye çıkar.

#### 📄 `EditorialSplitBanner.tsx`
* **Event Bubbling (Çift Tetikleme) Riski:**
  Satır 68'de dış kapsayıcı `<div onClick={togglePlay}>` özelliğine sahipken, satır 105'teki iç `<button onClick={togglePlay}>` elemanında da aynı fonksiyon bağlıdır. `togglePlay` içinde `e.stopPropagation()` çağrılmadığı için kullanıcı sağ alttaki Play/Pause butonuna tıkladığında olay hem butonda hem de üst `div` üzerinde tetiklenerek videoyu oynatıp aynı anda durdurmaktadır!
* **Çözüm:** `togglePlay` içerisine `e.stopPropagation()` eklenmeli veya `onClick` yalnızca tek bir etkileşim katmanında tutulmalıdır.

#### 📄 `CuratedProductCarousel.tsx`
* **Çoklu Bileşen Tek Dosyada (317 Satır):** Hem `CuratedCard` (250 satır) hem de `CuratedProductCarousel` aynı dosyada tutulmuştur. `CuratedCard` bileşeni `src/components/product/CuratedProductCard.tsx` olarak kendi dosyasına ayrılmalıdır.
* **Bellek Sızıntısı Önlemi:** Satır 79'daki `setTimeout(() => setJustAdded(false), 1200)` çağrısı `useRef` ile tutulup unmount esnasında temizlenmelidir.
* **Fiyat Formatlama:** Satır 250 ve 255'te manuel `${product.price}` yerine `formatPrice()` kullanılmalı ve `hasActiveDiscount` kontrolü eklenmelidir.

---

### 4.3. Ürün, Satıcı ve Servis Katmanı (`src/components/product/`, `seller/`, `services/`)

#### 📄 `QuickViewModal.tsx`
* **Durum Sıfırlama (State Reset) Eksikliği:** `selectedImageIdx` ve `quantity` state'leri modal kapandığında veya `product` prop'u değiştiğinde sıfırlanmıyor! Kullanıcı 1. üründe 3. fotoğrafı seçip adedi 4 yaptıktan sonra modalı kapatıp başka bir ürünün Quick View'unu açtığında, yeni ürün de 3. fotoğraftan ve 4 adetten başlıyor.
* **Çözüm:** `useEffect(() => { setSelectedImageIdx(0); setQuantity(1); }, [product?.id]);` eklenmeli ve `Escape` tuşu ile kapatma desteği sağlanmalıdır.

#### 📄 `useNotificationSocket.tsx`
* **Dil Tutarlılığı:** Tüm arayüz ve `useNotificationSocket.tsx` içindeki bildirimler İngilizce (`"Welcome to Elonky! 🌟"`, `"Just now"`) iken, `src/store/slices/uiSlice.ts` içindeki başlangıç bildirimi (satır 22–24) Türkçe (`"Elonky'ye Hoş Geldiniz! 🎉"`, `"Şimdi"`) bırakılmıştır. Kullanıcı arayüzünde %100 dil bütünlüğü için İngilizceye çevrilmelidir.

#### 📄 `tailwind.config.ts` & `src/lib/utils.ts`
* **`cn()` Yardımcısının Aktifleştirilmesi:** `src/lib/utils.ts` içinde hazır bulunan `cn()` fonksiyonu, bileşenlerdeki çok satırlı karmaşık koşullu sınıf birleştirmelerinde (`SearchBar`, `Header`, `CuratedCard`, `QuickViewModal`) aktif olarak kullanılarak kod okunabilirliği artırılmalıdır.

---

## 🗺️ 5. Adım Adım Uzman Refactoring (Uygulama) Yol Haritası

Bu rapordaki bulguları sıfır görsel kayıp ve %100 test başarısıyla uygulamak için önerilen icra sırası:

1. **Adım 1 — Ölü Kodların Temizlenmesi:**
   * `HeroBannerCarousel.tsx`, `FeaturedProducts.tsx`, `CategoryNav.tsx` ve `src/data/banners.ts` dosyalarının silinmesi.
2. **Adım 2 — Veri Katmanının (`src/data/`) Ayrıştırılması ve Normalizasyonu:**
   * `page.tsx`, `CozyHolidayGrid.tsx`, `FavoriteFindsGrid.tsx`, `MostLovedCategories.tsx`, `EditorialSplitBanner.tsx`, `ValueProps.tsx` ve `Footer.tsx` içindeki statik dizilerin `src/data/` altına tip güvenli sabitler olarak taşınması.
   * `products.ts` içindeki `"$$"` para birimi hatasının `"$"` olarak düzeltilmesi.
3. **Adım 3 — Custom Hook'ların (`src/hooks/`) Oluşturulması:**
   * `useDragScroll.ts` ve `useClickOutside.ts` hook'larının yazılarak ilgili bileşenlerdeki tekrarların kaldırılması.
4. **Adım 4 — Ortak Bileşen Birleştirmeleri & Bug Fix'ler:**
   * `CozyHolidayGrid` ve `FavoriteFindsGrid` bileşenlerinin ortak bir `<DiscountShowcaseCarousel />` mimarisinde birleştirilmesi ve kullanılmayan `canScrollLeft/Right` state'lerinin kaldırılması.
   * `hasActiveDiscount()` fonksiyonu ile indirimsiz ürünlerde üstü çizili fiyat görünmesi hatasının giderilmesi.
   * `EditorialSplitBanner` çift tıklama (bubbling) ve `QuickViewModal` state sıfırlama hatalarının düzeltilmesi.
5. **Adım 5 — Server Component Optimizasyonu & Final Doğrulama:**
   * Gereksiz `"use client"` direktiflerinin kaldırılması, `cn()` kullanımının yaygınlaştırılması, `npm test` ve `npm run build` doğrulaması.
