'use client';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 100;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#F8F2E6] pt-24 pb-32">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-60 w-[40rem] h-[40rem] bg-[#E6AACE]/10 rounded-full blur-3xl" />
        <div className="absolute -left-40 bottom-0 w-[45rem] h-[45rem] bg-[#1F2937]/5 rounded-full blur-3xl" />
        <div className="absolute right-20 top-40 text-[280px] font-black text-[#1F2937]/5 -rotate-12 select-none">
          NOVA
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FFF8E7] to-transparent" />
      
      <motion.div 
        className="container mx-auto px-6 lg:px-12 z-10 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-5xl relative ml-0 lg:ml-12">
          <motion.div
            className="absolute -left-6 top-0 w-1 h-40 bg-[#E6AACE]"
            initial={{ height: 0 }}
            animate={{ height: 160 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
          
          <motion.h1 
            className="text-7xl md:text-8xl xl:text-9xl font-black tracking-tight leading-none"
          >
            <span className="text-[#1F2937] block transform -rotate-2 mb-2">THE</span>
            <span className="text-[#1F2937] block transform rotate-1 relative ml-12">
              in<span className="text-[#E6AACE]">NOVA</span>tion
              <span className="absolute -right-8 top-0 text-3xl text-[#E6AACE] font-bold">™</span>
            </span>
            <span className="text-[#1F2937] block transform -rotate-1 ml-24">STYLE</span>
          </motion.h1>
          
          <motion.p className="text-2xl md:text-3xl text-[#1F2937]/70 mt-12 pl-8 border-l-2 border-[#E6AACE] max-w-2xl ml-12">
            Redéfinissez les codes de la mode
          </motion.p>
          
          <motion.div
            className="mt-16 flex items-center gap-8 ml-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <button 
              onClick={() => scrollToSection('featured-products')}
              className="px-8 py-4 bg-[#1F2937] text-white text-lg font-bold uppercase tracking-widest rounded-full hover:bg-[#E6AACE] transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 border-2 border-[#1F2937]"
            >
              Shop Now
            </button>
            <button 
              onClick={() => scrollToSection('about-section')}
              className="px-8 py-4 bg-white text-[#1F2937] text-lg font-bold uppercase tracking-widest rounded-full hover:bg-[#E6AACE] hover:text-white transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 border-2 border-[#1F2937]"
            >
              À propos
            </button>
            <div className="text-base text-[#1F2937]/60 uppercase tracking-[0.2em] rotate-90 transform translate-y-4">
              Scroll →
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection; 