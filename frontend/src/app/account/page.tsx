'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectCurrentUser, selectAuthToken, logout as logoutAction } from '@/redux/features/auth/authSlice';
import { FaUser, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';

interface UserDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface EditableUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
}

export default function AccountPage() {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectAuthToken);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableDetails, setEditableDetails] = useState<EditableUserDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(() => {
    if (userDetails) {
      setEditableDetails({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        phone: userDetails.phone,
        password: ''
      });
    }
  }, [userDetails]);

  const fetchUserDetails = async () => {
    if (!user || !token) {
      console.log('Pas d\'utilisateur ou de token:', { user, token });
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('https://nova-back-gules.vercel.app/api/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
     

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération du profil');
      }

      if (data && data._id) {
        const formattedUserDetails = {
          _id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone || user.phone || '',
          createdAt: data.createdAt || new Date().toISOString()
        };
        setUserDetails(formattedUserDetails);
        setError(null);
      } else {
        throw new Error('Données invalides reçues du serveur');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [user, token, router, dispatch]);

  const handleLogout = () => {
    dispatch(logoutAction());
    router.push('/login');
  };

  const handleSave = async () => {
    try {
      const response = await fetch('https://nova-back-gules.vercel.app/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editableDetails),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la mise à jour du profil');
      }

      setUserDetails({
        ...userDetails!,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || editableDetails.phone,
      });
      setIsEditing(false);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors de la mise à jour du profil');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <main className="flex-1 bg-[#F8F2E6]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16">
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E6AACE]"></div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="flex-1 bg-[#F8F2E6]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* En-tête du profil */}
            <div className="bg-[#E6AACE] px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-white p-3 rounded-full">
                    <FaUser className="h-6 w-6 text-[#E6AACE]" />
                  </div>
                  <h1 className="ml-4 text-2xl font-bold text-white">Mon Profil</h1>
                </div>
                <div className="flex gap-3">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2.5 bg-white text-[#E6AACE] rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 font-medium shadow-sm"
                    >
                      <FaEdit className="h-4 w-4" /> Modifier
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-[#4CAF50] text-white rounded-lg hover:bg-[#43A047] transition-colors flex items-center gap-2 font-medium shadow-sm"
                      >
                        <FaSave className="h-4 w-4" /> Enregistrer
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2.5 bg-[#ef4444] text-white rounded-lg hover:bg-[#dc2626] transition-colors flex items-center gap-2 font-medium shadow-sm"
                      >
                        <FaTimes className="h-4 w-4" /> Annuler
                      </button>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2.5 bg-white text-[#E6AACE] rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-sm"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>

            {/* Contenu du profil */}
            <div className="p-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                  {error}
                </div>
              )}
              
              {userDetails ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Prénom</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableDetails.firstName}
                          onChange={(e) => setEditableDetails({...editableDetails, firstName: e.target.value})}
                          className="w-full p-2.5 border rounded text-black mt-1 focus:ring-2 focus:ring-[#E6AACE] focus:border-transparent"
                        />
                      ) : (
                        <p className="text-lg font-medium text-black">{userDetails.firstName}</p>
                      )}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Nom</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableDetails.lastName}
                          onChange={(e) => setEditableDetails({...editableDetails, lastName: e.target.value})}
                          className="w-full p-2.5 border rounded text-black mt-1 focus:ring-2 focus:ring-[#E6AACE] focus:border-transparent"
                        />
                      ) : (
                        <p className="text-lg font-medium text-black">{userDetails.lastName}</p>
                      )}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editableDetails.email}
                          onChange={(e) => setEditableDetails({...editableDetails, email: e.target.value})}
                          className="w-full p-2.5 border rounded mt-1 text-black focus:ring-2 focus:ring-[#E6AACE] focus:border-transparent"
                        />
                      ) : (
                        <p className="text-lg font-medium text-black">{userDetails.email}</p>
                      )}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editableDetails.phone}
                          onChange={(e) => {
                            console.log('Modification du téléphone:', e.target.value);
                            setEditableDetails({...editableDetails, phone: e.target.value});
                          }}
                          className="w-full p-2.5 border rounded mt-1 text-black focus:ring-2 focus:ring-[#E6AACE] focus:border-transparent"
                          placeholder="Ex: 06 12 34 56 78"
                          pattern="[0-9]{10}"
                          required
                        />
                      ) : (
                        <p className="text-lg font-medium text-black">
                          {userDetails.phone || 'Non renseigné'}
                        </p>
                      )}
                    </div>
                    {isEditing && (
                      <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                        <p className="text-sm text-black mb-1">Nouveau mot de passe (optionnel)</p>
                        <input
                          type="password"
                          value={editableDetails.password}
                          onChange={(e) => setEditableDetails({...editableDetails, password: e.target.value})}
                          className="w-full p-2.5 border rounded mt-1 text-black focus:ring-2  focus:ring-[#E6AACE] focus:border-transparent"
                          placeholder="Laissez vide pour ne pas modifier"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucune information disponible</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 
