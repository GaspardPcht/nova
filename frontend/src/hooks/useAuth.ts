'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { 
  setCredentials,
  logout as logoutAction,
  setLoading,
  setError,
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectAuthToken,
  User
} from '@/redux/features/auth/authSlice';

// Interface pour les données de connexion
interface LoginCredentials {
  email: string;
  password: string;
}

// Interface pour les données d'inscription
interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

// Hook personnalisé pour l'authentification
export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const token = useAppSelector(selectAuthToken);

  // Fonction de connexion
  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch(setLoading());
      
      const response = await fetch('https://nova-back-gules.vercel.app/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }
      
      // Enregistrer les informations d'authentification
      dispatch(setCredentials({ user: data, token: data.token }));
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  // Fonction d'inscription
  const register = async (data: RegisterData) => {
    try {
      dispatch(setLoading());
      
      const response = await fetch('https://nova-back-gules.vercel.app/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Erreur d\'inscription');
      }
      
      // Enregistrer les informations d'authentification
      dispatch(setCredentials({ user: responseData, token: responseData.token }));
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    token,
    login,
    register,
    logout,
  };
} 