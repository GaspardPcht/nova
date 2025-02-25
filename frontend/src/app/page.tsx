import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import AboutSection from '../components/home/AboutSection';
import Divider from '../components/layout/Divider';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F2E6]">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <AboutSection />
      </main>
      <Divider />
      <Footer />
    </div>
  );
}
