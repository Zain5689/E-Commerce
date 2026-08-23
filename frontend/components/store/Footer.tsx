'use client';

import React from 'react';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';

export const Footer: React.FC = () => {
  const language = useLanguageStore((state) => state.language);
  const t = useTranslations(language);

  return (
    <footer className="bg-slate-100 dark:bg-[#0f172a] border-t border-slate-200 dark:border-slate-800 py-10 px-4 text-center text-xs text-slate-500 dark:text-slate-500 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 dark:text-slate-500">{t.footerCopyright}</p>
        <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400">
          <span>{t.footerWarranty}</span>
          <span>•</span>
          <span>{t.footerDelivery}</span>
          <span>•</span>
          <span>{t.footerPayments}</span>
        </div>
      </div>
    </footer>
  );
};
