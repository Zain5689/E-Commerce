'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SpecsFilterSidebar, FilterOption } from '../../../components/store/SpecsFilterSidebar';
import { ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../../../lib/store/useCartStore';

const CATEGORY_NAMES: Record<string, string> = {
  'laptops': 'Laptops & Notebooks',
  'pc-components': 'PC Components & Hardware',
  'gpus': 'Graphics Cards (RTX 40 Series)',
  'ram-memory': 'RAM & High-Speed Storage',
  'monitors': 'Gaming Monitors & Displays',
};

const SAMPLE_PRODUCTS = [
  {
    id: 'prod-1',
    category: 'laptops',
    name: 'ASUS ROG Strix G16 (2024)',
    specs: 'Intel i7-14700HX | RTX 4070 | 16GB DDR5 | 1TB SSD',
    price: 61999,
    originalPrice: 65000,
    rating: 4.9,
    reviews: 12,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302',
  },
  {
    id: 'prod-2',
    category: 'laptops',
    name: 'MSI Katana 15 B13V RTX 4060',
    specs: 'Intel i7-13620H | RTX 4060 | 16GB DDR5 | 512GB SSD',
    price: 44999,
    originalPrice: 48000,
    rating: 4.8,
    reviews: 8,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2',
  },
  {
    id: 'prod-3',
    category: 'gpus',
    name: 'MSI GeForce RTX 4080 Super Gaming X Slim 16G',
    specs: '16GB GDDR6X | Ada Lovelace | DLSS 3.5 | Triple Fan',
    price: 54500,
    originalPrice: 58000,
    rating: 5.0,
    reviews: 19,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7',
  },
  {
    id: 'prod-4',
    category: 'pc-components',
    name: 'Intel Core i9-14900K 24-Core Processor',
    specs: '6.0 GHz Turbo | LGA 1700 | 36MB Cache | Intel UHD 770',
    price: 26500,
    originalPrice: 28000,
    rating: 4.9,
    reviews: 25,
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086',
  },
  {
    id: 'prod-5',
    category: 'ram-memory',
    name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz',
    specs: 'CL30 | Intel XMP 3.0 & AMD EXPO | Black Heatspreader',
    price: 6800,
    originalPrice: 7400,
    rating: 4.9,
    reviews: 31,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186',
  },
  {
    id: 'prod-6',
    category: 'monitors',
    name: 'Samsung Odyssey G7 27" 240Hz QHD Curved Monitor',
    specs: '2560x1440 | 1ms | 1000R Curve | G-Sync Compatible | HDR600',
    price: 21000,
    originalPrice: 23500,
    rating: 4.7,
    reviews: 14,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
  },
];

const FILTER_OPTIONS: FilterOption[] = [
  {
    key: 'brand',
    nameEn: 'Brand',
    options: ['ASUS', 'MSI', 'Corsair', 'Intel', 'Samsung', 'Gigabyte'],
  },
  {
    key: 'gpu',
    nameEn: 'Graphics Chipset',
    options: ['RTX 4090', 'RTX 4080 Super', 'RTX 4070', 'RTX 4060'],
  },
  {
    key: 'ram',
    nameEn: 'RAM Capacity',
    options: ['16GB DDR5', '32GB DDR5', '64GB DDR5'],
  },
];

export default function CategoryPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'laptops';
  const categoryTitle = CATEGORY_NAMES[slug] || slug.replace('-', ' ').toUpperCase();
  const addItem = useCartStore((state) => state.addItem);

  // Filter products by category or show related
  const filteredProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.category === slug || slug === 'all'
  );
  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : SAMPLE_PRODUCTS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb & Header */}
      <div className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {categoryTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Showing {productsToDisplay.length} verified hardware products with official warranty
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <SpecsFilterSidebar
            specFilters={FILTER_OPTIONS}
            onFilterChange={(specs) => console.log('Filters changed:', specs)}
          />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {productsToDisplay.map((product) => (
              <div
                key={product.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3 group hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative overflow-hidden rounded-xl h-48 bg-slate-950">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      OFFICIAL
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{product.specs}</p>
                    <div className="flex items-center gap-1 text-amber-400 text-xs pt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">{product.rating}</span>
                      <span className="text-slate-500">({product.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 mt-2">
                  <div>
                    <span className="text-xs line-through text-slate-500 block">
                      {product.originalPrice.toLocaleString()} EGP
                    </span>
                    <span className="text-lg font-extrabold text-brand-400">
                      {product.price.toLocaleString()} EGP
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      addItem({
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                        sku: product.id,
                      })
                    }
                    className="bg-slate-800 hover:bg-brand-600 text-white p-2.5 rounded-xl transition-colors active:scale-95 shadow-md"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
