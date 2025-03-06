'use client';

import { useAuth } from '@/context/AuthContext';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  token: string;
}

interface UserDetails extends User {
  createdAt: string;
}

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user?.token) {
        console.log("Pas de token disponible");
        setIsLoading(false);
        return;
      }

      console.log("Tentative de récupération des informations avec le token:", user.token);

      try {
        const response = await fetch('https://nova-back-gules.vercel.app/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log("Réponse du serveur:", response.status);
        const data = await response.json();
        console.log("Données reçues:", data);

        if (!response.ok) {
          throw new Error(data.message || 'Erreur lors de la récupération des informations');
        }

        setUserDetails({
          ...data,
          token: user.token // On garde le token du contexte
        });
      } catch (err) {
        console.error('Erreur détaillée:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDF8F7] py-12">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <div className="p-8">
              <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    setIsLoading(true);
                    window.location.reload();
                  }}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#E6AACE] hover:bg-[#d89abf]"
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F7] py-12">
      <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Mon Compte</h1>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Déconnexion
              </button>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E6AACE] mx-auto"></div>
                <p className="mt-4 text-gray-500">Chargement des informations...</p>
              </div>
            ) : userDetails ? (
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations personnelles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <FaUser className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Nom</p>
                        <p className="font-medium text-gray-900">{userDetails.lastName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaUser className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Prénom</p>
                        <p className="font-medium text-gray-900">{userDetails.firstName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">{userDetails.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaPhone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Téléphone</p>
                        <p className="font-medium text-gray-900">{userDetails.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {userDetails.createdAt && (
                  <div className="pt-4">
                    <p className="text-sm text-gray-500">
                      Membre depuis le {new Date(userDetails.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucune information disponible</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
