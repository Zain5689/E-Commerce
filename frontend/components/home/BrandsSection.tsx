'use client';

import React from 'react';
import Link from 'next/link';
import { TOP_BRANDS } from '../../lib/data/homeData';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';

export const BrandsSection: React.FC = () => {
  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  return (
    <section className="bg-[#0d1526] border-y border-slate-800/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-black text-white">{t.brandsHeader}</h2>
          <p className="text-xs text-slate-400">{t.brandsSubheader}</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3">
          {TOP_BRANDS.map((brand) => (
            <Link
              key={brand.id}
              href={`/brand/${brand.id}`}
              className="group flex flex-col items-center justify-center px-5 py-3 rounded-2xl bg-[#131b2e] border border-slate-800/80 hover:border-brand-500/50 hover:bg-[#162138] transition-all cursor-pointer min-w-[110px]"
            >
              <span className="text-base font-black tracking-tight text-slate-200 group-hover:text-brand-300 transition-colors">
                {brand.logo}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 group-hover:text-slate-400 transition-colors text-center leading-tight">
                {isArabic ? brand.taglineAr : brand.tagline}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
