'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useLanguageStore } from '../../lib/store/useLanguageStore';
import { useTranslations } from '../../lib/data/translations';

const SHOWROOMS_DATA = [
  {
    id: 's1',
    cityEn: 'Alexandria Showroom',
    cityAr: 'معرض الإسكندرية',
    addressEn: '178 Gamal Abd Elnaser Rd, Sidi Bishr',
    addressAr: '١٧٨ طريق جمال عبد الناصر، سيدي بشر بحري',
    hoursEn: 'Sat – Thu: 10:00 AM – 10:00 PM | Fri: 2:00 PM – 10:00 PM',
    hoursAr: 'السبت – الخميس: ١٠:٠٠ ص – ١٠:٠٠ م | الجمعة: ٢:٠٠ م – ١٠:٠٠ م',
    phone: '19999',
    mapLink: 'https://maps.google.com',
  },
  {
    id: 's2',
    cityEn: 'Cairo – El Mokattam Showroom',
    cityAr: 'معرض القاهرة – المقطم',
    addressEn: 'Street 9, Al Abageyah, El Mokattam',
    addressAr: 'شارع 9، الأباجية، المقطم، القاهرة',
    hoursEn: 'Sat – Thu: 11:00 AM – 11:00 PM | Fri: 2:00 PM – 11:00 PM',
    hoursAr: 'السبت – الخميس: ١١:٠٠ ص – ١١:٠٠ م | الجمعة: ٢:٠٠ م – ١١:٠٠ م',
    phone: '19999',
    mapLink: 'https://maps.google.com',
  },
];

export const ShowroomsSection: React.FC = () => {
  const { language, isArabic } = useLanguageStore();
  const t = useTranslations(language);

  return (
    <section className="bg-[#0d1526] border-t border-slate-800/60 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {t.showroomsHeader}
          </h2>
          <p className="text-xs text-slate-400">
            {t.showroomsSubheader}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SHOWROOMS_DATA.map((shop) => (
            <div
              key={shop.id}
              className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-black text-white text-base">
                    {isArabic ? shop.cityAr : shop.cityEn}
                  </h3>
                  <p className="text-xs text-brand-400 font-bold">
                    {isArabic ? shop.cityEn : shop.cityAr}
                  </p>
                </div>
                <Link
                  href={shop.mapLink}
                  target="_blank"
                  className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" /> {t.mapLinkText}
                </Link>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                  <span>{isArabic ? shop.addressAr : shop.addressEn}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  <span>{isArabic ? shop.hoursAr : shop.hoursEn}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="font-bold text-emerald-400 font-mono">{shop.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-brand-900/60 via-[#131b2e] to-slate-900 border border-brand-700/30 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {t.whatsAppHeader}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                {t.whatsAppDesc}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="https://wa.me/201142277788"
                target="_blank"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/30 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                {t.whatsAppBtn}
              </Link>
              <Link
                href="tel:19999"
                className="flex items-center gap-2 bg-[#131b2e] border border-slate-700 hover:border-slate-600 text-slate-200 font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
              >
                <PhoneCall className="w-4 h-4 text-brand-400" />
                19999
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
