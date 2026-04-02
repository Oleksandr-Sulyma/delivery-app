"use client";

import { useState } from "react";
import { Layout, Badge, Button, Drawer, Space, Flex, Tooltip } from "antd";
import {
  MenuOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
  ShopOutlined,
  GiftOutlined,
  SunOutlined,
  MoonOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

const { Header } = Layout;

export default function AppHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const { cart, isDarkMode, toggleTheme } = useCartStore();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: "Shop", href: "/", icon: <ShopOutlined /> },
    {
      name: "Shopping Cart",
      href: "/cart",
      hasBadge: true,
      icon: <ShoppingCartOutlined />,
    },
    { name: "History", href: "/history", icon: <HistoryOutlined /> },
    { name: 'Coupons', href: '/coupons', icon: <GiftOutlined /> },
  ];

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <Header
      style={{
        background: isDarkMode ? "#141414" : "#fff",
        display: "flex",
        padding: "0 20px",
        height: "64px",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${isDarkMode ? "#303030" : "#f0f0f0"}`,
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#1890ff",
          whiteSpace: "nowrap",
        }}
      >
        🍔 Delivery App
      </Link>

      <Space size="middle" className="desktop-nav">
        <nav style={{ display: "flex", alignItems: "center" }}>
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <div
                key={link.href}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Link
                  href={link.href}
                  style={{
                    textDecoration: "none",
                    color: isActive ? (isDarkMode ? "#40a9ff" : "#053a8f") : "#1890ff",
                    fontWeight: isActive ? "500" : "400",
                    fontSize: "16px",
                    padding: "0 5px",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {link.name}
                  {link.hasBadge && totalItems > 0 && (
                    <Badge
                      count={totalItems}
                      size="small"
                      style={{
                        backgroundColor: "#ff4d4f",
                        marginLeft: "8px",
                        boxShadow: "none",
                      }}
                    />
                  )}
                </Link>
                {index < navLinks.length - 1 && (
                  <span
                    className="nav-divider"
                    style={{ margin: "0 15px", color: isDarkMode ? "#303030" : "#d9d9d9" }}
                  >
                    |
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
          <Button
            type="text"
            icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
            style={{ 
              fontSize: "18px", 
              color: isDarkMode ? "#fadb14" : "#595959",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          />
        </Tooltip>
      </Space>

      <Space className="mobile-actions" style={{ display: "none" }}>
        <Button
          type="text"
          icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          style={{ fontSize: "18px", color: isDarkMode ? "#fadb14" : "#595959" }}
        />
        <Button
          className="mobile-menu-btn"
          type="text"
          icon={<MenuOutlined style={{ fontSize: "20px" }} />}
          onClick={toggleDrawer}
        />
      </Space>

      <Drawer
        title="Navigation"
        placement="right"
        onClose={toggleDrawer}
        open={isDrawerOpen}
        size="default"
        styles={{ body: { padding: "20px" }, wrapper: { width: 250 } }}
      >
        <Flex vertical gap="large" style={{ width: "100%" }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleDrawer}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "18px",
                  color: isActive ? "#053a8f" : "#1890ff",
                  fontWeight: isActive ? "600" : "400",
                  width: "100%",
                  padding: "10px 0",
                }}
              >
                <Space>
                  {link.icon}
                  {link.name}
                </Space>
                {link.hasBadge && totalItems > 0 && (
                  <Badge
                    count={totalItems}
                    style={{ backgroundColor: "#ff4d4f" }}
                  />
                )}
              </Link>
            );
          })}
          
          <div 
            onClick={() => { toggleTheme(); toggleDrawer(); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "18px",
              color: "#1890ff",
              padding: "10px 0",
              cursor: "pointer",
              borderTop: `1px solid ${isDarkMode ? "#303030" : "#f0f0f0"}`,
              marginTop: "10px"
            }}
          >
            {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </div>
        </Flex>
      </Drawer>

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-actions {
            display: flex !important;
            align-items: center;
          }
        }
      `}</style>
    </Header>
  );
}