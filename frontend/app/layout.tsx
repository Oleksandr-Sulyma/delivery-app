import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "react-hot-toast";
import { App } from "antd";
import type { Metadata } from 'next';
import Providers from "./Providers";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Delivery App | Fast & Delicious Food Delivery',
    template: '%s | Delivery App',
  },
  description: 'Order your favorite dishes from the best local restaurants. Fast delivery and easy-to-use interface.',
  keywords: [
    'food delivery', 'order food online', 'delivery app', 'burgers', 'pizza delivery',
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  authors: [{ name: 'Oleksandr Sulyma' }],
  openGraph: {
    title: 'Delivery App — Delicious Food Delivered Fast',
    description: 'Choose a shop, add products to cart, and order food quickly and easily.',
    url: '/',
    siteName: 'Delivery App',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'Delivery App Preview' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delivery App | Fast Food Delivery',
    description: 'Order food online from the best local restaurants.',
    images: ['/og-image.webp'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: { borderRadius: '10px', background: '#333', color: '#fff' },
            }}
          />
          <Providers>
            <App>
              {children}
            </App>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
