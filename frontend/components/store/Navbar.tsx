'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Heart, Menu, X, Cpu, PhoneCall, Globe, Sun, Moon } from 'lucide-react';
import { useCartStore } from '../../lib/store/useCartStore';
import { useWishlistStore } from '../../lib/store/useWishlistStore';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useThemeStore } from '../../lib/store/useThemeStore';
import { useTranslations } from '../../lib/data/translations';
import { ColorThemePicker } from './ColorThemePicker';
import { productsApi } from '../../lib/api/apiClient';
import { useRouter } from 'next/navigation';

export const Navbar: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const toggleCart = useCartStore((state) => state.toggleCart);
  const totalWishlistItems = useWishlistStore((state) => state.getTotalItems());

  const { language, toggleLanguage, isArabic } = useLanguageStore();
  const { theme, toggleTheme, isDark } = useThemeStore();
  const t = useTranslations(language);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const timer = setTimeout(() => {
      productsApi.autocomplete(searchQuery).then((res) => {
        setSuggestions(res.data || []);
        setShowSuggestions(true);
      }).catch(() => {});
    }, 280);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      router.push(`/category/all?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (product: any) => {
    const id = product.id || product._id;
    setShowSuggestions(false);
    setSearchQuery('');
    router.push(`/product/${id}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Top Banner */}
      <div className="bg-brand-50 dark:bg-brand-900/60 border-b border-brand-200 dark:border-brand-700/40 py-1.5 px-4 text-xs font-medium flex justify-between items-center text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400">
            <PhoneCall className="w-3.5 h-3.5" /> {t.hotline} <strong className="text-slate-900 dark:text-white font-mono">{t.hotlineNumber}</strong>
          </span>
          <span className="hidden md:inline text-slate-500 dark:text-slate-400">| {t.topBannerTag}</span>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Color Theme Switcher */}
          <ColorThemePicker />

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 dark:hover:bg-brand-600 border border-slate-300 dark:border-slate-700 hover:border-brand-500 text-slate-700 dark:text-white hover:text-white font-bold transition-all text-xs active:scale-95 shadow-sm"
            title="تبديل اللغة / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-brand-500" />
            <span>{t.languageToggle}</span>
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border font-bold transition-all text-xs active:scale-95 shadow-sm ${
                isDark
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 hover:bg-amber-500/20'
                  : 'bg-slate-800/10 border-slate-500/40 text-slate-600 hover:bg-slate-800/20'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.themeToggleLight}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.themeToggleDark}</span>
                </>
              )}
            </button>
          )}

          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link href="/account" className="hover:text-brand-600 dark:hover:text-white transition-colors">
            {t.trackOrder}
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              NEXUS<span className="text-brand-500">STORE</span>
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold -mt-1">
              {isArabic ? 'متجر الهاردوير والكمبيوتر' : 'Hardware & Tech'}
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative hidden md:block">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className={`w-full bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 rounded-xl py-2.5 ${
                  isArabic ? 'pr-4 pl-12' : 'pl-4 pr-12'
                } text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all`}
              />
              <button
                type="submit"
                className={`absolute ${
                  isArabic ? 'left-2' : 'right-2'
                } top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white hover:bg-brand-500 transition-colors`}
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
          {/* Autocomplete Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full mt-2 left-0 right-0 z-50 bg-white dark:bg-[#0e1526] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
              {suggestions.map((s) => {
                const sid = s.id || s._id;
                return (
                  <button
                    key={sid}
                    onMouseDown={() => handleSuggestionClick(s)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    {s.image && (
                      <img src={s.image} alt={s.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {isArabic && s.nameAr ? s.nameAr : s.name}
                      </p>
                      <p className="text-xs text-brand-500 font-bold">
                        {s.price?.toLocaleString()} EGP
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/account"
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60"
            title={t.myAccount}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium hidden lg:inline">{t.signIn}</span>
          </Link>

          <Link
            href="/wishlist"
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-white transition-colors rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60"
            title={t.wishlist}
          >
            <Heart className="w-5 h-5" />
            {mounted && totalWishlistItems > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/40 animate-pulse">
                {totalWishlistItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => toggleCart(true)}
            className="relative flex items-center gap-2.5 bg-brand-600/90 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-brand-600/20 active:scale-95"
            title={t.cart}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline">{t.cart}</span>
            {mounted && totalCartItems > 0 && (
              <span className="bg-white text-brand-700 text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {totalCartItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <nav className="hidden md:block bg-slate-100/80 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-8 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <Link href="/category/laptops" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1.5">
            {t.navCategories.laptops}
          </Link>
          <Link href="/category/pc-components" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            {t.navCategories.pcComponents}
          </Link>
          <Link href="/category/gpus" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-rose-500 font-bold">
            {t.navCategories.gpus}
          </Link>
          <Link href="/category/ram-memory" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            {t.navCategories.ramMemory}
          </Link>
          <Link href="/category/monitors" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            {t.navCategories.monitors}
          </Link>
          <Link
            href="/deals"
            className={`hover:text-amber-500 transition-colors text-amber-500 font-bold ${
              isArabic ? 'mr-auto' : 'ml-auto'
            }`}
          >
            {t.navCategories.flashDeals}
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl py-2 px-4 text-xs text-slate-800 dark:text-slate-200"
            />
          </div>
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <Link
              href="/category/laptops"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {t.navCategories.laptops}
            </Link>
            <Link
              href="/category/pc-components"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {t.navCategories.pcComponents}
            </Link>
            <Link
              href="/category/gpus"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-rose-500 font-bold"
            >
              {t.navCategories.gpus}
            </Link>
            <Link
              href="/category/ram-memory"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {t.navCategories.ramMemory}
            </Link>
            <Link
              href="/category/monitors"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {t.navCategories.monitors}
            </Link>
            <Link
              href="/deals"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-amber-500 font-bold"
            >
              {t.navCategories.flashDeals}
            </Link>
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                {t.signIn}
              </Link>
              <div className="flex items-center gap-2">
                {/* Color theme in mobile */}
                <ColorThemePicker />

                {/* Theme toggle in mobile */}
                <button
                  onClick={toggleTheme}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-bold transition-all ${
                    isDark
                      ? 'bg-amber-500/10 border-amber-400/40 text-amber-400'
                      : 'bg-slate-800/10 border-slate-500/30 text-slate-600'
                  }`}
                >
                  {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  {isDark ? t.themeToggleLight : t.themeToggleDark}
                </button>
                <button
                  onClick={() => {
                    toggleLanguage();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 text-xs text-brand-500 font-bold py-1"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{t.languageToggle}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
