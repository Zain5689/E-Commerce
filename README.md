# ⚡ Nexus Store — Enterprise Electronics & PC Hardware E-Commerce

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-Cache-red?style=for-the-badge&logo=redis)](https://redis.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

Nexus Store is a high-performance, full-stack electronics retail platform designed specifically for gaming laptops, PC hardware components, graphics cards, and custom rig setups with official warranty and nationwide delivery support.

---

## ✨ Features

- 🎮 **Modern Gaming Hardware Storefront**: High-converting, responsive UI with glassmorphism aesthetics and custom micro-animations.
- 🌳 **Dynamic Multi-Level Category Tree**: Unlimited nested subcategories (e.g. `Laptops > Gaming Laptops`) powered by recursive database relations.
- ⚙️ **Specification-Based Dynamic Filters**: Filter products dynamically by technical specifications (e.g., RAM Capacity, GPU Model, Processor Type).
- 🏷️ **Product Variant System**: Multi-attribute variant management (e.g., 1TB vs 2TB SSD, Color choices) with individual SKU tracking and stock management.
- 🌍 **Internationalization (i18n)**: Full English (LTR) and Arabic (RTL) support with localized routing.
- 🚚 **Governorate-Based Shipping**: Dynamic shipping rate calculation across Egypt governorates & cities.
- ⚡ **High Performance Caching**: Redis integration for high-speed category trees, catalog browsing, and session management.

---

## 🛠️ Architecture & Tech Stack

### **Frontend (`/frontend`)**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS, Glassmorphism design system
- **State Management**: Zustand (Cart & Wishlist persistence)
- **Icons**: Lucide React

### **Backend (`/backend`)**
- **Runtime**: Node.js & TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma ORM
- **Cache**: Redis
- **Security**: JWT authentication, bcryptjs, CORS, input validation

---

## 📁 Repository Structure

```
E-Commerce/
├── frontend/                     # Next.js 14 Storefront
│   ├── app/                      # App router pages & layouts
│   │   ├── [lang]/               # Localized route handler (i18n)
│   │   └── page.tsx              # Root home page
│   ├── components/               # UI components
│   │   └── store/                # Navbar, Filters, Rigs, Cards
│   ├── lib/                      # Zustand store & utilities
│   └── package.json
│
├── backend/                      # Node.js Express REST API
│   ├── prisma/                   # Database schema & seed scripts
│   │   ├── schema.prisma         # Enterprise PostgreSQL schema
│   │   └── seed.ts               # Database seed runner
│   ├── src/                      # Source code
│   │   ├── modules/              # Products, Categories, Auth
│   │   ├── config/               # Prisma & Redis services
│   │   └── app.ts                # Express application
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js >= 18.x
- PostgreSQL database instance
- Redis server instance (optional, fallback available)

### **1. Clone the Repository**
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd E-Commerce
```

### **2. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
The storefront will be available at `http://localhost:3000`.

### **3. Backend Setup**
```bash
cd ../backend
npm install
```
Configure your environment variables in `backend/.env`:
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/nexus_store_db?schema=public"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-super-secret-jwt-key"
```

Initialize database & seed mock data:
```bash
npx prisma db push
npx prisma db seed
npm run dev
```

---

## 🔑 Default Admin Credentials (Seeded)

- **Email**: `admin@nexusstore.net`
- **Password**: `Admin@123456`

---

## 📝 License

This project is open-source under the [MIT License](LICENSE).
