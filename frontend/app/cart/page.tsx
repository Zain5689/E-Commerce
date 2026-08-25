'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  CheckCircle2,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { useCartStore } from '../../lib/store/useCartStore';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';
import { POPULAR_CATEGORIES } from '../../lib/data/homeData';
import { couponsApi, shippingApi, ordersApi } from '../../lib/api/apiClient';
import { useRouter } from 'next/navigation';


const FREE_SHIPPING_THRESHOLD = 10000;

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const getSubtotal = useCartStore((state) => state.getSubtotal);

  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Governorate shipping state
  const [selectedGov, setSelectedGov] = useState<string>('cairo');
  const [govRates, setGovRates] = useState<Record<string, { fee: number; label: string }>>({});
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(10000);

  // Checkout modal state
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CARD'>('COD');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any | null>(null);
  const router = useRouter();

  // Default shipping rates (used until API loads)
  const DEFAULT_GOV_RATES: Record<string, { fee: number; label: string }> = {
    cairo: { fee: 50, label: t.govCairo },
    giza: { fee: 50, label: t.govGiza },
    alex: { fee: 65, label: t.govAlex },
    delta: { fee: 75, label: t.govDelta },
    upper: { fee: 95, label: t.govUpper },
  };

  const GOV_RATES = Object.keys(govRates).length > 0 ? govRates : DEFAULT_GOV_RATES;

  useEffect(() => {
    setMounted(true);
    // Load shipping rates from API
    shippingApi.getGovernorates().then((res) => {
      if (res.data?.governorates) {
        const rates: Record<string, { fee: number; label: string }> = {};
        res.data.governorates.forEach((g: any) => {
          rates[g.key] = {
            fee: g.fee,
            label: isArabic ? g.nameAr : g.nameEn,
          };
        });
        setGovRates(rates);
        if (res.data.freeShippingThreshold) {
          setFreeShippingThreshold(res.data.freeShippingThreshold);
        }
      }
    }).catch(() => {/* keep defaults */});
  }, []);

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim();
    if (!code) return;
    setPromoLoading(true);
    setPromoMessage(null);
    try {
      const res = await couponsApi.validate(code, subtotal);
      setDiscountPercent(res.data.discountPercent);
      setPromoMessage({
        type: 'success',
        text: t.promoAppliedSuccess.replace('{percent}', String(res.data.discountPercent)),
      });
    } catch (err: any) {
      setPromoMessage({ type: 'error', text: err.message || t.promoInvalid });
    } finally {
      setPromoLoading(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert(isArabic ? 'يرجى إدخال جميع بيانات الشحن المطلوبة' : 'Please fill out all required shipping fields');
      return;
    }
    setPlacingOrder(true);
    try {
      const orderData = {
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
        })),
        shippingAddress: {
          title: 'Delivery Address',
          name: customerName,
          phone: customerPhone,
          city: GOV_RATES[selectedGov]?.label || selectedGov,
          address: customerAddress,
        },
        shippingFee,
        discountAmount,
        couponCode: discountPercent > 0 ? promoInput.trim() : undefined,
        paymentMethod,
        notes: customerNotes,
      };

      const res = await ordersApi.create(orderData);
      setCreatedOrder(res.data);
      clearCart();
    } catch (err: any) {
      alert(err.message || 'Failed to place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400">
        <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
          <ShoppingBag className="w-12 h-12 text-slate-400 dark:text-slate-700 animate-bounce" />
          <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const rawShipping = GOV_RATES[selectedGov]?.fee || 50;
  const shippingFee = isFreeShipping ? 0 : rawShipping;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const grandTotal = Math.max(subtotal - discountAmount + shippingFee, 0);

  const remainingForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[70vh]">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          {isArabic ? 'الرئيسية' : 'Home'}
        </Link>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">{t.cartPageTitle}</span>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-600/20 border border-brand-500/30 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.cartPageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {t.cartItemsCountText.replace('{count}', String(items.length))}
            </p>
          </div>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={clearCart}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-400 text-slate-600 dark:text-slate-400 text-xs transition-colors shadow-sm"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearCartBtn}</span>
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center text-center space-y-6 bg-white dark:bg-[#131b2e]/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm dark:shadow-none transition-colors">
          <div className="w-20 h-20 rounded-2xl bg-brand-50 dark:bg-slate-900 border border-brand-100 dark:border-slate-800 flex items-center justify-center shadow-inner">
            <ShoppingBag className="w-10 h-10 text-brand-300 dark:text-slate-600" />
          </div>
          <div className="space-y-2 max-w-md">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.cartEmptyTitle}</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.cartEmptyDesc}
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-brand-600/30 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{t.continueShopping}</span>
            {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>

          {/* Quick Categories to Explore */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 w-full max-w-2xl">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">
              {isArabic ? 'أو تصفح أقوى العروض الآن:' : 'Explore top hardware deals:'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {POPULAR_CATEGORIES.slice(0, 4).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 hover:bg-brand-50/50 dark:hover:bg-slate-800/80 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all text-center shadow-sm"
                >
                  {isArabic ? cat.titleAr : cat.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Cart Items Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Free Shipping Milestone Progress Bar */}
            <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2.5 shadow-sm dark:shadow-none transition-colors">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                <Truck className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                {isFreeShipping ? (
                  <span className="text-emerald-600 dark:text-emerald-400">{t.freeShippingQualified}</span>
                ) : (
                  <span>
                    {t.freeShippingGoal.replace('{remaining}', remainingForFreeShipping.toLocaleString())}
                  </span>
                )}
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    isFreeShipping
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : 'bg-gradient-to-r from-brand-500 to-rose-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-200 dark:divide-slate-800/70 shadow-sm dark:shadow-lg transition-colors">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId || 'main'}`}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-50 dark:hover:bg-[#162138] transition-colors"
                >
                  {/* Image & Title */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl bg-slate-100 dark:bg-slate-950 p-2 flex-shrink-0 border border-slate-200 dark:border-slate-800"
                    />
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {t.priceHeader}:{' '}
                        <strong className="text-slate-800 dark:text-slate-200 font-mono">
                          {item.price.toLocaleString()} {t.currency}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Subtotal & Delete */}
                  <div className="flex items-center justify-between sm:justify-end gap-5 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200 dark:border-slate-800">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 px-1 py-0.5 shadow-inner">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg transition-colors"
                        title="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs sm:text-sm font-bold font-mono text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg transition-colors"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="text-end min-w-[90px]">
                      <span className="text-xs text-slate-400 block sm:hidden">{t.subtotalHeader}</span>
                      <span className="text-sm sm:text-base font-black text-slate-900 dark:text-brand-400 font-mono">
                        {(item.price * item.quantity).toLocaleString()}{' '}
                        <span className="text-xs text-brand-600 dark:text-brand-400 font-sans">{t.currency}</span>
                      </span>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                      title={t.actionHeader}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-white transition-colors"
              >
                {isArabic ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{t.continueShopping}</span>
              </Link>
            </div>
          </div>

          {/* Right Sidebar: Summary & Checkout */}
          <div className="space-y-6">
            {/* Promo Code Card */}
            <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm dark:shadow-none transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Tag className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>{t.promoCodeLabel}</span>
              </div>
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder={t.promoCodePlaceholder}
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 uppercase font-mono tracking-wider focus:outline-none focus:border-brand-500 transition-colors shadow-inner"
                />
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors flex-shrink-0"
                >
                  {t.applyPromoBtn}
                </button>
              </form>
              {promoMessage && (
                <div
                  className={`text-xs p-2.5 rounded-xl flex items-center gap-2 ${
                    promoMessage.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {promoMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
                  <span>{promoMessage.text}</span>
                </div>
              )}
            </div>

            {/* Shipping Calculator by Governorate */}
            <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm dark:shadow-none transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t.shippingCalculatorTitle}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.selectGovernorate}</p>
              <select
                value={selectedGov}
                onChange={(e) => setSelectedGov(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-brand-500 transition-colors cursor-pointer"
              >
                <option value="cairo">{t.govCairo}</option>
                <option value="giza">{t.govGiza}</option>
                <option value="alex">{t.govAlex}</option>
                <option value="delta">{t.govDelta}</option>
                <option value="upper">{t.govUpper}</option>
              </select>
            </div>

            {/* Order Summary & Checkout Box */}
            <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-5 shadow-lg dark:shadow-2xl transition-colors">
              <h2 className="text-base font-black text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
                {t.orderSummary}
              </h2>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>{t.cartSubtotal}</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {subtotal.toLocaleString()} {t.currency}
                  </span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>
                      {t.discountAmount} ({discountPercent}%)
                    </span>
                    <span className="font-mono font-bold">
                      -{discountAmount.toLocaleString()} {t.currency}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>{t.shippingCost}</span>
                  {isFreeShipping ? (
                    <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                      {t.freeShippingTag}
                    </span>
                  ) : (
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {shippingFee} {t.currency}
                    </span>
                  )}
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                  <span>{t.vatIncluded}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-sm font-black text-slate-900 dark:text-white">{t.cartTotal}</span>
                  <span className="text-xl font-black text-brand-600 dark:text-brand-400 font-mono">
                    {grandTotal.toLocaleString()} <span className="text-xs">{t.currency}</span>
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => setShowCheckoutModal(true)}
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 text-sm active:scale-98"
              >
                <span>{t.checkoutBtn}</span>
                {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              {/* Trust Badges inside Summary */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>{t.securityGuarantee}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                  <span>{isArabic ? 'استبدال واسترجاع مجاني خلال 14 يوماً' : '14-Day Free Replacement Policy'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {showCheckoutModal && !createdOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {isArabic ? 'إتمام طلب الشراء' : 'Complete Your Order'}
            </h3>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  {isArabic ? 'الاسم بالكامل' : 'Full Name'}
                </label>
                <input
                  type="text" required placeholder={isArabic ? 'أدخل اسمك بالكامل' : 'Enter your full name'}
                  value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input
                  type="tel" required placeholder="01xxxxxxxxx"
                  value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  {isArabic ? 'العنوان التفصيلي' : 'Detailed Shipping Address'}
                </label>
                <textarea
                  required placeholder={isArabic ? 'المنطقة - اسم الشارع - رقم المبنى - الشقة' : 'Building no., Street, Area'}
                  value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-900 dark:text-white h-20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  {isArabic ? 'طريقة الدفع' : 'Payment Method'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button" onClick={() => setPaymentMethod('COD')}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400'
                        : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {isArabic ? 'الدفع عند الاستلام (Cash on Delivery)' : 'Cash on Delivery (COD)'}
                  </button>
                  <button
                    type="button" onClick={() => setPaymentMethod('CARD')}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      paymentMethod === 'CARD'
                        ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400'
                        : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {isArabic ? 'بطاقة ائتمانية / فيزا (Card)' : 'Credit / Debit Card'}
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900 dark:text-white">{isArabic ? 'المبلغ الإجمالي:' : 'Total Amount:'}</span>
                <span className="font-mono font-black text-brand-600 dark:text-brand-400 text-base">
                  {grandTotal.toLocaleString()} {t.currency}
                </span>
              </div>

              <button
                type="submit" disabled={placingOrder}
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-brand-600/30 active:scale-98 disabled:opacity-60"
              >
                {placingOrder
                  ? (isArabic ? 'جاري تأكيد الطلب...' : 'Placing Order...')
                  : (isArabic ? 'تأكيد وإرسال الطلب الان' : 'Confirm & Place Order')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS CONFIRMATION OVERLAY */}
      {createdOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-8 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {isArabic ? 'تم استلام طلبك بنجاح! 🎉' : 'Order Placed Successfully! 🎉'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isArabic ? 'رقم الطلب الخاص بك هو:' : 'Your Order Reference:'}
              </p>
              <p className="text-lg font-mono font-black text-brand-600 dark:text-brand-400">
                #{createdOrder.orderNumber || createdOrder._id || createdOrder.id}
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <Link
                href="/account"
                className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl text-xs transition-all shadow"
              >
                {isArabic ? 'تتبع طلباتك' : 'Track Orders'}
              </Link>
              <Link
                href="/"
                className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold py-3 rounded-xl text-xs transition-all"
              >
                {isArabic ? 'الرئيسية' : 'Back to Home'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

