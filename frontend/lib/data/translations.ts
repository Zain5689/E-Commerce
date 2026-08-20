export const TRANSLATIONS = {
  ar: {
    // Navbar
    hotline: 'الخط الساخن:',
    hotlineNumber: '19999',
    topBannerTag: 'متجر التكنولوجيا الأول للابتوبات الجيمنج وقطع تجميع الـ PC في مصر',
    languageToggle: 'English (EN)',
    trackOrder: 'تتبع طلبك',
    searchPlaceholder: 'ابحث عن كروت RTX 4090، لابتوبات ألعاب، رامات DDR5...',
    signIn: 'تسجيل الدخول',
    myAccount: 'حسابي',
    wishlist: 'المفضلة',
    cart: 'العربة',
    navCategories: {
      laptops: 'لابتوبات ونوتبوك',
      pcComponents: 'قطع تجميع PC',
      gpus: '🔥 كروت الشاشة (RTX)',
      ramMemory: 'رامات وتخزين فائق',
      monitors: 'شاشات ألعاب',
      flashDeals: '⚡ عروض حصرية',
    },

    // Hero Section
    heroSlides: [
      {
        id: 1,
        tag: '⚡ تحفة الألعاب لعام 2026',
        title: 'أقوى تجميعات RTX 4090 ولابتوبات الجيمنج الخارقة',
        description: 'استمتع بأعلى معدل إطارات وأقصى أداء مع معالجات Intel الجيل 14 و AMD Ryzen 9 7950X3D.',
        btnText: 'تسوق عروض الجيمنج',
        btnLink: '/category/laptops',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
        discount: 'خصم يصل إلى 25%',
      },
      {
        id: 2,
        tag: '🔥 تجميع احترافي مخصص',
        title: 'تجميعات PC احترافية ومحطات عمل Workstation',
        description: 'تجميع بواسطة خبراء الهاردوير في القاهرة والإسكندرية مع ضمان رسمي 3 سنوات واختبارات ضغط.',
        btnText: 'جمّع جهازك الآن',
        btnLink: '/category/pc-components',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
        discount: 'تجميع مجاني + Windows 11',
      },
      {
        id: 3,
        tag: '✨ استيراد أصلي مضمون (فرز أول)',
        title: 'أفضل لابتوبات وركستيشن وقطع استيراد بحالة الزيرو',
        description: 'أجهزة Dell Precision و HP ZBook و ThinkPad فئة A+ مع ضمان معتمد لمدة 6 أشهر من متجرنا.',
        btnText: 'تصفح قسم الاستيراد',
        btnLink: '/category/used',
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
        discount: 'تبدأ من 9,999 ج.م',
      },
    ],
    sideHeroBanners: [
      {
        id: 'side-1',
        title: 'GeForce RTX™ 4080 Super',
        subtitle: 'سلسلة الأداء الفائق والـ 4K',
        priceText: 'تبدأ من 49,999 ج.م',
        link: '/category/gpus',
        badge: 'جديد',
        bgGradient: 'from-blue-950/80 to-slate-900',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'side-2',
        title: 'كاميرات مراقبة وأمان ذكي',
        subtitle: 'EZVIZ & IMOU بدقة 4K ورؤية ليلية',
        priceText: 'عروض باقات حصرية',
        link: '/category/cctv',
        badge: 'الأكثر طلباً',
        bgGradient: 'from-rose-950/80 to-slate-900',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
      },
    ],

    // Trust Badges
    trustBadges: [
      {
        id: 't1',
        title: 'توصيل لكل مصر',
        desc: '24-72 ساعة لكل المحافظات',
      },
      {
        id: 't2',
        title: 'ضمان رسمي معتمد',
        desc: 'منتجات أصلية 100% بفاتورة رسمية',
      },
      {
        id: 't3',
        title: 'طرق دفع متعددة',
        desc: 'ValU | Paymob | Fawry | كاش | بطاقات',
      },
      {
        id: 't4',
        title: 'دعم فني متخصص',
        desc: 'مهندسين متخصصين تحت أمرك',
      },
      {
        id: 't5',
        title: 'استبدال خلال 14 يوم',
        desc: 'استرجاع واستبدال بدون تعقيد',
      },
      {
        id: 't6',
        title: 'تجميع PC رسمي',
        desc: 'تجميع واختبار بواسطة خبراء',
      },
    ],

    // Categories Section
    categoriesHeader: 'تسوق حسب الفئة',
    categoriesSubheader: 'كل القطع والأجهزة والملحقات في مكان واحد بضمان معتمد',
    allCategoriesBtn: 'جميع الفئات ←',
    categoriesData: [
      { id: 'cat-1', title: 'لابتوبات جيمنج', itemCount: '124+ منتج' },
      { id: 'cat-2', title: 'قطع تجميع PC', itemCount: '350+ منتج' },
      { id: 'cat-3', title: 'كروت الشاشة RTX', itemCount: '58+ منتج' },
      { id: 'cat-4', title: 'شاشات ألعاب', itemCount: '62+ منتج' },
      { id: 'cat-5', title: 'استيراد فرز أول', itemCount: '80+ منتج' },
      { id: 'cat-6', title: 'صوتيات وسماعات', itemCount: '95+ منتج' },
      { id: 'cat-7', title: 'رامات وهاردات NVMe', itemCount: '110+ منتج' },
      { id: 'cat-8', title: 'كاميرات وأقفال ذكية', itemCount: '70+ منتج' },
    ],

    // Flash Deals Section
    flashDealsHeader: 'عروض الفلاش الحصرية',
    flashDealsBadge: 'كمية محدودة',
    flashDealsSubheader: 'أسعار جنونية لفترة محدودة وحتى نفاد الكمية',
    endsIn: 'ينتهي العرض خلال:',
    hoursLabel: 'ساعة',
    minutesLabel: 'دقيقة',
    secondsLabel: 'ثانية',
    allDealsBtn: 'كل العروض ←',
    soldLabel: 'تم البيع:',
    availableLabel: 'المتبقي:',

    // Featured Products Section
    featuredHeader: 'المنتجات المميزة',
    featuredSubheader: 'المنتجات الأكثر مبيعاً والأعلى تقييماً من عملائنا',
    viewAllBtn: 'عرض الكل ←',
    noProducts: 'لا توجد منتجات في هذا القسم حالياً.',
    tabs: {
      all: 'الكل',
      laptops: 'لابتوبات',
      pcBuilds: 'تجميعات PC',
      gpus: 'كروت الشاشة',
      used: 'استيراد مضمون',
      monitors: 'شاشات',
      audio: 'صوتيات وأمان',
    },

    // Product Card
    currency: 'ج.م',
    officialBadge: 'ضمان رسمي',
    reviewsCountSuffix: 'تقييم',
    buyBtn: 'شراء',
    addedBtn: 'تمت الإضافة',
    saveText: 'وفر',

    // Brand Partners
    brandsHeader: 'شركاء التوكيلات الرسمية',
    brandsSubheader: 'وكالات رسمية بضمان معتمد وفواتير ضريبية',

    // Testimonials
    testimonialsHeader: 'ماذا يقول عملاؤنا؟',
    testimonialsSubheader: '+10,000 عميل سعيد في مصر — تقييمات حقيقية موثقة',
    verifiedBuyer: 'مشتري موثق',
    stats: [
      { stat: '+10,000', label: 'عميل سعيد' },
      { stat: '4.9 / 5', label: 'تقييم Google Maps' },
      { stat: 'فرعين رئيسيين', label: 'القاهرة والإسكندرية' },
      { stat: 'ضمان رسمي', label: 'وكالات معتمدة حتى 3 سنوات' },
    ],
    testimonialsList: [
      {
        id: 't1',
        customerName: 'م. أحمد السيد (القاهرة)',
        comment: 'اشتريت تجميعة RTX 4070 Ti مع i7-14700K، التقفيل والكابل مانجمنت ممتاز، والتوصيل كان تاني يوم في المعادي مع الفاتورة والضمان المعتمد.',
        date: 'أغسطس 2026',
        verified: true,
      },
      {
        id: 't2',
        customerName: 'د. محمود فاروق (الإسكندرية)',
        comment: 'استلمت لابتوب HP ZBook كسر زيرو من فرع سيدي بشر، الجهاز حالته زيرو حرفياً والبطارية 98% وتجربة الشراء من المتجر ممتازة ومضمونة.',
        date: 'أغسطس 2026',
        verified: true,
      },
      {
        id: 't3',
        customerName: 'يوسف جمال (المنصورة)',
        comment: 'خدمة عملاء ممتازة وسريعة جداً على الواتساب، والتقسيط بـ ValU تم في دقائق بدون تعقيد واستلمت الشحنة مغلفة بإحكام.',
        date: 'يوليو 2026',
        verified: true,
      },
    ],

    // Showrooms & WhatsApp
    showroomsHeader: '🏪 فروعنا — زورنا أو تواصل معنا',
    showroomsSubheader: 'معارضنا في القاهرة والإسكندرية — أو اطلب أونلاين والشحن لباب بيتك',
    mapLinkText: 'الاتجاهات على الخريطة',
    whatsAppHeader: '💬 تواصل معنا مباشرة عبر واتساب',
    whatsAppDesc: 'استفسر عن أي منتج، احجز تجميعة Custom PC، أو تتبع طلبك — فريقنا التقني متاح 24/7',
    whatsAppBtn: 'واتساب',

    // Cart Drawer
    cartHeader: 'عربة التسوق',
    cartEmptyTitle: 'عربة التسوق فارغة',
    cartEmptyDesc: 'تصفح أحدث قطع الهاردوير ولابتوبات الجيمنج وأضف منتجاتك المفضلة.',
    cartSubtotal: 'المجموع الفرعي',
    cartShippingNote: 'الشحن والضرائب: تُحسب عند تأكيد الطلب',
    cartTotal: 'الإجمالي',
    checkoutBtn: 'إتمام الطلب والدفع',
    clearCartBtn: 'تفريغ العربة بالكامل',

    // Category / Filter page
    backToHome: 'العودة للرئيسية',
    showingProducts: 'عرض {count} منتج هاردوير موثق مع الضمان المعتمد',
    filterTitle: 'تصفية المواصفات',
    resetFilter: 'إعادة ضبط',
    conditionHeader: 'الحالة',
    brandNew: 'جديد بالكرتونة والضمان',
    usedImport: 'استيراد أصلي كسر زيرو',
    refurbished: 'مجدد معتمد',
    filterBrand: 'الماركة / الشركة المصنعة',
    filterGpu: 'شريحة كارت الشاشة',
    filterRam: 'سعة الرام RAM',

    // Footer
    footerCopyright: '© 2026 متجر نكسوس (Nexus Store). جميع الحقوق محفوظة. بنية تجارة إلكترونية متطورة.',
    footerWarranty: 'ضمان رسمي معتمد',
    footerDelivery: 'توصيل سريع لكافة المحافظات',
    footerPayments: 'دفع إلكتروني آمن 100%',
  },

  en: {
    // Navbar
    hotline: 'Hotline:',
    hotlineNumber: '19999',
    topBannerTag: 'Top Hardware Store for Gaming Laptops & Custom PC Builds in Egypt',
    languageToggle: 'العربية (AR)',
    trackOrder: 'Track Order',
    searchPlaceholder: 'Search RTX 4090, Gaming Laptops, DDR5 RAM...',
    signIn: 'Sign In',
    myAccount: 'My Account',
    wishlist: 'Wishlist',
    cart: 'Cart',
    navCategories: {
      laptops: 'Laptops & Notebooks',
      pcComponents: 'PC Components',
      gpus: '🔥 Graphics Cards (RTX)',
      ramMemory: 'RAM & NVMe Storage',
      monitors: 'Gaming Monitors',
      flashDeals: '⚡ Flash Deals',
    },

    // Hero Section
    heroSlides: [
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
        tag: '✨ Certified Original Used (Grade A+)',
        title: 'Top Tier Workstation Laptops & Hardware',
        description: 'Grade A+ Dell Precision, HP ZBook, and ThinkPads with official 6-month store warranty.',
        btnText: 'Explore Used Outlet',
        btnLink: '/category/used',
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
        discount: 'Starting from 9,999 EGP',
      },
    ],
    sideHeroBanners: [
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
    ],

    // Trust Badges
    trustBadges: [
      {
        id: 't1',
        title: 'Nationwide Delivery',
        desc: '24-72 Hours to all Governorates',
      },
      {
        id: 't2',
        title: 'Official Warranty',
        desc: '100% Genuine with Official Invoice',
      },
      {
        id: 't3',
        title: 'Flexible Payments',
        desc: 'ValU | Paymob | Fawry | Cash | Cards',
      },
      {
        id: 't4',
        title: 'Expert Tech Support',
        desc: 'Certified Hardware Engineers Ready',
      },
      {
        id: 't5',
        title: '14-Day Easy Returns',
        desc: 'Hassle-free replacement policy',
      },
      {
        id: 't6',
        title: 'Expert PC Assembly',
        desc: 'Assembled and benchmarked for you',
      },
    ],

    // Categories Section
    categoriesHeader: 'Shop by Category',
    categoriesSubheader: 'All hardware components, laptops, and accessories in one place',
    allCategoriesBtn: 'All Categories →',
    categoriesData: [
      { id: 'cat-1', title: 'Gaming Laptops', itemCount: '124+ Products' },
      { id: 'cat-2', title: 'PC Components', itemCount: '350+ Products' },
      { id: 'cat-3', title: 'Graphics Cards (RTX)', itemCount: '58+ Products' },
      { id: 'cat-4', title: 'Gaming Monitors', itemCount: '62+ Products' },
      { id: 'cat-5', title: 'Original Used (Import)', itemCount: '80+ Products' },
      { id: 'cat-6', title: 'Smart Audio & Speakers', itemCount: '95+ Products' },
      { id: 'cat-7', title: 'RAM & NVMe SSD', itemCount: '110+ Products' },
      { id: 'cat-8', title: 'CCTV & Smart Locks', itemCount: '70+ Products' },
    ],

    // Flash Deals Section
    flashDealsHeader: '⚡ Flash Deals',
    flashDealsBadge: 'LIMITED',
    flashDealsSubheader: 'Crazy prices on limited stock items',
    endsIn: 'Ends in:',
    hoursLabel: 'H',
    minutesLabel: 'M',
    secondsLabel: 'S',
    allDealsBtn: 'All Deals →',
    soldLabel: 'Sold:',
    availableLabel: 'Available:',

    // Featured Products Section
    featuredHeader: 'Featured Products',
    featuredSubheader: 'Top-rated hardware & bestsellers',
    viewAllBtn: 'View All →',
    noProducts: 'No products in this category yet.',
    tabs: {
      all: 'All',
      laptops: 'Laptops',
      pcBuilds: 'PC Builds',
      gpus: 'GPUs',
      used: 'Used (Certified)',
      monitors: 'Monitors',
      audio: 'Audio & CCTV',
    },

    // Product Card
    currency: 'EGP',
    officialBadge: 'OFFICIAL',
    reviewsCountSuffix: 'reviews',
    buyBtn: 'Buy',
    addedBtn: 'Added',
    saveText: 'SAVE',

    // Brand Partners
    brandsHeader: 'Official Brand Partners',
    brandsSubheader: 'Certified agency distribution with genuine warranty',

    // Testimonials
    testimonialsHeader: 'What Our Customers Say',
    testimonialsSubheader: '+10,000 Happy Customers in Egypt — Verified Reviews',
    verifiedBuyer: 'Verified',
    stats: [
      { stat: '10,000+', label: 'Happy Customers' },
      { stat: '4.9 / 5', label: 'Google Rating' },
      { stat: '2 Showrooms', label: 'Cairo & Alexandria' },
      { stat: '3 Years', label: 'Official Warranty' },
    ],
    testimonialsList: [
      {
        id: 't1',
        customerName: 'Eng. Ahmed El-Sayed (Cairo)',
        comment: 'Bought an RTX 4070 Ti build with i7-14700K. Cable management and packaging were superb, delivered the next day in Maadi with official warranty.',
        date: 'August 2026',
        verified: true,
      },
      {
        id: 't2',
        customerName: 'Dr. Mahmoud Farouk (Alexandria)',
        comment: 'Received an HP ZBook mint condition from the Sidi Bishr branch. 98% battery health, genuine charger, and smooth shopping experience.',
        date: 'August 2026',
        verified: true,
      },
      {
        id: 't3',
        customerName: 'Youssef Gamal (Mansoura)',
        comment: 'Excellent and fast customer service on WhatsApp. Installments with ValU were processed in minutes without hassle.',
        date: 'July 2026',
        verified: true,
      },
    ],

    // Showrooms & WhatsApp
    showroomsHeader: '🏪 Our Showrooms — Visit or Contact Us',
    showroomsSubheader: 'Two branches in Egypt — Cairo & Alexandria — or order online',
    mapLinkText: 'Map Location',
    whatsAppHeader: '💬 Chat with Us on WhatsApp',
    whatsAppDesc: 'Inquire about products, build custom PC, or track orders 24/7',
    whatsAppBtn: 'WhatsApp',

    // Cart Drawer
    cartHeader: 'Shopping Cart',
    cartEmptyTitle: 'Your cart is empty',
    cartEmptyDesc: 'Explore our premium hardware and add items to your cart.',
    cartSubtotal: 'Subtotal',
    cartShippingNote: 'Shipping & Taxes: Calculated at checkout',
    cartTotal: 'Total',
    checkoutBtn: 'Proceed to Checkout',
    clearCartBtn: 'Clear Cart',

    // Category / Filter page
    backToHome: 'Back to Home',
    showingProducts: 'Showing {count} verified hardware products with official warranty',
    filterTitle: 'Filter Specifications',
    resetFilter: 'Reset',
    conditionHeader: 'Condition',
    brandNew: 'Brand New',
    usedImport: 'Certified Used',
    refurbished: 'Refurbished',
    filterBrand: 'Brand',
    filterGpu: 'Graphics Chipset',
    filterRam: 'RAM Capacity',

    // Footer
    footerCopyright: '© 2026 Nexus Store. All Rights Reserved. Full-Stack E-Commerce Architecture.',
    footerWarranty: 'Official Warranty',
    footerDelivery: 'Fast Nationwide Delivery',
    footerPayments: 'Secure Payments',
  },
};

export function useTranslations(language: 'ar' | 'en') {
  return TRANSLATIONS[language] || TRANSLATIONS.ar;
}
