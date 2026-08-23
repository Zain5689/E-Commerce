'use client';

import React from 'react';
import { Truck, ShieldCheck, CreditCard, Headphones, RefreshCw, Award } from 'lucide-react';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';

const BADGE_STYLES: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  t1: { icon: Truck, color: 'text-sky-400', bg: 'bg-sky-400/10 border-sky-400/20' },
  t2: { icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
  t3: { icon: CreditCard, color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' },
  t4: { icon: Headphones, color: 'text-brand-400', bg: 'bg-brand-400/10 border-brand-400/20' },
  t5: { icon: RefreshCw, color: 'text-violet-400', bg: 'bg-violet-400/10 border-violet-400/20' },
  t6: { icon: Award, color: 'text-rose-400', bg: 'bg-rose-400/10 border-rose-400/20' },
};

export const TrustBadgesSection: React.FC = () => {
  const { language } = useLanguageStore();
  const t = useTranslations(language);

  return (
    <section className="bg-slate-100 dark:bg-[#0d1526] border-y border-slate-200 dark:border-slate-800/60 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {t.trustBadges.map((badge) => {
            const style = BADGE_STYLES[badge.id] || BADGE_STYLES.t1;
            const Icon = style.icon;
            return (
              <div
                key={badge.id}
                className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700/60 bg-white dark:bg-transparent hover:shadow-sm transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center ${style.bg} group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-5 h-5 ${style.color}`} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-white">{badge.title}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
