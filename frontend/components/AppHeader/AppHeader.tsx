'use client';

import { useState } from 'react';
import { Layout, Badge, Button, Drawer, Space, Flex } from 'antd';
import { MenuOutlined, ShoppingCartOutlined, HistoryOutlined, ShopOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';

const { Header } = Layout;

export default function AppHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Shop', href: '/', icon: <ShopOutlined /> },
    { name: 'Shopping Cart', href: '/cart', hasBadge: true, icon: <ShoppingCartOutlined /> },
    { name: 'History', href: '/history', icon: <HistoryOutlined /> },
  ];

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <Header style={{
      background: '#fff',
      display: 'flex',
      padding: '0 20px',
      height: '64px',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #f0f0f0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <Link href="/" style={{ fontSize: '18px', fontWeight: '700', color: '#1890ff', whiteSpace: 'nowrap' }}>
        🍔 Delivery App
      </Link>
      <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
        {navLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <div key={link.href} style={{ display: 'flex', alignItems: 'center' }}>
              <Link
                href={link.href}
                style={{
                  textDecoration: 'none',
                  color: isActive ? '#053a8f' : '#1890ff',
                  fontWeight: isActive ? '500' : '400',
                  fontSize: '16px',
                  padding: '0 5px',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {link.name}
                {link.hasBadge && totalItems > 0 && (
                  <Badge
                    count={totalItems}
                    size="small"
                    style={{ backgroundColor: '#ff4d4f', marginLeft: '8px', boxShadow: 'none' }}
                  />
                )}
              </Link>
              {index < navLinks.length - 1 && (
                <span className="nav-divider" style={{ margin: '0 15px', color: '#d9d9d9' }}>|</span>
              )}
            </div>
          );
        })}
      </nav>

      <Button
        className="mobile-menu-btn"
        type="text"
        icon={<MenuOutlined style={{ fontSize: '20px' }} />}
        onClick={toggleDrawer}
        style={{ display: 'none' }}
      />

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
                  color: isActive ? '#053a8f' : '#1890ff',
                  fontWeight: isActive ? '600' : '400',
                  width: '100%',
                  padding: '10px 0'
                }}
              >
                <Space>
                  {link.icon}
                  {link.name}
                </Space>
                {link.hasBadge && totalItems > 0 && (
                  <Badge count={totalItems} style={{ backgroundColor: '#ff4d4f' }} />
                )}
              </Link>
            );
          })}
        </Flex>
      </Drawer>

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </Header>
  );
}