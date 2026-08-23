'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../../lib/store/useCartStore';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';

export const CartDrawer: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const isOpen = useCartStore((state) => state.isOpen);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const getSubtotal = useCartStore((state) => state.getSubtotal);

  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const subtotal = getSubtotal();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => toggleCart(false)}
      />

      <div className={`fixed inset-y-0 ${isArabic ? 'left-0 pr-10' : 'right-0 pl-10'} max-w-full flex`}>
        <div className={`w-screen max-w-md bg-white dark:bg-[#0f172a] ${isArabic ? 'border-r' : 'border-l'} border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 flex flex-col shadow-2xl transition-colors`}>
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
              <ShoppingBag className="w-5 h-5 text-brand-600 dark:text-brand-500" />
              <span>{t.cartHeader} ({items.length})</span>
            </div>
            <button
              onClick={() => toggleCart(false)}
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-500 space-y-3 py-12">
                <ShoppingBag className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                <p className="font-semibold text-slate-700 dark:text-slate-300">{t.cartEmptyTitle}</p>
                <p className="text-xs max-w-xs">{t.cartEmptyDesc}</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId || 'main'}`}
                  className="flex gap-3 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-sm transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded-xl bg-white dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</h4>
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs font-bold text-brand-600 dark:text-brand-400 font-mono">
                      {item.price.toLocaleString()} {t.currency}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                          className="px-2 py-0.5 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold font-mono text-slate-800 dark:text-slate-200">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                          className="px-2 py-0.5 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-4 bg-slate-50 dark:bg-slate-900/60 transition-colors">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>{t.cartSubtotal}</span>
                  <span className="font-mono">{subtotal.toLocaleString()} {t.currency}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-xs">
                  <span>{t.cartShippingNote}</span>
                </div>
                <div className="flex justify-between text-slate-900 dark:text-white font-black text-base pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>{t.cartTotal}</span>
                  <span className="text-brand-600 dark:text-brand-400 font-mono">{subtotal.toLocaleString()} {t.currency}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/cart"
                  onClick={() => toggleCart(false)}
                  className="w-full bg-white dark:bg-[#1e293b] hover:bg-slate-100 dark:hover:bg-[#334155] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  {t.viewFullCart}
                </Link>
                <button
                  onClick={() => alert(isArabic ? 'جاري الانتقال لصفحة إتمام الطلب...' : 'Proceeding to Checkout...')}
                  className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 text-sm active:scale-98"
                >
                  <span>{t.checkoutBtn}</span>
                  {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
