import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#F8F2E6] text-gray-700">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-xl font-bold mb-4 text-[#E6AACE]">À propos de Nova</h4>
          <p className="text-gray-600">Votre destination mode préférée</p>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4 text-[#E6AACE]">Contact</h4>
          <p className="text-black">Email: contact@nova.fr</p>
          <p className="text-black">Tél: 01 23 45 67 89</p>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4 text-[#E6AACE]">Suivez-nous</h4>
          <div className="flex space-x-4">
            <a 
              href="https://facebook.com/nova" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-[#E6AACE] transition-colors"
            >
              <FaFacebookF size={24} />
            </a>
            <a 
              href="https://instagram.com/nova" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-[#E6AACE] transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a 
              href="https://twitter.com/nova" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-[#E6AACE] transition-colors"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 