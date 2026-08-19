import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, CreditCard, Headphones, RefreshCw, Award } from 'lucide-react';

const TRUST_ITEMS = [
  {
    id: 't1',
    icon: Truck,
    title: 'توصيل لكل مصر',
    titleEn: 'Nationwide Delivery',
    desc: '24-72 ساعة لكل المحافظات',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10 border-sky-400/20',
  },
  {
    id: 't2',
    icon: ShieldCheck,
    title: 'ضمان رسمي معتمد',
    titleEn: 'Official Warranty',
    desc: 'منتجات أصلية 100% بفاتورة رسمية',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10 border-emerald-400/20',
  },
  {
    id: 't3',
    icon: CreditCard,
    title: 'طرق دفع متعددة',
    titleEn: 'Flexible Payments',
    desc: 'ValU | Paymob | Fawry | Cash | بطاقات',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10 border-amber-400/20',
  },
  {
    id: 't4',
    icon: Headphones,
    title: 'دعم فني متخصص',
    titleEn: 'Expert Tech Support',
    desc: 'مهندسين متخصصين تحت أمرك',
    color: 'text-brand-400',
    bg: 'bg-brand-400/10 border-brand-400/20',
  },
  {
    id: 't5',
    icon: RefreshCw,
    title: 'استبدال خلال 14 يوم',
    titleEn: '14-Day Easy Returns',
    desc: 'استرجاع واستبدال بدون تعقيد',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10 border-violet-400/20',
  },
  {
    id: 't6',
    icon: Award,
    title: 'تجميع PC رسمي',
    titleEn: 'Expert PC Assembly',
    desc: 'تجميع ومعايرة بواسطة مهندسين معتمدين',
    color: 'text-rose-400',
    bg: 'bg-rose-400/10 border-rose-400/20',
  },
];

export const TrustBadgesSection: React.FC = () => {
  return (
    <section className="bg-[#0d1526] border-y border-slate-800/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl border border-slate-800/40 hover:border-slate-700/60 transition-colors group">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${item.bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-xs font-black text-white">{item.title}</p>
                  <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
