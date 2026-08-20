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
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Governorate shipping state
  const [selectedGov, setSelectedGov] = useState<string>('cairo');

  const GOV_RATES: Record<string, { fee: number; label: string }> = {
    cairo: { fee: 50, label: t.govCairo },
    giza: { fee: 50, label: t.govGiza },
    alex: { fee: 65, label: t.govAlex },
    delta: { fee: 75, label: t.govDelta },
    upper: { fee: 95, label: t.govUpper },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'NEXUS10' || code === 'EGYPT10') {
      setDiscountPercent(10);
      setPromoMessage({
        type: 'success',
        text: t.promoAppliedSuccess.replace('{percent}', '10'),
      });
    } else if (code === 'VIP15') {
      setDiscountPercent(15);
      setPromoMessage({
        type: 'success',
        text: t.promoAppliedSuccess.replace('{percent}', '15'),
      });
    } else {
      setPromoMessage({
        type: 'error',
        text: t.promoInvalid,
      });
    }
  };

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400">
        <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
          <ShoppingBag className="w-12 h-12 text-slate-700 animate-bounce" />
          <div className="h-4 w-48 bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const rawShipping = GOV_RATES[selectedGov]?.fee || 50;
  const shippingFee = isFreeShipping ? 0 : rawShipping;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const grandTotal = Math.max(subtotal - discountAmount + shippingFee, 0);

  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const progressPercent = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[70vh]">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-brand-400 transition-colors">
          {isArabic ? 'الرئيسية' : 'Home'}
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">{t.cartPageTitle}</span>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.cartPageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {t.cartItemsCountText.replace('{count}', String(items.length))}
            </p>
          </div>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={clearCart}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 text-xs transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearCartBtn}</span>
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center text-center space-y-6 bg-[#131b2e]/60 border border-slate-800 rounded-3xl p-8">
          <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner">
            <ShoppingBag className="w-10 h-10 text-slate-600" />
          </div>
          <div className="space-y-2 max-w-md">
            <h2 className="text-xl font-bold text-white">{t.cartEmptyTitle}</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
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
          <div className="pt-8 border-t border-slate-800/80 w-full max-w-2xl">
            <p className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
              {isArabic ? 'أو تصفح أقوى العروض الآن:' : 'Explore top hardware deals:'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {POPULAR_CATEGORIES.slice(0, 4).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 hover:bg-slate-800/80 text-xs font-bold text-slate-200 transition-all text-center"
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
            <div className="bg-[#131b2e] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-200">
                <Truck className="w-4 h-4 text-brand-400 flex-shrink-0" />
                {isFreeShipping ? (
                  <span className="text-emerald-400">{t.freeShippingQualified}</span>
                ) : (
                  <span>
                    {t.freeShippingGoal.replace('{remaining}', remainingForFreeShipping.toLocaleString())}
                  </span>
                )}
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
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
            <div className="bg-[#131b2e] border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/70 shadow-lg">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId || 'main'}`}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-[#162138] transition-colors"
                >
                  {/* Image & Title */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-slate-950 flex-shrink-0 border border-slate-800"
                    />
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="text-xs text-slate-400">
                        {t.priceHeader}:{' '}
                        <strong className="text-slate-200">
                          {item.price.toLocaleString()} {t.currency}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Subtotal & Delete */}
                  <div className="flex items-center justify-between sm:justify-end gap-5 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950 px-1 py-0.5 shadow-inner">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
                        title="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs sm:text-sm font-bold font-mono text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-end min-w-[90px]">
                      <div className="text-base font-black text-brand-400 font-mono">
                        {(item.price * item.quantity).toLocaleString()} {t.currency}
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl border border-transparent hover:border-rose-500/20 transition-all"
                      title={t.actionHeader}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Shopping Button */}
            <div className="flex items-center justify-between pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-brand-400 transition-colors"
              >
                {isArabic ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{t.continueShopping}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="space-y-6">
            {/* Promo Code Card */}
            <div className="bg-[#131b2e] border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Tag className="w-4 h-4 text-brand-400" />
                <span>{t.promoCodeLabel}</span>
              </div>
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder={t.promoCodePlaceholder}
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono uppercase"
                />
                <button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow"
                >
                  {t.applyPromoBtn}
                </button>
              </form>
              {promoMessage && (
                <div
                  className={`text-xs p-2 rounded-lg flex items-center gap-1.5 ${
                    promoMessage.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {promoMessage.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />}
                  <span>{promoMessage.text}</span>
                </div>
              )}
            </div>

            {/* Shipping Calculator Card */}
            <div className="bg-[#131b2e] border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Truck className="w-4 h-4 text-sky-400" />
                <span>{t.shippingCalculatorTitle}</span>
              </div>
              <p className="text-xs text-slate-400">{t.selectGovernorate}</p>
              <select
                value={selectedGov}
                onChange={(e) => setSelectedGov(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
              >
                {Object.entries(GOV_RATES).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Summary Breakdown Card */}
            <div className="bg-[#131b2e] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
              <h2 className="text-base font-black text-white pb-3 border-b border-slate-800">
                {t.orderSummary}
              </h2>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>{t.cartSubtotal}</span>
                  <span className="font-mono font-bold">{subtotal.toLocaleString()} {t.currency}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>{t.discountAmount} ({discountPercent}%)</span>
                    <span className="font-mono font-bold">-{discountAmount.toLocaleString()} {t.currency}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-300">
                  <span>{t.shippingCost}</span>
                  {isFreeShipping ? (
                    <span className="text-emerald-400 font-bold uppercase">{t.freeShippingTag}</span>
                  ) : (
                    <span className="font-mono font-bold">{shippingFee} {t.currency}</span>
                  )}
                </div>

                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>{t.vatIncluded}</span>
                  <span>(0.00 {t.currency})</span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline text-white">
                  <span className="font-black text-base">{t.cartTotal}</span>
                  <div className="text-end">
                    <span className="text-xl sm:text-2xl font-black text-brand-400 font-mono">
                      {grandTotal.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-brand-400 ml-1 mr-1">{t.currency}</span>
                  </div>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => alert(isArabic ? 'جاري الانتقال لبوابة الدفع الآمنة (Paymob / Fawry / ValU)...' : 'Redirecting to Secure Gateway...')}
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 text-sm active:scale-98 mt-4"
              >
                <span>{t.checkoutBtn}</span>
                {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              {/* Security Guarantee Note */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-2 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{t.securityGuarantee}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
