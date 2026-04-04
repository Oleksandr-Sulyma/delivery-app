'use client';

import { useState } from 'react';
import {
  Layout,
  Badge,
  Button,
  Drawer,
  Space,
  Flex,
  Tooltip,
  theme,
} from 'antd';
import {
  MenuOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
  ShopOutlined,
  GiftOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';

const { Header } = Layout;

export default function AppHeader() {
  const { token } = theme.useToken();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { cart, isDarkMode, toggleTheme } = useCartStore();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Shop', href: '/', icon: <ShopOutlined /> },
    {
      name: 'Shopping Cart',
      href: '/cart',
      hasBadge: true,
      icon: <ShoppingCartOutlined />,
    },
    { name: 'History', href: '/history', icon: <HistoryOutlined /> },
    { name: 'Coupons', href: '/coupons', icon: <GiftOutlined /> },
  ];

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <Header
      style={{
        background: 'var(--card-bg)',
        height: '64px',
        padding: 0,
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0 20px',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/apple-touch-icon.png"
              alt="Logo"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>

          <span
            style={{
              fontSize: '20px',
              fontWeight: '800',
              color: token.colorPrimary,
              letterSpacing: '-0.5px',
            }}
          >
            Delivery App
          </span>
        </Link>

        <div className="desktop-nav">
          <Space size="middle">
            <nav style={{ display: 'flex', alignItems: 'center' }}>
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <div
                    key={link.href}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Link
                      href={link.href}
                      style={{
                        textDecoration: 'none',
                        color: isActive
                          ? token.colorPrimaryActive
                          : token.colorPrimary,
                        fontWeight: isActive ? '600' : '400',
                        fontSize: '16px',
                        padding: '0 5px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {link.name}
                      {link.hasBadge && totalItems > 0 && (
                        <Badge
                          count={totalItems}
                          size="small"
                          style={{ marginLeft: '8px' }}
                        />
                      )}
                    </Link>
                    {index < navLinks.length - 1 && (
                      <span
                        style={{
                          margin: '0 15px',
                          color: 'var(--border-color)',
                        }}
                      >
                        |
                      </span>
                    )}
                  </div>
                );
              })}
            </nav>

            <Tooltip title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
              <Button
                type="text"
                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                onClick={toggleTheme}
                style={{
                  fontSize: '18px',
                  color: isDarkMode ? '#fadb14' : '#595959',
                }}
              />
            </Tooltip>
          </Space>
        </div>

        <div className="mobile-actions">
          <Space>
            <Button
              type="text"
              icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
              onClick={toggleTheme}
              style={{
                fontSize: '18px',
                color: isDarkMode ? '#fadb14' : '#595959',
              }}
            />
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: '20px' }} />}
              onClick={toggleDrawer}
            />
          </Space>
        </div>
      </div>

      <Drawer
        title="Navigation"
        placement="right"
        onClose={toggleDrawer}
        open={isDrawerOpen}
        size="default"
        styles={{ body: { padding: '20px' }, wrapper: { width: 250 } }}
      >
        <Flex vertical gap="large" style={{ width: '100%' }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleDrawer}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '18px',
                  color: isActive
                    ? token.colorPrimaryActive
                    : token.colorPrimary,
                  fontWeight: isActive ? '600' : '400',
                  width: '100%',
                  padding: '10px 0',
                }}
              >
                <Space>
                  {link.icon}
                  {link.name}
                </Space>
                {link.hasBadge && totalItems > 0 && (
                  <Badge
                    count={totalItems}
                    style={{ backgroundColor: token.colorError }}
                  />
                )}
              </Link>
            );
          })}

          <div
            onClick={() => {
              toggleTheme();
              toggleDrawer();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '18px',
              color: token.colorPrimary,
              padding: '10px 0',
              cursor: 'pointer',
              borderTop: '1px solid var(--border-color)',
              marginTop: '10px',
            }}
          >
            {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </div>
        </Flex>
      </Drawer>

      <style jsx>{`
        .mobile-actions {
          display: none;
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          .mobile-actions {
            display: flex;
          }
        }
      `}</style>
    </Header>
  );
}
