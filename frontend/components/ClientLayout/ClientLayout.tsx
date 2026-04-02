"use client";

import { Layout, theme } from "antd";
import AppHeader from "../AppHeader/AppHeader";
import { useCartStore } from "@/store/useCartStore";

const { Content } = Layout;

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDarkMode = useCartStore((state) => state.isDarkMode);
  const { token } = theme.useToken(); 

  return (
    <Layout 
      style={{ 
        minHeight: "100vh", 
      
        background: token.colorBgLayout,
        transition: "background-color 0.3s ease" 
      }}
    >
      <AppHeader />
      <Content style={{ background: "transparent" }}>
        <div className="container" style={{ padding: "20px 0" }}>
          {children}
        </div>
      </Content>
    </Layout>
  );
}