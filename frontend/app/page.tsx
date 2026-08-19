import React from 'react';
import StorefrontHomePage from './[lang]/(store)/page';
import { Navbar } from '../components/store/Navbar';

export default function RootHomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 antialiased">
      <Navbar />
      <main className="flex-1">
        <StorefrontHomePage />
      </main>
      <footer className="bg-[#0f172a] border-t border-slate-800 py-10 px-4 text-center text-xs text-slate-500">
        <p>© 2026 Nexus Store. All Rights Reserved. Full-Stack E-Commerce Architecture.</p>
      </footer>
    </div>
  );
}
