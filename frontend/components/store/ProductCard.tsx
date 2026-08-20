'use client';

import React, { useState } from 'react';
import { ShoppingCart, Star, Check, Heart } from 'lucide-react';
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: productName,
      price: product.price,
      image: product.image,
      quantity: 1,
      sku: product.id,
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
    <div className="group relative bg-[#131b2e] hover:bg-[#162138] border border-slate-800/80 hover:border-brand-500/50 rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-brand-900/10">
      {/* Badges and Quick Actions */}
      <div className="relative">
        <div className="relative h-48 sm:h-52 w-full rounded-xl overflow-hidden bg-slate-950/80">
          <img
            src={product.image}
            alt={productName}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges */}
          <div className={`absolute top-2 ${isArabic ? 'right-2' : 'left-2'} flex flex-col gap-1 z-10`}>
            {discountPercent > 0 && (
              <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider">
                -{discountPercent}%
              </span>
            )}
            {productBadge && (
              <span className="bg-brand-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md">
                {productBadge}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 ${
              isArabic ? 'left-2' : 'right-2'
            } p-2 rounded-xl backdrop-blur-md transition-all z-10 ${
              isInWishlist
                ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40 shadow-lg shadow-rose-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-rose-500 hover:bg-slate-800 border border-slate-700/50'
            }`}
            title={isInWishlist ? t.removeFromWishlist : t.wishlist}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Product Info */}
        <div className="pt-3.5 space-y-1.5">
          {product.brand && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-400 block">
              {product.brand}
            </span>
          )}

          <h3 className="text-sm font-bold text-slate-100 line-clamp-2 group-hover:text-brand-300 transition-colors">
            {productName}
          </h3>

          <p className="text-[11px] text-slate-400 line-clamp-1">
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
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-slate-300 text-[11px]">{product.rating}</span>
            <span className="text-[10px] text-slate-500">
              ({product.reviewsCount} {t.reviewsCountSuffix})
            </span>
          </div>

          {/* Sold Progress for Deals */}
          {showProgress && product.stockCount && product.soldCount && (
            <div className="pt-2 space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>
                  {t.soldLabel} <strong className="text-slate-200">{product.soldCount}</strong>
                </span>
                <span>
                  {t.availableLabel}{' '}
                  <strong className="text-brand-400">{product.stockCount - product.soldCount}</strong>
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                  style={{ width: `${(product.soldCount / product.stockCount) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div>
          {product.originalPrice > product.price && (
            <span className="text-xs line-through text-slate-500 block leading-tight">
              {product.originalPrice.toLocaleString()} {t.currency}
            </span>
          )}
          <span className="text-base sm:text-lg font-black text-white bg-gradient-to-r from-white to-slate-200 bg-clip-text">
            {product.price.toLocaleString()}{' '}
            <span className="text-xs font-bold text-brand-400">{t.currency}</span>
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={added}
          className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-md ${
            added
              ? 'bg-emerald-600 text-white shadow-emerald-600/30'
              : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/20'
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
