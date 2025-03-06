'use client'
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProductDetails from '@/components/products/ProductDetails';
import { useParams } from 'next/navigation';

// Liste unifiée de tous les produits
const products = [
  // T-shirts Femmes
  { id: 2, title: "T-Shirt Basic", price: 29.99, image: "merch7", category: "Femmes", subcategory: "T-shirts" },
  { id: 3, title: "T-Shirt Logo", price: 34.99, image: "merch8", category: "Femmes", subcategory: "T-shirts" },
  { id: 4, title: "T-Shirt Graphique", price: 32.99, image: "merch4", category: "Femmes", subcategory: "T-shirts" },
  { id: 14, title: "T-Shirt Imprimé", price: 35.99, image: "merch5", category: "Femmes", subcategory: "T-shirts" },
  
  // Pulls Femmes
  { id: 1, title: "Pull Imprimé", price: 49.99, image: "merch6", category: "Femmes", subcategory: "Pulls" },
  { id: 5, title: "Pull Oversize", price: 59.99, image: "merch9", category: "Femmes", subcategory: "Pulls" },
  { id: 7, title: "Pull Maille Fine", price: 45.99, image: "merch11", category: "Femmes", subcategory: "Pulls" },
  { id: 13, title: "Pull Cardigan", price: 65.99, image: "merch13", category: "Femmes", subcategory: "Pulls" },
  
  // T-shirts Hommes
  { id: 8, title: "T-Shirt Classic", price: 29.99, image: "merch1", category: "Hommes", subcategory: "T-shirts" },
  { id: 9, title: "T-Shirt Nova", price: 34.99, image: "merch2", category: "Hommes", subcategory: "T-shirts" },
  { id: 11, title: "T-Shirt Design", price: 32.99, image: "merch4", category: "Hommes", subcategory: "T-shirts" },
  { id: 12, title: "T-Shirt Premium", price: 35.99, image: "merch5", category: "Hommes", subcategory: "T-shirts" },
  
  // Pulls Hommes
  { id: 6, title: "Pull Col V", price: 49.99, image: "merch10", category: "Hommes", subcategory: "Pulls" },
  { id: 10, title: "Pull Casual", price: 54.99, image: "merch3", category: "Hommes", subcategory: "Pulls" },
  { id: 15, title: "Pull Coton", price: 45.99, image: "merch12", category: "Hommes", subcategory: "Pulls" },
  { id: 16, title: "Pull Laine", price: 59.99, image: "merch13", category: "Hommes", subcategory: "Pulls" },
];

const ProductPage = () => {
  const params = useParams();
  const id = params?.id;

  // Convertir l'ID en string s'il ne l'est pas déjà
  const productId = Array.isArray(id) ? id[0] : id;
  
  // Trouver le produit correspondant
  const product = products.find(p => p.id === Number(productId));

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
        description={`${product.title} - Un vêtement élégant et confortable de la collection Nova.`}
        category={product.category}
        subcategory={product.subcategory}
      />
    </Layout>
  );
};

export default ProductPage; 