'use client'
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  id: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, id }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/produits/${id}`);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-full h-60">
        <Image 
          src={`/merch/${image}.png`} 
          alt={title} 
          layout="fill" 
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-[#E6AACE] font-medium my-2">{price.toFixed(2)} €</p>
        <button 
          className="w-full bg-white border-2 border-[#E6AACE] text-[#E6AACE] py-2 rounded-lg hover:bg-[#E6AACE] hover:text-white transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            // Logique d'ajout au panier à implémenter
          }}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;