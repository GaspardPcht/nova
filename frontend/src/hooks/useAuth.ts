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
interface RegisterData extends LoginCredentials {
  name: string;
}

// Hook personnalisé pour l'authentification
export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const token = useAppSelector(selectAuthToken);

  // Fonction de connexion (à implémenter avec l'API)
  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch(setLoading());
      
      // Simulation d'une requête API (à remplacer par une vraie requête)
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials),
      // });
      
      // const data = await response.json();
      
      // if (!response.ok) {
      //   throw new Error(data.message || 'Erreur de connexion');
      // }
      
      // Simulation de réponse (à remplacer)
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'Utilisateur Test',
        role: 'user',
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Enregistrer les informations d'authentification
      dispatch(setCredentials({ user: mockUser, token: mockToken }));
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  // Fonction d'inscription (à implémenter avec l'API)
  const register = async (data: RegisterData) => {
    try {
      dispatch(setLoading());
      
      // Simulation d'une requête API (à remplacer par une vraie requête)
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      
      // const responseData = await response.json();
      
      // if (!response.ok) {
      //   throw new Error(responseData.message || 'Erreur d\'inscription');
      // }
      
      // Simulation de réponse (à remplacer)
      const mockUser: User = {
        id: '1',
        email: data.email,
        name: data.name,
        role: 'user',
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Enregistrer les informations d'authentification
      dispatch(setCredentials({ user: mockUser, token: mockToken }));
      
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