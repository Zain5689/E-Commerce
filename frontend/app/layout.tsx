import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Nexus Store | Premium Electronics & PC Hardware',
  description: 'Buy Gaming Laptops, PC Components, GPUs, RAM, CPUs, and Accessories in Egypt.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b0f19] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
