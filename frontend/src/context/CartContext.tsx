'use client';
import React, { createContext, useContext, useState } from 'react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size?: string, color?: string) => void;
  updateQuantity: (id: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  showCartAnimation: boolean;
  setShowCartAnimation: (show: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCartAnimation, setShowCartAnimation] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => 
        i.id === item.id && 
        i.size === item.size && 
        i.color === item.color
      );
      
      if (existingItem) {
        return prevCart.map(i =>
          i.id === item.id && 
          i.size === item.size && 
          i.color === item.color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prevCart, item];
    });
    setShowCartAnimation(true);
    setTimeout(() => setShowCartAnimation(false), 1000);
  };

  const removeFromCart = (id: number, size?: string, color?: string) => {
    setCart(prevCart => prevCart.filter(item => 
      !(item.id === id && item.size === size && item.color === color)
    ));
  };

  const updateQuantity = (id: number, size: string, color: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      showCartAnimation,
      setShowCartAnimation
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 