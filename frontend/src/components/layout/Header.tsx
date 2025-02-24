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
import { useRouter } from 'next/navigation';

const femmeCategories = [
  { 
    name: 'Pulls', 
    description: 'Collection de pulls pour femmes', 
    href: '/femmes/pulls',
    icon: ShoppingBagIcon 
  },
  { 
    name: 'T-shirts', 
    description: 'T-shirts et hauts pour femmes', 
    href: '/femmes/tshirts',
    icon: TagIcon 
  }
];

const hommeCategories = [
  { 
    name: 'Pulls', 
    description: 'Collection de pulls pour hommes', 
    href: '/hommes/pulls',
    icon: ShoppingBagIcon 
  },
  { 
    name: 'T-shirts', 
    description: 'T-shirts et hauts pour hommes', 
    href: '/hommes/tshirts',
    icon: TagIcon 
  }
];

const accessoiresCategories = [
  { 
    name: 'Bijoux', 
    description: 'Colliers, bagues et bracelets', 
    href: '/accessoires/bijoux',
    icon: SparklesIcon 
  },
  { 
    name: 'Sacs', 
    description: 'Sacs à main et pochettes', 
    href: '/accessoires/sacs',
    icon: ShoppingBagIcon 
  },
  { 
    name: 'Ceintures', 
    description: 'Collection de ceintures', 
    href: '/accessoires/ceintures',
    icon: TagIcon 
  },
];

const Header = () => {
  const router = useRouter();

  return (
    <header className="fixed top-0 w-full bg-[#F8F2E6] backdrop-blur-sm shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <img 
          src="/nova.png" 
          alt="logo" 
          className="w-30 h-20 hover:scale-110 transition-all duration-300 cursor-pointer" 
          onClick={() => router.push('/')}
        />
        <ul className="hidden md:flex space-x-8">
          <li>
            <NavPopover buttonText="Femmes" categories={femmeCategories} />
          </li>
          <li>
            <NavPopover buttonText="Hommes" categories={hommeCategories} />
          </li>
          <li>
            <NavPopover buttonText="Accessoires" categories={accessoiresCategories} />
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