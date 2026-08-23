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
      {/* Brand, SKU & Category Tags */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
        <div className="flex items-center gap-2">
          {product.brand && (
            <span className="px-3 py-1 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-black uppercase tracking-wider">
              {product.brand}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-xl bg-slate-800/80 text-slate-400 text-xs font-mono">
            {product.sku || `SKU-${product.id}`}
          </span>
        </div>

        {/* In Stock Badge */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t.productDetails?.inStockText || 'In Stock'}</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
          {productName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {productSpecs}
        </p>
      </div>

      {/* Ratings & Quick Social Proof */}
      <div className="flex flex-wrap items-center gap-4 py-2 border-y border-slate-800/80 text-xs">
        <button
          onClick={scrollToReviews}
          className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors group"
        >
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-700'
                }`}
              />
            ))}
          </div>
          <span className="font-extrabold text-white text-sm">{product.rating}</span>
          <span className="text-slate-400 group-hover:underline">
            ({product.reviewsCount} {isArabic ? 'تقييم موثق' : 'reviews'})
          </span>
        </button>

        {product.soldCount && (
          <div className="flex items-center gap-1.5 text-slate-300">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>
              {isArabic ? `تم بيع ${product.soldCount} قطعة مؤخراً` : `${product.soldCount} sold recently`}
            </span>
          </div>
        )}
      </div>

      {/* Price Showcase Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-[#131b2e] to-[#0f172a] border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
                {currentPrice.toLocaleString()}
              </span>
              <span className="text-base font-bold text-brand-400">{t.currency}</span>
            </div>

            {currentOriginalPrice > currentPrice && (
              <div className="flex items-center gap-2">
                <span className="text-sm line-through text-slate-500 font-mono">
                  {currentOriginalPrice.toLocaleString()} {t.currency}
                </span>
                <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[11px] font-bold px-2 py-0.5 rounded-lg">
                  {t.productDetails?.saveAmount.replace('{amount}', savingsAmount.toLocaleString()) || `Save ${savingsAmount} EGP`}
                </span>
              </div>
            )}
          </div>

          <div className="text-end">
            <span className="text-[11px] text-slate-400 block">
              {t.productDetails?.taxIncluded || 'VAT included'}
            </span>
            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 justify-end">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isArabic ? 'شحن مجاني للمشتريات فوق 10k' : 'Free Shipping Eligible'}</span>
            </span>
          </div>
        </div>

        {/* Installments Option Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <CreditCard className="w-4 h-4 text-brand-400" />
              <span>{t.productDetails?.installmentPlanTitle || 'Installment Plans:'}</span>
            </div>
            <span className="text-brand-400 font-black font-mono text-xs sm:text-sm">
              {t.productDetails?.installmentFrom.replace('{amount}', monthlyInstallment.toLocaleString()) || `From ${monthlyInstallment} EGP/mo`}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            {t.productDetails?.installmentPlanSubtitle || '0% interest with ValU, Sympl, and Credit Cards'}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300 border border-slate-700">ValU</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300 border border-slate-700">Sympl</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300 border border-slate-700">Fawry</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300 border border-slate-700">Visa / MC</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300 border border-slate-700">Souhoola</span>
          </div>
        </div>
      </div>

      {/* Hardware Configuration / Variant Selector */}
      {variants.length > 0 && (
        <div className="space-y-3 p-4 rounded-2xl bg-[#131b2e]/60 border border-slate-800">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-400" />
            <span>{t.productDetails?.selectConfiguration || 'Choose Configuration:'}</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {variants.map((v) => {
              const isSelected = selectedVariant?.id === v.id;
              const vName = isArabic ? v.nameAr : v.name;
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`p-3 rounded-xl text-start transition-all text-xs flex flex-col justify-between gap-1 border ${
                    isSelected
                      ? 'bg-brand-600/20 border-brand-500 text-white shadow-md shadow-brand-500/20'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="font-bold block text-slate-100">{vName}</span>
                  <span className="text-[11px] text-brand-400 font-semibold font-mono">
                    {v.priceDelta === 0
                      ? isArabic ? 'السعر الأساسي' : 'Base Price'
                      : `+${v.priceDelta.toLocaleString()} ${t.currency}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & CTA Action Buttons */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-slate-700 rounded-2xl bg-slate-900/90 px-2 py-1.5 shadow-inner">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors active:scale-95"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 text-sm font-black font-mono text-white min-w-[2.5rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors active:scale-95"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Primary Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex-1 py-3.5 px-6 rounded-2xl font-black text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xl active:scale-98 ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/30 hover:shadow-brand-500/40'
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
          className="w-full py-3.5 px-6 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-98"
        >
          <Zap className="w-5 h-5 fill-slate-950" />
          <span>{t.productDetails?.buyNow || 'Buy Now (Instant Checkout)'}</span>
        </button>

        {/* WhatsApp Consultation Button */}
        <button
          onClick={handleWhatsAppConsult}
          className="w-full py-3 px-4 rounded-2xl font-bold text-xs bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-500/40 transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>{t.productDetails?.whatsappConsult || 'Consult Hardware Specialist on WhatsApp'}</span>
        </button>
      </div>

      {/* Trust & Policy Assurance Grid */}
      <div className="p-4 rounded-2xl bg-[#131b2e]/40 border border-slate-800 space-y-3">
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-brand-400 flex-shrink-0" />
          <span>{t.productDetails?.warrantyNotice || 'Official warranty with replacement'}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <Truck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{t.productDetails?.shippingNotice || 'Insured delivery within 24-48h'}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <RotateCcw className="w-4 h-4 text-purple-400 flex-shrink-0" />
          <span>{t.productDetails?.freeAssemblyNotice || '14-day free return & replacement policy'}</span>
        </div>
      </div>
    </div>
  );
};
