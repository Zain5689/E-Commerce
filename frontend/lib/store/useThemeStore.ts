import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ThemeMode = 'dark' | 'light';
export type ColorTheme = 'blue' | 'purple' | 'emerald' | 'cyan' | 'amber' | 'rose';

export interface ColorThemeOption {
  id: ColorTheme;
  nameAr: string;
  nameEn: string;
  primaryHex: string;
  badgeHex: string;
}

export const COLOR_THEMES: ColorThemeOption[] = [
  { id: 'blue', nameAr: 'أزرق ملكي (Electric Blue)', nameEn: 'Electric Blue', primaryHex: '#2563eb', badgeHex: '#3b82f6' },
  { id: 'purple', nameAr: 'بنفسجي نيون (Electric Violet)', nameEn: 'Electric Violet', primaryHex: '#9333ea', badgeHex: '#a855f7' },
  { id: 'emerald', nameAr: 'أخضر زمردي (Cyber Emerald)', nameEn: 'Cyber Emerald', primaryHex: '#059669', badgeHex: '#10b981' },
  { id: 'cyan', nameAr: 'سايبر سيان (Neon Cyan)', nameEn: 'Neon Cyan', primaryHex: '#0891b2', badgeHex: '#06b6d4' },
  { id: 'amber', nameAr: 'ذهبي عنبري (Cyber Amber)', nameEn: 'Cyber Amber', primaryHex: '#d97706', badgeHex: '#f59e0b' },
  { id: 'rose', nameAr: 'أحمر قرمزي (Crimson Rose)', nameEn: 'Crimson Rose', primaryHex: '#e11d48', badgeHex: '#f43f5e' },
];

interface ThemeStore {
  theme: ThemeMode;
  colorTheme: ColorTheme;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
  isDark: boolean;
}

const applyThemeToDOM = (theme: ThemeMode, colorTheme: ColorTheme) => {
  if (typeof document === 'undefined') return;
  
  // Apply dark/light class
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }

  // Apply color dataset
  document.documentElement.setAttribute('data-color-theme', colorTheme);
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      colorTheme: 'blue', // Default to sleek Electric Blue instead of plain red
      isDark: true,
      setTheme: (theme) => {
        set({ theme, isDark: theme === 'dark' });
        applyThemeToDOM(theme, get().colorTheme);
      },
      toggleTheme: () => {
        const nextTheme: ThemeMode = get().theme === 'dark' ? 'light' : 'dark';
        set({ theme: nextTheme, isDark: nextTheme === 'dark' });
        applyThemeToDOM(nextTheme, get().colorTheme);
      },
      setColorTheme: (colorTheme) => {
        set({ colorTheme });
        applyThemeToDOM(get().theme, colorTheme);
      },
    }),
    {
      name: 'nexus-store-theme',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          applyThemeToDOM(state.theme || 'dark', state.colorTheme || 'blue');
        }
      },
    }
  )
);
