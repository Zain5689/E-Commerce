export interface Product {
  id: string;
  name: string;
  category: 'laptops' | 'pc-builds' | 'gpus' | 'audio' | 'used' | 'monitors' | 'accessories';
  specs: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  badgeColor?: 'red' | 'amber' | 'emerald' | 'blue' | 'purple';
  inStock?: boolean;
  soldCount?: number;
  stockCount?: number;
  brand?: string;
}

export interface CategoryCard {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  itemCount: string;
  iconName: string;
  image: string;
}

export interface BrandItem {
  id: string;
  name: string;
  tagline: string;
  logo: string;
}

export const HERO_SLIDES = [
  {
    id: 1,
    tag: '⚡ 2026 Gaming Masterpiece',
    title: 'Extreme RTX 4090 Rigs & Gaming Laptops',
    description: 'Experience unmatched frame rates with Intel 14th Gen & AMD Ryzen 9 7950X3D gaming powerhouses.',
    btnText: 'Shop Gaming Deals',
    btnLink: '/category/laptops',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
    discount: 'Up to 25% OFF',
  },
  {
    id: 2,
    tag: '🔥 Custom Rig Assembly',
    title: 'Next-Gen Custom PC Builds & Workstations',
    description: 'Built by hardware experts in Cairo & Alexandria with 3-year official warranty & stress testing.',
    btnText: 'Build Your PC',
    btnLink: '/category/pc-components',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
    discount: 'Free Assembly + Windows 11',
  },
  {
    id: 3,
    tag: '✨ Certified Original Used (استيراد مضمون)',
    title: 'Top Tier Workstation Laptops & Hardware',
    description: 'Grade A+ Dell Precision, HP ZBook, and ThinkPads with official 6-month store warranty.',
    btnText: 'Explore Used Outlet',
    btnLink: '/category/used',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
    discount: 'Starting from 9,999 EGP',
  },
];

export const SIDE_HERO_BANNERS = [
  {
    id: 'side-1',
    title: 'GeForce RTX™ 4080 Super',
    subtitle: 'Ultra Performance Series',
    priceText: 'From 49,999 EGP',
    link: '/category/gpus',
    badge: 'NEW',
    bgGradient: 'from-blue-950/80 to-slate-900',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'side-2',
    title: 'Smart CCTV & Home Security',
    subtitle: 'EZVIZ & IMOU 4K Night Vision',
    priceText: 'Special Bundle Deals',
    link: '/category/cctv',
    badge: 'HOT',
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
    iconName: 'Laptop',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-2',
    slug: 'pc-components',
    title: 'PC Components',
    titleAr: 'قطع تجميع الكمبيوتر',
    itemCount: '350+ Products',
    iconName: 'Cpu',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-3',
    slug: 'gpus',
    title: 'Graphics Cards (RTX)',
    titleAr: 'كروت الشاشة RTX',
    itemCount: '58+ Products',
    iconName: 'Zap',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-4',
    slug: 'monitors',
    title: 'Gaming Monitors',
    titleAr: 'شاشات ألعاب عالية التردد',
    itemCount: '62+ Products',
    iconName: 'Tv',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-5',
    slug: 'used',
    title: 'Original Used (استيراد)',
    titleAr: 'لابتوبات وقطع استيراد',
    itemCount: '80+ Products',
    iconName: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-6',
    slug: 'audio',
    title: 'Smart Audio & Speakers',
    titleAr: 'سماعات وصوتيات ذكية',
    itemCount: '95+ Products',
    iconName: 'Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-7',
    slug: 'ram-memory',
    title: 'RAM & NVMe SSD',
    titleAr: 'رامات وهاردات فائقة السرعة',
    itemCount: '110+ Products',
    iconName: 'HardDrive',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-8',
    slug: 'cctv',
    title: 'CCTV & Smart Locks',
    titleAr: 'كاميرات مراقبة وكوالين ذكية',
    itemCount: '70+ Products',
    iconName: 'Camera',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=300&q=80',
  },
];

export const FLASH_DEALS: Product[] = [
  {
    id: 'deal-1',
    name: 'ASUS ROG Strix G16 (2024) 240Hz 2.5K',
    category: 'laptops',
    specs: 'Intel Core i7-14700HX | RTX 4070 8GB | 32GB DDR5 | 1TB NVMe Gen4',
    price: 61999,
    originalPrice: 68500,
    rating: 4.9,
    reviewsCount: 28,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80',
    badge: '-10% FLASH',
    badgeColor: 'red',
    inStock: true,
    soldCount: 14,
    stockCount: 20,
    brand: 'ASUS ROG',
  },
  {
    id: 'deal-2',
    name: 'MSI GeForce RTX 4070 Ti Super 16GB Gaming X Slim',
    category: 'gpus',
    specs: '16GB GDDR6X | 256-Bit | DLSS 3.5 Frame Gen | RGB Mystic Light',
    price: 46999,
    originalPrice: 51500,
    rating: 5.0,
    reviewsCount: 34,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
    badge: 'HOT DEAL',
    badgeColor: 'amber',
    inStock: true,
    soldCount: 8,
    stockCount: 10,
    brand: 'MSI',
  },
  {
    id: 'deal-3',
    name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz CL30',
    category: 'accessories',
    specs: 'XMP 3.0 & EXPO Ready | Low Latency Gaming RAM | Black',
    price: 6499,
    originalPrice: 7500,
    rating: 4.9,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80',
    badge: '-13%',
    badgeColor: 'emerald',
    inStock: true,
    soldCount: 19,
    stockCount: 25,
    brand: 'Corsair',
  },
  {
    id: 'deal-4',
    name: 'Samsung Odyssey G7 27" 240Hz 1ms Curved Gaming Monitor',
    category: 'monitors',
    specs: '2560x1440 QHD | 1000R Curvature | G-Sync & FreeSync Premium Pro',
    price: 20999,
    originalPrice: 24500,
    rating: 4.8,
    reviewsCount: 18,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    badge: 'SAVE 3,500 EGP',
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
    category: 'laptops',
    specs: 'Intel Core i9-13900HX | RTX 4070 8GB | 32GB DDR5 | 1TB SSD | 240Hz',
    price: 68999,
    originalPrice: 74000,
    rating: 4.9,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    badge: 'BESTSELLER',
    badgeColor: 'amber',
    brand: 'Lenovo Legion',
  },
  {
    id: 'prod-f2',
    name: 'Nexus Alpha RTX 4080 Super Custom Gaming PC Build',
    category: 'pc-builds',
    specs: 'Intel i7-14700K | RTX 4080 Super 16GB | 32GB DDR5 6000MHz | 2TB Gen4 NVMe | 850W Gold',
    price: 89999,
    originalPrice: 96000,
    rating: 5.0,
    reviewsCount: 12,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
    badge: 'MONSTER RIG',
    badgeColor: 'red',
    brand: 'Custom PC',
  },
  {
    id: 'prod-f3',
    name: 'Anker Soundcore Boom 2 Plus 140W Portable Speaker',
    category: 'audio',
    specs: 'BassUp 2.0 | IPX7 Waterproof | 20H Playtime | RGB Beat-Sync',
    price: 8999,
    originalPrice: 10200,
    rating: 4.8,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    badge: 'NEW',
    badgeColor: 'emerald',
    brand: 'Anker Soundcore',
  },
  {
    id: 'prod-f4',
    name: 'HP ZBook Studio G8 Workstation (Certified Original Used)',
    category: 'used',
    specs: 'Intel Core i7-11800H | RTX 3070 8GB | 32GB RAM | 1TB SSD | 4K OLED | 6M Warranty',
    price: 34999,
    originalPrice: 42000,
    rating: 4.7,
    reviewsCount: 15,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80',
    badge: 'GRADE A+ USED',
    badgeColor: 'blue',
    brand: 'HP Workstation',
  },
  {
    id: 'prod-f5',
    name: 'Intel Core i9-14900K 24-Core 6.0GHz Processor',
    category: 'pc-builds',
    specs: '24 Cores (8P + 16E) | 32 Threads | LGA1700 | 36MB Intel Smart Cache',
    price: 26500,
    originalPrice: 28900,
    rating: 4.9,
    reviewsCount: 45,
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80',
    badge: 'FLAGSHIP CPU',
    badgeColor: 'purple',
    brand: 'Intel',
  },
  {
    id: 'prod-f6',
    name: 'Dell Latitude 7420 Business Ultrabook (Used Grade A)',
    category: 'used',
    specs: 'Intel Core i7-1185G7 | 16GB RAM | 512GB SSD | 14" FHD IPS | Fingerprint',
    price: 18500,
    originalPrice: 21900,
    rating: 4.8,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80',
    badge: 'HOT IMPORT',
    badgeColor: 'amber',
    brand: 'Dell',
  },
  {
    id: 'prod-f7',
    name: 'Kingston FURY Renegade 2TB M.2 PCIe 4.0 NVMe SSD',
    category: 'pc-builds',
    specs: '7,300MB/s Read | 7,000MB/s Write | Heatsink Included | PS5 Compatible',
    price: 7800,
    originalPrice: 8900,
    rating: 5.0,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80',
    badge: 'SUPER SPEED',
    badgeColor: 'emerald',
    brand: 'Kingston',
  },
  {
    id: 'prod-f8',
    name: 'EZVIZ C8W Pro 3K 5MP Pan & Tilt Smart Camera',
    category: 'audio',
    specs: 'AI Human & Vehicle Detection | Auto-Zoom Tracking | Color Night Vision',
    price: 3499,
    originalPrice: 4100,
    rating: 4.9,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
    badge: 'SMART CCTV',
    badgeColor: 'blue',
    brand: 'EZVIZ',
  },
];

export const TOP_BRANDS: BrandItem[] = [
  { id: 'b1', name: 'ASUS ROG', tagline: 'Republic of Gamers', logo: 'ROG' },
  { id: 'b2', name: 'MSI', tagline: 'True Gaming & Hardware', logo: 'MSI' },
  { id: 'b3', name: 'Intel', tagline: '14th Gen Core Processors', logo: 'INTEL' },
  { id: 'b4', name: 'AMD', tagline: 'Ryzen & Radeon RDNA3', logo: 'AMD' },
  { id: 'b5', name: 'Corsair', tagline: 'High Performance PC', logo: 'CORSAIR' },
  { id: 'b6', name: 'Lenovo Legion', tagline: 'Stylish Outside, Beast Inside', logo: 'LEGION' },
  { id: 'b7', name: 'Anker Soundcore', tagline: 'Premium Sound & Power', logo: 'ANKER' },
  { id: 'b8', name: 'EZVIZ', tagline: 'Smart Security & CCTV', logo: 'EZVIZ' },
  { id: 'b9', name: 'Samsung', tagline: 'Odyssey Gaming Monitors', logo: 'SAMSUNG' },
  { id: 'b10', name: 'Kingston', tagline: 'FURY Gaming Memory', logo: 'KINGSTON' },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    customerName: 'Eng. Ahmed El-Sayed (القاهرة)',
    comment: 'اشتريت تجميعة RTX 4070 Ti مع i7-14700K، التقفيل والكابل مانجمنت ممتاز، والتوصيل كان تاني يوم في المعادي مع الفاتورة والضمان المعتمد.',
    rating: 5,
    date: 'أغسطس 2026',
    verified: true,
  },
  {
    id: 't2',
    customerName: 'Dr. Mahmoud Farouk (الإسكندرية)',
    comment: 'استلمت لابتوب HP ZBook كسر زيرو من فرع سيدي بشر، الجهاز حالته زيرو حرفياً والبطارية 98% وتجربة الشراء من كيمو ستور دائماً موثوقة.',
    rating: 5,
    date: 'أغسطس 2026',
    verified: true,
  },
  {
    id: 't3',
    customerName: 'Youssef Gamal (المنصورة)',
    comment: 'خدمة عملاء ممتازة وسريعة جداً على الواتساب، والتقسيط بـ ValU تم في دقائق بدون تعقيد.',
    rating: 5,
    date: 'يوليو 2026',
    verified: true,
  },
];
