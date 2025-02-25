'use client'
import React from 'react';
import {
  ShoppingBagIcon,
  TagIcon,
  HeartIcon,
  SparklesIcon,
  UserIcon,
  GiftIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import NavPopover from '../ui/NavPopover';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

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
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleNavigate = (href: string) => {
    router.push(href);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-[#F8F2E6] backdrop-blur-sm shadow-sm z-40">
        <nav className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center relative">
          <img 
            src="/nova.png" 
            alt="logo" 
            className="w-30 h-20 hover:scale-110 transition-all duration-300 cursor-pointer" 
            onClick={() => router.push('/')}
          />

          {/* Menu Desktop */}
          <ul className="hidden md:flex space-x-8 relative z-50">
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

          {/* Actions (Panier et Menu Burger) */}
          <div className="flex items-center gap-4">
            {/* Panier */}
            <div 
              className="relative cursor-pointer text-2xl hover:text-[#E6AACE] transition-colors text-gray-700"
              onClick={() => router.push('/panier')}
            >
              🛒
              <AnimatePresence>
                {cartItemsCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-[#E6AACE] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Menu Burger pour Mobile */}
            <button 
              className="md:hidden text-gray-700 hover:text-[#E6AACE] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-8 w-8" />
              ) : (
                <Bars3Icon className="h-8 w-8" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Menu Mobile et Overlay */}
      <div className="relative z-[60]">
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-[#F8F2E6] shadow-xl p-6 overflow-y-auto md:hidden"
              >
                <div className="space-y-8 mt-20">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#E6AACE] mb-2">Femmes</h3>
                    {femmeCategories.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center space-x-2 text-gray-700 hover:text-[#E6AACE] transition-colors cursor-pointer"
                        onClick={() => handleNavigate(item.href)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#E6AACE] mb-2">Hommes</h3>
                    {hommeCategories.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center space-x-2 text-gray-700 hover:text-[#E6AACE] transition-colors cursor-pointer"
                        onClick={() => handleNavigate(item.href)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#E6AACE] mb-2">Accessoires</h3>
                    {accessoiresCategories.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center space-x-2 text-gray-700 hover:text-[#E6AACE] transition-colors cursor-pointer"
                        onClick={() => handleNavigate(item.href)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>

                  <div 
                    className="text-gray-700 hover:text-[#E6AACE] transition-colors cursor-pointer font-light"
                    onClick={() => handleNavigate('/promotions')}
                  >
                    Promotions
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Header; 