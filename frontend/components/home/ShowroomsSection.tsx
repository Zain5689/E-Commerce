import React from 'react';
import Link from 'next/link';
import { PhoneCall, MapPin, Clock, MessageCircle } from 'lucide-react';

const SHOWROOMS = [
  {
    id: 's1',
    city: 'Alexandria',
    cityAr: 'الإسكندرية',
    address: '178 Gamal Abd Elnaser Rd, Sidi Bishr',
    hours: 'Sat – Thu: 10:00 AM – 10:00 PM',
    phone: '19611',
    mapLink: 'https://maps.google.com',
  },
  {
    id: 's2',
    city: 'Cairo – El Mokattam',
    cityAr: 'القاهرة – المقطم',
    address: 'Street 9, Al Abageyah, El Mokattam',
    hours: 'Sat – Thu: 11:00 AM – 11:00 PM',
    phone: '19611',
    mapLink: 'https://maps.google.com',
  },
];

export const ShowroomsSection: React.FC = () => {
  return (
    <section className="bg-[#0d1526] border-t border-slate-800/60 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            🏪 فروعنا — زورنا أو تواصل معنا
          </h2>
          <p className="text-xs text-slate-400">
            فرعين في مصر — القاهرة والإسكندرية — أو تواصل معنا أونلاين
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SHOWROOMS.map((shop) => (
            <div
              key={shop.id}
              className="bg-[#131b2e] border border-slate-800/80 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-black text-white text-base">{shop.city}</h3>
                  <p className="text-xs text-brand-400 font-bold">{shop.cityAr}</p>
                </div>
                <Link
                  href={shop.mapLink}
                  target="_blank"
                  className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" /> Map
                </Link>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                  <span>{shop.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  <span>{shop.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="font-bold text-emerald-400">{shop.phone}</span>
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
                💬 تواصل معنا على واتساب
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                استفسر عن أي منتج، احجز تجميعة Custom PC، أو تتبع أوردرك — فريقنا جاهز 24/7
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="https://wa.me/201142277788"
                target="_blank"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/30 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Link>
              <Link
                href="tel:19611"
                className="flex items-center gap-2 bg-[#131b2e] border border-slate-700 hover:border-slate-600 text-slate-200 font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
              >
                <PhoneCall className="w-4 h-4 text-brand-400" />
                19611
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
