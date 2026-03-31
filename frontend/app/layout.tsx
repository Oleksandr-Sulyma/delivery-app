import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ClientLayout from '../components/ClientLayout'; // імпортуємо нашу нову оболонку
import "./globals.css";

export const metadata = {
  title: "Delivery App | Sulyma Oleksandr",
  description: "Test task for ElifTech School - Food Delivery Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <AntdRegistry>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}