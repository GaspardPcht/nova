import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// Interface pour l'utilisateur
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

// Interface pour l'état d'authentification
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// État initial
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Création du slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Définir l'utilisateur et le token après connexion
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    
    // Déconnexion
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    
    // Début du chargement
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Erreur d'authentification
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export des actions
export const { 
  setCredentials, 
  logout, 
  setLoading, 
  setError 
} = authSlice.actions;

// Sélecteurs
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthToken = (state: RootState) => state.auth.token;

// Export du reducer
export default authSlice.reducer; 