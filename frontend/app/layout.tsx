import { AntdRegistry } from '@ant-design/nextjs-registry';
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
    <html lang="en">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}