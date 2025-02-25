'use client'
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProductDetails from '@/components/products/ProductDetails';
import { useParams } from 'next/navigation';

const products = [
  { id: 28, title: "Tote Bag Nova", price: 19.99, image: "acces-beige/sacs/sac-beige1" },
  { id: 29, title: "Sac Shopping", price: 24.99, image: "acces-beige/sacs/sac-beige2" },
  { id: 30, title: "Sac Week-end", price: 49.99, image: "acces-beige/sacs/sac-beige3" },
  { id: 31, title: "Mini Sac Nova", price: 29.99, image: "acces-beige/sacs/sac-beige4" },
];

const SacPage = () => {
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
        description="Un sac élégant et pratique, parfait pour toutes vos sorties. Design exclusif Nova."
        category="Accessoires"
        subcategory="Sacs"
      />
    </Layout>
  );
};

export default SacPage; 