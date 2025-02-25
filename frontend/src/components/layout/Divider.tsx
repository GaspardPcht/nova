'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Divider = () => {
  return (
    <div className="relative mt-20 overflow-hidden bg-[#F8F2E6]">
      {/* Vagues décoratives */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#E6AACE] to-transparent" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center"
        >
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#E6AACE] to-[#d999bc] flex items-center justify-center shadow-xl">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
        </motion.div>
      </div>

      {/* Lignes décoratives */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-7xl px-8">
          <div className="relative">
            <div className="absolute left-0 top-1/2 w-full h-[1px] bg-gradient-to-r from-[#E6AACE]/20 via-[#E6AACE]/40 to-[#E6AACE]/20" />
            <div className="absolute left-0 top-1/2 -translate-y-2 w-full h-[1px] bg-gradient-to-r from-[#E6AACE]/10 via-[#E6AACE]/20 to-[#E6AACE]/10" />
            <div className="absolute left-0 top-1/2 translate-y-2 w-full h-[1px] bg-gradient-to-r from-[#E6AACE]/10 via-[#E6AACE]/20 to-[#E6AACE]/10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Divider; 