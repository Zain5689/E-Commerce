import React from 'react';
import '../globals.css';
import { Navbar } from '../../components/store/Navbar';

export const metadata = {
  title: 'Nexus Store | Premium Electronics & PC Hardware Retailer',
  description: 'Buy Gaming Laptops, PC Components, GPUs, RAM, CPUs, and Accessories in Egypt with Fast Delivery & Official Warranty.',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const isRtl = params.lang === 'ar';

  return (
    <html lang={params.lang || 'en'} dir={isRtl ? 'rtl' : 'ltr'}>
      <body className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 antialiased selection:bg-brand-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-[#0f172a] border-t border-slate-800 py-10 px-4 text-center text-xs text-slate-500">
          <p>© 2026 Nexus Store. All Rights Reserved. Full-Stack E-Commerce Architecture.</p>
        </footer>
      </body>
    </html>
  );
}
