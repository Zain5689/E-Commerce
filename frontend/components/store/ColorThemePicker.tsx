'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useThemeStore, COLOR_THEMES, ColorTheme } from '../../lib/store/useThemeStore';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';

interface ColorThemePickerProps {
  compact?: boolean;
  className?: string;
}

export const ColorThemePicker: React.FC<ColorThemePickerProps> = ({ compact = false, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { colorTheme, setColorTheme } = useThemeStore();
  const language = useLanguageStore((state) => state.language);
  const isArabic = language === 'ar';
  const t = useTranslations(language);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) return null;

  const currentThemeObj = COLOR_THEMES.find((c) => c.id === colorTheme) || COLOR_THEMES[0];

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold transition-all text-xs active:scale-95 shadow-sm group"
        title={t.colorThemeLabel || 'Color Theme'}
        aria-expanded={isOpen}
      >
        <span
          className="w-3 h-3 rounded-full shadow-sm ring-1 ring-white/40 transition-transform group-hover:scale-110 flex-shrink-0"
          style={{ backgroundColor: currentThemeObj.primaryHex }}
        />
        <Palette className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-brand-500 transition-colors" />
        <span className="hidden sm:inline text-[11px] font-semibold">
          {isArabic ? currentThemeObj.nameAr.split(' ')[0] : currentThemeObj.nameEn}
        </span>
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div
          className={`absolute ${
            isArabic ? 'left-0' : 'right-0'
          } mt-2 w-64 p-3 rounded-2xl bg-white/95 dark:bg-[#0e1526]/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700/80 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150`}
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-brand-500" />
              {t.colorThemeLabel || 'لون الواجهة'}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
              6 {isArabic ? 'ألوان نيون' : 'Palettes'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {COLOR_THEMES.map((theme) => {
              const isSelected = colorTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    setColorTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-2.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 border border-brand-300 dark:border-brand-600/40 shadow-sm'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full shadow-md ring-2 ring-white dark:ring-slate-900 flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: theme.primaryHex }}
                    />
                    <span>{isArabic ? theme.nameAr : theme.nameEn}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-brand-500 animate-in zoom-in" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
