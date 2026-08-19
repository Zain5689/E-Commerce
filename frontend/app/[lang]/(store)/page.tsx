import React from 'react';
import Link from 'next/link';
import { Cpu, ShieldCheck, Truck, CreditCard, ArrowRight, Star, ShoppingCart } from 'lucide-react';

export default function StorefrontHomePage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0b0f19] to-brand-950/40 border-b border-slate-800/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold">
              <span>🔥 New Arrival 2026</span>
              <span>• RTX 4080 Super Laptops</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Power Your Game & Build With <span className="bg-gradient-to-r from-brand-400 to-rose-500 bg-clip-text text-transparent">Extreme Tech</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal">
              Egypt's premier hardware retailer for gaming laptops, PC components, GPUs, and custom workstation setups with official warranty.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/category/laptops"
                className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center gap-2"
              >
                Shop Gaming Laptops <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/category/gpus"
                className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold px-7 py-3.5 rounded-xl border border-slate-700 transition-all"
              >
                Explore Graphics Cards
              </Link>
            </div>
          </div>

          {/* Hero Featured Card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-rose-500 rounded-3xl blur-xl opacity-30"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <img
                src="https://images.unsplash.com/photo-1603302576837-37561b2e2302"
                alt="ASUS ROG Strix G16"
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider">Featured Laptop</span>
                  <h3 className="text-lg font-bold text-white">ASUS ROG Strix G16 (2024)</h3>
                  <p className="text-xs text-slate-400">Intel i7-14700HX | RTX 4070 | 16GB DDR5 | 1TB SSD</p>
                </div>
                <div className="text-right">
                  <span className="text-sm line-through text-slate-500 block">65,000 EGP</span>
                  <span className="text-xl font-extrabold text-brand-400">61,999 EGP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <Truck className="w-8 h-8 text-brand-500" />
            <div>
              <h4 className="text-sm font-bold text-white">Fast Nationwide Delivery</h4>
              <p className="text-xs text-slate-400">Across all Egypt Governorates</p>
            </div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-brand-500" />
            <div>
              <h4 className="text-sm font-bold text-white">Official Warranty</h4>
              <p className="text-xs text-slate-400">100% Genuine Products</p>
            </div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-brand-500" />
            <div>
              <h4 className="text-sm font-bold text-white">Flexible Payments</h4>
              <p className="text-xs text-slate-400">Paymob, Fawry, Cards & COD</p>
            </div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <Cpu className="w-8 h-8 text-brand-500" />
            <div>
              <h4 className="text-sm font-bold text-white">Expert Rig Assembly</h4>
              <p className="text-xs text-slate-400">Custom PC Build Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid Sample */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Latest Gaming Hardware</h2>
            <p className="text-xs text-slate-400">Top rated laptops, GPUs, and PC components in stock</p>
          </div>
          <Link href="/category/laptops" className="text-sm font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1">
            View Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3 group hover:border-slate-700 transition-all">
            <div className="relative overflow-hidden rounded-xl h-48 bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1603302576837-37561b2e2302"
                alt="ASUS ROG Strix G16"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">ASUS • Gaming Laptop</span>
              <h3 className="text-sm font-bold text-white line-clamp-1">ASUS ROG Strix G16 (2024)</h3>
              <div className="flex items-center gap-1 text-amber-400 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold">4.9</span>
                <span className="text-slate-500">(12 reviews)</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs line-through text-slate-500 block">65,000 EGP</span>
                <span className="text-lg font-extrabold text-brand-400">61,999 EGP</span>
              </div>
              <button className="bg-slate-800 hover:bg-brand-600 text-white p-2.5 rounded-xl transition-colors">
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3 group hover:border-slate-700 transition-all">
            <div className="relative overflow-hidden rounded-xl h-48 bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2"
                alt="MSI Katana 15"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">MSI • Gaming Laptop</span>
              <h3 className="text-sm font-bold text-white line-clamp-1">MSI Katana 15 B13V RTX 4060</h3>
              <div className="flex items-center gap-1 text-amber-400 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold">4.8</span>
                <span className="text-slate-500">(8 reviews)</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs line-through text-slate-500 block">48,000 EGP</span>
                <span className="text-lg font-extrabold text-brand-400">44,999 EGP</span>
              </div>
              <button className="bg-slate-800 hover:bg-brand-600 text-white p-2.5 rounded-xl transition-colors">
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
