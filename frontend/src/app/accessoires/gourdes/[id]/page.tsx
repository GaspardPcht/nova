'use client'
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProductDetails from '@/components/products/ProductDetails';
import { useParams } from 'next/navigation';

const products = [
  { id: 24, title: "Gourde Sport Beige", price: 24.99, image: "acces-beige/gourdes/gourdes-beige1" },
  { id: 25, title: "Gourde Isotherme Beige", price: 29.99, image: "acces-beige/gourdes/gourdes-beige2" },
  { id: 26, title: "Gourde Sport Noir", price: 24.99, image: "acces-black/gourdes/gourdes-black1" },
  { id: 27, title: "Gourde Isotherme Noir", price: 29.99, image: "acces-black/gourdes/gourdes-black2" },
];

interface ProductDetailsProps {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  subcategory: string;
}

function ProductDetails({ id, title, price, image, description, category, subcategory }: ProductDetailsProps) {
  // ... le reste du composant
}

const GourdePage = () => {
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
        description="Une gourde élégante et écologique, parfaite pour rester hydraté(e) tout au long de la journée. Design exclusif Nova."
        category="Accessoires"
        subcategory="Gourdes"
      />
    </Layout>
  );
};

export default GourdePage; 