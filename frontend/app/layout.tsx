import React from 'react';
import './globals.css';
import { Navbar } from '../components/store/Navbar';
import { CartDrawer } from '../components/store/CartDrawer';
import { Footer } from '../components/store/Footer';
import { LanguageSynchronizer } from '../components/store/LanguageSynchronizer';

export const metadata = {
  title: 'Nexus Store | متجر نكسوس للهاردوير واللابتوبات الجيمنج',
  description: 'Buy Gaming Laptops, PC Components, GPUs, RAM, CPUs, and Accessories in Egypt with Fast Delivery & Official Warranty.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 antialiased selection:bg-brand-500 selection:text-white">
        <LanguageSynchronizer>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageSynchronizer>
      </body>
    </html>
  );
}
