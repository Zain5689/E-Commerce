'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TOP_BRANDS as FALLBACK_BRANDS } from '../../lib/data/homeData';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';
import { brandsApi } from '../../lib/api/apiClient';

export const BrandsSection: React.FC = () => {
  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);
  const [brands, setBrands] = useState<any[]>(FALLBACK_BRANDS);

  useEffect(() => {
    brandsApi.getAll().then((res) => {
      if (res.data && res.data.length > 0) {
        setBrands(res.data);
      }
    }).catch(() => {/* fallback */});
  }, []);

  return (
    <section className="bg-slate-100 dark:bg-[#0d1526] border-y border-slate-200 dark:border-slate-800/60 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">{t.brandsHeader}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t.brandsSubheader}</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3">
          {brands.map((brand) => (
            <Link
              key={brand._id || brand.id || brand.slug}
              href={`/brand/${brand.slug || brand.id}`}
              className="group flex flex-col items-center justify-center px-5 py-3 rounded-2xl bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800/80 hover:border-brand-400 dark:hover:border-brand-500/50 hover:bg-brand-50 dark:hover:bg-[#162138] shadow-sm dark:shadow-none hover:shadow-md transition-all cursor-pointer min-w-[110px]"
            >
              <span className="text-base font-black tracking-tight text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                {brand.name || brand.logo}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors text-center leading-tight">
                {isArabic ? (brand.taglineAr || brand.name) : (brand.tagline || brand.name)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
