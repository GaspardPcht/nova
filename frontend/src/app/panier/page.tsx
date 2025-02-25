'use client';
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Layout>
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl font-bold text-black mb-8">Mon Panier</h1>
          
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-black">Votre panier est vide</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.selectedColor}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-xl p-6 shadow-sm"
                    >
                      <div className="flex gap-6">
                        <div className="relative w-24 h-24">
                          <Image
                            src={`/images/${item.image}.jpg`}
                            alt={item.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                          <p className="text-gray-600">Couleur: {item.selectedColor}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedColor, Math.max(1, item.quantity - 1))}
                                className="text-gray-500 hover:text-black"
                              >
                                -
                              </button>
                              <span className="text-black">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                                className="text-gray-500 hover:text-black"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id, item.selectedColor)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                        <div className="text-black font-semibold">
                          {(item.price * item.quantity).toFixed(2)} €
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
                <h2 className="text-xl font-semibold text-black mb-4">Résumé</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-black">
                    <span>Sous-total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-black">
                    <span>Livraison</span>
                    <span>Gratuite</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-black">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#E6AACE] text-white py-3 rounded-lg hover:bg-[#d999bc] transition-colors duration-300"
                >
                  Procéder au paiement
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 