'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about-section" className="max-w-7xl mx-auto px-8 py-28">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0  backdrop-blur-3xl rounded-3xl" />
        <div className="relative backdrop-blur-lg rounded-3xl p-12 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-32"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-center bg-gradient-to-r from-black to-[#E6AACE] bg-clip-text text-transparent">
              À propos de NOVA
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-center space-y-4"
            >
              <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#E6AACE] to-[#d999bc] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black">Qualité Premium</h3>
              <p className="text-gray-600">
                Des vêtements de haute qualité, confectionnés avec des matériaux durables et éthiques.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-center space-y-4"
            >
              <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#E6AACE] to-[#d999bc] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black">Made in France</h3>
              <p className="text-gray-600">
                Une collaboration exclusive avec des ateliers français partageant nos valeurs d'excellence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center space-y-4"
            >
              <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#E6AACE] to-[#d999bc] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black">Style Durable</h3>
              <p className="text-gray-600">
                Des pièces intemporelles, conçues pour durer et vous accompagner pendant des années.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 