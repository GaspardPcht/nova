'use client'
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProductDetails from '@/components/products/ProductDetails';
import { useParams } from 'next/navigation';

const products = [
  { id: 20, title: "Mug Classic", price: 14.99, image: "acces-beige/mugs/mugs-beige1" },
  { id: 21, title: "Mug Nova", price: 16.99, image: "acces-beige/mugs/mugs-beige2" },
  { id: 22, title: "Mug Design", price: 15.99, image: "acces-beige/mugs/mugs-beige3" },
  { id: 23, title: "Mug Premium", price: 19.99, image: "acces-beige/mugs/mugs-beige4" },
];

const MugPage = () => {
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
        description="Un mug élégant et pratique, parfait pour vos boissons chaudes quotidiennes. Design exclusif Nova."
        category="Accessoires"
        subcategory="Mugs"
      />
    </Layout>
  );
};

export default MugPage; 