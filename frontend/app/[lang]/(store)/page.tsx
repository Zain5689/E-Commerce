import React from 'react';
import { HeroSection } from '../../../components/home/HeroSection';
import { CategoriesSection } from '../../../components/home/CategoriesSection';
import { TrustBadgesSection } from '../../../components/home/TrustBadgesSection';
import { FlashDealsSection } from '../../../components/home/FlashDealsSection';
import { FeaturedProductsSection } from '../../../components/home/FeaturedProductsSection';
import { BrandsSection } from '../../../components/home/BrandsSection';
import { TestimonialsSection } from '../../../components/home/TestimonialsSection';
import { ShowroomsSection } from '../../../components/home/ShowroomsSection';

export default function StorefrontHomePage() {
  return (
    <div className="space-y-0 pb-0">
      {/* 1. Hero Slider + Side Banners */}
      <HeroSection />

      {/* 2. Category Grid */}
      <CategoriesSection />

      {/* 3. Trust Badges */}
      <TrustBadgesSection />

      {/* 4. Flash Deals with Countdown */}
      <FlashDealsSection />

      {/* 5. Featured Products with Category Tabs */}
      <FeaturedProductsSection />

      {/* 6. Brand Partners */}
      <BrandsSection />

      {/* 7. Customer Testimonials + Stats */}
      <TestimonialsSection />

      {/* 8. Showrooms + WhatsApp CTA */}
      <ShowroomsSection />
    </div>
  );
}
