'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Vérifier l'authentification
    if (!isAuthenticated) {
      console.log('Non authentifié, redirection vers login...');
      window.location.href = '/login';
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated]);

  // Afficher un indicateur de chargement pendant la vérification
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E6AACE]"></div>
      </div>
    );
  }

  // Si authentifié, afficher le contenu
  return <>{children}</>;
} 