import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from '@/app/sidebar';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Laboratorio",
  description: "Aplicación de Laboratorio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <SideBar /> */}
        {children}</body>
    </html>
  );
}
