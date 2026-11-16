"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";

/**
 * Redux Store Provider (Client Component)
 * 
 * Mimari Açıklama:
 * Next.js App Router mimarisinde Redux Provider doğrudan Server Component olan
 * RootLayout içerisinde çalışamayacağı için 'use client' direktifi ile izole
 * edilmiş bir StoreProvider sarmalayıcısı (wrapper) olarak tanımlanır.
 */
export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
