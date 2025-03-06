'use client'
import React from 'react';
import ProductCard from '../products/ProductCard';

const products = [
  { id: 6, title: "Pull Homme", price: 49.99, image: "merch10", href: "/hommes/pulls/6" },
  { id: 12, title: "T-Shirt Classique Homme", price: 19.99, image: "merch16", href: "/hommes/t-shirts/12" },
  { id: 7, title: "Pull Femme", price: 49.99, image: "merch11", href: "/femmes/pulls/7" },
  { id: 2, title: "T-shirt Classique Femme", price: 19.99, image: "merch4", href: "/femmes/t-shirts/2" },
];

const FeaturedProducts = () => {
  return (
    <section id="featured-products" className="bg-gradient-to-br from-[#F5E6E8] to-[#E6AACE] py-16">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-700">
          Nos meilleures ventes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              href={product.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;