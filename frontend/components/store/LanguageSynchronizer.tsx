'use client';

import React, { useEffect } from 'react';
import { useLanguageStore } from '../../lib/store/useLanguageStore';

export const LanguageSynchronizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language = useLanguageStore((state) => state.language);
  const isArabic = language === 'ar';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    }
  }, [language, isArabic]);

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className={`w-full min-h-screen flex flex-col ${isArabic ? 'font-arabic' : ''}`}>
      {children}
    </div>
  );
};
