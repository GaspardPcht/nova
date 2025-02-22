import React from 'react';
import ProductCard from '../products/ProductCard';

const FeaturedProducts = () => {
  return (
    <section className="bg-gradient-to-br from-[#F5E6E8] to-[#E6AACE] py-16">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-700">
          Nos meilleures ventes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <ProductCard key={item} title="Produit Tendance" price={49.99} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 