'use client';

import Layout from '@/components/layout/Layout';
import { FaCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <Layout>
      <main className="flex-1 bg-[#F8F2E6]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <FaCheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Paiement réussi !
              </h1>
              <p className="text-gray-600 mb-8">
                Votre paiement a été traité avec succès. Merci de votre confiance !
              </p>
              <button
                onClick={() => router.push('/account')}
                className="px-6 py-3 bg-[#E6AACE] text-white rounded-lg font-medium shadow-sm hover:bg-[#d691b7] transition-colors"
              >
                Retour à mon compte
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 