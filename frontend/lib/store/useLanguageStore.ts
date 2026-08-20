import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Language = 'ar' | 'en';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isArabic: boolean;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: 'ar', // Default to Arabic as primary locale for Egyptian market
      isArabic: true,
      setLanguage: (language) => {
        set({ language, isArabic: language === 'ar' });
        if (typeof document !== 'undefined') {
          document.documentElement.lang = language;
          document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        }
      },
      toggleLanguage: () => {
        const nextLang: Language = get().language === 'ar' ? 'en' : 'ar';
        set({ language: nextLang, isArabic: nextLang === 'ar' });
        if (typeof document !== 'undefined') {
          document.documentElement.lang = nextLang;
          document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
        }
      },
    }),
    {
      name: 'nexus-store-language',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          document.documentElement.lang = state.language;
          document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
        }
      },
    }
  )
);
