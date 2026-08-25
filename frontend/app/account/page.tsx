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
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  X,
  Loader2,
} from 'lucide-react';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';
import { useAuthStore } from '../../lib/store/useAuthStore';
import { ordersApi, addressesApi } from '../../lib/api/apiClient';

type DashboardTab = 'overview' | 'orders' | 'addresses' | 'profile';

export default function AccountPage() {
  const [mounted, setMounted] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  const { user, login, register, logout, isLoading, error, clearError } = useAuthStore();
  const isLoggedIn = !!user;

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Address creation form state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addrTitle, setAddrTitle] = useState('');
  const [addrName, setAddrName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrAddress, setAddrAddress] = useState('');

  // Dashboard state & data from API
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [orders, setOrders] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Tracking modal
  const [trackingOrder, setTrackingOrder] = useState<any | null>(null);

  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setDataLoading(true);
      Promise.all([
        ordersApi.getMyOrders().catch(() => ({ data: [] })),
        addressesApi.getAll().catch(() => ({ data: [] })),
      ]).then(([ordersRes, addrsRes]) => {
        setOrders(ordersRes.data || []);
        setAddresses(addrsRes.data || []);
      }).finally(() => setDataLoading(false));
    }
  }, [isLoggedIn]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login(loginEmail, loginPassword);
    } catch (err) {
      // error handled in store
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await register(registerName, registerEmail, registerPassword, registerPhone);
    } catch (err) {
      // error handled in store
    }
  };

  const handleCreateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addressesApi.create({
        title: addrTitle,
        name: addrName,
        phone: addrPhone,
        city: addrCity,
        address: addrAddress,
      });
      if (res.data) {
        setAddresses([...addresses, res.data]);
        setShowAddressModal(false);
        setAddrTitle(''); setAddrName(''); setAddrPhone(''); setAddrCity(''); setAddrAddress('');
      }
    } catch (err: any) {
      alert(err.message || 'Failed to create address');
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await addressesApi.delete(id);
      setAddresses(addresses.filter((a) => (a._id || a.id) !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete address');
    }
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

  const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const activeOrdersCount = orders.filter((o) => ['PENDING', 'PROCESSING', 'SHIPPED'].includes(o.status)).length;
  const completedOrdersCount = orders.filter((o) => o.status === 'DELIVERED').length;

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

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-600/20 border border-brand-500/30 flex items-center justify-center">
            <User className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isLoggedIn ? (isArabic ? `أهلاً بك، ${user.name}` : `Welcome, ${user.name}`) : t.accountPageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {isLoggedIn ? user.email : t.accountSubTitle}
            </p>
          </div>
        </div>
      </div>

      {!isLoggedIn ? (
        /* GUEST / AUTHENTICATION CARD */
        <div className="max-w-md mx-auto bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl space-y-6 transition-colors">
          {/* Tab Switcher */}
          <div className="flex bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-1">
            <button
              onClick={() => { setAuthMode('login'); clearError(); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                authMode === 'login'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.tabSignIn}
            </button>
            <button
              onClick={() => { setAuthMode('register'); clearError(); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                authMode === 'register'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.tabRegister}
            </button>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs p-3 rounded-xl">
              {error}
            </div>
          )}

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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 text-sm active:scale-98 disabled:opacity-60"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>{t.loginBtn}</span>}
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 text-sm active:scale-98 disabled:opacity-60"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>{t.registerBtn}</span>}
                {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>
      ) : (
        /* AUTHENTICATED USER DASHBOARD */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-6 shadow-md dark:shadow-xl transition-colors">
            {/* User Mini Profile */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-rose-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-brand-600/30">
                {user.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {user.name}
                </h3>
                <span className="text-[10px] text-brand-600 dark:text-brand-400 font-bold bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  {user.role}
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
                onClick={() => logout()}
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
                  {totalSpent.toLocaleString()} <span className="text-xs">{t.currency}</span>
                </div>
              </div>
              <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-2xl p-4.5 space-y-1 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-colors">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.activeOrdersCount}</span>
                <div className="text-xl font-black text-amber-500 dark:text-amber-400 font-mono">
                  {activeOrdersCount} {isArabic ? 'طلبات' : 'Orders'}
                </div>
              </div>
              <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-2xl p-4.5 space-y-1 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-colors">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.completedOrdersCount}</span>
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {completedOrdersCount} {isArabic ? 'طلبات مكتملة' : 'Completed'}
                </div>
              </div>
            </div>

            {/* TAB 1: OVERVIEW & ORDERS */}
            {(activeTab === 'overview' || activeTab === 'orders') && (
              <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5 shadow-md dark:shadow-xl transition-colors">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {t.recentOrdersTitle}
                </h2>

                {dataLoading ? (
                  <div className="py-10 text-center text-slate-400 flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-brand-500" />
                    <span>{isArabic ? 'جاري التحميل...' : 'Loading orders...'}</span>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-10 text-center text-slate-400 text-sm">
                    {isArabic ? 'لا توجد طلبات سابقة حتى الآن.' : 'No orders found yet.'}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const oid = order.orderNumber || order._id || order.id;
                      return (
                        <div
                          key={oid}
                          className="bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                                #{oid}
                              </span>
                              <span className="text-xs text-slate-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                {order.status}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-3">
                              {order.items?.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-2">
                                  {item.image && (
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-12 h-12 object-cover rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                                    />
                                  )}
                                  <div className="text-xs">
                                    <p className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[180px] sm:max-w-xs">{item.name}</p>
                                    <span className="text-slate-500">Qty: {item.quantity}</span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="text-end">
                                <span className="text-xs text-slate-500 block">{t.orderTotal}</span>
                                <span className="text-sm font-black text-brand-600 dark:text-brand-400 font-mono">
                                  {(order.totalAmount || order.total || 0).toLocaleString()} {t.currency}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
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
                    onClick={() => setShowAddressModal(true)}
                    className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition-all shadow"
                  >
                    {t.addNewAddressBtn}
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-sm">
                    {isArabic ? 'لا توجد عناوين محفوظة.' : 'No saved addresses yet.'}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => {
                      const aid = addr._id || addr.id;
                      return (
                        <div
                          key={aid}
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
                            <p className="text-slate-500 dark:text-slate-400">{addr.city}</p>
                            <p className="text-slate-500 dark:text-slate-400">{addr.address}</p>
                            <p className="text-brand-600 dark:text-brand-400 font-mono pt-1">{addr.phone}</p>
                          </div>

                          <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                            <button
                              onClick={() => handleDeleteAddress(aid)}
                              className="text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" /> {t.deleteAddress}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CREATE ADDRESS MODAL */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowAddressModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {t.addNewAddressBtn}
            </h3>
            <form onSubmit={handleCreateAddress} className="space-y-3">
              <input
                type="text" required placeholder="Title (e.g. Home / Work)" value={addrTitle} onChange={(e) => setAddrTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white"
              />
              <input
                type="text" required placeholder="Full Name" value={addrName} onChange={(e) => setAddrName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white"
              />
              <input
                type="tel" required placeholder="Phone Number" value={addrPhone} onChange={(e) => setAddrPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white"
              />
              <input
                type="text" required placeholder="City / Governorate" value={addrCity} onChange={(e) => setAddrCity(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white"
              />
              <textarea
                required placeholder="Full Detailed Address" value={addrAddress} onChange={(e) => setAddrAddress(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white h-20"
              />
              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all"
              >
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
