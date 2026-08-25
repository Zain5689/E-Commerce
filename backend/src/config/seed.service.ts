import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Brand } from '../models/Brand';
import { Coupon } from '../models/Coupon';

export async function seedDatabase() {
  try {
    // --- Admin User ---
    try {
      const adminExists = await User.findOne({ email: 'admin@nexusstore.net' });
      if (!adminExists) {
        const passwordHash = await bcrypt.hash('Admin@123456', 10);
        await User.create({
          email: 'admin@nexusstore.net',
          name: 'Nexus Admin',
          passwordHash,
          role: 'ADMIN',
          phone: '+201000000000',
        });
        console.log('👤 Admin user seeded');
      }
    } catch (e: any) {
      if (e.code !== 11000) throw e;
    }

    // --- Coupons ---
    const couponCount = await Coupon.countDocuments();
    if (couponCount === 0) {
      await Coupon.insertMany([
        { code: 'NEXUS10', discountPercent: 10, isActive: true },
        { code: 'EGYPT10', discountPercent: 10, isActive: true },
        { code: 'VIP15', discountPercent: 15, isActive: true },
      ]);
      console.log('🏷️ Coupons seeded');
    }

    // --- Categories ---
    const catCount = await Category.countDocuments();
    if (catCount === 0) {
      await Category.insertMany([
        { nameEn: 'Gaming Laptops', nameAr: 'لابتوبات جيمنج', slug: 'laptops', displayOrder: 1 },
        { nameEn: 'PC Components', nameAr: 'قطع تجميع الكمبيوتر', slug: 'pc-components', displayOrder: 2 },
        { nameEn: 'Graphics Cards (RTX)', nameAr: 'كروت الشاشة RTX', slug: 'gpus', displayOrder: 3 },
        { nameEn: 'Gaming Monitors', nameAr: 'شاشات ألعاب عالية التردد', slug: 'monitors', displayOrder: 4 },
        { nameEn: 'RAM & NVMe SSD', nameAr: 'رامات وهاردات فائقة السرعة', slug: 'ram-memory', displayOrder: 5 },
        { nameEn: 'Smart Audio & Speakers', nameAr: 'سماعات وصوتيات ذكية', slug: 'audio', displayOrder: 6 },
        { nameEn: 'Custom PC Builds', nameAr: 'تجميعات كمبيوتر احترافية', slug: 'pc-builds', displayOrder: 7 },
        { nameEn: 'Certified Used', nameAr: 'لابتوبات وقطع استيراد', slug: 'used', displayOrder: 8 },
        { nameEn: 'CCTV & Smart Locks', nameAr: 'كاميرات مراقبة وكوالين ذكية', slug: 'cctv', displayOrder: 9 },
        { nameEn: 'Accessories', nameAr: 'ملحقات وإكسسوارات', slug: 'accessories', displayOrder: 10 },
      ]);
      console.log('📂 Categories seeded');
    }

    // --- Brands ---
    const brandCount = await Brand.countDocuments();
    if (brandCount === 0) {
      await Brand.insertMany([
        { name: 'ASUS ROG', slug: 'asus-rog', logo: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=100&q=80' },
        { name: 'MSI', slug: 'msi', logo: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=100&q=80' },
        { name: 'Lenovo Legion', slug: 'lenovo-legion', logo: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=100&q=80' },
        { name: 'Intel', slug: 'intel', logo: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=100&q=80' },
        { name: 'Corsair', slug: 'corsair', logo: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=100&q=80' },
        { name: 'Samsung', slug: 'samsung', logo: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=100&q=80' },
        { name: 'Kingston', slug: 'kingston', logo: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=100&q=80' },
        { name: 'Anker Soundcore', slug: 'anker-soundcore', logo: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=100&q=80' },
        { name: 'EZVIZ', slug: 'ezviz', logo: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=100&q=80' },
        { name: 'HP Workstation', slug: 'hp-workstation', logo: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=100&q=80' },
        { name: 'Dell', slug: 'dell', logo: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=100&q=80' },
        { name: 'Custom PC', slug: 'custom-pc', logo: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=100&q=80' },
      ]);
      console.log('🏷️ Brands seeded');
    }

    // --- Products ---
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const products = [
        // FLASH DEALS
        {
          id: 'deal-1', name: 'ASUS ROG Strix G16 (2024) 240Hz 2.5K',
          nameAr: 'لابتوب ASUS ROG Strix G16 (2024) 240Hz 2.5K',
          slug: 'asus-rog-strix-g16-2024-rtx4070', category: 'laptops',
          specs: 'Intel Core i7-14700HX | RTX 4070 8GB | 32GB DDR5 | 1TB NVMe Gen4',
          specsAr: 'معالج i7-14700HX | كارت RTX 4070 8GB | رام 32GB DDR5 | هارد 1TB NVMe',
          price: 61999, originalPrice: 68500, rating: 4.9, reviewsCount: 28,
          image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80',
          galleryImages: [
            'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
          ],
          badge: '-10% FLASH', badgeAr: '-10% خصم فلاش', badgeColor: 'red',
          inStock: true, soldCount: 14, stockCount: 20, brand: 'ASUS ROG',
          sku: 'ROG-G614JIR-N4003W', modelCode: 'ROG Strix G16 (2024)',
          warrantyPeriod: '2 Years Official ASUS Warranty', warrantyPeriodAr: 'ضمان سنتين معتمد من أسوس مصر',
          description: 'The ASUS ROG Strix G16 (2024) is engineered for competitive esports and high-end creative workflows.',
          descriptionAr: 'لابتوب ASUS ROG Strix G16 لعام 2024 مصمم للألعاب التنافسية وصناع المحتوى الاحترافي.',
          isPublished: true,
        },
        {
          id: 'deal-2', name: 'MSI GeForce RTX 4070 Ti Super 16GB Gaming X Slim',
          nameAr: 'كارت شاشة MSI GeForce RTX 4070 Ti Super 16GB',
          slug: 'msi-rtx-4070-ti-super-16gb', category: 'gpus',
          specs: '16GB GDDR6X | 256-Bit | DLSS 3.5 Frame Gen | RGB Mystic Light',
          specsAr: 'ذاكرة 16GB GDDR6X | دعم DLSS 3.5 | إضاءة RGB',
          price: 46999, originalPrice: 51500, rating: 5.0, reviewsCount: 34,
          image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
          galleryImages: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80'],
          badge: 'HOT DEAL', badgeAr: 'عرض ساخن', badgeColor: 'amber',
          inStock: true, soldCount: 8, stockCount: 10, brand: 'MSI',
          warrantyPeriod: '3 Years', warrantyPeriodAr: 'ضمان 3 سنوات', isPublished: true,
        },
        {
          id: 'deal-3', name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz CL30',
          nameAr: 'رامات Corsair Vengeance RGB 32GB DDR5 6000MHz',
          slug: 'corsair-vengeance-rgb-32gb-ddr5-6000', category: 'accessories',
          specs: 'XMP 3.0 & EXPO Ready | Low Latency Gaming RAM | Black',
          specsAr: 'جاهزة لـ XMP 3.0 & EXPO | توقيت CL30 فائق السرعة | أسود RGB',
          price: 6499, originalPrice: 7500, rating: 4.9, reviewsCount: 42,
          image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80',
          galleryImages: ['https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1200&q=80'],
          badge: '-13%', badgeAr: '-13%', badgeColor: 'emerald',
          inStock: true, soldCount: 19, stockCount: 25, brand: 'Corsair',
          warrantyPeriod: '5 Years', warrantyPeriodAr: 'ضمان 5 سنوات', isPublished: true,
        },
        {
          id: 'deal-4', name: 'Samsung Odyssey G7 27" 240Hz 1ms Curved Gaming Monitor',
          nameAr: 'شاشة ألعاب Samsung Odyssey G7 27 بوصة 240Hz منحنية',
          slug: 'samsung-odyssey-g7-27-240hz-curved', category: 'monitors',
          specs: '2560x1440 QHD | 1000R Curvature | G-Sync & FreeSync Premium Pro',
          specsAr: 'دقة 2K QHD | انحناء 1000R | دعم G-Sync و FreeSync Premium',
          price: 20999, originalPrice: 24500, rating: 4.8, reviewsCount: 18,
          image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
          galleryImages: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80'],
          badge: 'SAVE 3,500 EGP', badgeAr: 'وفر 3,500 ج.م', badgeColor: 'purple',
          inStock: true, soldCount: 11, stockCount: 15, brand: 'Samsung',
          warrantyPeriod: '3 Years', warrantyPeriodAr: 'ضمان 3 سنوات', isPublished: true,
        },
        // FEATURED PRODUCTS
        {
          id: 'prod-f1', name: 'Lenovo Legion Pro 5 16IRX8 Gaming Laptop',
          nameAr: 'لابتوب Lenovo Legion Pro 5 16IRX8 للجيمنج والريندر',
          slug: 'lenovo-legion-pro-5-16irx8', category: 'laptops',
          specs: 'Intel Core i9-13900HX | RTX 4070 8GB | 32GB DDR5 | 1TB SSD | 240Hz',
          specsAr: 'معالج i9-13900HX | كارت RTX 4070 8GB | رام 32GB DDR5 | شاشة 240Hz',
          price: 68999, originalPrice: 74000, rating: 4.9, reviewsCount: 19,
          image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
          galleryImages: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80'],
          badge: 'BESTSELLER', badgeAr: 'الأكثر مبيعاً', badgeColor: 'amber',
          inStock: true, soldCount: 22, stockCount: 8, brand: 'Lenovo Legion',
          warrantyPeriod: '2 Years', warrantyPeriodAr: 'ضمان سنتين', isPublished: true,
        },
        {
          id: 'prod-f2', name: 'Nexus Alpha RTX 4080 Super Custom Gaming PC Build',
          nameAr: 'تجميعة نكسوس ألفا الاحترافية RTX 4080 Super Custom PC',
          slug: 'nexus-alpha-rtx4080-super-custom-pc', category: 'pc-builds',
          specs: 'Intel i7-14700K | RTX 4080 Super 16GB | 32GB DDR5 6000MHz | 2TB Gen4 NVMe | 850W Gold',
          specsAr: 'معالج i7-14700K | كارت RTX 4080 Super | رام 32GB | هارد 2TB Gen4 | باور 850W Gold',
          price: 89999, originalPrice: 96000, rating: 5.0, reviewsCount: 12,
          image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
          galleryImages: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80'],
          badge: 'MONSTER RIG', badgeAr: 'تجميعة وحش', badgeColor: 'red',
          inStock: true, soldCount: 5, stockCount: 3, brand: 'Custom PC',
          warrantyPeriod: '3 Years', warrantyPeriodAr: 'ضمان 3 سنوات', isPublished: true,
        },
        {
          id: 'prod-f3', name: 'Anker Soundcore Boom 2 Plus 140W Portable Speaker',
          nameAr: 'سماعة متنقلة Anker Soundcore Boom 2 Plus بقوة 140W',
          slug: 'anker-soundcore-boom-2-plus-140w', category: 'audio',
          specs: 'BassUp 2.0 | IPX7 Waterproof | 20H Playtime | RGB Beat-Sync',
          specsAr: 'صوت مضخم BassUp 2.0 | ضد الماء IPX7 | بطارية 20 ساعة | إضاءة RGB',
          price: 8999, originalPrice: 10200, rating: 4.8, reviewsCount: 31,
          image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
          galleryImages: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80'],
          badge: 'NEW', badgeAr: 'جديد', badgeColor: 'emerald',
          inStock: true, soldCount: 18, stockCount: 30, brand: 'Anker Soundcore',
          warrantyPeriod: '1 Year', warrantyPeriodAr: 'ضمان سنة', isPublished: true,
        },
        {
          id: 'prod-f4', name: 'HP ZBook Studio G8 Workstation (Certified Original Used)',
          nameAr: 'لابتوب HP ZBook Studio G8 وركستيشن (استيراد فرز أول)',
          slug: 'hp-zbook-studio-g8-certified-used', category: 'used',
          specs: 'Intel Core i7-11800H | RTX 3070 8GB | 32GB RAM | 1TB SSD | 4K OLED | 6M Warranty',
          specsAr: 'معالج i7-11800H | كارت RTX 3070 8GB | رام 32GB | شاشة 4K OLED | ضمان 6 شهور',
          price: 34999, originalPrice: 42000, rating: 4.7, reviewsCount: 15,
          image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80',
          galleryImages: ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80'],
          badge: 'GRADE A+ USED', badgeAr: 'فرز أول A+', badgeColor: 'blue',
          inStock: true, soldCount: 7, stockCount: 5, brand: 'HP Workstation',
          warrantyPeriod: '6 Months Store Warranty', warrantyPeriodAr: 'ضمان 6 شهور من المتجر', isPublished: true,
        },
        {
          id: 'prod-f5', name: 'Intel Core i9-14900K 24-Core 6.0GHz Processor',
          nameAr: 'معالج Intel Core i9-14900K بـ 24 نواة وتردد 6.0GHz',
          slug: 'intel-core-i9-14900k-processor', category: 'pc-builds',
          specs: '24 Cores (8P + 16E) | 32 Threads | LGA1700 | 36MB Intel Smart Cache',
          specsAr: '24 نواة | 32 خيط معالجة | سوكت LGA1700 | كاش 36MB Smart Cache',
          price: 26500, originalPrice: 28900, rating: 4.9, reviewsCount: 45,
          image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80',
          galleryImages: ['https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=80'],
          badge: 'FLAGSHIP CPU', badgeAr: 'أقوى معالج', badgeColor: 'purple',
          inStock: true, soldCount: 33, stockCount: 20, brand: 'Intel',
          warrantyPeriod: '3 Years', warrantyPeriodAr: 'ضمان 3 سنوات', isPublished: true,
        },
        {
          id: 'prod-f6', name: 'Dell Latitude 7420 Business Ultrabook (Used Grade A)',
          nameAr: 'لابتوب بزنس Dell Latitude 7420 نحيف وخفيف (استيراد فئة A)',
          slug: 'dell-latitude-7420-used-grade-a', category: 'used',
          specs: 'Intel Core i7-1185G7 | 16GB RAM | 512GB SSD | 14" FHD IPS | Fingerprint',
          specsAr: 'معالج i7-1185G7 | رام 16GB | هارد 512GB SSD | شاشة 14 بوصة FHD IPS',
          price: 18500, originalPrice: 21900, rating: 4.8, reviewsCount: 22,
          image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80',
          galleryImages: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80'],
          badge: 'HOT IMPORT', badgeAr: 'استيراد مميز', badgeColor: 'amber',
          inStock: true, soldCount: 10, stockCount: 7, brand: 'Dell',
          warrantyPeriod: '6 Months', warrantyPeriodAr: 'ضمان 6 شهور', isPublished: true,
        },
        {
          id: 'prod-f7', name: 'Kingston FURY Renegade 2TB M.2 PCIe 4.0 NVMe SSD',
          nameAr: 'هارد SSD سريع Kingston FURY Renegade 2TB Gen4 NVMe',
          slug: 'kingston-fury-renegade-2tb-nvme', category: 'pc-builds',
          specs: '7,300MB/s Read | 7,000MB/s Write | Heatsink Included | PS5 Compatible',
          specsAr: 'قراءة 7,300MB/s | كتابة 7,000MB/s | مزود بمشتت حراري | متوافق مع PS5',
          price: 7800, originalPrice: 8900, rating: 5.0, reviewsCount: 38,
          image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80',
          galleryImages: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1200&q=80'],
          badge: 'SUPER SPEED', badgeAr: 'سرعة فائقة', badgeColor: 'emerald',
          inStock: true, soldCount: 28, stockCount: 40, brand: 'Kingston',
          warrantyPeriod: '5 Years', warrantyPeriodAr: 'ضمان 5 سنوات', isPublished: true,
        },
        {
          id: 'prod-f8', name: 'EZVIZ C8W Pro 3K 5MP Pan & Tilt Smart Camera',
          nameAr: 'كاميرا مراقبة ذكية متحركة EZVIZ C8W Pro بدقة 3K 5MP',
          slug: 'ezviz-c8w-pro-3k-smart-camera', category: 'audio',
          specs: 'AI Human & Vehicle Detection | Auto-Zoom Tracking | Color Night Vision',
          specsAr: 'كشف ذكي بالذكاء الاصطناعي | تتبع تلقائي | رؤية ليلية ملونة 3K',
          price: 3499, originalPrice: 4100, rating: 4.9, reviewsCount: 29,
          image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
          galleryImages: ['https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80'],
          badge: 'SMART CCTV', badgeAr: 'أمان وكاميرات', badgeColor: 'blue',
          inStock: true, soldCount: 16, stockCount: 25, brand: 'EZVIZ',
          warrantyPeriod: '1 Year', warrantyPeriodAr: 'ضمان سنة', isPublished: true,
        },
      ];

      await Product.insertMany(products);
      console.log(`🛍️ ${products.length} products seeded`);
    }

    console.log('✅ Database seed check complete');
  } catch (error) {
    console.error('❌ Seed error:', error);
  }
}
