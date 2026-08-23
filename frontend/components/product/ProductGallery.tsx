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
      <div className="relative group bg-gradient-to-b from-[#131b2e] to-[#0d1322] border border-slate-800/90 rounded-3xl p-3 sm:p-4 overflow-hidden shadow-2xl shadow-brand-950/30">
        {/* Glow backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-600/10 via-purple-600/10 to-brand-400/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div
          className="relative h-[340px] sm:h-[430px] md:h-[480px] w-full rounded-2xl overflow-hidden bg-slate-950/90 flex items-center justify-center cursor-crosshair"
          onMouseEnter={() => setIsHoverZooming(true)}
          onMouseLeave={() => setIsHoverZooming(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Zoomed Image */}
          <div
            className="absolute inset-0 bg-no-repeat transition-opacity duration-200"
            style={{
              backgroundImage: `url(${currentImage})`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundSize: '220%',
              opacity: isHoverZooming ? 1 : 0,
            }}
          />

          {/* Regular Image */}
          <img
            src={currentImage}
            alt={productName}
            className={`w-full h-full object-contain p-4 transition-transform duration-300 ${
              isHoverZooming ? 'opacity-0' : 'opacity-100 scale-100 group-hover:scale-105'
            }`}
          />

          {/* Badges Overlay */}
          <div className={`absolute top-4 ${isArabic ? 'right-4' : 'left-4'} flex flex-col gap-2 z-10 pointer-events-none`}>
            {discountPercent > 0 && (
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-black px-3 py-1 rounded-xl shadow-lg uppercase tracking-wider flex items-center gap-1 border border-rose-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>-{discountPercent}%</span>
              </span>
            )}
            {productBadge && (
              <span className="bg-brand-600/95 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-lg border border-brand-400/30">
                {productBadge}
              </span>
            )}
            {product.category === 'used' && (
              <span className="bg-blue-600/90 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-md border border-blue-400/30">
                {isArabic ? 'فرز أول A+' : 'Grade A+'}
              </span>
            )}
          </div>

          {/* Quick Floating Action Buttons */}
          <div className={`absolute top-4 ${isArabic ? 'left-4' : 'right-4'} flex flex-col gap-2 z-10`}>
            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-2.5 rounded-2xl backdrop-blur-md transition-all shadow-lg active:scale-95 ${
                isInWishlist
                  ? 'bg-rose-500/20 text-rose-500 border border-rose-500/50 shadow-rose-500/20'
                  : 'bg-slate-900/80 text-slate-300 hover:text-rose-400 hover:bg-slate-800 border border-slate-700/60'
              }`}
              title={isInWishlist ? t.removeFromWishlist : t.wishlist}
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isInWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className={`p-2.5 rounded-2xl backdrop-blur-md transition-all shadow-lg active:scale-95 ${
                copied
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                  : 'bg-slate-900/80 text-slate-300 hover:text-brand-400 hover:bg-slate-800 border border-slate-700/60'
              }`}
              title={t.productDetails?.shareProduct || 'Share Product'}
            >
              {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /> : <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Fullscreen Modal Trigger */}
            <button
              onClick={() => setIsZoomModalOpen(true)}
              className="p-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 backdrop-blur-md transition-all shadow-lg active:scale-95"
              title="Fullscreen Zoom"
            >
              <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Copy Toast Indicator */}
          {copied && (
            <div className="absolute bottom-4 inset-x-4 mx-auto max-w-xs bg-emerald-600/95 text-white text-xs font-bold py-2 px-3 rounded-xl text-center shadow-xl border border-emerald-400/40 backdrop-blur animate-fade-in z-20">
              {t.productDetails?.linkCopied || 'Link copied!'}
            </div>
          )}

          {/* Zoom hint badge at bottom */}
          <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-950/70 border border-slate-800 px-2.5 py-1 rounded-lg backdrop-blur pointer-events-none hidden sm:flex items-center gap-1.5">
            <ZoomIn className="w-3 h-3 text-brand-400" />
            <span>{isArabic ? 'مرر للتكبير' : 'Hover to zoom'}</span>
          </div>
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((imgUrl, index) => {
            const isSelected = index === activeIndex;
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-950 transition-all p-1.5 ${
                  isSelected
                    ? 'border-2 border-brand-500 shadow-lg shadow-brand-500/20 scale-105'
                    : 'border border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Mini Assurances below Gallery */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#131b2e]/60 border border-slate-800/80">
          <ShieldCheck className="w-5 h-5 text-brand-400 flex-shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="font-bold text-slate-200 block">
              {product.category === 'used' ? (isArabic ? 'فحص شامل 100%' : '100% Tested') : (isArabic ? 'ضمان رسمي معتمد' : 'Official Warranty')}
            </span>
            <span className="text-slate-400 text-[10px]">
              {product.warrantyPeriodAr && isArabic ? product.warrantyPeriodAr : product.warrantyPeriod || '2 Years'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#131b2e]/60 border border-slate-800/80">
          <Truck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="font-bold text-slate-200 block">
              {isArabic ? 'شحن فوري مؤمن' : 'Express Delivery'}
            </span>
            <span className="text-slate-400 text-[10px]">
              {isArabic ? 'توصيل خلال 24-48 ساعة' : '24 - 48 Hours Nationwide'}
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomModalOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 border border-slate-700 transition-colors shadow-2xl"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] w-full flex items-center justify-center">
            <img
              src={currentImage}
              alt={productName}
              className="max-h-[80vh] max-w-full object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
