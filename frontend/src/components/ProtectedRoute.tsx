'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectIsAuthenticated } from '@/redux/features/auth/authSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Vérifier l'authentification
    if (!isAuthenticated) {
      console.log('Non authentifié, redirection vers login...');
      router.push('/login');
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, router]);

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