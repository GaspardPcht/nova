'use client'
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  href: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, image, href }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (href) {
      console.log('Navigating to:', href);
      router.push(href);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ 
      id, 
      title, 
      price, 
      image, 
      quantity: 1,
      color: 'Beige',
      size: 'M' // Taille par défaut
    });
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer relative"
      onClick={handleClick}
    >
      <div className="relative w-full h-60">
        <Image 
          src={
            // Vérifier si l'image est un accessoire
            image.startsWith('acces-') 
              ? `/${image}.png` 
              : `/merch/${image}.png`
          }
          alt={title} 
          layout="fill" 
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-[#E6AACE] font-medium my-2">{price.toFixed(2)} €</p>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="w-full bg-white border-2 border-[#E6AACE] text-[#E6AACE] py-2 rounded-lg hover:bg-[#E6AACE] hover:text-white transition-all duration-300"
          onClick={handleAddToCart}
        >
          Ajouter au panier
        </motion.button>
      </div>
    </div>
  );
};

export default ProductCard;