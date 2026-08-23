export interface ProductSpecItem {
  key: string;
  keyAr: string;
  value: string;
  valueAr: string;
}

export interface ProductFeatureHighlight {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  iconName: string;
}

export interface ProductVariantOption {
  id: string;
  name: string;
  nameAr: string;
  priceDelta: number;
  specsDelta?: string;
  specsDeltaAr?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  authorAr: string;
  rating: number;
  date: string;
  dateAr: string;
  comment: string;
  commentAr: string;
  verified: boolean;
  userCity?: string;
  userCityAr?: string;
}

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  category: 'laptops' | 'pc-builds' | 'gpus' | 'audio' | 'used' | 'monitors' | 'accessories' | string;
  specs: string;
  specsAr?: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages?: string[];
  description?: string;
  descriptionAr?: string;
  badge?: string;
  badgeAr?: string;
  badgeColor?: 'red' | 'amber' | 'emerald' | 'blue' | 'purple';
  inStock?: boolean;
  soldCount?: number;
  stockCount?: number;
  brand?: string;
  sku?: string;
  modelCode?: string;
  warrantyPeriod?: string;
  warrantyPeriodAr?: string;
  features?: ProductFeatureHighlight[];
  specifications?: ProductSpecItem[];
  includedInBox?: { en: string; ar: string }[];
  variants?: ProductVariantOption[];
  reviews?: ProductReview[];
}

export interface CategoryCard {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  itemCount: string;
  itemCountAr: string;
  iconName: string;
  image: string;
}

export interface BrandItem {
  id: string;
  name: string;
  tagline: string;
  taglineAr: string;
  logo: string;
}

export const HERO_SLIDES = [
  {
    id: 1,
    tag: '⚡ 2026 Gaming Masterpiece',
    tagAr: '⚡ تحفة الألعاب لعام 2026',
    title: 'Extreme RTX 4090 Rigs & Gaming Laptops',
    titleAr: 'أقوى تجميعات RTX 4090 ولابتوبات الجيمنج الخارقة',
    description: 'Experience unmatched frame rates with Intel 14th Gen & AMD Ryzen 9 7950X3D gaming powerhouses.',
    descriptionAr: 'استمتع بأعلى معدل إطارات وأقصى أداء مع معالجات Intel الجيل 14 و AMD Ryzen 9 7950X3D.',
    btnText: 'Shop Gaming Deals',
    btnTextAr: 'تسوق عروض الجيمنج',
    btnLink: '/category/laptops',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
    discount: 'Up to 25% OFF',
    discountAr: 'خصم يصل إلى 25%',
  },
  {
    id: 2,
    tag: '🔥 Custom Rig Assembly',
    tagAr: '🔥 تجميع احترافي مخصص',
    title: 'Next-Gen Custom PC Builds & Workstations',
    titleAr: 'تجميعات PC احترافية ومحطات عمل Workstation',
    description: 'Built by hardware experts in Cairo & Alexandria with 3-year official warranty & stress testing.',
    descriptionAr: 'تجميع بواسطة خبراء الهاردوير في القاهرة والإسكندرية مع ضمان رسمي 3 سنوات واختبارات ضغط.',
    btnText: 'Build Your PC',
    btnTextAr: 'جمّع جهازك الآن',
    btnLink: '/category/pc-components',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
    discount: 'Free Assembly + Windows 11',
    discountAr: 'تجميع مجاني + Windows 11',
  },
  {
    id: 3,
    tag: '✨ Certified Original Used (استيراد مضمون)',
    tagAr: '✨ استيراد أصلي مضمون (فرز أول)',
    title: 'Top Tier Workstation Laptops & Hardware',
    titleAr: 'أفضل لابتوبات وركستيشن وقطع استيراد بحالة الزيرو',
    description: 'Grade A+ Dell Precision, HP ZBook, and ThinkPads with official 6-month store warranty.',
    descriptionAr: 'أجهزة Dell Precision و HP ZBook و ThinkPad فئة A+ مع ضمان معتمد لمدة 6 أشهر من متجرنا.',
    btnText: 'Explore Used Outlet',
    btnTextAr: 'تصفح قسم الاستيراد',
    btnLink: '/category/used',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
    discount: 'Starting from 9,999 EGP',
    discountAr: 'تبدأ من 9,999 ج.م',
  },
];

export const SIDE_HERO_BANNERS = [
  {
    id: 'side-1',
    title: 'GeForce RTX™ 4080 Super',
    titleAr: 'GeForce RTX™ 4080 Super',
    subtitle: 'Ultra Performance Series',
    subtitleAr: 'سلسلة الأداء الفائق والـ 4K',
    priceText: 'From 49,999 EGP',
    priceTextAr: 'تبدأ من 49,999 ج.م',
    link: '/category/gpus',
    badge: 'NEW',
    badgeAr: 'جديد',
    bgGradient: 'from-blue-950/80 to-slate-900',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'side-2',
    title: 'Smart CCTV & Home Security',
    titleAr: 'كاميرات مراقبة وأمان ذكي',
    subtitle: 'EZVIZ & IMOU 4K Night Vision',
    subtitleAr: 'EZVIZ & IMOU بدقة 4K ورؤية ليلية',
    priceText: 'Special Bundle Deals',
    priceTextAr: 'عروض باقات حصرية',
    link: '/category/cctv',
    badge: 'HOT',
    badgeAr: 'الأكثر طلباً',
    bgGradient: 'from-rose-950/80 to-slate-900',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
  },
];

export const POPULAR_CATEGORIES: CategoryCard[] = [
  {
    id: 'cat-1',
    slug: 'laptops',
    title: 'Gaming Laptops',
    titleAr: 'لابتوبات جيمنج',
    itemCount: '124+ Products',
    itemCountAr: '124+ منتج',
    iconName: 'Laptop',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-2',
    slug: 'pc-components',
    title: 'PC Components',
    titleAr: 'قطع تجميع الكمبيوتر',
    itemCount: '350+ Products',
    itemCountAr: '350+ منتج',
    iconName: 'Cpu',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-3',
    slug: 'gpus',
    title: 'Graphics Cards (RTX)',
    titleAr: 'كروت الشاشة RTX',
    itemCount: '58+ Products',
    itemCountAr: '58+ منتج',
    iconName: 'Zap',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-4',
    slug: 'monitors',
    title: 'Gaming Monitors',
    titleAr: 'شاشات ألعاب عالية التردد',
    itemCount: '62+ Products',
    itemCountAr: '62+ منتج',
    iconName: 'Tv',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-5',
    slug: 'used',
    title: 'Original Used (استيراد)',
    titleAr: 'لابتوبات وقطع استيراد',
    itemCount: '80+ Products',
    itemCountAr: '80+ منتج',
    iconName: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-6',
    slug: 'audio',
    title: 'Smart Audio & Speakers',
    titleAr: 'سماعات وصوتيات ذكية',
    itemCount: '95+ Products',
    itemCountAr: '95+ منتج',
    iconName: 'Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-7',
    slug: 'ram-memory',
    title: 'RAM & NVMe SSD',
    titleAr: 'رامات وهاردات فائقة السرعة',
    itemCount: '110+ Products',
    itemCountAr: '110+ منتج',
    iconName: 'HardDrive',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-8',
    slug: 'cctv',
    title: 'CCTV & Smart Locks',
    titleAr: 'كاميرات مراقبة وكوالين ذكية',
    itemCount: '70+ Products',
    itemCountAr: '70+ منتج',
    iconName: 'Camera',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=300&q=80',
  },
];

export const FLASH_DEALS: Product[] = [
  {
    id: 'deal-1',
    name: 'ASUS ROG Strix G16 (2024) 240Hz 2.5K',
    nameAr: 'لابتوب ASUS ROG Strix G16 (2024) 240Hz 2.5K',
    category: 'laptops',
    specs: 'Intel Core i7-14700HX | RTX 4070 8GB | 32GB DDR5 | 1TB NVMe Gen4',
    specsAr: 'معالج i7-14700HX | كارت RTX 4070 8GB | رام 32GB DDR5 | هارد 1TB NVMe',
    price: 61999,
    originalPrice: 68500,
    rating: 4.9,
    reviewsCount: 28,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80',
    badge: '-10% FLASH',
    badgeAr: '-10% خصم فلاش',
    badgeColor: 'red',
    inStock: true,
    soldCount: 14,
    stockCount: 20,
    brand: 'ASUS ROG',
  },
  {
    id: 'deal-2',
    name: 'MSI GeForce RTX 4070 Ti Super 16GB Gaming X Slim',
    nameAr: 'كارت شاشة MSI GeForce RTX 4070 Ti Super 16GB Gaming X Slim',
    category: 'gpus',
    specs: '16GB GDDR6X | 256-Bit | DLSS 3.5 Frame Gen | RGB Mystic Light',
    specsAr: 'ذاكرة 16GB GDDR6X | دعم DLSS 3.5 | تبريد ثلاثي متطور | إضاءة RGB',
    price: 46999,
    originalPrice: 51500,
    rating: 5.0,
    reviewsCount: 34,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
    badge: 'HOT DEAL',
    badgeAr: 'عرض ساخن',
    badgeColor: 'amber',
    inStock: true,
    soldCount: 8,
    stockCount: 10,
    brand: 'MSI',
  },
  {
    id: 'deal-3',
    name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz CL30',
    nameAr: 'رامات Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz',
    category: 'accessories',
    specs: 'XMP 3.0 & EXPO Ready | Low Latency Gaming RAM | Black',
    specsAr: 'جاهزة لـ XMP 3.0 & EXPO | توقيت CL30 فائق السرعة | أسود RGB',
    price: 6499,
    originalPrice: 7500,
    rating: 4.9,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80',
    badge: '-13%',
    badgeAr: '-13%',
    badgeColor: 'emerald',
    inStock: true,
    soldCount: 19,
    stockCount: 25,
    brand: 'Corsair',
  },
  {
    id: 'deal-4',
    name: 'Samsung Odyssey G7 27" 240Hz 1ms Curved Gaming Monitor',
    nameAr: 'شاشة ألعاب Samsung Odyssey G7 27 بوصة 240Hz منحنية 1ms',
    category: 'monitors',
    specs: '2560x1440 QHD | 1000R Curvature | G-Sync & FreeSync Premium Pro',
    specsAr: 'دقة 2K QHD | انحناء 1000R | دعم G-Sync و FreeSync Premium',
    price: 20999,
    originalPrice: 24500,
    rating: 4.8,
    reviewsCount: 18,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    badge: 'SAVE 3,500 EGP',
    badgeAr: 'وفر 3,500 ج.م',
    badgeColor: 'purple',
    inStock: true,
    soldCount: 11,
    stockCount: 15,
    brand: 'Samsung',
  },
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'prod-f1',
    name: 'Lenovo Legion Pro 5 16IRX8 Gaming Laptop',
    nameAr: 'لابتوب Lenovo Legion Pro 5 16IRX8 للجيمنج والريندر',
    category: 'laptops',
    specs: 'Intel Core i9-13900HX | RTX 4070 8GB | 32GB DDR5 | 1TB SSD | 240Hz',
    specsAr: 'معالج i9-13900HX | كارت RTX 4070 8GB | رام 32GB DDR5 | شاشة 240Hz',
    price: 68999,
    originalPrice: 74000,
    rating: 4.9,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    badge: 'BESTSELLER',
    badgeAr: 'الأكثر مبيعاً',
    badgeColor: 'amber',
    brand: 'Lenovo Legion',
  },
  {
    id: 'prod-f2',
    name: 'Nexus Alpha RTX 4080 Super Custom Gaming PC Build',
    nameAr: 'تجميعة نكسوس ألفا الاحترافية RTX 4080 Super Custom PC',
    category: 'pc-builds',
    specs: 'Intel i7-14700K | RTX 4080 Super 16GB | 32GB DDR5 6000MHz | 2TB Gen4 NVMe | 850W Gold',
    specsAr: 'معالج i7-14700K | كارت RTX 4080 Super | رام 32GB | هارد 2TB Gen4 | باور 850W Gold',
    price: 89999,
    originalPrice: 96000,
    rating: 5.0,
    reviewsCount: 12,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
    badge: 'MONSTER RIG',
    badgeAr: 'تجميعة وحش',
    badgeColor: 'red',
    brand: 'Custom PC',
  },
  {
    id: 'prod-f3',
    name: 'Anker Soundcore Boom 2 Plus 140W Portable Speaker',
    nameAr: 'سماعة متنقلة Anker Soundcore Boom 2 Plus بقوة 140W',
    category: 'audio',
    specs: 'BassUp 2.0 | IPX7 Waterproof | 20H Playtime | RGB Beat-Sync',
    specsAr: 'صوت مضخم BassUp 2.0 | ضد الماء IPX7 | بطارية 20 ساعة | إضاءة RGB',
    price: 8999,
    originalPrice: 10200,
    rating: 4.8,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    badge: 'NEW',
    badgeAr: 'جديد',
    badgeColor: 'emerald',
    brand: 'Anker Soundcore',
  },
  {
    id: 'prod-f4',
    name: 'HP ZBook Studio G8 Workstation (Certified Original Used)',
    nameAr: 'لابتوب HP ZBook Studio G8 وركستيشن (استيراد فرز أول كسر زيرو)',
    category: 'used',
    specs: 'Intel Core i7-11800H | RTX 3070 8GB | 32GB RAM | 1TB SSD | 4K OLED | 6M Warranty',
    specsAr: 'معالج i7-11800H | كارت RTX 3070 8GB | رام 32GB | شاشة 4K OLED | ضمان 6 شهور',
    price: 34999,
    originalPrice: 42000,
    rating: 4.7,
    reviewsCount: 15,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80',
    badge: 'GRADE A+ USED',
    badgeAr: 'فرز أول A+',
    badgeColor: 'blue',
    brand: 'HP Workstation',
  },
  {
    id: 'prod-f5',
    name: 'Intel Core i9-14900K 24-Core 6.0GHz Processor',
    nameAr: 'معالج Intel Core i9-14900K بـ 24 نواة وتردد 6.0GHz',
    category: 'pc-builds',
    specs: '24 Cores (8P + 16E) | 32 Threads | LGA1700 | 36MB Intel Smart Cache',
    specsAr: '24 نواة | 32 خيط معالجة | سوكت LGA1700 | كاش 36MB Smart Cache',
    price: 26500,
    originalPrice: 28900,
    rating: 4.9,
    reviewsCount: 45,
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80',
    badge: 'FLAGSHIP CPU',
    badgeAr: 'أقوى معالج',
    badgeColor: 'purple',
    brand: 'Intel',
  },
  {
    id: 'prod-f6',
    name: 'Dell Latitude 7420 Business Ultrabook (Used Grade A)',
    nameAr: 'لابتوب بزنس Dell Latitude 7420 نحيف وخفيف (استيراد فئة A)',
    category: 'used',
    specs: 'Intel Core i7-1185G7 | 16GB RAM | 512GB SSD | 14" FHD IPS | Fingerprint',
    specsAr: 'معالج i7-1185G7 | رام 16GB | هارد 512GB SSD | شاشة 14 بوصة FHD IPS',
    price: 18500,
    originalPrice: 21900,
    rating: 4.8,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80',
    badge: 'HOT IMPORT',
    badgeAr: 'استيراد مميز',
    badgeColor: 'amber',
    brand: 'Dell',
  },
  {
    id: 'prod-f7',
    name: 'Kingston FURY Renegade 2TB M.2 PCIe 4.0 NVMe SSD',
    nameAr: 'هارد SSD سريع Kingston FURY Renegade 2TB Gen4 NVMe',
    category: 'pc-builds',
    specs: '7,300MB/s Read | 7,000MB/s Write | Heatsink Included | PS5 Compatible',
    specsAr: 'قراءة 7,300MB/s | كتابة 7,000MB/s | مزود بمشتت حراري | متوافق مع PS5',
    price: 7800,
    originalPrice: 8900,
    rating: 5.0,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80',
    badge: 'SUPER SPEED',
    badgeAr: 'سرعة فائقة',
    badgeColor: 'emerald',
    brand: 'Kingston',
  },
  {
    id: 'prod-f8',
    name: 'EZVIZ C8W Pro 3K 5MP Pan & Tilt Smart Camera',
    nameAr: 'كاميرا مراقبة ذكية متحركة EZVIZ C8W Pro بدقة 3K 5MP',
    category: 'audio',
    specs: 'AI Human & Vehicle Detection | Auto-Zoom Tracking | Color Night Vision',
    specsAr: 'كشف ذكي بالذكاء الاصطناعي | تتبع تلقائي | رؤية ليلية ملونة 3K',
    price: 3499,
    originalPrice: 4100,
    rating: 4.9,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
    badge: 'SMART CCTV',
    badgeAr: 'أمان وكاميرات',
    badgeColor: 'blue',
    brand: 'EZVIZ',
  },
];

export const TOP_BRANDS: BrandItem[] = [
  { id: 'b1', name: 'ASUS ROG', tagline: 'Republic of Gamers', taglineAr: 'جمهورية اللاعبين الأقوى', logo: 'ROG' },
  { id: 'b2', name: 'MSI', tagline: 'True Gaming & Hardware', taglineAr: 'عتاد الألعاب الحقيقي', logo: 'MSI' },
  { id: 'b3', name: 'Intel', tagline: '14th Gen Core Processors', taglineAr: 'معالجات الجيل 14 الأسرع', logo: 'INTEL' },
  { id: 'b4', name: 'AMD', tagline: 'Ryzen & Radeon RDNA3', taglineAr: 'معالجات رايزن وكروت راديون', logo: 'AMD' },
  { id: 'b5', name: 'Corsair', tagline: 'High Performance PC', taglineAr: 'أداء تبريد وذاكرة عالي', logo: 'CORSAIR' },
  { id: 'b6', name: 'Lenovo Legion', tagline: 'Stylish Outside, Beast Inside', taglineAr: 'أناقة وقوة جبارة في الجيمنج', logo: 'LEGION' },
  { id: 'b7', name: 'Anker Soundcore', tagline: 'Premium Sound & Power', taglineAr: 'صوتيات وبطاريات معتمدة', logo: 'ANKER' },
  { id: 'b8', name: 'EZVIZ', tagline: 'Smart Security & CCTV', taglineAr: 'أنظمة أمن ومراقبة ذكية', logo: 'EZVIZ' },
  { id: 'b9', name: 'Samsung', tagline: 'Odyssey Gaming Monitors', taglineAr: 'شاشات أوديسي الاحترافية', logo: 'SAMSUNG' },
  { id: 'b10', name: 'Kingston', tagline: 'FURY Gaming Memory', taglineAr: 'ذاكرات فيوري فائقة السرعة', logo: 'KINGSTON' },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    customerName: 'Eng. Ahmed El-Sayed (Cairo)',
    customerNameAr: 'م. أحمد السيد (القاهرة)',
    comment: 'Bought an RTX 4070 Ti build with i7-14700K. Cable management and packaging were superb, delivered the next day in Maadi with official warranty.',
    commentAr: 'اشتريت تجميعة RTX 4070 Ti مع i7-14700K، التقفيل والكابل مانجمنت ممتاز، والتوصيل كان تاني يوم في المعادي مع الفاتورة والضمان المعتمد.',
    rating: 5,
    date: 'August 2026',
    dateAr: 'أغسطس 2026',
    verified: true,
  },
  {
    id: 't2',
    customerName: 'Dr. Mahmoud Farouk (Alexandria)',
    customerNameAr: 'د. محمود فاروق (الإسكندرية)',
    comment: 'Received an HP ZBook mint condition from the Sidi Bishr branch. 98% battery health, genuine charger, and smooth shopping experience.',
    commentAr: 'استلمت لابتوب HP ZBook كسر زيرو من فرع سيدي بشر، الجهاز حالته زيرو حرفياً والبطارية 98% وتجربة الشراء من المتجر ممتازة ومضمونة.',
    rating: 5,
    date: 'August 2026',
    dateAr: 'أغسطس 2026',
    verified: true,
  },
  {
    id: 't3',
    customerName: 'Youssef Gamal (Mansoura)',
    customerNameAr: 'يوسف جمال (المنصورة)',
    comment: 'Excellent and fast customer service on WhatsApp. Installments with ValU were processed in minutes without hassle.',
    commentAr: 'خدمة عملاء ممتازة وسريعة جداً على الواتساب، والتقسيط بـ ValU تم في دقائق بدون تعقيد واستلمت الشحنة مغلفة بإحكام.',
    rating: 5,
    date: 'July 2026',
    dateAr: 'يوليو 2026',
    verified: true,
  },
];

// Helper to get all available store products
export const getAllProducts = (): Product[] => {
  return [...FLASH_DEALS, ...FEATURED_PRODUCTS];
};

// Detailed product gallery and specs database
const PRODUCT_EXTENDED_DATA: Record<string, Partial<Product>> = {
  'deal-1': {
    galleryImages: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80',
    ],
    sku: 'ROG-G614JIR-N4003W',
    modelCode: 'ROG Strix G16 (2024)',
    warrantyPeriod: '2 Years Local & International Official ASUS Warranty',
    warrantyPeriodAr: 'ضمان سنتين محلي ودولي معتمد من أسوس مصر',
    description: 'The ASUS ROG Strix G16 (2024) is engineered for competitive esports and high-end creative workflows. Powered by the 14th Gen Intel Core i7-14700HX processor and NVIDIA GeForce RTX 4070 Laptop GPU, with a blazing-fast 240Hz QHD+ ROG Nebula display, Tri-Fan cooling technology with Conductonaut Extreme Liquid Metal, and Dolby Atmos audio.',
    descriptionAr: 'لابتوب ASUS ROG Strix G16 لعام 2024 مصمم للألعاب التنافسية وصناع المحتوى الاحترافي. مزود بمعالج إنتل كور i7-14700HX وكارت شاشة إنفيديا RTX 4070 بقوة 140W TGP، مع شاشة ROG Nebula بدقة 2.5K ومعدل تحديث خارق 240Hz، ونظام تبريد ثلاثي المراوح مع معدن سائل موصل للحرارة وصوتيات محيطية Dolby Atmos.',
    variants: [
      { id: 'v1', name: '32GB DDR5 / 1TB Gen4 SSD', nameAr: '32 جيجابايت DDR5 / 1 تيرابايت SSD', priceDelta: 0 },
      { id: 'v2', name: '64GB DDR5 / 2TB Gen4 SSD', nameAr: '64 جيجابايت DDR5 / 2 تيرابايت SSD', priceDelta: 7500, specsDelta: '64GB DDR5 5600MHz + 2TB NVMe', specsDeltaAr: '64 جيجا رام DDR5 + هارد 2 تيرابايت' },
    ],
    features: [
      {
        title: 'ROG Nebula 240Hz Display',
        titleAr: 'شاشة ROG Nebula الخارقة 240Hz',
        description: '16-inch 16:10 QHD+ 240Hz/3ms display with 100% DCI-P3 coverage and G-Sync support.',
        descriptionAr: 'شاشة مقاس 16 بوصة بنسبة 16:10 ودقة 2.5K ومعدل تحديث 240Hz واستجابة 3ms مع تغطية ألوان 100% DCI-P3.',
        iconName: 'Monitor',
      },
      {
        title: 'Tri-Fan Intelligent Cooling',
        titleAr: 'تبريد ذكي بـ 3 مراوح ومعدن سائل',
        description: 'Conductonaut Extreme liquid metal on CPU keeps temperatures up to 15°C cooler under maximum gaming load.',
        descriptionAr: 'تبريد متطور بالمعدن السائل Conductonaut Extreme يخفض درجات الحرارة حتى 15 درجة مئوية في أقصى ظروف اللعب.',
        iconName: 'Snowflake',
      },
      {
        title: 'NVIDIA RTX 4070 with DLSS 3.5',
        titleAr: 'كارت RTX 4070 بأقصى طاقة 140W',
        description: 'Full 140W max TGP with MUX Switch and NVIDIA Advanced Optimus for zero frame latency.',
        descriptionAr: 'طاقة كاملة 140W مع مفتاح MUX مخصص وتقنية Advanced Optimus لضمان أعلى فريمات وبدون تأخير.',
        iconName: 'Zap',
      },
      {
        title: 'Aura Sync RGB Per-Key Keyboard',
        titleAr: 'كيبورد ميكانيكي بإضاءة RGB مخصصة',
        description: 'Per-key RGB customization, 4 dedicated hotkeys, and large precision glass trackpad.',
        descriptionAr: 'تخصيص كامل للإضاءة لكل زر، مع أزرار اختصارات للألعاب وتاتش باد زجاجي واسع وفائق الدقة.',
        iconName: 'Sparkles',
      },
    ],
    specifications: [
      { key: 'Processor (CPU)', keyAr: 'المعالج', value: 'Intel® Core™ i7-14700HX (20 Cores: 8P + 12E, Up to 5.50 GHz, 33MB Cache)', valueAr: 'إنتل كور i7-14700HX (20 نواة، تردد يصل إلى 5.50 جيجاهرتز، كاش 33 ميجابايت)' },
      { key: 'Graphics (GPU)', keyAr: 'كارت الشاشة', value: 'NVIDIA® GeForce RTX™ 4070 Laptop GPU 8GB GDDR6 (140W Max TGP with Dynamic Boost)', valueAr: 'إنفيديا جي فورس RTX 4070 بسعة 8GB GDDR6 (بأقصى طاقة 140W TGP)' },
      { key: 'Memory (RAM)', keyAr: 'الذاكرة العشوائية', value: '32GB (2x16GB) DDR5 5600MHz (Upgradeable to 64GB)', valueAr: '32 جيجابايت DDR5 بتردد 5600 ميجاهرتز (قابلة للترقية حتى 64GB)' },
      { key: 'Storage (SSD)', keyAr: 'التخزين السريع', value: '1TB M.2 NVMe™ PCIe® 4.0 Performance SSD (Extra M.2 Slot Available)', valueAr: '1 تيرابايت M.2 NVMe PCIe 4.0 (يوجد منفذ M.2 إضافي متاح للترقية)' },
      { key: 'Display', keyAr: 'الشاشة', value: '16.0" QHD+ (2560 x 1600) IPS-level, 240Hz, 3ms, 500 nits, 100% DCI-P3, ROG Nebula', valueAr: '16 بوصة بدقة 2K (2560x1600) تردد 240Hz، سطوع 500 شمعة، 100% DCI-P3' },
      { key: 'Cooling System', keyAr: 'نظام التبريد', value: 'ROG Intelligent Cooling with 3 Fans & Liquid Metal Thermal Compound', valueAr: 'تبريد ذكي ثلاثي المراوح ومشتت حراري متطور مع معجون معدن سائل' },
      { key: 'Ports & I/O', keyAr: 'المنافذ والاتصال', value: '1x Thunderbolt™ 4, 1x USB 3.2 Gen 2 Type-C (DisplayPort/PD), 2x USB 3.2 Gen 2 Type-A, 1x HDMI 2.1, 1x 2.5G LAN, 3.5mm Combo', valueAr: '1x ثندربولت 4، 1x تايب سي مع شحن وعرض، 2x تايب ايه، منفذ HDMI 2.1، منفذ شبكة 2.5G LAN' },
      { key: 'Battery & Power', keyAr: 'البطارية والشاحن', value: '90Wh Li-ion Battery with 280W ROG Fast Charger (50% in 30 mins)', valueAr: 'بطارية 90 واط/ساعة مع شاحن أصلي 280W يدعم الشحن السريع (50% في 30 دقيقة)' },
      { key: 'Operating System', keyAr: 'نظام التشغيل', value: 'Windows 11 Home Original Licensed', valueAr: 'ويندوز 11 هوم أصلي ومفعل رسمياً' },
    ],
    includedInBox: [
      { en: 'ASUS ROG Strix G16 Laptop', ar: 'لابتوب ASUS ROG Strix G16' },
      { en: 'Original 280W Power Adapter & AC Cable', ar: 'شاحن أصلي 280 واط وكابل الطاقة' },
      { en: 'ROG Gaming Mousepad (Special Bundle Gift)', ar: 'ماوس باد ألعاب ROG هدية مجانية' },
      { en: 'Official Warranty Certificate & Quick Start Manual', ar: 'شهادة الضمان المعتمدة ودليل التشغيل' },
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Mohamed Tarek',
        authorAr: 'محمد طارق',
        rating: 5,
        date: '18 August 2026',
        dateAr: '18 أغسطس 2026',
        comment: 'Unbelievable gaming beast! Cyberpunk 2077 runs over 110 FPS on Ultra with DLSS Frame Gen. Screen colors are gorgeous and cooling is quiet during normal tasks.',
        commentAr: 'وحش ألعاب بكل ما تعنيه الكلمة! لعبة سايبر بانك 2077 شغالة بأكثر من 110 فريم على الترا مع DLSS 3. الألوان والسطوع خياليين والتبريد ممتاز جداً.',
        verified: true,
        userCity: 'Cairo, New Cairo',
        userCityAr: 'القاهرة، التجمع الخامس',
      },
      {
        id: 'r2',
        author: 'Eng. Karim Nabil',
        authorAr: 'م. كريم نبيل',
        rating: 5,
        date: '12 August 2026',
        dateAr: '12 أغسطس 2026',
        comment: 'Using it for 3D Blender rendering and Unreal Engine 5. Render speeds are cut in half compared to my old laptop. Nexus delivered it next day sealed with warranty.',
        commentAr: 'بستخدمه للريندر على بلندر ومحرك Unreal Engine 5، سرعة الريندر تضاعفت مرتين مقارنة بجهازي القديم. استلمته مغلف بتغليف المصنع والضمان ساري.',
        verified: true,
        userCity: 'Giza, Sheikh Zayed',
        userCityAr: 'الجيزة، الشيخ زايد',
      },
    ],
  },
  'deal-2': {
    galleryImages: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=80',
    ],
    sku: 'MSI-RTX4070TIS-16G-SLIM',
    modelCode: 'MSI Gaming X Slim GeForce RTX 4070 Ti Super',
    warrantyPeriod: '3 Years Official MSI Egypt Warranty',
    warrantyPeriodAr: 'ضمان 3 سنوات رسمي معتمد من إم إس آي مصر',
    description: 'The MSI GeForce RTX 4070 Ti Super 16GB Gaming X Slim delivers uncompromising performance in a sleeker, thinner form factor. Features 16GB GDDR6X VRAM on a 256-bit bus, TRI FROZR 3 cooling with TORX FAN 5.0, full ray tracing acceleration, and DLSS 3.5 AI upscaling.',
    descriptionAr: 'كارت الشاشة الخارق MSI RTX 4070 Ti Super بذاكرة 16 جيجابايت بتصميم نحيف Slim يناسب جميع الكيسات. مزود بنظام تبريد TRI FROZR 3 فائق الهدوء ومراوح TORX FAN 5.0 ودعم كامل لتقنيات تتبع الأشعة والذكاء الاصطناعي DLSS 3.5.',
    features: [
      {
        title: '16GB GDDR6X 256-bit VRAM',
        titleAr: 'ذاكرة 16GB GDDR6X بعرض 256-Bit',
        description: 'Massive high-speed memory capable of handling 4K gaming and generative AI models with ease.',
        descriptionAr: 'سعة ذاكرة ضخمة فائقة السرعة للألعاب بدقة 4K ومشاريع الذكاء الاصطناعي والريندر الثقيل.',
        iconName: 'Zap',
      },
      {
        title: 'TRI FROZR 3 Thermal Design',
        titleAr: 'نظام تبريد ثلاثي TRI FROZR 3',
        description: 'TORX Fan 5.0 with linked outer ring blades stabilizes high-pressure airflow at lower RPM.',
        descriptionAr: 'مراوح TORX 5.0 متطورة تضمن تدفق هواء مكثف بدون أي ضجيج أثناء الضغط العالي.',
        iconName: 'Snowflake',
      },
      {
        title: 'Mystic Light RGB & Metal Backplate',
        titleAr: 'إضاءة Mystic Light وظهر معدني مقوى',
        description: 'Reinforced die-cast metal backplate with flow-through ventilation and customizable RGB.',
        descriptionAr: 'لوح خلفي معدني صلب لتشتيت الحرارة وحماية الكارت من الانحناء مع إضاءة RGB قابلة للتخصيص.',
        iconName: 'ShieldCheck',
      },
    ],
    specifications: [
      { key: 'GPU Engine', keyAr: 'المعالج الرسومي', value: 'NVIDIA® GeForce RTX™ 4070 Ti SUPER (8448 CUDA Cores)', valueAr: 'إنفيديا جي فورس RTX 4070 Ti Super (8448 كودا كور)' },
      { key: 'Boost Clock', keyAr: 'تردد البوست', value: '2685 MHz (Extreme Performance via MSI Center)', valueAr: '2685 ميجاهرتز عبر مركز تحكم MSI' },
      { key: 'Memory Size & Bus', keyAr: 'الذاكرة ونطاقها', value: '16GB GDDR6X | 256-bit | 21 Gbps Memory Speed', valueAr: '16 جيجابايت GDDR6X | نطاق 256-bit | سرعة 21 جيجابت/ث' },
      { key: 'Power Consumption', keyAr: 'استهلاك الطاقة والمزود', value: '285W (Recommended PSU: 700W or higher, 1x 16-pin 12VHPWR)', valueAr: '285 واط (ينصح بمزود طاقة 700 واط أو أعلى)' },
      { key: 'Display Outputs', keyAr: 'منافذ العرض', value: '3x DisplayPort 1.4a, 1x HDMI 2.1a (Supports 4K@120Hz HDR, 8K@60Hz HDR)', valueAr: '3x DisplayPort 1.4a، 1x HDMI 2.1a يدعم 4K و 8K' },
      { key: 'Dimensions', keyAr: 'الأبعاد والوزن', value: '307 x 125 x 51 mm | Weight: 1094g (Slim Tri-Slot)', valueAr: '307 × 125 × 51 مم | الوزن: 1094 جرام' },
    ],
    includedInBox: [
      { en: 'MSI RTX 4070 Ti Super Gaming X Slim GPU', ar: 'كارت شاشة MSI RTX 4070 Ti Super Gaming X Slim' },
      { en: '16-Pin 12VHPWR Power Adapter Cable', ar: 'كابل محول الطاقة 16-Pin الأصلي' },
      { en: 'MSI Graphics Card Support Anti-Sag Bracket', ar: 'حامل دعم معدني لمنع انحناء الكارت داخل الكيس' },
      { en: 'User Guide & Official Warranty Card', ar: 'دليل المستخدم وشهادة الضمان المعتمد' },
    ],
  },
  'prod-f2': {
    galleryImages: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1200&q=80',
    ],
    sku: 'NEXUS-RIG-ALPHA-4080S',
    modelCode: 'Nexus Alpha Monster Build',
    warrantyPeriod: '3 Years Full System Warranty + 1 Year Free Maintenance',
    warrantyPeriodAr: 'ضمان 3 سنوات شامل لجميع القطع + سنة صيانة دورية مجانية',
    description: 'The Nexus Alpha is our flagship custom-built liquid-cooled gaming and workstation rig. Handcrafted by master hardware engineers in Cairo, fully cable-managed, bench-tested with 24-hour stress burns, and backed by a 3-year store and manufacturer warranty.',
    descriptionAr: 'تجميعة نكسوس ألفا الاحترافية هي الأقوى للألعاب والعمل الشاق. تم تجميعها بعناية فائقة بواسطة مهندسينا مع كابل مانجمنت احترافي، وتبريد مائي 360mm واختبارات ضغط واستقرار لمدة 24 ساعة لضمان أقصى اعتمادية.',
    specifications: [
      { key: 'Processor', keyAr: 'المعالج المركزي', value: 'Intel® Core™ i7-14700K (20 Cores, 28 Threads, Up to 5.60 GHz)', valueAr: 'إنتل كور i7-14700K (20 نواة، تردد 5.60 جيجاهرتز)' },
      { key: 'Motherboard', keyAr: 'اللوحة الأم', value: 'ASUS ROG STRIX Z790-F GAMING WIFI II DDR5', valueAr: 'لوحة أم ASUS ROG STRIX Z790-F مزودة بواي فاي 7 وبلوتوث' },
      { key: 'Graphics Card', keyAr: 'كارت الشاشة', value: 'NVIDIA GeForce RTX 4080 SUPER 16GB GDDR6X', valueAr: 'إنفيديا جي فورس RTX 4080 Super بذاكرة 16GB GDDR6X' },
      { key: 'RAM Memory', keyAr: 'الذاكرة الرام', value: '32GB (2x16GB) Corsair Dominator Titanium DDR5 6000MHz RGB CL30', valueAr: '32 جيجابايت DDR5 بسرعة 6000MHz توقيت فائق CL30' },
      { key: 'Storage', keyAr: 'وحدات التخزين', value: '2TB Kingston FURY Renegade PCIe 4.0 NVMe (7300 MB/s)', valueAr: '2 تيرابايت Kingston FURY Gen4 بسرعة 7300 ميجابايت/ث' },
      { key: 'Cooling System', keyAr: 'التبريد المائي', value: 'NZXT Kraken Elite 360 RGB AIO Liquid Cooler with LCD Screen', valueAr: 'مبرد مائي NZXT Kraken Elite 360 بشاشة LCD تفاعلية' },
      { key: 'Power Supply (PSU)', keyAr: 'مزود الطاقة', value: 'Corsair RM850x 850W 80 PLUS Gold Fully Modular ATX 3.0', valueAr: 'باور سبلاي Corsair 850W معتمد 80+ Gold بموديلات PCIe 5.0' },
      { key: 'Chassis / Case', keyAr: 'الكيس', value: 'Lian Li O11 Dynamic EVO RGB Black + 6x Uni Fan SL-Infinity', valueAr: 'كيس Lian Li O11 Dynamic EVO RGB مع 6 مراوح إنفينيتي' },
    ],
  },
};

// Generic dynamic fallback builder for any product ID
export const getProductById = (id: string): Product | null => {
  const all = getAllProducts();
  const base = all.find((p) => p.id === id);
  if (!base) return null;

  const extended = PRODUCT_EXTENDED_DATA[id] || {};

  // Build default fallback gallery images if not explicitly specified
  const defaultGallery = [
    base.image,
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80',
  ];

  // Build fallback specifications from specs text
  const defaultSpecs: ProductSpecItem[] = [
    { key: 'Brand / Manufacturer', keyAr: 'الشركة المصنعة', value: base.brand || 'Nexus Certified', valueAr: base.brand || 'نكسوس المعتمدة' },
    { key: 'Main Configuration', keyAr: 'المواصفات الرئيسية', value: base.specs, valueAr: base.specsAr || base.specs },
    { key: 'Condition', keyAr: 'حالة المنتج', value: base.category === 'used' ? 'Certified Used Grade A+ (Like New)' : 'Brand New 100% Factory Sealed', valueAr: base.category === 'used' ? 'استيراد فرز أول بحالة الزيرو معتمد' : 'جديد كلياً متبرشم بتغليف المصنع' },
    { key: 'Warranty & Support', keyAr: 'الضمان والدعم', value: base.category === 'used' ? '6 Months Full Store Warranty' : '2 Years Official Agent Warranty', valueAr: base.category === 'used' ? 'ضمان 6 شهور استبدال من المتجر' : 'ضمان سنتين معتمد من الوكيل الرسمي' },
    { key: 'Availability', keyAr: 'حالة التوفر', value: base.inStock !== false ? 'In Stock - Ready for Fast Delivery' : 'Out of Stock', valueAr: base.inStock !== false ? 'متوفر حالياً بالمخزن وجاهز للشحن الفوري' : 'غير متوفر حالياً' },
  ];

  const defaultFeatures: ProductFeatureHighlight[] = [
    {
      title: 'Official Agent Guarantee',
      titleAr: 'ضمان الوكيل الرسمي المعتمد',
      description: '100% Genuine with serialized warranty and official Egyptian invoice.',
      descriptionAr: 'منتج أصلي بنسبة 100% مع رقم تسلسلي مسجل وفاتورة ضريبية رسمية.',
      iconName: 'ShieldCheck',
    },
    {
      title: 'Fast & Insured Delivery',
      titleAr: 'شحن آمن وسريع لباب البيت',
      description: 'Express shipping within 24-48 hours with insured protective packaging.',
      descriptionAr: 'توصيل خلال 24 إلى 48 ساعة في تغليف مصفح ضد الصدمات.',
      iconName: 'Truck',
    },
    {
      title: '14-Day Free Replacement',
      titleAr: 'استبدال مجاني خلال 14 يوم',
      description: 'Hassle-free return and exchange policy according to consumer protection laws.',
      descriptionAr: 'حق الاستبدال والاسترجاع بدون أي تعقيد وفقاً لقانون حماية المستهلك.',
      iconName: 'RotateCcw',
    },
  ];

  const defaultInBox = [
    { en: `${base.name} Unit`, ar: `جهاز / قطعة ${base.nameAr || base.name}` },
    { en: 'Original Accessories & Cabling', ar: 'الملحقات والكابلات الأصلية' },
    { en: 'Official Warranty Certificate & Invoice', ar: 'شهادة الضمان المعتمدة والفاتورة الرسمية' },
  ];

  const defaultReviews: ProductReview[] = [
    {
      id: 'rev-default-1',
      author: 'Hazem Mahmoud',
      authorAr: 'حازم محمود',
      rating: 5,
      date: '10 August 2026',
      dateAr: '10 أغسطس 2026',
      comment: 'Top quality product, exactly as described! Excellent service from the Nexus team.',
      commentAr: 'المنتج ممتاز والتغليف نظيف جداً ومطابق للمواصفات بالضبط. شكراً لفريق نكسوس ستور.',
      verified: true,
      userCity: 'Alexandria',
      userCityAr: 'الإسكندرية',
    },
    {
      id: 'rev-default-2',
      author: 'Kareem Adel',
      authorAr: 'كريم عادل',
      rating: 5,
      date: '4 August 2026',
      dateAr: '4 أغسطس 2026',
      comment: 'Very fast shipping and premium build quality. Highly recommended!',
      commentAr: 'الشحن وصل في أقل من 24 ساعة والمنتج أصلي وبالضمان. تجربة ممتازة وبنصح بالتعامل معاهم.',
      verified: true,
      userCity: 'Cairo',
      userCityAr: 'القاهرة',
    },
  ];

  return {
    ...base,
    galleryImages: extended.galleryImages || defaultGallery,
    sku: extended.sku || `NEX-${base.id.toUpperCase()}`,
    modelCode: extended.modelCode || base.name,
    warrantyPeriod: extended.warrantyPeriod || (base.category === 'used' ? '6 Months Store Warranty' : '2 Years Official Warranty'),
    warrantyPeriodAr: extended.warrantyPeriodAr || (base.category === 'used' ? 'ضمان 6 شهور استبدال معتمد' : 'ضمان سنتين رسمي من الوكيل'),
    description: extended.description || `${base.name} delivers extreme performance with top-grade hardware specifications for gamers and professionals in Egypt.`,
    descriptionAr: extended.descriptionAr || `${base.nameAr || base.name} يقدم أفضل مستويات الأداء مع أحدث التقنيات وقطع الهاردوير الأصلية للألعاب وصناع المحتوى في مصر مع ضمان معتمد.`,
    variants: extended.variants,
    features: extended.features || defaultFeatures,
    specifications: extended.specifications || defaultSpecs,
    includedInBox: extended.includedInBox || defaultInBox,
    reviews: extended.reviews || defaultReviews,
  };
};

