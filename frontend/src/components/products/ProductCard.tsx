import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  price: number;
  product: {
    name: string;
    price: number;
    image: string;
  };
} 

const ProductCard = ({ title, price }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
   <img src="./merch/pull.png" alt="pull" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-[#E6AACE] font-medium my-2">{price.toFixed(2)} €</p>
        <button className="w-full bg-white border-2 border-[#E6AACE] text-[#E6AACE] py-2 rounded-lg hover:bg-[#E6AACE] hover:text-white transition-all duration-300">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 