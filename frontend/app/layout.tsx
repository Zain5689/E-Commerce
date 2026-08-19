import React from 'react';
import './globals.css';
import { Navbar } from '../components/store/Navbar';
import { CartDrawer } from '../components/store/CartDrawer';

export const metadata = {
  title: 'Nexus Store | Premium Electronics & PC Hardware Retailer',
  description: 'Buy Gaming Laptops, PC Components, GPUs, RAM, CPUs, and Accessories in Egypt with Fast Delivery & Official Warranty.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 antialiased selection:bg-brand-500 selection:text-white">
        <Navbar />
        <CartDrawer />
        <main className="flex-1">{children}</main>
        <footer className="bg-[#0f172a] border-t border-slate-800 py-10 px-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 Nexus Store. All Rights Reserved. Full-Stack E-Commerce Architecture.</p>
            <div className="flex items-center gap-6 text-slate-400">
              <span>Official Warranty</span>
              <span>•</span>
              <span>Fast Nationwide Delivery</span>
              <span>•</span>
              <span>Secure Payments</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

