'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SpecsFilterSidebar, FilterOption } from '../../../components/store/SpecsFilterSidebar';
import { ShoppingCart, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../../lib/store/useCartStore';
import { useLanguageStore } from '../../../lib/store/useLanguageStore';
import { useTranslations } from '../../../lib/data/translations';
import { FLASH_DEALS, FEATURED_PRODUCTS } from '../../../lib/data/homeData';

const CATEGORY_NAMES_EN: Record<string, string> = {
  'laptops': 'Laptops & Notebooks',
  'pc-components': 'PC Components & Hardware',
  'gpus': 'Graphics Cards (RTX 40 Series)',
  'ram-memory': 'RAM & High-Speed Storage',
  'monitors': 'Gaming Monitors & Displays',
  'all': 'All Categories & Hardware',
  'used': 'Certified Used & Refurbished',
  'audio': 'Smart Audio & Security Systems',
  'cctv': 'CCTV & Smart Security',
};

const CATEGORY_NAMES_AR: Record<string, string> = {
  'laptops': 'لابتوبات ونوتبوك الألعاب والعمل',
  'pc-components': 'قطع تجميع الكمبيوتر والهاردوير',
  'gpus': 'كروت الشاشة RTX 40 Series',
  'ram-memory': 'رامات وهاردات فائقة السرعة',
  'monitors': 'شاشات ألعاب عالية التردد',
  'all': 'جميع الفئات وقطع الهاردوير',
  'used': 'استيراد فرز أول كسر زيرو',
  'audio': 'صوتيات ذكية وأنظمة أمان',
  'cctv': 'كاميرات مراقبة وكوالين ذكية',
};

const FILTER_OPTIONS: FilterOption[] = [
  {
    key: 'brand',
    nameEn: 'Brand',
    nameAr: 'الماركة المصنعة',
    options: ['ASUS ROG', 'MSI', 'Corsair', 'Intel', 'Samsung', 'Lenovo', 'Kingston'],
  },
  {
    key: 'gpu',
    nameEn: 'Graphics Chipset',
    nameAr: 'كارت الشاشة',
    options: ['RTX 4090', 'RTX 4080 Super', 'RTX 4070 Ti', 'RTX 4070', 'RTX 4060'],
  },
  {
    key: 'ram',
    nameEn: 'RAM Capacity',
    nameAr: 'سعة الذاكرة الرام',
    options: ['16GB DDR5', '32GB DDR5', '64GB DDR5'],
  },
];

export default function CategoryPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'laptops';
  
  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  const categoryTitle = isArabic
    ? CATEGORY_NAMES_AR[slug] || slug
    : CATEGORY_NAMES_EN[slug] || slug.replace('-', ' ').toUpperCase();

  const addItem = useCartStore((state) => state.addItem);

  // Combine products for display
  const allProducts = [...FLASH_DEALS, ...FEATURED_PRODUCTS];
  const filteredProducts = allProducts.filter(
    (p) => p.category === slug || slug === 'all'
  );
  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : allProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb & Header */}
      <div className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-400 transition-colors"
        >
          {isArabic ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{t.backToHome}</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {categoryTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {t.showingProducts.replace('{count}', String(productsToDisplay.length))}
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
            {productsToDisplay.map((product) => {
              const productName = isArabic && product.nameAr ? product.nameAr : product.name;
              const productSpecs = isArabic && product.specsAr ? product.specsAr : product.specs;
              const productBadge = isArabic && product.badgeAr ? product.badgeAr : product.badge;

              return (
                <div
                  key={product.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3 group hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative overflow-hidden rounded-xl h-48 bg-slate-950">
                      <img
                        src={product.image}
                        alt={productName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className={`absolute top-2 ${isArabic ? 'right-2' : 'left-2'} bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded`}>
                        {productBadge || t.officialBadge}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-white line-clamp-1">{productName}</h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{productSpecs}</p>
                      <div className="flex items-center gap-1 text-amber-400 text-xs pt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold">{product.rating}</span>
                        <span className="text-slate-500">({product.reviewsCount} {t.reviewsCountSuffix})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 mt-2">
                    <div>
                      <span className="text-xs line-through text-slate-500 block">
                        {product.originalPrice.toLocaleString()} {t.currency}
                      </span>
                      <span className="text-lg font-extrabold text-brand-400">
                        {product.price.toLocaleString()} {t.currency}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        addItem({
                          productId: product.id,
                          name: productName,
                          price: product.price,
                          image: product.image,
                          quantity: 1,
                          sku: product.id,
                        })
                      }
                      className="bg-slate-800 hover:bg-brand-600 text-white p-2.5 rounded-xl transition-colors active:scale-95 shadow-md"
                      title={t.buyBtn}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
