'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { 
  FaUser, 
  FaShoppingBag, 
  FaHeart, 
  FaCog, 
  FaSignOutAlt,
  FaBox,
  FaHistory
} from 'react-icons/fa';

export default function DashboardPage() {
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  const menuItems = [
    {
      title: 'Mon Profil',
      description: 'Gérer vos informations personnelles',
      icon: FaUser,
      href: '/account',
      color: 'bg-blue-500'
    },
    {
      title: 'Mes Commandes',
      description: 'Suivre vos commandes en cours',
      icon: FaShoppingBag,
      href: '/orders',
      color: 'bg-green-500'
    },
    {
      title: 'Historique',
      description: 'Voir votre historique d\'achats',
      icon: FaHistory,
      href: '/history',
      color: 'bg-purple-500'
    },
    {
      title: 'Mes Favoris',
      description: 'Produits que vous avez aimés',
      icon: FaHeart,
      href: '/favorites',
      color: 'bg-red-500'
    },
    {
      title: 'Mes Colis',
      description: 'Suivre vos livraisons',
      icon: FaBox,
      href: '/shipments',
      color: 'bg-yellow-500'
    },
    {
      title: 'Paramètres',
      description: 'Gérer vos préférences',
      icon: FaCog,
      href: '/settings',
      color: 'bg-gray-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-2 text-sm text-gray-600">
            Bienvenue, {user.name}
          </p>
        </div>

        {/* Grille des fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => router.push(item.href)}
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`${item.color} p-3 rounded-lg`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton de déconnexion */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FaSignOutAlt className="h-5 w-5" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>
    </div>
  );
} 