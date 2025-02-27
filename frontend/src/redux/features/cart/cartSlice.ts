import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// Interface pour un élément du panier
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

// Interface pour l'état du panier
interface CartState {
  items: CartItem[];
  showCartAnimation: boolean;
}

// État initial
const initialState: CartState = {
  items: [],
  showCartAnimation: false,
};

// Création du slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Ajouter un produit au panier
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => 
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
      );
      
      if (existingItem) {
        // Si le produit existe déjà, augmenter la quantité
        state.items = state.items.map(item => 
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Sinon, ajouter le nouveau produit
        state.items.push(action.payload);
      }
      
      // Activer l'animation du panier
      state.showCartAnimation = true;
    },
    
    // Supprimer un produit du panier
    removeFromCart: (state, action: PayloadAction<{ id: number; size?: string; color?: string }>) => {
      state.items = state.items.filter(
        item => !(
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
        )
      );
    },
    
    // Mettre à jour la quantité d'un produit
    updateQuantity: (state, action: PayloadAction<{ id: number; size: string; color: string; quantity: number }>) => {
      state.items = state.items.map(item => 
        item.id === action.payload.id && 
        item.size === action.payload.size && 
        item.color === action.payload.color
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    },
    
    // Vider le panier
    clearCart: (state) => {
      state.items = [];
    },
    
    // Définir l'état de l'animation du panier
    setShowCartAnimation: (state, action: PayloadAction<boolean>) => {
      state.showCartAnimation = action.payload;
    },
  },
});

// Export des actions
export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  setShowCartAnimation 
} = cartSlice.actions;

// Sélecteurs
export const selectCart = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => 
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartItemsCount = (state: RootState) => 
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectShowCartAnimation = (state: RootState) => state.cart.showCartAnimation;

// Export du reducer
export default cartSlice.reducer; 