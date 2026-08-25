'use client';

import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS as FALLBACK_TESTIMONIALS } from '../../lib/data/homeData';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';
import { homeApi } from '../../lib/api/apiClient';

export const TestimonialsSection: React.FC = () => {
  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);
  const [testimonials, setTestimonials] = useState<any[]>(FALLBACK_TESTIMONIALS);

  useEffect(() => {
    homeApi.getHomeData().then((res) => {
      if (res.data && res.data.testimonials && res.data.testimonials.length > 0) {
        setTestimonials(res.data.testimonials);
      }
    }).catch(() => {/* fallback */});
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {t.testimonialsHeader}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {t.testimonialsSubheader}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {testimonials.map((item) => (
          <div
            key={item._id || item.id}
            className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 space-y-3 hover:border-slate-300 dark:hover:border-slate-700/60 hover:shadow-md dark:hover:shadow-none transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                &ldquo;{isArabic ? (item.commentAr || item.comment) : item.comment}&rdquo;
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60 mt-2">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {isArabic ? (item.customerNameAr || item.customerName) : item.customerName}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  {isArabic ? (item.dateAr || item.date) : item.date}
                </p>
              </div>
              {item.verified && (
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.verifiedBuyer}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stats Row */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {t.stats.map((item) => (
          <div
            key={item.label}
            className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800/60 rounded-2xl p-4 text-center hover:border-brand-300 dark:hover:border-brand-500/30 hover:shadow-sm transition-all"
          >
            <div className="text-2xl font-black text-brand-600 dark:text-brand-400 font-mono">{item.stat}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
