'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { SpecsFilterSidebar, FilterOption } from '../../../components/store/SpecsFilterSidebar';
import { ProductCard } from '../../../components/store/ProductCard';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useLanguageStore } from '../../../lib/store/useLanguageStore';
import { useTranslations } from '../../../lib/data/translations';
import { FLASH_DEALS, FEATURED_PRODUCTS } from '../../../lib/data/homeData';
import { productsApi } from '../../../lib/api/apiClient';

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
  'pc-builds': 'Custom PC Builds',
  'accessories': 'Accessories & Peripherals',
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
  'pc-builds': 'تجميعات كمبيوتر احترافية',
  'accessories': 'ملحقات وإكسسوارات',
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

const STATIC_PRODUCTS = [...FLASH_DEALS, ...FEATURED_PRODUCTS] as any[];

export default function CategoryPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'laptops';

  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const categoryTitle = isArabic
    ? CATEGORY_NAMES_AR[slug] || slug
    : CATEGORY_NAMES_EN[slug] || slug.replace('-', ' ').toUpperCase();

  useEffect(() => {
    setLoading(true);
    const params: Record<string, any> = { limit: 48 };
    if (slug !== 'all') params.category = slug;

    productsApi.getAll(params)
      .then((res) => {
        const items = res.data?.items || [];
        if (items.length > 0) {
          setProducts(items);
          setTotalCount(res.data?.meta?.total || items.length);
        } else {
          // fallback to static
          const filtered = STATIC_PRODUCTS.filter((p) => p.category === slug || slug === 'all');
          setProducts(filtered.length > 0 ? filtered : STATIC_PRODUCTS);
          setTotalCount(filtered.length > 0 ? filtered.length : STATIC_PRODUCTS.length);
        }
      })
      .catch(() => {
        const filtered = STATIC_PRODUCTS.filter((p) => p.category === slug || slug === 'all');
        setProducts(filtered.length > 0 ? filtered : STATIC_PRODUCTS);
        setTotalCount(filtered.length > 0 ? filtered.length : STATIC_PRODUCTS.length);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb & Header */}
      <div className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          {isArabic ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{t.backToHome}</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {categoryTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {loading
                ? (isArabic ? 'جاري التحميل...' : 'Loading...')
                : t.showingProducts.replace('{count}', String(totalCount))}
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
          {loading ? (
            <div className="flex items-center justify-center h-60">
              <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id || product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
