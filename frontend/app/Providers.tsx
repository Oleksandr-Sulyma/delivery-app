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
  if (isDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}, [isDarkMode]);

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#ff4d4f',
          borderRadius: 8,
        },
      }}
    >
      <ClientLayout>
        {children}
      </ClientLayout>
    </ConfigProvider>
  );
}