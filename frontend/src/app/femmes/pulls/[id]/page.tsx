'use client'
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProductDetails from '@/components/products/ProductDetails';
import { useParams } from 'next/navigation';

const products = [
  { id: 1, title: "Pull Imprimé", price: 49.99, image: "merch6" },
  { id: 5, title: "Pull Oversize", price: 59.99, image: "merch9" },
  { id: 7, title: "Pull Maille Fine", price: 45.99, image: "merch11" },
  { id: 13, title: "Pull Cardigan", price: 65.99, image: "merch13" },
];

const PullFemmePage = () => {
  const params = useParams();
  const id = params?.id;
  console.log('Raw ID from URL:', id);
  
  const productId = typeof id === 'string' ? parseInt(id) : Array.isArray(id) ? parseInt(id[0]) : null;
  console.log('Parsed product ID:', productId);
  
  const product = productId ? products.find(p => p.id === productId) : null;
  console.log('Found product:', product);

  if (!product) {
    return (
      <Layout>
        <div className="pt-32 px-8 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Produit non trouvé</h1>
          <button 
            onClick={() => window.history.back()}
            className="text-[#E6AACE] hover:underline"
          >
            Retourner à la page précédente
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProductDetails
        id={String(product.id)}
        title={product.title}
        price={product.price}
        image={product.image}
        description="Un pull élégant et confortable, parfait pour toutes les occasions. Design exclusif Nova."
        category="Femmes"
        subcategory="Pulls"
      />
    </Layout>
  );
};

export default PullFemmePage; 