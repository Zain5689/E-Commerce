'use client';

import React, { useEffect, useState } from 'react';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useThemeStore } from '../../lib/store/useThemeStore';

export const LanguageSynchronizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language = useLanguageStore((state) => state.language);
  const isArabic = language === 'ar';
  const { theme, colorTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = isArabic ? 'rtl' : 'ltr';

      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }

      if (colorTheme) {
        document.documentElement.setAttribute('data-color-theme', colorTheme);
      }
    }
  }, [language, isArabic, theme, colorTheme]);

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`w-full min-h-screen flex flex-col transition-colors duration-300 ${
        isArabic ? 'font-arabic' : ''
      }`}
    >
      {children}
    </div>
  );
};
