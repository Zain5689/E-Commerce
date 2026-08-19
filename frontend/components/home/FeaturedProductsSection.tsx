'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Grid, Laptop, Cpu, Zap, Archive, Tv, Package } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../../lib/data/homeData';
import { ProductCard } from '../store/ProductCard';

type TabId = 'all' | 'laptops' | 'pc-builds' | 'gpus' | 'used' | 'monitors' | 'audio';

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', label: 'الكل', icon: Grid },
  { id: 'laptops', label: 'Laptops', icon: Laptop },
  { id: 'pc-builds', label: 'PC Builds', icon: Cpu },
  { id: 'gpus', label: 'GPUs', icon: Zap },
  { id: 'used', label: 'استيراد (Used)', icon: Archive },
  { id: 'monitors', label: 'Monitors', icon: Tv },
  { id: 'audio', label: 'Audio & CCTV', icon: Package },
];

export const FeaturedProductsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('all');

  const filtered =
    activeTab === 'all'
      ? FEATURED_PRODUCTS
      : FEATURED_PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Featured Products
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">المنتجات المميزة والأكثر مبيعاً</p>
        </div>
        <Link
          href="/category/all"
          className="text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors"
        >
          View All →
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'bg-[#131b2e] text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-slate-500 text-sm">
            No products in this category yet.
          </div>
        )}
      </div>
    </section>
  );
};
