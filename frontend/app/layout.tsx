import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "react-hot-toast";
import ClientLayout from "../components/ClientLayout/ClientLayout";
import "./globals.css";
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Delivery App | Fast & Delicious Food Delivery',
    template: '%s | Delivery App',
  },

  description:
    'Order your favorite dishes from the best local restaurants. Fast delivery and easy-to-use interface.',

  keywords: [
    'food delivery',
    'order food online',
    'delivery app',
    'burgers',
    'pizza delivery',
  ],

  authors: [{ name: 'Oleksandr Sulyma' }],

  openGraph: {
    title: 'Delivery App — Delicious Food Delivered Fast',
    description:
      'Choose a shop, add products to cart, and order food quickly and easily.',
    url: '/',
    siteName: 'Delivery App',

    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Delivery App Preview',
      },
    ],

    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Delivery App | Fast Food Delivery',
    description: 'Order food online from the best local restaurants.',
    images: ['/og-image.webp'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AntdRegistry>
          <Toaster 
            position="top-center" 
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }}
          />
          <ClientLayout>
            {children}
          </ClientLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}