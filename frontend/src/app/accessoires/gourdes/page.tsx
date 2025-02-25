'use client'
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';

const products = [
  { id: 24, title: "Gourde Sport Beige", price: 24.99, image: "acces-beige/gourdes/gourdes-beige1" },
  { id: 25, title: "Gourde Isotherme Beige", price: 29.99, image: "acces-beige/gourdes/gourdes-beige2" },
  { id: 26, title: "Gourde Sport Noir", price: 24.99, image: "acces-black/gourdes/gourdes-black1" },
  { id: 27, title: "Gourde Isotherme Noir", price: 29.99, image: "acces-black/gourdes/gourdes-black2" },
];

const Gourdes = () => {
  return (
    <Layout>
      <div className="pt-32 relative">
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-60 w-[40rem] h-[40rem] bg-[#E6AACE]/10 rounded-full blur-3xl" />
          <div className="absolute -left-40 bottom-0 w-[45rem] h-[45rem] bg-[#1F2937]/5 rounded-full blur-3xl" />
          <div className="absolute right-20 top-40 text-[280px] font-black text-[#1F2937]/5 -rotate-12 select-none">
            NOVA
          </div>
        </div>

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          {/* Section Hero */}
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="text-lg font-light text-[#E6AACE] tracking-widest uppercase">
                Accessoires
              </span>
            </div>
            <h1 className="mb-6">
              <span className="text-7xl font-black text-gray-800 tracking-tight">
                GOURDES
              </span>
              <span className="block text-2xl font-light text-gray-600 mt-4">
                COLLECTION 2024
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Explorez notre collection de gourdes design et écologiques.
              Des accessoires pratiques et élégants,
              pour vous accompagner au quotidien.
            </p>
          </div>

          {/* Section Produits */}
          <section className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  href={`/accessoires/gourdes/${product.id}`}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Gourdes; 