"use client";

import React from "react";
import { ConfigProvider, theme } from "antd";

/**
 * Ant Design Config Provider (Tema ve Token Yapılandırması)
 * 
 * Mimari Açıklama:
 * Ant Design bileşenlerinin (Modal, Form, Steps, Button vb.) Elonky'nin
 * tersine mühendislik ile çıkarılan terracotta marka rengi (#cb5810) ve
 * 10px köşe yuvarlatma token'ları ile 1:1 görsel uyum içinde çalışmasını sağlar.
 */
export function AntdConfigProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#cb5810",
          colorPrimaryHover: "#b54c0b",
          borderRadius: 10,
          colorLink: "#cb5810",
          colorLinkHover: "#b54c0b",
          fontFamily: "var(--font-graphik), system-ui, -apple-system, sans-serif",
          controlHeight: 40,
        },
        components: {
          Button: {
            colorPrimary: "#cb5810",
            algorithm: true,
            fontWeight: 500,
          },
          Modal: {
            borderRadiusLG: 16,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
