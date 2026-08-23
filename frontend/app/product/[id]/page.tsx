'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Home, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { getProductById } from '../../../lib/data/homeData';
import { ProductGallery } from '../../../components/product/ProductGallery';
import { ProductBuyBox } from '../../../components/product/ProductBuyBox';
import { ProductTabs } from '../../../components/product/ProductTabs';
import { RelatedProducts } from '../../../components/product/RelatedProducts';
import { StickyMobileBar } from '../../../components/product/StickyMobileBar';
import { useLanguageStore } from '../../../lib/store/useLanguageStore';
import { useTranslations } from '../../../lib/data/translations';

const CATEGORY_NAMES_AR: Record<string, string> = {
  'laptops': 'لابتوبات ونوتبوك',
  'pc-components': 'قطع تجميع PC',
  'pc-builds': 'تجميعات كمبيوتر احترافية',
  'gpus': 'كروت الشاشة RTX',
  'monitors': 'شاشات الألعاب',
  'used': 'استيراد فرز أول',
  'audio': 'صوتيات وسماعات',
  'accessories': 'ملحقات وإكسسوارات',
};

const CATEGORY_NAMES_EN: Record<string, string> = {
  'laptops': 'Laptops & Notebooks',
  'pc-components': 'PC Components',
  'pc-builds': 'Custom PC Builds',
  'gpus': 'Graphics Cards (RTX)',
  'monitors': 'Gaming Monitors',
  'used': 'Certified Used',
  'audio': 'Audio & Speakers',
  'accessories': 'Accessories & RAM',
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || '';

  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
          <AlertCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white">
            {t.productDetails?.productNotFound || 'Product Not Found'}
          </h1>
          <p className="text-sm text-slate-400">
            {isArabic
              ? 'المنتج الذي تبحث عنه قد يكون نفد من المخزون أو تم تغيير رابطه.'
              : 'The product you are looking for might have been sold out or moved.'}
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-xl transition-all"
        >
          {isArabic ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{t.productDetails?.returnToStore || 'Return to Store'}</span>
        </Link>
      </div>
    );
  }

  const productName = isArabic && product.nameAr ? product.nameAr : product.name;
  const categorySlug = product.category || 'all';
  const categoryTitle = isArabic
    ? CATEGORY_NAMES_AR[categorySlug] || categorySlug
    : CATEGORY_NAMES_EN[categorySlug] || categorySlug;

  const ChevronIcon = isArabic ? ChevronLeft : ChevronRight;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 overflow-x-auto pb-1 scrollbar-none">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-brand-400 transition-colors whitespace-nowrap"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t.productDetails?.home || 'Home'}</span>
          </Link>

          <ChevronIcon className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />

          <Link
            href={`/category/${categorySlug}`}
            className="hover:text-brand-400 transition-colors whitespace-nowrap"
          >
            {categoryTitle}
          </Link>

          <ChevronIcon className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />

          <span className="text-slate-200 font-semibold truncate max-w-xs sm:max-w-md">
            {productName}
          </span>
        </nav>

        {/* Top Section: Gallery (Left) & Buy Box (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Gallery Column */}
          <div className="lg:col-span-6 xl:col-span-7">
            <ProductGallery product={product} />
          </div>

          {/* Buy Box Column */}
          <div className="lg:col-span-6 xl:col-span-5">
            <ProductBuyBox product={product} />
          </div>
        </div>

        {/* Detailed Tabs Section */}
        <ProductTabs product={product} />

        {/* Related Hardware Recommendations */}
        <RelatedProducts currentProduct={product} />
      </div>

      {/* Sticky Bottom Bar for Mobile */}
      <StickyMobileBar product={product} />
    </div>
  );
}
