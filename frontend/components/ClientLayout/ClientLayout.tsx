"use client";

import { Layout } from "antd";
import AppHeader from "../AppHeader/AppHeader";

const { Content } = Layout;

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <AppHeader />
      <Content>
        <div className="container">{children}</div>
      </Content>
    </Layout>
  );
}
