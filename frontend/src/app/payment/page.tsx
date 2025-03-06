'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { FaCreditCard, FaLock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

export default function PaymentPage() {
  const router = useRouter();
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simuler un traitement de paiement
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/payment-success');
    }, 2000);
  };

  return (
    <Layout>
      <main className="flex-1 bg-[#F8F2E6]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* En-tête du paiement */}
            <div className="bg-[#E6AACE] px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-white p-3 rounded-full">
                    <FaCreditCard className="h-6 w-6 text-[#E6AACE]" />
                  </div>
                  <h1 className="ml-4 text-2xl font-bold text-white">Paiement Sécurisé</h1>
                </div>
                <div className="text-white text-xl font-bold">
                  {total.toFixed(2)} €
                </div>
              </div>
            </div>

            {/* Formulaire de paiement */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titulaire de la carte
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.cardHolder}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cardHolder: e.target.value})}
                    className="w-full p-2.5 text-black border rounded focus:ring-2 focus:ring-[#E6AACE] focus:border-transparent"
                    placeholder="JEAN DUPONT"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de carte
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                      setPaymentDetails({...paymentDetails, cardNumber: value});
                    }}
                    className="w-full p-2.5 text-black border rounded focus:ring-2 focus:ring-[#E6AACE] focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date d'expiration
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, '')
                          .replace(/(\d{2})(\d{0,2})/, '$1/$2')
                          .slice(0, 5);
                        setPaymentDetails({...paymentDetails, expiryDate: value});
                      }}
                      className="w-full p-2.5 text-black border rounded focus:ring-2 focus:ring-[#E6AACE] focus:border-transparent"
                      placeholder="MM/AA"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setPaymentDetails({...paymentDetails, cvv: value});
                      }}
                      className="w-full p-2.5 text-black border rounded focus:ring-2 focus:ring-[#E6AACE] focus:border-transparent"
                      placeholder="123"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <FaLock className="h-4 w-4 mr-2" />
                  Paiement sécurisé SSL
                </div>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`px-6 py-3 bg-[#E6AACE] text-white rounded-lg font-medium shadow-sm
                    ${isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#d691b7] transition-colors'}`}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Traitement...
                    </div>
                  ) : (
                    `Payer ${total.toFixed(2)} €`
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
} 