'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '../../lib/data/homeData';
import { useCartStore } from '../../lib/store/useCartStore';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';

interface StickyMobileBarProps {
  product: Product;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ product }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when user scrolls down 450px
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const productName = isArabic && product.nameAr ? product.nameAr : product.name;

  const handleQuickAdd = () => {
    addItem({
      productId: product.id,
      name: productName,
      price: product.price,
      image: product.image,
      quantity: 1,
      sku: product.sku || product.id,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0b0f19]/95 border-t border-slate-800 p-3 backdrop-blur-lg shadow-2xl transition-transform duration-300 md:hidden animate-slide-up">
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        {/* Mini Preview */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={product.image}
            alt={productName}
            className="w-12 h-12 rounded-xl object-contain bg-slate-950 p-1 border border-slate-800 flex-shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white truncate">{productName}</h4>
            <div className="text-sm font-black text-brand-400 font-mono">
              {product.price.toLocaleString()} <span className="text-[10px] font-normal">{t.currency}</span>
            </div>
          </div>
        </div>

        {/* Quick Add CTA */}
        <button
          onClick={handleQuickAdd}
          disabled={isAdded}
          className={`flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all flex-shrink-0 ${
            isAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/30'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>{t.productDetails?.addedToCartSuccess || 'Added!'}</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>{t.productDetails?.stickyAddBtn || 'Add to Cart'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
