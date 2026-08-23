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
    <div id="product-tabs-section" className="space-y-6 pt-6">
      {/* Tabs Navigation Header */}
      <div className="border-b border-slate-800 pb-1 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 min-w-max">
          {tabsConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all relative ${
                  isActive
                    ? 'bg-brand-600/20 text-brand-300 border border-brand-500/40 shadow-lg shadow-brand-600/10'
                    : 'bg-[#131b2e]/60 text-slate-400 hover:text-slate-200 hover:bg-[#162138] border border-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Detailed Specifications */}
      {activeTab === 'specs' && (
        <div className="bg-[#131b2e]/70 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white">{t.productDetails?.tabSpecs}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {isArabic ? 'جدول المواصفات والخصائص الهندسية الكاملة للقطعة' : 'Complete hardware and engineering specifications table'}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800/80 divide-y divide-slate-800/80">
            {specs.map((item, index) => {
              const keyText = isArabic && item.keyAr ? item.keyAr : item.key;
              const valText = isArabic && item.valueAr ? item.valueAr : item.value;
              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 p-4 text-xs sm:text-sm transition-colors ${
                    index % 2 === 0 ? 'bg-slate-900/50' : 'bg-slate-950/40'
                  } hover:bg-brand-950/20`}
                >
                  <div className="font-bold text-slate-300 sm:border-e sm:border-slate-800/60 pe-3 flex items-center">
                    {keyText}
                  </div>
                  <div className="sm:col-span-2 text-slate-300 font-medium leading-relaxed">
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
          <div className="bg-[#131b2e]/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <h3 className="text-lg font-black text-white">{t.productDetails?.tabOverview}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
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
                    className="p-5 rounded-3xl bg-[#131b2e]/60 border border-slate-800 hover:border-brand-500/40 transition-all space-y-3 group"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                      {featTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
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
        <div className="bg-[#131b2e]/70 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fade-in">
          <div>
            <h3 className="text-lg font-black text-white">{t.productDetails?.tabInBox}</h3>
            <p className="text-xs text-slate-400 mt-1">
              {isArabic ? 'جميع الملحقات والأغراض المرفقة داخل العبوة الأصلية' : 'All accessories and original package contents included'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inBoxItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-200">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-[#131b2e]/70 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl items-center">
            {/* Overall Score */}
            <div className="text-center sm:text-start space-y-2 border-b lg:border-b-0 lg:border-e border-slate-800 pb-6 lg:pb-0 lg:pe-6">
              <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                {product.rating}
              </span>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 pt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-400">
                {t.productDetails?.basedOnReviews.replace('{count}', String(reviewsList.length))}
              </p>
            </div>

            {/* Bars */}
            <div className="lg:col-span-2 space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = stars === 5 ? reviewsList.length : 0;
                const percent = stars === 5 ? 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-3 text-xs">
                    <span className="w-12 font-bold text-slate-400 flex items-center gap-1">
                      {stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </span>
                    <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-8 text-end text-slate-500 font-mono">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Write a Review Card */}
          <div className="bg-[#131b2e]/70 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>{t.productDetails?.writeReview}</span>
            </h4>

            {reviewSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>{t.productDetails?.reviewSubmittedSuccess}</span>
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.productDetails?.reviewFormName}
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    placeholder="e.g. Ahmed Ali"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.productDetails?.reviewFormCity}
                  </label>
                  <input
                    type="text"
                    value={reviewForm.city}
                    onChange={(e) => setReviewForm({ ...reviewForm, city: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    placeholder="e.g. Cairo, Nasr City"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t.productDetails?.reviewFormRating}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setReviewForm({ ...reviewForm, rating: val })}
                      className="p-1 text-amber-400 transition-transform active:scale-90"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          val <= reviewForm.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t.productDetails?.reviewFormComment}
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 leading-relaxed"
                  placeholder="Share details on performance, cooling, packaging, or customer service..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition-all shadow-md flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
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
                  className="p-5 rounded-3xl bg-[#131b2e]/60 border border-slate-800/90 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow">
                        {authorName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-white">{authorName}</h5>
                          {rev.verified && (
                            <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              <CheckCircle className="w-3 h-3" />
                              <span>{t.productDetails?.verifiedBuyer}</span>
                            </span>
                          )}
                        </div>
                        {cityText && (
                          <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
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
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-slate-500 text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{dateText}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
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
          <div className="p-6 rounded-3xl bg-[#131b2e]/70 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-emerald-400">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">
                {isArabic ? 'سياسة الشحن والتسليم في مصر' : 'Egypt Nationwide Delivery'}
              </h4>
            </div>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  {isArabic
                    ? 'القاهرة والجيزة: التوصيل خلال 24 ساعة فقط لباب البيت مع إمكانية المعاينة قبل الاستلام.'
                    : 'Cairo & Giza: Delivery within 24 hours with package inspection upon receipt.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  {isArabic
                    ? 'الإسكندرية ومحافظات الدلتا والقناة: التوصيل خلال 24 - 48 ساعة بواسطة أسطول شحن مؤمن.'
                    : 'Alexandria, Delta & Canal: 24 - 48 hours delivery via insured courier.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  {isArabic
                    ? 'محافظات الصعيد والبحر الأحمر: التوصيل خلال 48 - 72 ساعة في تغليف مصفح ضد الصدمات.'
                    : 'Upper Egypt & Red Sea: 48 - 72 hours express shockproof shipping.'}
                </span>
              </li>
            </ul>
          </div>

          {/* Warranty & Returns */}
          <div className="p-6 rounded-3xl bg-[#131b2e]/70 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-brand-400">
              <div className="p-2.5 rounded-2xl bg-brand-500/10 border border-brand-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">
                {isArabic ? 'الضمان المعتمد والاستبدال' : 'Official Warranty & Return Policy'}
              </h4>
            </div>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>
                  {isArabic
                    ? 'ضمان محلي معتمد ومسجل بالسيريال نمبر ضد عيوب الصناعة مع شهادة ضمان وفاتورة ضريبية رسمية.'
                    : 'Official local warranty registered by serial number with commercial tax invoice.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>
                  {isArabic
                    ? 'استبدال أو استرجاع مجاني خلال 14 يوماً في حالة وجود أي عيب مصنعي بدون أي مصاريف إضافية.'
                    : '14-Day Free Replacement or Return policy for manufacturer defects without extra fees.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
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
