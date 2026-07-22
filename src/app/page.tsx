import React from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import MarketplaceLayers from '@/components/MarketplaceLayers';
import Principles from '@/components/Principles';
import Products from '@/components/Products';
import ImpactStats from '@/components/ImpactStats';
import AboutUs from '@/components/AboutUs';
import AppDownloadSection from '@/components/AppDownloadSection';
import Partners from '@/components/Partners';
import MarketHomeTeaser from '@/components/market/MarketHomeTeaser';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Slider */}
      <Hero />
      
      {/* Services Grid */}
      <Services />

      {/* Market Intelligence teaser — TradingView / CMC style */}
      <MarketHomeTeaser />
      
      {/* Marketplace 3 Layer Flow */}
      <MarketplaceLayers />
      
      {/* Principles Pillars */}
      <Principles />
      
      {/* Product List */}
      <Products />
      
      {/* Impact Stats Grid */}
      <ImpactStats />
      
      {/* About Team & Operational Stats */}
      <AboutUs />

      {/* Download aplikasi mobile */}
      <AppDownloadSection />

      {/* Valued Partners Grid & Mailto CTA */}
      <Partners />
    </div>
  );
}
