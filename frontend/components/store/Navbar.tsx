'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Heart, Menu, X, Cpu, PhoneCall } from 'lucide-react';
import { useCartStore } from '../../lib/store/useCartStore';

export const Navbar: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const toggleCart = useCartStore((state) => state.toggleCart);

  React.useEffect(() => {
    setMounted(true);
  }, []);


  return (
    <header className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner */}
      <div className="bg-brand-900/60 border-b border-brand-700/40 py-1.5 px-4 text-xs font-medium flex justify-between items-center text-slate-300">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-brand-400">
            <PhoneCall className="w-3.5 h-3.5" /> Hotline: <strong className="text-white">19999</strong>
          </span>
          <span className="hidden sm:inline text-slate-400">| Premium Gaming Laptops & PC Components</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="hover:text-white transition-colors">العربية (AR)</button>
          <span>|</span>
          <Link href="/track-order" className="hover:text-white transition-colors">Track Order</Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-rose-500 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              NEXUS<span className="text-brand-500">STORE</span>
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">Hardware & Tech</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search RTX 4090, Gaming Laptops, DDR5 RAM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl py-2.5 pl-4 pr-11 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white hover:bg-brand-500 transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/account" className="hidden sm:flex items-center gap-2 text-slate-300 hover:text-white transition-colors p-2">
            <User className="w-5 h-5" />
            <span className="text-xs font-medium hidden lg:inline">Sign In</span>
          </Link>

          <Link href="/wishlist" className="relative p-2 text-slate-300 hover:text-white transition-colors">
            <Heart className="w-5 h-5" />
          </Link>

          <button
            onClick={() => toggleCart(true)}
            className="relative flex items-center gap-2.5 bg-brand-600/90 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-brand-600/20 active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>
            {mounted && totalCartItems > 0 && (
              <span className="bg-white text-brand-700 text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {totalCartItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <nav className="hidden md:block bg-slate-900/60 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-8 py-2 text-xs font-semibold text-slate-300">
          <Link href="/category/laptops" className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
            Laptops & Notebooks
          </Link>
          <Link href="/category/pc-components" className="hover:text-brand-400 transition-colors">
            PC Components
          </Link>
          <Link href="/category/gpus" className="hover:text-brand-400 transition-colors text-rose-400 font-bold">
            🔥 Graphics Cards (RTX)
          </Link>
          <Link href="/category/ram-memory" className="hover:text-brand-400 transition-colors">
            RAM & Storage
          </Link>
          <Link href="/category/monitors" className="hover:text-brand-400 transition-colors">
            Monitors & Displays
          </Link>
          <Link href="/deals" className="hover:text-amber-400 transition-colors text-amber-400 font-bold ml-auto">
            ⚡ Flash Deals
          </Link>
        </div>
      </nav>
    </header>
  );
};
