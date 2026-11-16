import type { Metadata, Viewport } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AntdConfigProvider } from "@/components/providers/AntdConfigProvider";
import { StoreProvider } from "@/components/providers/StoreProvider";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Demoky | Unique Handmade Gifts & Home Decor (Clone Showcase)",
  description:
    "Explore unique handmade gifts, home decor, personalized treasures, and artisan crafts from independent sellers worldwide.",
  keywords: ["handmade gifts", "home decor", "personalized gifts", "artisan marketplace", "nextjs showcase"],
  authors: [{ name: "Senior Frontend Specialist Candidate" }],
};

/**
 * Root Layout Bileşeni (Server Component)
 * 
 * Mimari Açıklama:
 * 1. AntdRegistry: Ant Design stillerinin SSR (Server-Side Rendering) esnasında
 *    sayfa kaynağına gömülmesini ve hydration uyumsuzluğunun önlenmesini sağlar.
 * 2. AntdConfigProvider: Ant Design bileşenlerinin Elonky marka renkleri (#cb5810) ile
 *    render edilmesini garanti eder.
 * 3. StoreProvider: Redux Toolkit durum yönetimini tüm alt bileşen ağacına aktarır.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans antialiased text-[#0C0C0C] selection:bg-elonky-brand/10 selection:text-elonky-brand">
        <AntdRegistry>
          <AntdConfigProvider>
            <StoreProvider>{children}</StoreProvider>
          </AntdConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
