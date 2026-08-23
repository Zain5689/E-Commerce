'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Star, Check, Heart, Eye } from 'lucide-react';
import { Product } from '../../lib/data/homeData';
import { useCartStore } from '../../lib/store/useCartStore';
import { useWishlistStore } from '../../lib/store/useWishlistStore';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';

interface ProductCardProps {
  product: Product;
  showProgress?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showProgress }) => {
  const addItem = useCartStore((state) => state.addItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);

  const [added, setAdded] = useState(false);

  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  const productName = isArabic && product.nameAr ? product.nameAr : product.name;
  const productSpecs = isArabic && product.specsAr ? product.specsAr : product.specs;
  const productBadge = isArabic && product.badgeAr ? product.badgeAr : product.badge;
  const productUrl = `/product/${product.id}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: productName,
      price: product.price,
      image: product.image,
      quantity: 1,
      sku: product.sku || product.id,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="group relative bg-white dark:bg-[#0e1526]/90 hover:bg-slate-50 dark:hover:bg-[#121c33] border border-slate-200 dark:border-slate-800/80 hover:border-brand-300 dark:hover:border-brand-500/50 rounded-3xl p-4 transition-all duration-300 flex flex-col justify-between hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-brand-950/30 hover:-translate-y-1">
      {/* Badges and Quick Actions */}
      <div className="relative">
        <Link href={productUrl} className="block relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/50">
          <img
            src={product.image}
            alt={productName}
            className="w-full h-full object-contain p-3 group-hover:scale-108 transition-transform duration-500 drop-shadow"
            loading="lazy"
          />

          {/* Quick View Details Overlay on Hover */}
          <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none backdrop-blur-[2px]">
            <span className="bg-gradient-to-r from-brand-600 to-rose-600 text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform border border-brand-400/30">
              <Eye className="w-3.5 h-3.5" />
              <span>{t.productDetails?.viewDetailsBtn || 'View Details'}</span>
            </span>
          </div>

          {/* Badges */}
          <div className={`absolute top-2.5 ${isArabic ? 'right-2.5' : 'left-2.5'} flex flex-col gap-1 z-10 pointer-events-none`}>
            {discountPercent > 0 && (
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-md uppercase tracking-wider border border-rose-400/30">
                -{discountPercent}%
              </span>
            )}
            {productBadge && (
              <span className="bg-brand-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-md border border-brand-400/30">
                {productBadge}
              </span>
            )}
          </div>
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 ${
            isArabic ? 'left-2.5' : 'right-2.5'
          } p-2 rounded-xl backdrop-blur-md transition-all z-10 ${
            isInWishlist
              ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40 shadow-lg shadow-rose-500/20'
              : 'bg-white/90 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 shadow-sm'
          }`}
          title={isInWishlist ? t.removeFromWishlist : t.wishlist}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Product Info */}
        <div className="pt-3.5 space-y-1.5">
          {product.brand && (
            <span className="text-[10px] font-black uppercase tracking-wider text-brand-600 dark:text-brand-400 block">
              {product.brand}
            </span>
          )}

          <Link href={productUrl} className="block">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors leading-snug">
              {productName}
            </h3>
          </Link>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
            {productSpecs}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-amber-400 pt-0.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.3)]'
                      : 'text-slate-300 dark:text-slate-700'
                  }`}
                />
              ))}
            </div>
            <span className="font-extrabold text-slate-700 dark:text-slate-300 text-[11px] font-mono">{product.rating}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              ({product.reviewsCount})
            </span>
          </div>

          {/* Sold Progress for Deals */}
          {showProgress && product.stockCount && product.soldCount && (
            <div className="pt-2 space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <span>
                  {t.soldLabel} <strong className="text-slate-800 dark:text-slate-200">{product.soldCount}</strong>
                </span>
                <span>
                  {t.availableLabel}{' '}
                  <strong className="text-brand-600 dark:text-brand-400">{product.stockCount - product.soldCount}</strong>
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-brand-500 to-rose-500 rounded-full"
                  style={{ width: `${(product.soldCount / product.stockCount) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <Link href={productUrl} className="block">
          {product.originalPrice > product.price && (
            <span className="text-xs line-through text-slate-500 block leading-tight font-mono">
              {product.originalPrice.toLocaleString()} {t.currency}
            </span>
          )}
          <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">
            {product.price.toLocaleString()}{' '}
            <span className="text-xs font-bold text-brand-400">{t.currency}</span>
          </span>
        </Link>

        <button
          onClick={handleAddToCart}
          disabled={added}
          className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all active:scale-95 shadow-md ${
            added
              ? 'bg-emerald-600 text-white shadow-emerald-600/30'
              : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/30 hover:shadow-brand-500/40'
          }`}
          title={t.buyBtn}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" /> {t.addedBtn}
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" /> {t.buyBtn}
            </>
          )}
        </button>
      </div>
    </div>
  );
};


