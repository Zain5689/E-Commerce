'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES, SIDE_HERO_BANNERS } from '../../lib/data/homeData';
import { useLanguageStore } from '../../lib/store/useLanguageStore';

export const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const { isArabic } = useLanguageStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[current];

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Hero Slider */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden h-[320px] sm:h-[380px] group">
            {/* BG Image */}
            <div className="absolute inset-0 transition-opacity duration-700">
              <img
                src={slide.image}
                alt={isArabic ? slide.titleAr : slide.title}
                className="w-full h-full object-cover object-center"
              />
              <div
                className={`absolute inset-0 ${
                  isArabic
                    ? 'bg-gradient-to-l from-[#060d1e]/95 via-[#060d1e]/70 to-transparent'
                    : 'bg-gradient-to-r from-[#060d1e]/95 via-[#060d1e]/70 to-transparent'
                }`}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-12 py-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-xs font-bold w-fit animate-pulse">
                {isArabic ? slide.tagAr : slide.tag}
              </div>

              <h1 className="text-2xl sm:text-3xl xl:text-4xl font-black text-white leading-snug tracking-tight max-w-lg">
                {isArabic ? slide.titleAr : slide.title}
              </h1>

              <p className="text-slate-300 text-sm max-w-sm leading-relaxed hidden sm:block">
                {isArabic ? slide.descriptionAr : slide.description}
              </p>

              <div className="flex items-center gap-3 flex-wrap pt-1">
                <Link
                  href={slide.btnLink}
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 shadow-lg shadow-brand-600/30 active:scale-95"
                >
                  {isArabic ? slide.btnTextAr : slide.btnText}
                  {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
                <span className="bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg">
                  {isArabic ? slide.discountAr : slide.discount}
                </span>
              </div>
            </div>

            {/* Slide Nav Buttons */}
            <button
              onClick={() => setCurrent((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm"
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrent((current + 1) % HERO_SLIDES.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm"
              title="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === current ? 'w-6 bg-brand-400' : 'w-1.5 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Side Banners */}
          <div className="flex flex-row lg:flex-col gap-4">
            {SIDE_HERO_BANNERS.map((banner) => (
              <Link
                key={banner.id}
                href={banner.link}
                className="relative flex-1 rounded-2xl overflow-hidden h-[148px] sm:h-[180px] lg:h-full group block"
              >
                <img
                  src={banner.image}
                  alt={isArabic ? banner.titleAr : banner.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${banner.bgGradient}`} />
                <div className="relative z-10 h-full flex flex-col justify-end p-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-400 bg-brand-400/10 px-2 py-0.5 rounded w-fit mb-1">
                    {isArabic ? banner.badgeAr : banner.badge}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {isArabic ? banner.titleAr : banner.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {isArabic ? banner.subtitleAr : banner.subtitle}
                  </p>
                  <p className="text-xs font-bold text-amber-300 mt-1">
                    {isArabic ? banner.priceTextAr : banner.priceText}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
