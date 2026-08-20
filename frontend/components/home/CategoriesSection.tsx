'use client';

import React from 'react';
import Link from 'next/link';
import { Laptop, Cpu, Zap, Tv, ShieldCheck, Headphones, HardDrive, Camera } from 'lucide-react';
import { POPULAR_CATEGORIES } from '../../lib/data/homeData';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Laptop,
  Cpu,
  Zap,
  Tv,
  ShieldCheck,
  Headphones,
  HardDrive,
  Camera,
};

export const CategoriesSection: React.FC = () => {
  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {t.categoriesHeader}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.categoriesSubheader}
          </p>
        </div>
        <Link
          href="/category/all"
          className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
        >
          {t.allCategoriesBtn}
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {POPULAR_CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.iconName] || Cpu;
          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center text-center gap-2 p-3 rounded-2xl bg-[#131b2e] border border-slate-800/80 hover:border-brand-500/50 hover:bg-[#162138] transition-all duration-200 cursor-pointer"
            >
              {/* Icon Box */}
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/60 group-hover:border-brand-500/60 flex items-center justify-center transition-all group-hover:bg-brand-500/10 relative overflow-hidden">
                <img
                  src={cat.image}
                  alt={isArabic ? cat.titleAr : cat.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                />
                <Icon className="w-5 h-5 text-brand-400 relative z-10 group-hover:text-brand-300" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-200 leading-tight group-hover:text-brand-300 transition-colors line-clamp-2">
                  {isArabic ? cat.titleAr : cat.title}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5 hidden sm:block">
                  {isArabic ? cat.itemCountAr : cat.itemCount}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
