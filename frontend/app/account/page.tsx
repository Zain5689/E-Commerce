'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  ShoppingBag,
  MapPin,
  Shield,
  LogOut,
  Eye,
  EyeOff,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  Plus,
  Edit2,
  Trash2,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  X,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';

type DashboardTab = 'overview' | 'orders' | 'addresses' | 'profile';

const MOCK_USER = {
  name: 'Eng. Ahmed El-Sayed',
  nameAr: 'م. أحمد السيد',
  email: 'ahmed.elsayed@gmail.com',
  phone: '01014227788',
  memberSince: '2024',
  totalSpent: 145999,
  activeOrders: 2,
  completedOrders: 12,
};

const MOCK_ORDERS = [
  {
    id: 'NX-89210',
    date: '18 August 2026',
    dateAr: '١٨ أغسطس ٢٠٢٦',
    status: 'shipped',
    total: 89999,
    items: [
      { name: 'Nexus Alpha RTX 4080 Super Custom PC', qty: 1, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=150&q=80' },
      { name: 'Corsair Vengeance RGB 32GB DDR5', qty: 1, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=150&q=80' },
    ],
    trackingStep: 3,
  },
  {
    id: 'NX-78401',
    date: '14 August 2026',
    dateAr: '١٤ أغسطس ٢٠٢٦',
    status: 'processing',
    total: 20999,
    items: [
      { name: 'Samsung Odyssey G7 27" 240Hz Curved Monitor', qty: 1, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=150&q=80' },
    ],
    trackingStep: 1,
  },
  {
    id: 'NX-54219',
    date: '25 July 2026',
    dateAr: '٢٥ يوليو ٢٠٢٦',
    status: 'delivered',
    total: 35000,
    items: [
      { name: 'Lenovo Legion Pro 5 16IRX8 Gaming Laptop', qty: 1, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=150&q=80' },
    ],
    trackingStep: 4,
  },
];

const MOCK_ADDRESSES = [
  {
    id: 'addr-1',
    title: 'Home (المنزل)',
    name: 'Ahmed El-Sayed',
    phone: '01014227788',
    city: 'Cairo - Maadi',
    cityAr: 'القاهرة - المعادي الجديدة',
    address: 'Bldg 45, Street 250, Degla Maadi, 3rd Floor',
    isDefault: true,
  },
  {
    id: 'addr-2',
    title: 'Work / Office (العمل)',
    name: 'Ahmed El-Sayed',
    phone: '01014227788',
    city: 'New Cairo - 5th Settlement',
    cityAr: 'القاهرة الجديدة - التجمع الخامس',
    address: 'Silver Mall, Sector 1, Office 204',
    isDefault: false,
  },
];

export default function AccountPage() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Dashboard active tab
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  // Tracking modal
  const [trackingOrder, setTrackingOrder] = useState<typeof MOCK_ORDERS[0] | null>(null);

  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400">
        <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
          <User className="w-12 h-12 text-slate-400 dark:text-slate-700 animate-bounce" />
          <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[75vh]">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          {isArabic ? 'الرئيسية' : 'Home'}
        </Link>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">{t.accountPageTitle}</span>
      </div>

      {/* Header Banner with Preview Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-600/20 border border-brand-500/30 flex items-center justify-center">
            <User className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isLoggedIn ? (isArabic ? `أهلاً بك، ${MOCK_USER.nameAr}` : `Welcome, ${MOCK_USER.name}`) : t.accountPageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {isLoggedIn ? t.userBadge : t.accountSubTitle}
            </p>
          </div>
        </div>

        {/* Quick Demo Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
            {isArabic ? 'معاينة وضع العميل:' : 'Preview Mode:'}
          </span>
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm"
          >
            {isLoggedIn ? (isArabic ? '← عرض نموذج الدخول' : '← Switch to Sign In') : (isArabic ? 'عرض لوحة العميل (Dashboard) →' : 'View Dashboard Preview →')}
          </button>
        </div>
      </div>

      {!isLoggedIn ? (
        /* GUEST / AUTHENTICATION CARD */
        <div className="max-w-md mx-auto bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl space-y-6 transition-colors">
          {/* Tab Switcher */}
          <div className="flex bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-1">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                authMode === 'login'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.tabSignIn}
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                authMode === 'register'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.tabRegister}
            </button>
          </div>

          {authMode === 'login' ? (
            /* SIGN IN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  {t.emailOrPhone}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder={t.emailOrPhonePlaceholder}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors shadow-inner"
                  />
                  <Mail className={`w-4 h-4 text-slate-400 dark:text-slate-500 absolute ${isArabic ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2`} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t.password}
                  </label>
                  <button
                    type="button"
                    onClick={() => alert(isArabic ? 'تم إرسال رابط استعادة كلمة المرور إلى بريدك' : 'Password reset link sent!')}
                    className="text-[11px] text-brand-600 dark:text-brand-400 hover:underline font-medium"
                  >
                    {t.forgotPassword}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder={t.passwordPlaceholder}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300`}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="rememberMe"
                  defaultChecked
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-brand-600 focus:ring-brand-500"
                />
                <label htmlFor="rememberMe" className="text-xs text-slate-600 dark:text-slate-400 select-none cursor-pointer">
                  {t.rememberMe}
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 text-sm active:scale-98"
              >
                <span>{t.loginBtn}</span>
                {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.fullNamePlaceholder}
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  {t.emailAddress}
                </label>
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  {t.phoneNumber}
                </label>
                <input
                  type="tel"
                  required
                  placeholder={t.phonePlaceholder}
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors font-mono shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  {t.password}
                </label>
                <input
                  type="password"
                  required
                  placeholder={t.passwordPlaceholder}
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors shadow-inner"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  required
                  id="agreeTerms"
                  defaultChecked
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-brand-600 focus:ring-brand-500"
                />
                <label htmlFor="agreeTerms" className="text-[11px] text-slate-600 dark:text-slate-400 select-none cursor-pointer leading-tight">
                  {t.agreeTerms}
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 text-sm active:scale-98"
              >
                <span>{t.registerBtn}</span>
                {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          {/* Social Quick Login */}
          <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.orContinueWith}</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsLoggedIn(true)}
                className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 py-2.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-white transition-colors"
              >
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => setIsLoggedIn(true)}
                className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 py-2.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-white transition-colors"
              >
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* AUTHENTICATED USER DASHBOARD */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-6 shadow-md dark:shadow-xl transition-colors">
            {/* User Mini Profile */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-rose-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-brand-600/30">
                AE
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {isArabic ? MOCK_USER.nameAr : MOCK_USER.name}
                </h3>
                <span className="text-[10px] text-brand-600 dark:text-brand-400 font-bold bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  VIP Member
                </span>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="space-y-1.5 text-xs font-bold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'overview'
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>{t.navOverview}</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'orders'
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.navOrders}</span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'addresses'
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>{t.navAddresses}</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'profile'
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>{t.navProfile}</span>
              </button>

              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors pt-4 border-t border-slate-200 dark:border-slate-800"
              >
                <LogOut className="w-4 h-4" />
                <span>{t.logoutBtn}</span>
              </button>
            </nav>
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-2xl p-4.5 space-y-1 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-colors">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.totalSpent}</span>
                <div className="text-xl font-black text-brand-600 dark:text-brand-400 font-mono">
                  {MOCK_USER.totalSpent.toLocaleString()} <span className="text-xs">{t.currency}</span>
                </div>
              </div>
              <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-2xl p-4.5 space-y-1 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-colors">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.activeOrdersCount}</span>
                <div className="text-xl font-black text-amber-500 dark:text-amber-400 font-mono">
                  {MOCK_USER.activeOrders} {isArabic ? 'طلبات' : 'Orders'}
                </div>
              </div>
              <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-2xl p-4.5 space-y-1 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-colors">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.completedOrdersCount}</span>
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {MOCK_USER.completedOrders} {isArabic ? 'طلبات مكتملة' : 'Completed'}
                </div>
              </div>
            </div>

            {/* TAB 1: OVERVIEW & ORDERS */}
            {(activeTab === 'overview' || activeTab === 'orders') && (
              <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5 shadow-md dark:shadow-xl transition-colors">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {t.recentOrdersTitle}
                </h2>

                <div className="space-y-4">
                  {MOCK_ORDERS.map((order) => (
                    <div
                      key={order.id}
                      className="bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                            {order.id}
                          </span>
                          <span className="text-xs text-slate-500">
                            {isArabic ? order.dateAr : order.date}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {order.status === 'processing' && (
                            <span className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {t.statusProcessing}
                            </span>
                          )}
                          {order.status === 'shipped' && (
                            <span className="bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              <Truck className="w-3 h-3" /> {t.statusShipped}
                            </span>
                          )}
                          {order.status === 'delivered' && (
                            <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> {t.statusDelivered}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Items Thumbnails */}
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                              />
                              <div className="text-xs">
                                <p className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[180px] sm:max-w-xs">{item.name}</p>
                                <span className="text-slate-500">Qty: {item.qty}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-end">
                            <span className="text-xs text-slate-500 block">{t.orderTotal}</span>
                            <span className="text-sm font-black text-brand-600 dark:text-brand-400 font-mono">
                              {order.total.toLocaleString()} {t.currency}
                            </span>
                          </div>

                          <button
                            onClick={() => setTrackingOrder(order)}
                            className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition-all shadow active:scale-95 flex items-center gap-1.5"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>{t.trackShipmentBtn}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5 shadow-md dark:shadow-xl transition-colors">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {t.savedAddressesTitle}
                  </h2>
                  <button
                    onClick={() => alert(isArabic ? 'فتح نموذج إضافة عنوان جديد' : 'Add address modal')}
                    className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition-all shadow"
                  >
                    {t.addNewAddressBtn}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MOCK_ADDRESSES.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4.5 space-y-3 relative hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{addr.title}</span>
                        {addr.isDefault && (
                          <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {t.defaultAddressBadge}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                        <p className="font-semibold text-slate-900 dark:text-white">{addr.name}</p>
                        <p className="text-slate-500 dark:text-slate-400">{isArabic ? addr.cityAr : addr.city}</p>
                        <p className="text-slate-500 dark:text-slate-400">{addr.address}</p>
                        <p className="text-brand-600 dark:text-brand-400 font-mono pt-1">{addr.phone}</p>
                      </div>

                      <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                        <button className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 transition-colors">
                          <Edit2 className="w-3 h-3" /> {t.editAddress}
                        </button>
                        <button className="text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors">
                          <Trash2 className="w-3 h-3" /> {t.deleteAddress}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PROFILE & SECURITY */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-md dark:shadow-xl transition-colors">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {t.profileDetailsTitle}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.fullName}</label>
                      <input
                        type="text"
                        defaultValue={isArabic ? MOCK_USER.nameAr : MOCK_USER.name}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.emailAddress}</label>
                      <input
                        type="email"
                        defaultValue={MOCK_USER.email}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.phoneNumber}</label>
                      <input
                        type="tel"
                        defaultValue={MOCK_USER.phone}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 font-mono transition-colors shadow-inner"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => alert(isArabic ? 'تم حفظ التعديلات بنجاح!' : 'Profile updated successfully!')}
                    className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow mt-2"
                  >
                    {t.saveChangesBtn}
                  </button>
                </div>

                <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-md dark:shadow-xl transition-colors">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {t.changePasswordTitle}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.currentPassword}</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.newPassword}</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors shadow-inner"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => alert(isArabic ? 'تم تحديث كلمة المرور بنجاح!' : 'Password updated successfully!')}
                    className="bg-slate-800 dark:bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all border border-slate-700 shadow mt-2"
                  >
                    {t.updatePasswordBtn}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TRACKING TIMELINE MODAL */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative transition-colors">
            <button
              onClick={() => setTrackingOrder(null)}
              className="absolute top-4 right-4 p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {isArabic ? `تتبع الشحنة — طلب ${trackingOrder.id}` : `Track Shipment — Order ${trackingOrder.id}`}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isArabic ? 'شركة الشحن: أرامكس / إكسبريس إيجيبت' : 'Courier: Aramex / Express Egypt'}
              </p>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-4 py-2">
              {[
                { title: isArabic ? 'تم تأكيد الطلب والدفع' : 'Order Confirmed & Paid', desc: isArabic ? 'تم مراجعة الطلب بنجاح' : 'Order received and verified', done: true },
                { title: isArabic ? 'تجميع واختبار القطع في المعمل' : 'Rig Assembly & Benchmarking', desc: isArabic ? 'اجتاز اختبارات الضغط 24H' : 'Passed hardware stress tests', done: trackingOrder.trackingStep >= 2 },
                { title: isArabic ? 'خرج للشحن والتوصيل مع المندوب' : 'Out for Delivery', desc: isArabic ? 'مندوب الشحن في طريقه إليك' : 'Courier is on the way', done: trackingOrder.trackingStep >= 3 },
                { title: isArabic ? 'تم التسليم بنجاح للعميل' : 'Delivered Successfully', desc: isArabic ? 'تم استلام الشحنة وتوقيع الفاتورة' : 'Signed and delivered', done: trackingOrder.trackingStep >= 4 },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-3.5">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        step.done
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-500 border border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    {idx < 3 && <div className={`w-0.5 h-8 my-0.5 ${step.done ? 'bg-emerald-500/50' : 'bg-slate-200 dark:bg-slate-800'}`} />}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${step.done ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>{step.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setTrackingOrder(null)}
              className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
            >
              {isArabic ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
