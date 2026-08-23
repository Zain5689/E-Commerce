'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { Product, getAllProducts } from '../../lib/data/homeData';
import { ProductCard } from '../store/ProductCard';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';

interface RelatedProductsProps {
  currentProduct: Product;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct }) => {
  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  const allProducts = getAllProducts();
  // Filter other products in the same category or high-rated
  const related = allProducts
    .filter((p) => p.id !== currentProduct.id)
    .filter((p) => p.category === currentProduct.category || p.rating >= 4.8)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="space-y-6 pt-10 border-t border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span>{t.productDetails?.relatedProductsTitle || 'Related Products & Hardware'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.productDetails?.relatedProductsSubtitle || 'Compatible and recommended items by our engineers'}
          </p>
        </div>

        <Link
          href={`/category/${currentProduct.category || 'all'}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 transition-colors self-start sm:self-auto"
        >
          <span>{t.viewAllBtn || 'View All'}</span>
          {isArabic ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};
