'use client';

import React, { useState } from 'react';
import {
  ListTree,
  Sparkles,
  Package,
  MessageSquare,
  ShieldCheck,
  Star,
  CheckCircle,
  Clock,
  MapPin,
  Send,
  Truck,
  RotateCcw,
  Check,
  Monitor,
  Snowflake,
  Zap,
} from 'lucide-react';
import { Product, ProductReview } from '../../lib/data/homeData';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';

interface ProductTabsProps {
  product: Product;
}

type TabKey = 'specs' | 'overview' | 'inBox' | 'reviews' | 'warranty';

const FEATURE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Snowflake,
  Zap,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
};

export const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('specs');
  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  // Reviews state with new review submission
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews || []);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    comment: '',
    city: '',
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment) return;

    setIsSubmittingReview(true);
    setTimeout(() => {
      const newReview: ProductReview = {
        id: `rev-user-${Date.now()}`,
        author: reviewForm.name,
        authorAr: reviewForm.name,
        rating: reviewForm.rating,
        date: 'Just now',
        dateAr: 'الآن',
        comment: reviewForm.comment,
        commentAr: reviewForm.comment,
        verified: true,
        userCity: reviewForm.city || (isArabic ? 'القاهرة' : 'Cairo'),
        userCityAr: reviewForm.city || 'القاهرة',
      };

      setReviewsList([newReview, ...reviewsList]);
      setReviewForm({ name: '', rating: 5, comment: '', city: '' });
      setIsSubmittingReview(false);
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 4000);
    }, 600);
  };

  const tabsConfig = [
    { id: 'specs' as TabKey, label: t.productDetails?.tabSpecs || 'Specifications', icon: ListTree },
    { id: 'overview' as TabKey, label: t.productDetails?.tabOverview || 'Features & Overview', icon: Sparkles },
    { id: 'inBox' as TabKey, label: t.productDetails?.tabInBox || "What's in the Box", icon: Package },
    {
      id: 'reviews' as TabKey,
      label: `${t.productDetails?.tabReviews || 'Reviews'} (${reviewsList.length})`,
      icon: MessageSquare,
    },
    { id: 'warranty' as TabKey, label: t.productDetails?.tabWarrantyShipping || 'Shipping & Warranty', icon: ShieldCheck },
  ];

  const specs = product.specifications || [];
  const features = product.features || [];
  const inBoxItems = product.includedInBox || [];

  return (
    <div id="product-tabs-section" className="space-y-6 pt-8">
      {/* Tabs Navigation Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none transition-colors">
        <div className="flex gap-2.5 min-w-max p-1 bg-white dark:bg-[#090e1a] rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none w-fit transition-colors">
          {tabsConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-rose-600 text-white shadow-md shadow-brand-600/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Detailed Specifications */}
      {activeTab === 'specs' && (
        <div className="bg-white dark:bg-gradient-to-b dark:from-[#0e1629] dark:to-[#0a0f1c] border border-slate-200 dark:border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-md dark:shadow-2xl space-y-6 animate-fade-in transition-colors">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <ListTree className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <span>{t.productDetails?.tabSpecs}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isArabic ? 'جدول المواصفات والخصائص الهندسية الكاملة للقطعة' : 'Complete hardware and engineering specifications table'}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800/80 shadow-sm">
            {specs.map((item, index) => {
              const keyText = isArabic && item.keyAr ? item.keyAr : item.key;
              const valText = isArabic && item.valueAr ? item.valueAr : item.value;
              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 p-4 sm:p-5 text-xs sm:text-sm transition-colors ${
                    index % 2 === 0
                      ? 'bg-slate-50/70 dark:bg-[#090e1b]'
                      : 'bg-white dark:bg-[#0c1222]'
                  } hover:bg-brand-50/60 dark:hover:bg-brand-950/20`}
                >
                  <div className="font-extrabold text-slate-800 dark:text-slate-200 sm:border-e sm:border-slate-200 dark:sm:border-slate-800/80 pe-4 flex items-center">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-500 me-2 flex-shrink-0" />
                    <span>{keyText}</span>
                  </div>
                  <div className="sm:col-span-2 text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    {valText}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Overview & Features */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          {/* Main Description */}
          <div className="bg-white dark:bg-gradient-to-b dark:from-[#0e1629] dark:to-[#0a0f1c] border border-slate-200 dark:border-slate-700/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-md dark:shadow-2xl transition-colors">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>{t.productDetails?.tabOverview}</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {isArabic && product.descriptionAr ? product.descriptionAr : product.description}
            </p>
          </div>

          {/* Feature Highlight Cards */}
          {features.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feat, idx) => {
                const IconComponent = FEATURE_ICONS[feat.iconName] || Sparkles;
                const featTitle = isArabic && feat.titleAr ? feat.titleAr : feat.title;
                const featDesc = isArabic && feat.descriptionAr ? feat.descriptionAr : feat.description;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#0e1629] dark:to-[#0a0f1c] border border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-500/50 transition-all space-y-3 group shadow-sm dark:shadow-xl hover:shadow-md"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-gradient-to-tr dark:from-brand-600/20 dark:to-purple-600/20 border border-brand-200 dark:border-brand-500/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                      {featTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {featDesc}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: What's in the Box */}
      {activeTab === 'inBox' && (
        <div className="bg-white dark:bg-gradient-to-b dark:from-[#0e1629] dark:to-[#0a0f1c] border border-slate-200 dark:border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-md dark:shadow-2xl space-y-6 animate-fade-in transition-colors">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>{t.productDetails?.tabInBox}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isArabic ? 'جميع الملحقات والأغراض المرفقة داخل العبوة الأصلية' : 'All accessories and original package contents included'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {inBoxItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#090e1b] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0 shadow-sm">
                  <Check className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  {isArabic ? item.ar : item.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Customer Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-6 animate-fade-in">
          {/* Ratings Summary Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white dark:bg-gradient-to-b dark:from-[#0e1629] dark:to-[#0a0f1c] border border-slate-200 dark:border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-md dark:shadow-2xl items-center transition-colors">
            {/* Overall Score */}
            <div className="text-center sm:text-start space-y-2 border-b lg:border-b-0 lg:border-e border-slate-200 dark:border-slate-800 pb-6 lg:pb-0 lg:pe-6">
              <span className="text-5xl sm:text-6xl font-black text-amber-500 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-amber-300 dark:via-amber-400 dark:to-amber-500 font-mono">
                {product.rating}
              </span>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 pt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.3)]'
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t.productDetails?.basedOnReviews.replace('{count}', String(reviewsList.length))}
              </p>
            </div>

            {/* Bars */}
            <div className="lg:col-span-2 space-y-2.5">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = stars === 5 ? reviewsList.length : 0;
                const percent = stars === 5 ? 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-3 text-xs">
                    <span className="w-12 font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      {stars} <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </span>
                    <div className="flex-1 h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-8 text-end text-slate-400 dark:text-slate-500 font-mono font-bold">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Write a Review Card */}
          <div className="bg-white dark:bg-gradient-to-b dark:from-[#0e1629] dark:to-[#0a0f1c] border border-slate-200 dark:border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-md dark:shadow-2xl space-y-5 transition-colors">
            <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>{t.productDetails?.writeReview}</span>
            </h4>

            {reviewSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>{t.productDetails?.reviewSubmittedSuccess}</span>
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t.productDetails?.reviewFormName}
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#090e1b] border border-slate-250 dark:border-slate-750 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 shadow-inner"
                    placeholder="e.g. Ahmed Ali"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t.productDetails?.reviewFormCity}
                  </label>
                  <input
                    type="text"
                    value={reviewForm.city}
                    onChange={(e) => setReviewForm({ ...reviewForm, city: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#090e1b] border border-slate-250 dark:border-slate-750 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 shadow-inner"
                    placeholder="e.g. Cairo, Nasr City"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.productDetails?.reviewFormRating}
                </label>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-[#090e1b] border border-slate-200 dark:border-slate-800 w-fit">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setReviewForm({ ...reviewForm, rating: val })}
                      className="p-1 text-amber-400 transition-transform active:scale-90"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          val <= reviewForm.rating
                            ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.3)]'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.productDetails?.reviewFormComment}
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-[#090e1b] border border-slate-250 dark:border-slate-750 rounded-xl p-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 leading-relaxed shadow-inner"
                  placeholder="Share details on performance, cooling, packaging, or customer service..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="px-7 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-500 hover:to-rose-500 text-white font-black text-xs transition-all shadow-md shadow-brand-600/20 flex items-center gap-2 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{t.productDetails?.submitReviewBtn}</span>
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviewsList.map((rev) => {
              const authorName = isArabic && rev.authorAr ? rev.authorAr : rev.author;
              const reviewText = isArabic && rev.commentAr ? rev.commentAr : rev.comment;
              const dateText = isArabic && rev.dateAr ? rev.dateAr : rev.date;
              const cityText = isArabic && rev.userCityAr ? rev.userCityAr : rev.userCity;

              return (
                <div
                  key={rev.id}
                  className="p-6 rounded-3xl bg-white dark:bg-[#0e1629]/80 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm dark:shadow-lg transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-purple-600 text-white font-black text-xs flex items-center justify-center shadow-md">
                        {authorName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-slate-900 dark:text-white">{authorName}</h5>
                          {rev.verified && (
                            <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20 font-bold">
                              <CheckCircle className="w-3 h-3" />
                              <span>{t.productDetails?.verifiedBuyer}</span>
                            </span>
                          )}
                        </div>
                        {cityText && (
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                            <MapPin className="w-3 h-3" />
                            <span>{cityText}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-slate-400 dark:text-slate-500 text-[11px] flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{dateText}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1 font-normal">
                    {reviewText}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 5: Shipping & Warranty */}
      {activeTab === 'warranty' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {/* Shipping Details */}
          <div className="p-7 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#0e1629] dark:to-[#0a0f1c] border border-emerald-200 dark:border-emerald-500/30 space-y-4 shadow-sm dark:shadow-2xl transition-colors">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                {isArabic ? 'سياسة الشحن والتسليم في مصر' : 'Egypt Nationwide Delivery'}
              </h4>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  {isArabic
                    ? 'القاهرة والجيزة: التوصيل خلال 24 ساعة فقط لباب البيت مع إمكانية المعاينة قبل الاستلام.'
                    : 'Cairo & Giza: Delivery within 24 hours with package inspection upon receipt.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  {isArabic
                    ? 'الإسكندرية ومحافظات الدلتا والقناة: التوصيل خلال 24 - 48 ساعة بواسطة أسطول شحن مؤمن.'
                    : 'Alexandria, Delta & Canal: 24 - 48 hours delivery via insured courier.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  {isArabic
                    ? 'محافظات الصعيد والبحر الأحمر: التوصيل خلال 48 - 72 ساعة في تغليف مصفح ضد الصدمات.'
                    : 'Upper Egypt & Red Sea: 48 - 72 hours express shockproof shipping.'}
                </span>
              </li>
            </ul>
          </div>

          {/* Warranty & Returns */}
          <div className="p-7 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#0e1629] dark:to-[#0a0f1c] border border-brand-200 dark:border-brand-500/30 space-y-4 shadow-sm dark:shadow-2xl transition-colors">
            <div className="flex items-center gap-3 text-brand-600 dark:text-brand-400">
              <div className="p-3 rounded-2xl bg-brand-50 dark:bg-brand-500/15 border border-brand-200 dark:border-brand-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                {isArabic ? 'الضمان المعتمد والاستبدال' : 'Official Warranty & Return Policy'}
              </h4>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                <span>
                  {isArabic
                    ? 'ضمان محلي معتمد ومسجل بالسيريال نمبر ضد عيوب الصناعة مع شهادة ضمان وفاتورة ضريبية رسمية.'
                    : 'Official local warranty registered by serial number with commercial tax invoice.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                <span>
                  {isArabic
                    ? 'استبدال أو استرجاع مجاني خلال 14 يوماً في حالة وجود أي عيب مصنعي بدون أي مصاريف إضافية.'
                    : '14-Day Free Replacement or Return policy for manufacturer defects without extra fees.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                <span>
                  {isArabic
                    ? 'دعم فني وخدمة عملاء أونلاين وهاتفياً للرد على أي استفسارات تخص التحديث والتعريفات.'
                    : 'Continuous technical and hardware support online & phone for bios updates and drivers.'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
