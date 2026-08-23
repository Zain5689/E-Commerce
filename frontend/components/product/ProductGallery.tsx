'use client';

import React, { useState } from 'react';
import { Heart, Share2, ZoomIn, Check, Sparkles, ShieldCheck, Truck, X } from 'lucide-react';
import { Product } from '../../lib/data/homeData';
import { useWishlistStore } from '../../lib/store/useWishlistStore';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';

interface ProductGalleryProps {
  product: Product;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [isHoverZooming, setIsHoverZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);

  const discountPercent = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const currentImage = images[activeIndex] || product.image;
  const productName = isArabic && product.nameAr ? product.nameAr : product.name;
  const productBadge = isArabic && product.badgeAr ? product.badgeAr : product.badge;

  return (
    <div className="space-y-4 select-none">
      {/* Main Image Frame with Ambient Glow */}
      <div className="relative group rounded-3xl p-1 bg-slate-200/60 dark:bg-gradient-to-b dark:from-brand-500/20 dark:via-slate-800/40 dark:to-slate-900/60 shadow-lg dark:shadow-2xl transition-colors">
        <div className="relative rounded-[22px] overflow-hidden bg-white dark:bg-gradient-to-b dark:from-[#0e1628] dark:to-[#080d1a] border border-slate-200 dark:border-slate-800/80 p-4 sm:p-6 transition-colors">
          {/* Radial Center Highlight behind the device */}
          <div className="absolute inset-0 bg-radial-gradient from-brand-600/10 via-purple-600/5 to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />

          <div
            className="relative h-[340px] sm:h-[420px] md:h-[460px] w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950/60 flex items-center justify-center cursor-crosshair border border-slate-200 dark:border-slate-800/50"
            onMouseEnter={() => setIsHoverZooming(true)}
            onMouseLeave={() => setIsHoverZooming(false)}
            onMouseMove={handleMouseMove}
          >
            {/* Zoomed Image */}
            <div
              className="absolute inset-0 bg-no-repeat transition-opacity duration-150"
              style={{
                backgroundImage: `url(${currentImage})`,
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                backgroundSize: '240%',
                opacity: isHoverZooming ? 1 : 0,
              }}
            />

            {/* Regular Image */}
            <img
              src={currentImage}
              alt={productName}
              className={`w-full h-full object-contain p-4 drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-all duration-300 ${
                isHoverZooming ? 'opacity-0' : 'opacity-100 scale-100 group-hover:scale-105'
              }`}
            />

            {/* Badges Overlay */}
            <div className={`absolute top-3 ${isArabic ? 'right-3' : 'left-3'} flex flex-col gap-2 z-10 pointer-events-none`}>
              {discountPercent > 0 && (
                <span className="bg-gradient-to-r from-rose-600 via-brand-600 to-pink-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg uppercase tracking-wider flex items-center gap-1.5 border border-rose-400/40">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
                  <span>-{discountPercent}% OFF</span>
                </span>
              )}
              {productBadge && (
                <span className="bg-gradient-to-r from-brand-600 to-purple-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg border border-brand-400/30">
                  {productBadge}
                </span>
              )}
            </div>

            {/* Quick Floating Action Buttons */}
            <div className={`absolute top-3 ${isArabic ? 'left-3' : 'right-3'} flex flex-col gap-2 z-10`}>
              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-2xl backdrop-blur-md transition-all shadow-md active:scale-95 border ${
                  isInWishlist
                    ? 'bg-rose-500/20 text-rose-500 border-rose-500/50 shadow-rose-500/20'
                    : 'bg-white/90 dark:bg-slate-900/85 text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 border-slate-200 dark:border-slate-700/60'
                }`}
                title={isInWishlist ? t.removeFromWishlist : t.wishlist}
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isInWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className={`p-2.5 rounded-2xl backdrop-blur-md transition-all shadow-md active:scale-95 border ${
                  copied
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/50'
                    : 'bg-white/90 dark:bg-slate-900/85 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 border-slate-200 dark:border-slate-700/60'
                }`}
                title={t.productDetails?.shareProduct || 'Share Product'}
              >
                {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>

              {/* Fullscreen Modal Trigger */}
              <button
                onClick={() => setIsZoomModalOpen(true)}
                className="p-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/85 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/60 backdrop-blur-md transition-all shadow-md active:scale-95"
                title="Fullscreen Zoom"
              >
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Copy Toast Indicator */}
            {copied && (
              <div className="absolute bottom-4 inset-x-4 mx-auto max-w-xs bg-emerald-600 text-white text-xs font-bold py-2.5 px-4 rounded-2xl text-center shadow-2xl border border-emerald-400/40 backdrop-blur animate-fade-in z-20">
                {t.productDetails?.linkCopied || 'Link copied to clipboard!'}
              </div>
            )}

            {/* Zoom hint badge at bottom */}
            <div className="absolute bottom-3 right-3 text-[11px] text-slate-500 dark:text-slate-400 bg-white/90 dark:bg-slate-900/85 border border-slate-200 dark:border-slate-700/60 px-3 py-1 rounded-xl backdrop-blur pointer-events-none hidden sm:flex items-center gap-1.5 shadow-sm">
              <ZoomIn className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>{isArabic ? 'مرر المؤشر للتكبير' : 'Hover to inspect'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {images.map((imgUrl, index) => {
            const isSelected = index === activeIndex;
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white dark:bg-[#0d1424] transition-all p-2 ${
                  isSelected
                    ? 'border-2 border-brand-500 ring-4 ring-brand-500/20 shadow-md scale-105 bg-brand-50/50 dark:bg-[#121c33]'
                    : 'border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-full object-contain drop-shadow"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Mini Assurances below Gallery */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-brand-50/80 dark:bg-gradient-to-r dark:from-brand-950/30 dark:to-purple-950/20 border border-brand-200 dark:border-brand-500/20 shadow-sm transition-colors">
          <div className="w-9 h-9 rounded-xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-[11px] leading-tight">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">
              {product.category === 'used' ? (isArabic ? 'فحص شامل 100%' : '100% Tested') : (isArabic ? 'ضمان رسمي معتمد' : 'Official Warranty')}
            </span>
            <span className="text-brand-600 dark:text-brand-300/80 text-[10px] font-medium">
              {product.warrantyPeriodAr && isArabic ? product.warrantyPeriodAr : product.warrantyPeriod || '2 Years Warranty'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-gradient-to-r dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-500/20 shadow-sm transition-colors">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div className="text-[11px] leading-tight">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">
              {isArabic ? 'شحن فوري ومؤمن' : 'Express Delivery'}
            </span>
            <span className="text-emerald-600 dark:text-emerald-300/80 text-[10px] font-medium">
              {isArabic ? 'توصيل خلال 24-48 ساعة' : '24 - 48h Nationwide'}
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomModalOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-2xl bg-slate-900 text-white hover:bg-rose-600 border border-slate-700 transition-colors shadow-2xl"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-5xl max-h-[85vh] w-full flex items-center justify-center p-4">
            <img
              src={currentImage}
              alt={productName}
              className="max-h-[80vh] max-w-full object-contain rounded-2xl drop-shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
