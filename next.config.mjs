/** @type {import('next').NextConfig} */
/**
 * Next.js Configuration for Elonky Frontend Clone
 * 
 * Mimari Kararlar & Micro Frontend Entegrasyonu:
 * 1. Image Optimization: Elonky'nin canlı CDN altyapısı (cdn.elonky.com) üzerinden
 *    yüksek çözünürlüklü .webp görsellerinin optimize servis edilmesi için remotePatterns tanımlanmıştır.
 * 2. Next.js Multi-Zones (Micro Frontend) Desteği:
 *    Tersine mühendislikte tespit edilen 'x-zone: home' yapısı gereği, bu vitrin uygulaması
 *    bağımsız bir zone olarak tasarlanmıştır. Satıcı paneli (Dashboard) ve Ödeme (Checkout)
 *    gibi diğer alt sistemler Multi-Zones mimarisinde rewrites kuralı ile yönlendirilebilir.
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.elonky.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d2ofr4p3285gck.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Micro Frontend / Multi-Zones simülasyonu
  async rewrites() {
    return [
      /**
       * Örnek Multi-Zone Yönlendirmesi:
       * Satıcı yönetim portali veya harici mikro-servisler bağımsız bir zone olarak
       * deploy edildiğinde, reverse proxy seviyesinde aşağıdaki gibi yönlendirilir.
       */
      // {
      //   source: '/dashboard/:path*',
      //   destination: `${process.env.SELLER_ZONE_URL}/dashboard/:path*`,
      // },
    ];
  },
};

export default nextConfig;
