import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "react-hot-toast";
import ClientLayout from "../components/ClientLayout/ClientLayout";
import "./globals.css";

export const metadata = {
  title: "Delivery App | Fast & Delicious Food Delivery",
  description: "Order your favorite dishes from the best local restaurants. Fast delivery and easy-to-use interface.",
  keywords: ["food delivery", "order pizza", "burgers online", "React Delivery App"],
  authors: [{ name: "Oleksandr Sulyma" }],
  
  openGraph: {
    title: "Delivery App — Delicious Food Delivered Fast",
    description: "The best restaurants in one app. Choose, order, and enjoy your meal!",
    url: "https://delivery-app-frontend-two.vercel.app",
    siteName: "Delivery App",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Delivery App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Delivery App | Delicious Food",
    description: "Fast delivery of your favorite meals.",
    images: ["/og-image.jpg"],
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