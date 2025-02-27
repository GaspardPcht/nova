'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { 
  addToCart as addToCartAction, 
  removeFromCart as removeFromCartAction,
  updateQuantity as updateQuantityAction,
  clearCart as clearCartAction,
  setShowCartAnimation,
  selectCart,
  selectCartTotal,
  selectCartItemsCount,
  selectShowCartAnimation,
  CartItem
} from '@/redux/features/cart/cartSlice';

// Hook personnalisé pour le panier
export function useCart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const total = useAppSelector(selectCartTotal);
  const itemsCount = useAppSelector(selectCartItemsCount);
  const showCartAnimation = useAppSelector(selectShowCartAnimation);

  // Ajouter un produit au panier
  const addToCart = (item: CartItem) => {
    dispatch(addToCartAction(item));
    
    // Désactiver l'animation après 1 seconde
    setTimeout(() => {
      dispatch(setShowCartAnimation(false));
    }, 1000);
  };

  // Supprimer un produit du panier
  const removeFromCart = (id: number, size?: string, color?: string) => {
    dispatch(removeFromCartAction({ id, size, color }));
  };

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (id: number, size: string, color: string, quantity: number) => {
    dispatch(updateQuantityAction({ id, size, color, quantity }));
  };

  // Vider le panier
  const clearCart = () => {
    dispatch(clearCartAction());
  };

  return {
    cart,
    total,
    itemsCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    showCartAnimation,
  };
} 