'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Timer } from 'lucide-react';
import { FLASH_DEALS } from '../../lib/data/homeData';
import { ProductCard } from '../store/ProductCard';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';

function useCountdown(targetHours = 6) {
  const [timeLeft, setTimeLeft] = useState({ h: targetHours, m: 0, s: 0 });

  useEffect(() => {
    const target = Date.now() + targetHours * 3600 * 1000;
    const tick = () => {
      const diff = Math.max(target - Date.now(), 0);
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetHours]);

  return timeLeft;
}

export const FlashDealsSection: React.FC = () => {
  const { h, m, s } = useCountdown(5);
  const { language } = useLanguageStore();
  const t = useTranslations(language);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      {/* Header with Countdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-600/40 flex items-center justify-center">
            <Zap className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {t.flashDealsHeader}
              </h2>
              <span className="text-xs font-bold bg-rose-600 text-white px-2 py-0.5 rounded-md animate-pulse">
                {t.flashDealsBadge}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.flashDealsSubheader}</p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">{t.endsIn}</span>
          <div className="flex items-center gap-1 font-mono font-black text-sm">
            {[
              { val: h, label: t.hoursLabel },
              { val: m, label: t.minutesLabel },
              { val: s, label: t.secondsLabel },
            ].map(({ val, label }, idx) => (
              <React.Fragment key={label}>
                {idx > 0 && <span className="text-brand-500">:</span>}
                <div className="bg-slate-100 dark:bg-[#131b2e] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-2 py-1 rounded-lg min-w-[36px] text-center">
                  {String(val).padStart(2, '0')}
                  <span className="text-[8px] font-normal text-slate-500 block -mt-0.5">{label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <Link
          href="/deals"
          className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors sm:ml-0 ml-auto"
        >
          {t.allDealsBtn}
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FLASH_DEALS.map((product) => (
          <ProductCard key={product.id} product={product} showProgress />
        ))}
      </div>
    </section>
  );
};
