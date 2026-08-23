'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowLeft, ArrowRight, Star, ShoppingCart, Check, Sparkles } from 'lucide-react';
import { useWishlistStore } from '../../lib/store/useWishlistStore';
import { useCartStore } from '../../lib/store/useCartStore';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';
import { POPULAR_CATEGORIES } from '../../lib/data/homeData';

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  const addItemToCart = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMoveToCart = (item: typeof items[0]) => {
    const productName = isArabic && item.nameAr ? item.nameAr : item.name;
    addItemToCart({
      productId: item.id,
      name: productName,
      price: item.price,
      image: item.image,
      quantity: 1,
      sku: item.id,
    });
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const handleMoveAllToCart = () => {
    items.forEach((item) => {
      const productName = isArabic && item.nameAr ? item.nameAr : item.name;
      addItemToCart({
        productId: item.id,
        name: productName,
        price: item.price,
        image: item.image,
        quantity: 1,
        sku: item.id,
      });
    });
    toggleCart(true);
  };

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400">
        <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
          <Heart className="w-12 h-12 text-slate-700 animate-bounce" />
          <div className="h-4 w-48 bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[70vh]">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-brand-400 transition-colors">
          {isArabic ? 'الرئيسية' : 'Home'}
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">{t.wishlistPageTitle}</span>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {t.wishlistPageTitle}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {t.wishlistSubTitle} — {t.wishlistItemsCount.replace('{count}', String(items.length))}
              </p>
            </div>
          </div>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleMoveAllToCart}
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-brand-600/25 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.moveAllToCartBtn}</span>
            </button>
            <button
              onClick={clearWishlist}
              className="p-2.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-xl border border-slate-800 transition-colors text-xs"
              title={isArabic ? 'مسح القائمة' : 'Clear Wishlist'}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      {items.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center text-center space-y-6 bg-[#131b2e]/60 border border-slate-800 rounded-3xl p-8">
          <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner">
            <Heart className="w-10 h-10 text-slate-600" />
          </div>
          <div className="space-y-2 max-w-md">
            <h2 className="text-xl font-bold text-white">{t.wishlistEmptyTitle}</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.wishlistEmptyDesc}
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
              {isArabic ? 'أو تصفح أشهر الأقسام:' : 'Or explore popular hardware:'}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => {
            const productName = isArabic && item.nameAr ? item.nameAr : item.name;
            const productSpecs = isArabic && item.specsAr ? item.specsAr : item.specs;
            const isAdded = addedIds[item.id] || false;

            return (
              <div
                key={item.id}
                className="group relative bg-[#131b2e] hover:bg-[#162138] border border-slate-800 rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between hover:border-slate-700 shadow-lg"
              >
                <div>
                  {/* Image & Remove */}
                  <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-950">
                    <Link href={`/product/${item.id}`} className="block w-full h-full">
                      <img
                        src={item.image}
                        alt={productName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className={`absolute top-2 ${
                        isArabic ? 'left-2' : 'right-2'
                      } p-2 rounded-xl bg-slate-900/85 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 border border-slate-800 transition-colors z-10`}
                      title={t.removeFromWishlist}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {item.inStock !== false ? (
                      <span
                        className={`absolute bottom-2 ${
                          isArabic ? 'right-2' : 'left-2'
                        } bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md`}
                      >
                        {t.inStockText}
                      </span>
                    ) : (
                      <span
                        className={`absolute bottom-2 ${
                          isArabic ? 'right-2' : 'left-2'
                        } bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md`}
                      >
                        {t.outOfStockText}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="pt-3.5 space-y-1">
                    {item.brand && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400 block">
                        {item.brand}
                      </span>
                    )}
                    <Link href={`/product/${item.id}`} className="block">
                      <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-brand-300 transition-colors">
                        {productName}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-400 line-clamp-1">{productSpecs}</p>

                    <div className="flex items-center gap-1.5 text-xs text-amber-400 pt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">{item.rating || 4.9}</span>
                      <span className="text-slate-500">({item.reviewsCount || 10})</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    {item.originalPrice > item.price && (
                      <span className="text-xs line-through text-slate-500 block">
                        {item.originalPrice.toLocaleString()} {t.currency}
                      </span>
                    )}
                    <span className="text-base font-black text-brand-400">
                      {item.price.toLocaleString()} {t.currency}
                    </span>
                  </div>

                  <button
                    onClick={() => handleMoveToCart(item)}
                    disabled={isAdded}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-brand-600 hover:bg-brand-500 text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> {t.addedBtn}
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" /> {t.moveToCartBtn}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
