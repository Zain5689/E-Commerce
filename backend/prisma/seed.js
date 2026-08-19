"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting Database Seeding for Nexus Store...');
    // Create Admin User
    const passwordHash = await bcryptjs_1.default.hash('Admin@123456', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@nexusstore.net' },
        update: {},
        create: {
            email: 'admin@nexusstore.net',
            name: 'Nexus Admin',
            passwordHash,
            role: client_1.Role.ADMIN,
            phone: '+201000000000',
        },
    });
    console.log('👤 Admin created:', admin.email);
    // Create Governorates & Cities
    const cairo = await prisma.governorate.create({
        data: {
            nameEn: 'Cairo',
            nameAr: 'القاهرة',
            shippingFee: 50.00,
            cities: {
                create: [
                    { nameEn: 'Nasr City', nameAr: 'مدينة نصر' },
                    { nameEn: 'New Cairo', nameAr: 'القاهرة الجديدة' },
                    { nameEn: 'Maadi', nameAr: 'المعادي' },
                ],
            },
        },
    });
    const alex = await prisma.governorate.create({
        data: {
            nameEn: 'Alexandria',
            nameAr: 'الإسكندرية',
            shippingFee: 75.00,
            cities: {
                create: [
                    { nameEn: 'Smouha', nameAr: 'سموحة' },
                    { nameEn: 'Glim', nameAr: 'جليم' },
                ],
            },
        },
    });
    console.log('📍 Shipping Governorates created');
    // Create Brands
    const asus = await prisma.brand.create({
        data: { name: 'ASUS', slug: 'asus', logo: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef' },
    });
    const msi = await prisma.brand.create({
        data: { name: 'MSI', slug: 'msi', logo: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2' },
    });
    const lenovo = await prisma.brand.create({
        data: { name: 'Lenovo', slug: 'lenovo', logo: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed' },
    });
    const nvidia = await prisma.brand.create({
        data: { name: 'NVIDIA', slug: 'nvidia', logo: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea' },
    });
    console.log('🏷️ Brands created');
    // Create Root Categories
    const laptopsCat = await prisma.category.create({
        data: {
            nameEn: 'Laptops',
            nameAr: 'أجهزة اللابتوب',
            slug: 'laptops',
            displayOrder: 1,
            children: {
                create: [
                    { nameEn: 'Gaming Laptops', nameAr: 'لابتوب ألعاب', slug: 'gaming-laptops', displayOrder: 1 },
                    { nameEn: 'Business Laptops', nameAr: 'لابتوب أعمال', slug: 'business-laptops', displayOrder: 2 },
                ],
            },
        },
        include: { children: true },
    });
    const componentsCat = await prisma.category.create({
        data: {
            nameEn: 'PC Components',
            nameAr: 'قطع الكمبيوتر',
            slug: 'pc-components',
            displayOrder: 2,
            children: {
                create: [
                    { nameEn: 'Graphics Cards (GPU)', nameAr: 'كروت الشاشة', slug: 'gpus', displayOrder: 1 },
                    { nameEn: 'RAM & Memory', nameAr: 'الرامات والذاكرة', slug: 'ram-memory', displayOrder: 2 },
                    { nameEn: 'Processors (CPU)', nameAr: 'المعالجات', slug: 'cpus', displayOrder: 3 },
                ],
            },
        },
        include: { children: true },
    });
    console.log('📂 Dynamic Category Hierarchy tree created');
    // Create Specification Keys for Gaming Laptops
    const gamingLaptopsSub = laptopsCat.children.find(c => c.slug === 'gaming-laptops');
    const ramSpecKey = await prisma.specificationKey.create({
        data: { categoryId: gamingLaptopsSub.id, nameEn: 'RAM Capacity', nameAr: 'سعة الذاكرة', unit: 'GB', isFilterable: true },
    });
    const gpuSpecKey = await prisma.specificationKey.create({
        data: { categoryId: gamingLaptopsSub.id, nameEn: 'GPU Model', nameAr: 'موديل كارت الشاشة', isFilterable: true },
    });
    const cpuSpecKey = await prisma.specificationKey.create({
        data: { categoryId: gamingLaptopsSub.id, nameEn: 'Processor Type', nameAr: 'نوع المعالج', isFilterable: true },
    });
    // Create Products
    const rogLaptop = await prisma.product.create({
        data: {
            nameEn: 'ASUS ROG Strix G16 (2024) Gaming Laptop',
            nameAr: 'لابتوب ألعاب أسوس روج ستريكس G16',
            slug: 'asus-rog-strix-g16-2024',
            sku: 'ASUS-ROG-G16-001',
            descriptionEn: 'High performance gaming laptop featuring Intel Core i7-14700HX and NVIDIA RTX 4070.',
            descriptionAr: 'لابتوب ألعاب عالي الأداء مع معالج إنتل كور i7 وكارت شاشة انفييديا ار تي اكس 4070.',
            basePrice: 65000.00,
            discountPrice: 61999.00,
            stockQuantity: 15,
            condition: client_1.Condition.NEW,
            categoryId: gamingLaptopsSub.id,
            brandId: asus.id,
            images: {
                create: [
                    { url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302', isPrimary: true, altText: 'ASUS ROG Strix G16 Front View' },
                    { url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef', isPrimary: false, altText: 'ASUS ROG Keyboard Lighting' },
                ],
            },
            specifications: {
                create: [
                    { specificationKeyId: ramSpecKey.id, valueEn: '16GB', valueAr: '16 جيجابايت' },
                    { specificationKeyId: gpuSpecKey.id, valueEn: 'RTX 4070', valueAr: 'ار تي اكس 4070' },
                    { specificationKeyId: cpuSpecKey.id, valueEn: 'Intel Core i7-14700HX', valueAr: 'إنتل كور i7-14700HX' },
                ],
            },
            variants: {
                create: [
                    {
                        sku: 'ASUS-ROG-G16-1TB',
                        price: 61999.00,
                        stockQuantity: 10,
                        attributes: { color: 'Eclipse Gray', storage: '1TB NVMe SSD', warranty: '2 Years Local Warranty' },
                    },
                    {
                        sku: 'ASUS-ROG-G16-2TB',
                        price: 66999.00,
                        stockQuantity: 5,
                        attributes: { color: 'Eclipse Gray', storage: '2TB NVMe SSD', warranty: '2 Years Local Warranty' },
                    },
                ],
            },
        },
    });
    const msiLaptop = await prisma.product.create({
        data: {
            nameEn: 'MSI Katana 15 B13V Gaming Laptop',
            nameAr: 'لابتوب ألعاب إم إس آي كاتانا 15',
            slug: 'msi-katana-15-b13v',
            sku: 'MSI-KATANA-15-001',
            descriptionEn: 'Budget gaming laptop with RTX 4060 graphics and 144Hz FHD IPS display.',
            descriptionAr: 'لابتوب ألعاب بميزانية ممتازة وكارت شاشة ار تي اكس 4060 وشاشة 144 هرتز.',
            basePrice: 48000.00,
            discountPrice: 44999.00,
            stockQuantity: 8,
            condition: client_1.Condition.NEW,
            categoryId: gamingLaptopsSub.id,
            brandId: msi.id,
            images: {
                create: [
                    { url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2', isPrimary: true, altText: 'MSI Katana Front View' },
                ],
            },
            specifications: {
                create: [
                    { specificationKeyId: ramSpecKey.id, valueEn: '16GB', valueAr: '16 جيجابايت' },
                    { specificationKeyId: gpuSpecKey.id, valueEn: 'RTX 4060', valueAr: 'ار تي اكس 4060' },
                    { specificationKeyId: cpuSpecKey.id, valueEn: 'Intel Core i7-13620H', valueAr: 'إنتل كور i7-13620H' },
                ],
            },
        },
    });
    console.log('💻 Electronics Products & Technical Specs seeded successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
