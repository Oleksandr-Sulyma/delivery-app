"use client";

import React, { useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import ClientLayout from "@/components/ClientLayout/ClientLayout";
import { useCartStore } from "@/store/useCartStore";

export default function Providers({ children }: { children: React.ReactNode }) {
  const isDarkMode = useCartStore((state) => state.isDarkMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode, mounted]);

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#13c2c2',
          borderRadius: 8,
          controlHeight: 40,
        },
        components: {
          Button: {
            fontWeight: 600,
            borderRadius: 8,
            controlHeight: 40,
          },
          Card: {
            borderRadiusLG: 12,
          },
          Select: {
            controlHeight: 40,
          },
          Checkbox: {
            colorPrimary: '#13c2c2',
          },
        },
      }}
    >
      <ClientLayout>
        {children}
      </ClientLayout>
    </ConfigProvider>
  );
}
