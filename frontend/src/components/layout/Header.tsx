'use client'
import React from 'react';
import {
  ShoppingBagIcon,
  TagIcon,
  HeartIcon,
  SparklesIcon,
  UserIcon,
  GiftIcon,
} from '@heroicons/react/24/outline';
import NavPopover from '../ui/NavPopover';

const femmeCategories = [
  { 
    name: 'Vêtements', 
    description: 'Robes, tops, pantalons et plus encore', 
    href: '/femmes/vetements',
  },
  { 
    name: 'Accessoires', 
    description: 'Sacs, bijoux et accessoires', 
    href: '/femmes/accessoires',
    icon: ShoppingBagIcon 
  },
  { 
    name: 'Nouveautés', 
    description: 'Découvrez les dernières tendances', 
    href: '/femmes/nouveautes',
    icon: SparklesIcon 
  },
  { 
    name: 'Collection Premium', 
    description: 'Notre sélection haut de gamme', 
    href: '/femmes/premium',
    icon: HeartIcon 
  },
];

const hommeCategories = [
  { 
    name: 'Vêtements', 
    description: 'Costumes, chemises, pantalons et plus', 
    href: '/hommes/vetements',
  },
  { 
    name: 'Accessoires', 
    description: 'Ceintures, montres et accessoires', 
    href: '/hommes/accessoires',
    icon: ShoppingBagIcon 
  },
  { 
    name: 'Collection Business', 
    description: 'Tenues professionnelles', 
    href: '/hommes/business',
    icon: UserIcon 
  },
  { 
    name: 'Offres Spéciales', 
    description: 'Promotions exclusives', 
    href: '/hommes/promotions',
    icon: GiftIcon 
  },
];

const nouveautesCategories = [
  { 
    name: 'Derniers Arrivages', 
    description: 'Les pièces de la semaine', 
    href: '/nouveautes/arrivages',
    icon: SparklesIcon 
  },
  { 
    name: 'Tendances', 
    description: 'Les must-have du moment', 
    href: '/nouveautes/tendances',
    icon: HeartIcon 
  },
];

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-[#F8F2E6] backdrop-blur-sm shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <img src="/nova.png" alt="logo" className="w-30 h-20 hover:scale-110 transition-all duration-300 cursor-pointer" />
        <ul className="hidden md:flex space-x-8">
          <li>
            <NavPopover buttonText="Femmes" categories={femmeCategories} />
          </li>
          <li>
            <NavPopover buttonText="Hommes" categories={hommeCategories} />
          </li>
          <li>
            <NavPopover buttonText="Nouveautés" categories={nouveautesCategories} />
          </li>
          <li className="cursor-pointer hover:text-[#E6AACE] transition-colors text-gray-700 font-light">
            Promotions
          </li>
        </ul>
        <div className="cursor-pointer text-2xl hover:text-[#E6AACE] transition-colors text-gray-700">
          🛒
        </div>
      </nav>
    </header>
  );
};

export default Header; 