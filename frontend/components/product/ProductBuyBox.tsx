'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Zap,
  Check,
  Star,
  ShieldCheck,
  RotateCcw,
  Truck,
  MessageCircle,
  CreditCard,
  Layers,
  Sparkles,
  Flame,
  Plus,
  Minus,
  CheckCircle2,
  Cpu,
  BadgeCheck,
} from 'lucide-react';
import { Product, ProductVariantOption } from '../../lib/data/homeData';
import { useCartStore } from '../../lib/store/useCartStore';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';

interface ProductBuyBoxProps {
  product: Product;
}

export const ProductBuyBox: React.FC<ProductBuyBoxProps> = ({ product }) => {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  // Variant selector state
  const variants = product.variants || [];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariantOption | null>(
    variants.length > 0 ? variants[0] : null
  );

  // Quantity state
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Calculate pricing based on selected variant
  const currentPrice = product.price + (selectedVariant?.priceDelta || 0);
  const currentOriginalPrice = product.originalPrice + (selectedVariant?.priceDelta || 0);
  const savingsAmount = currentOriginalPrice > currentPrice ? currentOriginalPrice - currentPrice : 0;

  // Monthly installment calculation (approx 24 months zero interest promotion)
  const monthlyInstallment = Math.round(currentPrice / 24);

  const productName = isArabic && product.nameAr ? product.nameAr : product.name;
  const productSpecs = isArabic && product.specsAr ? product.specsAr : product.specs;

  const handleAddToCart = () => {
    const variantTitle = selectedVariant
      ? ` (${isArabic ? selectedVariant.nameAr : selectedVariant.name})`
      : '';

    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      name: `${productName}${variantTitle}`,
      price: currentPrice,
      image: product.image,
      quantity,
      sku: product.sku || product.id,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    toggleCart(false);
    router.push('/cart');
  };

  const handleWhatsAppConsult = () => {
    const messageText = isArabic
      ? `مرحباً، أود الاستفسار وطلب هذا المنتج من نكسوس ستور: ${productName} (كود: ${product.sku || product.id}) بسعر ${currentPrice.toLocaleString()} ج.م`
      : `Hello, I would like to inquire about this product on Nexus Store: ${productName} (SKU: ${product.sku || product.id}) priced at ${currentPrice.toLocaleString()} EGP`;
    
    const whatsappUrl = `https://wa.me/201012345678?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    const reviewsEl = document.getElementById('product-tabs-section');
    if (reviewsEl) {
      reviewsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Brand, SKU & In-Stock Status */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          {product.brand && (
            <span className="px-3.5 py-1 rounded-xl bg-gradient-to-r from-brand-600/20 to-purple-600/20 text-brand-300 border border-brand-500/30 text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-brand-400" />
              <span>{product.brand}</span>
            </span>
          )}
          <span className="px-3 py-1 rounded-xl bg-[#0e1628] text-slate-400 border border-slate-800 text-xs font-mono">
            {product.sku || `SKU-${product.id}`}
          </span>
        </div>

        {/* In Stock Badge */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-xl shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t.productDetails?.inStockText || 'In Stock'}</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-white leading-tight tracking-tight">
          {productName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
          {productSpecs}
        </p>
      </div>

      {/* Ratings & Urgency Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 rounded-2xl bg-[#0e1526]/80 border border-slate-800/80 text-xs">
        <button
          onClick={scrollToReviews}
          className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                    : 'text-slate-700'
                }`}
              />
            ))}
          </div>
          <span className="font-extrabold text-white text-sm font-mono">{product.rating}</span>
          <span className="text-slate-400 group-hover:underline text-[11px]">
            ({product.reviewsCount} {isArabic ? 'تقييم معتمد' : 'verified reviews'})
          </span>
        </button>

        {product.soldCount && (
          <div className="flex items-center gap-1.5 text-rose-300 bg-rose-950/40 border border-rose-500/30 px-2.5 py-1 rounded-xl text-[11px] font-semibold">
            <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>
              {isArabic ? `تم بيع ${product.soldCount} قطعة مؤخراً` : `${product.soldCount} ordered recently`}
            </span>
          </div>
        )}
      </div>

      {/* Price Showcase Card with Neon Highlights */}
      <div className="relative rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-[#0e1629] via-[#0b1120] to-[#070b14] border border-slate-700/60 shadow-2xl space-y-4 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-baseline justify-between gap-3 relative z-10">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl lg:text-[40px] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 tracking-tight font-mono">
                {currentPrice.toLocaleString()}
              </span>
              <span className="text-base sm:text-lg font-extrabold text-brand-400">{t.currency}</span>
            </div>

            {currentOriginalPrice > currentPrice && (
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-xs sm:text-sm line-through text-slate-500 font-mono">
                  {currentOriginalPrice.toLocaleString()} {t.currency}
                </span>
                <span className="bg-gradient-to-r from-rose-600/30 to-pink-600/30 text-rose-300 border border-rose-500/40 text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{t.productDetails?.saveAmount.replace('{amount}', savingsAmount.toLocaleString()) || `Save ${savingsAmount} EGP`}</span>
                </span>
              </div>
            )}
          </div>

          <div className="text-end space-y-1">
            <span className="text-[11px] text-slate-400 block font-medium">
              {t.productDetails?.taxIncluded || 'VAT included + Invoice'}
            </span>
            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 justify-end">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isArabic ? 'شحن فوري مؤمن لباب البيت' : 'Fast Insured Home Delivery'}</span>
            </span>
          </div>
        </div>

        {/* Installments Option Banner */}
        <div className="p-4 rounded-2xl bg-[#090e1a]/90 border border-slate-700/60 space-y-2.5 relative z-10">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <div className="w-6 h-6 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
                <CreditCard className="w-3.5 h-3.5" />
              </div>
              <span>{t.productDetails?.installmentPlanTitle || 'Installment Plans:'}</span>
            </div>
            <span className="text-brand-300 font-black font-mono text-xs sm:text-sm bg-brand-950/60 px-2.5 py-1 rounded-lg border border-brand-500/30">
              {t.productDetails?.installmentFrom.replace('{amount}', monthlyInstallment.toLocaleString()) || `From ${monthlyInstallment} EGP/mo`}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            {t.productDetails?.installmentPlanSubtitle || '0% interest with ValU, Sympl, and Bank Credit Cards'}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-[10px] font-bold text-slate-200 border border-slate-750 shadow-sm">ValU 0%</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-[10px] font-bold text-slate-200 border border-slate-750 shadow-sm">Sympl</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-[10px] font-bold text-slate-200 border border-slate-750 shadow-sm">Fawry Pay</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-[10px] font-bold text-slate-200 border border-slate-750 shadow-sm">NBE / CIB / BM</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-[10px] font-bold text-slate-200 border border-slate-750 shadow-sm">Souhoola</span>
          </div>
        </div>
      </div>

      {/* Hardware Configuration / Variant Selector */}
      {variants.length > 0 && (
        <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-[#0e1629]/70 border border-slate-800 space-y-3">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-400" />
            <span>{t.productDetails?.selectConfiguration || 'Choose Configuration:'}</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {variants.map((v) => {
              const isSelected = selectedVariant?.id === v.id;
              const vName = isArabic ? v.nameAr : v.name;
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`p-3.5 rounded-2xl text-start transition-all text-xs flex flex-col justify-between gap-1.5 border relative ${
                    isSelected
                      ? 'bg-gradient-to-br from-brand-950/50 to-purple-950/40 border-brand-500 text-white ring-2 ring-brand-500/30 shadow-lg shadow-brand-900/20'
                      : 'bg-[#090e1a] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold block text-slate-100 text-xs sm:text-[13px]">{vName}</span>
                    {isSelected && <BadgeCheck className="w-4 h-4 text-brand-400 flex-shrink-0" />}
                  </div>
                  <span className="text-[11px] text-brand-400 font-bold font-mono">
                    {v.priceDelta === 0
                      ? isArabic ? 'السعر الأساسي' : 'Included Base'
                      : `+${v.priceDelta.toLocaleString()} ${t.currency}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & CTA Action Buttons */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-slate-750 rounded-2xl bg-[#0e1629] p-1 shadow-inner">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors active:scale-90"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 text-sm font-black font-mono text-white min-w-[2.2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors active:scale-90"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Primary Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex-1 py-4 px-6 rounded-2xl font-black text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl active:scale-98 ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-emerald-600/40 ring-4 ring-emerald-500/20'
                : 'bg-gradient-to-r from-brand-600 via-rose-600 to-brand-700 hover:from-brand-500 hover:to-rose-600 text-white shadow-brand-600/40 hover:shadow-brand-500/50 hover:scale-[1.01]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-5 h-5 animate-bounce" />
                <span>{t.productDetails?.addedToCartSuccess || 'Added to Cart!'}</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>{t.productDetails?.addToCart || 'Add to Cart'}</span>
              </>
            )}
          </button>
        </div>

        {/* Buy Now Direct Button */}
        <button
          onClick={handleBuyNow}
          className="w-full py-4 px-6 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/25 active:scale-98 hover:scale-[1.01]"
        >
          <Zap className="w-5 h-5 fill-slate-950 text-slate-950" />
          <span>{t.productDetails?.buyNow || 'Buy Now (Instant Checkout)'}</span>
        </button>

        {/* WhatsApp Consultation Button */}
        <button
          onClick={handleWhatsAppConsult}
          className="w-full py-3.5 px-4 rounded-2xl font-bold text-xs bg-gradient-to-r from-emerald-950/60 to-teal-950/60 hover:from-emerald-900/80 hover:to-teal-900/80 text-emerald-300 border border-emerald-500/40 transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>{t.productDetails?.whatsappConsult || 'Consult Hardware Specialist on WhatsApp'}</span>
        </button>
      </div>

      {/* Trust & Policy Assurance Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#0e1629]/60 border border-slate-800/80">
          <ShieldCheck className="w-4 h-4 text-brand-400 flex-shrink-0" />
          <span className="text-[11px] text-slate-300 font-semibold leading-tight">
            {isArabic ? 'ضمان محلي معتمد' : 'Official Warranty'}
          </span>
        </div>
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#0e1629]/60 border border-slate-800/80">
          <Truck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-[11px] text-slate-300 font-semibold leading-tight">
            {isArabic ? 'توصيل 24-48 ساعة' : '24-48h Delivery'}
          </span>
        </div>
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#0e1629]/60 border border-slate-800/80">
          <RotateCcw className="w-4 h-4 text-purple-400 flex-shrink-0" />
          <span className="text-[11px] text-slate-300 font-semibold leading-tight">
            {isArabic ? 'استبدال خلال 14 يوم' : '14-Day Free Returns'}
          </span>
        </div>
      </div>
    </div>
  );
};
