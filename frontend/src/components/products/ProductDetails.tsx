'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

// Base de données des produits (à déplacer plus tard dans un fichier séparé)
const productsDatabase: Record<number, {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  details: string[];
}> = {
  1: {
    id: 1,
    title: "Pull Imprimé Femme",
    price: 49.99,
    image: "merch6",
    description: "Un pull confortable avec un imprimé tendance. Parfait pour un look casual chic.",
    images: ["merch6", "merch6", "merch6"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Noir"],
    details: [
      "Matière douce et confortable",
      "Imprimé exclusif",
      "Fabriqué en France",
      "Coupe féminine"
    ]
  },
  2: {
    id: 2,
    title: "T-Shirt Basic Femme",
    price: 19.99,
    image: "merch4",
    description: "Le t-shirt basique indispensable à votre garde-robe. Coupe ajustée et matière premium.",
    images: ["merch4", "merch4", "merch4"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Noir"],
    details: [
      "100% coton peigné",
      "Coupe ajustée",
      "Col rond",
      "Finitions soignées"
    ]
  },
  3: {
    id: 3,
    title: "T-Shirt Imprimé Femme",
    price: 24.99,
    image: "merch5",
    description: "T-shirt avec un imprimé artistique unique. Pour un style affirmé et original.",
    images: ["merch5", "merch5", "merch5"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Noir"],
    details: [
      "Coton biologique",
      "Impression haute qualité",
      "Design exclusif",
      "Lavable en machine"
    ]
  },
  4: {
    id: 4,
    title: "T-Shirt Femme",
    price: 22.99,
    image: "merch7",
    description: "Un t-shirt basique mais élégant, parfait pour toutes les occasions.",
    images: ["merch7", "merch7", "merch7"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Noir"],
    details: [
      "Coupe confortable",
      "Jersey doux",
      "Facile d'entretien",
      "Made in France"
    ]
  },
  5: {
    id: 5,
    title: "Pull Oversize Femme",
    price: 59.99,
    image: "merch9",
    description: "Pull oversize pour un look décontracté et tendance. Confort maximal garanti.",
    images: ["merch9", "merch9", "merch9"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Noir"],
    details: [
      "Maille douce",
      "Coupe oversize",
      "Finitions côtelées",
      "Style contemporain"
    ]
  },
  6: {
    id: 6,
    title: "Pull Col V Homme",
    price: 49.99,
    image: "merch10",
    description: "Pull col V classique pour homme. L'élégance au quotidien.",
    images: ["merch10", "merch10", "merch10"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Beige", "Noir"],
    details: [
      "Laine mérinos",
      "Col V classique",
      "Coupe regular",
      "Parfait pour le bureau"
    ]
  },
  7: {
    id: 7,
    title: "Pull Maille Fine Femme",
    price: 45.99,
    image: "merch11",
    description: "Pull en maille fine, léger et élégant. Idéal pour la mi-saison.",
    images: ["merch11", "merch11", "merch11"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Noir"],
    details: [
      "Maille fine premium",
      "Coupe ajustée",
      "Détails raffinés",
      "Polyvalent"
    ]
  },
  8: {
    id: 8,
    title: "T-Shirt Sport Homme",
    price: 24.99,
    image: "merch8",
    description: "T-shirt technique pour le sport. Confort et performance.",
    images: ["merch8", "merch8", "merch8"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Beige", "Noir"],
    details: [
      "Tissu respirant",
      "Anti-transpiration",
      "Séchage rapide",
      "Coupe athlétique"
    ]
  },
  9: {
    id: 9,
    title: "T-Shirt Casual Homme",
    price: 22.99,
    image: "merch2",
    description: "T-shirt casual pour un style décontracté. Confort au quotidien.",
    images: ["merch2", "merch2", "merch2"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Beige", "Noir"],
    details: [
      "Coton peigné",
      "Coupe regular",
      "Col rond renforcé",
      "Coutures doubles"
    ]
  },
  10: {
    id: 10,
    title: "Pull Casual Homme",
    price: 54.99,
    image: "merch3",
    description: "Pull casual pour homme. Le parfait équilibre entre style et confort.",
    images: ["merch3", "merch3", "merch3"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Beige", "Noir"],
    details: [
      "Maille moyenne",
      "Style décontracté",
      "Finitions soignées",
      "Coupe moderne"
    ]
  },
  11: {
    id: 11,
    title: "T-Shirt Premium Homme",
    price: 29.99,
    image: "merch15",
    description: "T-shirt premium pour homme. Qualité supérieure et style raffiné.",
    images: ["merch15", "merch15", "merch15"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Beige", "Noir"],
    details: [
      "Coton premium",
      "Coupe slim",
      "Finitions luxe",
      "Made in France"
    ]
  },
  12: {
    id: 12,
    title: "T-Shirt Classic Homme",
    price: 19.99,
    image: "merch16",
    description: "Le t-shirt classique par excellence. Un basique indispensable.",
    images: ["merch16", "merch16", "merch16"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Beige", "Noir"],
    details: [
      "100% coton",
      "Coupe classique",
      "Col rond",
      "Confort optimal"
    ]
  },
  13: {
    id: 13,
    title: "Pull Cardigan Femme",
    price: 65.99,
    image: "merch13",
    description: "Un cardigan élégant et polyvalent pour toutes les occasions.",
    images: ["merch13", "merch13", "merch13"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Noir"],
    details: [
      "Laine mélangée",
      "Boutons premium",
      "Poches latérales",
      "Coupe classique"
    ]
  },
  14: {
    id: 14,
    title: "T-Shirt Manches Longues Femme",
    price: 29.99,
    image: "merch6",
    description: "T-shirt manches longues confortable et stylé.",
    images: ["merch6", "merch6", "merch6"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Noir"],
    details: [
      "Jersey doux",
      "Manches longues",
      "Coupe ajustée",
      "Parfait pour la mi-saison"
    ]
  },
  15: {
    id: 15,
    title: "Pull Coton Homme",
    price: 45.99,
    image: "merch12",
    description: "Pull en coton confortable et résistant.",
    images: ["merch12", "merch12", "merch12"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Beige", "Noir"],
    details: [
      "Coton doux",
      "Coupe confortable",
      "Entretien facile",
      "Style intemporel"
    ]
  },
  16: {
    id: 16,
    title: "Pull Laine Homme",
    price: 59.99,
    image: "merch13",
    description: "Pull en laine chaude et confortable.",
    images: ["merch13", "merch13", "merch13"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Gris", "Marine", "Vert"],
    details: [
      "Laine mérinos",
      "Isolation thermique",
      "Respirant",
      "Coupe classique"
    ]
  },
  20: {
    id: 20,
    title: "Mug Classic",
    price: 14.99,
    image: "acces-beige/mugs/mugs-beige1",
    description: "Un mug élégant et pratique pour vos boissons chaudes quotidiennes.",
    images: ["acces-beige/mugs/mugs-beige1", "acces-beige/mugs/mugs-beige1", "acces-beige/mugs/mugs-beige1"],
    sizes: ["Unique"],
    colors: ["Beige", "Noir"],
    details: [
      "Céramique haute qualité",
      "Contenance 350ml",
      "Compatible lave-vaisselle",
      "Design exclusif Nova"
    ]
  },
  21: {
    id: 21,
    title: "Mug Nova",
    price: 16.99,
    image: "acces-beige/mugs/mugs-beige2",
    description: "Un mug au design unique avec le logo Nova.",
    images: ["acces-beige/mugs/mugs-beige2", "acces-beige/mugs/mugs-beige2", "acces-beige/mugs/mugs-beige2"],
    sizes: ["Unique"],
    colors: ["Beige", "Noir"],
    details: [
      "Céramique premium",
      "Contenance 400ml",
      "Logo Nova gravé",
      "Finition mate élégante"
    ]
  },
  22: {
    id: 22,
    title: "Mug Design",
    price: 15.99,
    image: "acces-beige/mugs/mugs-beige3",
    description: "Un mug au design contemporain pour les amateurs de style.",
    images: ["acces-beige/mugs/mugs-beige3", "acces-beige/mugs/mugs-beige3", "acces-beige/mugs/mugs-beige3"],
    sizes: ["Unique"],
    colors: ["Beige", "Noir"],
    details: [
      "Design moderne",
      "Contenance 300ml",
      "Double paroi isolante",
      "Prise en main ergonomique"
    ]
  },
  23: {
    id: 23,
    title: "Mug Premium",
    price: 19.99,
    image: "acces-beige/mugs/mugs-beige4",
    description: "Le mug haut de gamme pour les connaisseurs.",
    images: ["acces-beige/mugs/mugs-beige4", "acces-beige/mugs/mugs-beige4", "acces-beige/mugs/mugs-beige4"],
    sizes: ["Unique"],
    colors: ["Beige", "Noir"],
    details: [
      "Porcelaine fine",
      "Contenance 350ml",
      "Finition luxueuse",
      "Design exclusif"
    ]
  },
  24: {
    id: 24,
    title: "Gourde Sport",
    price: 24.99,
    image: "acces-beige/gourdes/gourdes-beige1",
    description: "Une gourde sportive et écologique pour rester hydraté.",
    images: ["acces-beige/gourdes/gourdes-beige1", "acces-beige/gourdes/gourdes-beige1", "acces-beige/gourdes/gourdes-beige1"],
    sizes: ["500ml"],
    colors: ["Beige", "Noir"],
    details: [
      "Acier inoxydable",
      "Sans BPA",
      "Double paroi isolante",
      "Bouchon sport"
    ]
  },
  25: {
    id: 25,
    title: "Gourde Isotherme",
    price: 29.99,
    image: "acces-beige/gourdes/gourdes-beige2",
    description: "Une gourde isotherme pour maintenir vos boissons à température.",
    images: ["acces-beige/gourdes/gourdes-beige2", "acces-beige/gourdes/gourdes-beige2", "acces-beige/gourdes/gourdes-beige2"],
    sizes: ["750ml"],
    colors: ["Beige", "Noir"],
    details: [
      "24h froid / 12h chaud",
      "Acier inoxydable premium",
      "Système anti-fuite",
      "Design épuré"
    ]
  },
  28: {
    id: 28,
    title: "Tote Bag Nova",
    price: 19.99,
    image: "acces-beige/sacs/sac-beige1",
    description: "Un tote bag élégant et pratique pour tous les jours.",
    images: ["acces-beige/sacs/sac-beige1", "acces-beige/sacs/sac-beige1", "acces-beige/sacs/sac-beige1"],
    sizes: ["Unique"],
    colors: ["Beige", "Noir"],
    details: [
      "Coton bio",
      "Grande capacité",
      "Anses renforcées",
      "Logo Nova brodé"
    ]
  },
  29: {
    id: 29,
    title: "Sac Shopping",
    price: 24.99,
    image: "acces-beige/sacs/sac-beige2",
    description: "Un sac shopping spacieux et résistant.",
    images: ["acces-beige/sacs/sac-beige2", "acces-beige/sacs/sac-beige2", "acces-beige/sacs/sac-beige2"],
    sizes: ["Unique"],
    colors: ["Beige", "Noir"],
    details: [
      "Toile résistante",
      "Multiples poches",
      "Fermeture zippée",
      "Design fonctionnel"
    ]
  },
  30: {
    id: 30,
    title: "Sac Week-end",
    price: 49.99,
    image: "acces-beige/sacs/sac-beige3",
    description: "Le sac parfait pour vos escapades du week-end.",
    images: ["acces-beige/sacs/sac-beige3", "acces-beige/sacs/sac-beige3", "acces-beige/sacs/sac-beige3"],
    sizes: ["Unique"],
    colors: ["Beige", "Noir"],
    details: [
      "Grande capacité",
      "Bandoulière ajustable",
      "Poches multiples",
      "Matériaux premium"
    ]
  },
  31: {
    id: 31,
    title: "Mini Sac Nova",
    price: 29.99,
    image: "acces-beige/sacs/sac-beige4",
    description: "Un mini sac tendance pour vos sorties.",
    images: ["acces-beige/sacs/sac-beige4", "acces-beige/sacs/sac-beige4", "acces-beige/sacs/sac-beige4"],
    sizes: ["Unique"],
    colors: ["Beige", "Noir"],
    details: [
      "Format compact",
      "Finitions soignées",
      "Fermeture magnétique",
      "Design élégant"
    ]
  }
};

interface ProductDetailsProps {
  id: string;
}

export default function ProductDetails({ id }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  const productId = parseInt(id);
  const product = productsDatabase[productId];

  // Fonction pour obtenir le chemin de l'image en fonction de la couleur
  const getImagePath = (isBlack: boolean) => {
    // Si l'image commence par "acces-", c'est un accessoire
    if (product.images[0].startsWith('acces-')) {
      const imageParts = product.images[0].split('/');
      const category = imageParts[1]; // mugs, gourdes, ou sacs
      
      // Extraire le numéro de base de l'image beige
      const matches = imageParts[2].match(/beige(\d+)/);
      const baseNumber = matches ? matches[1] : '1';
      
      // Gestion spéciale pour les sacs
      if (category === 'sacs') {
        return isBlack 
          ? `acces-black/sacs/sacs-black${baseNumber}`
          : `acces-beige/sacs/sac-beige${baseNumber}`;
      }
      
      // Pour les autres accessoires (mugs et gourdes)
      return isBlack 
        ? `acces-black/${category}/${category}-black${baseNumber}`
        : `acces-beige/${category}/${category}-beige${baseNumber}`;
    }
    
    // Pour les vêtements
    const baseNumber = getImageNumber(product.images[0]);
    return isBlack 
      ? `merch-black/merch-black${baseNumber}`
      : `merch/${product.images[0]}`;
  };

  // Fonction pour extraire le numéro de l'image
  const getImageNumber = (imageName: string) => {
    // Si c'est un accessoire, retourner une chaîne vide
    if (imageName.startsWith('acces-')) {
      return '';
    }
    return imageName.replace('merch', '');
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setError('Veuillez sélectionner une taille et une couleur');
      return;
    }
    
    setError('');
    
    // Gestion différente des images pour les accessoires et les vêtements
    let cartImage;
    if (product.images[0].startsWith('acces-')) {
      const imageParts = product.images[0].split('/');
      const category = imageParts[1];
      const matches = imageParts[2].match(/\d+/);
      const baseNumber = matches ? matches[0] : '1';
      
      cartImage = selectedColor === 'Noir'
        ? `acces-black/${category}/${category}-black${baseNumber}`
        : `acces-beige/${category}/${category}-beige${baseNumber}`;
    } else {
      const baseNumber = getImageNumber(product.images[0]);
      cartImage = selectedColor === 'Noir'
        ? `merch-black${baseNumber}`
        : product.images[0];
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: cartImage,
      quantity: 1,
      size: selectedSize,
      color: selectedColor
    });
  };

  useEffect(() => {
    // Initialiser la couleur par défaut à Beige
    if (!selectedColor) {
      setSelectedColor('Beige');
    }
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8F2E6] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Produit non trouvé</h1>
          <button 
            onClick={() => window.history.back()}
            className="text-[#E6AACE] hover:underline"
          >
            Retourner à la page précédente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F2E6]">
      <Header />
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Galerie d'images */}
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden flex justify-center items-center">
                <Image
                  src={`/${selectedColor === 'Noir' ? getImagePath(true) : getImagePath(false)}.png`}
                  alt={product.title}
                  width={450}
                  height={450}
                  className="hover:scale-105 transition-transform duration-300 object-contain"
                  style={{ maxHeight: '550px' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-[350px] mx-auto">
                {/* Image Beige */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`relative cursor-pointer rounded-lg overflow-hidden ${
                    selectedColor !== 'Noir' ? 'ring-2 ring-[#E6AACE]' : ''
                  }`}
                  onClick={() => setSelectedColor('Beige')}
                >
                  <div className="h-[150px] flex items-center justify-center">
                    <Image
                      src={`/${getImagePath(false)}.png`}
                      alt={`${product.title} - Beige`}
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                </motion.div>
                {/* Image Noire */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`relative cursor-pointer rounded-lg overflow-hidden ${
                    selectedColor === 'Noir' ? 'ring-2 ring-[#E6AACE]' : ''
                  }`}
                  onClick={() => setSelectedColor('Noir')}
                >
                  <div className="h-[150px] flex items-center justify-center">
                    <Image
                      src={`/${getImagePath(true)}.png`}
                      alt={`${product.title} - Noir`}
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Informations produit */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>
              <p className="text-2xl font-semibold text-[#E6AACE]">{product.price.toFixed(2)} €</p>
              <p className="text-gray-600">{product.description}</p>

              {/* Sélection taille */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Taille</h3>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`py-2 text-sm font-medium rounded-md ${
                        selectedSize === size
                          ? 'bg-[#E6AACE] text-white'
                          : 'bg-white text-gray-800 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sélection couleur */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Couleur</h3>
                <div className="grid grid-cols-3 gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`py-2 text-sm font-medium rounded-md ${
                        selectedColor === color
                          ? 'bg-[#E6AACE] text-white'
                          : 'bg-white text-gray-800 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message d'erreur */}
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              {/* Détails produit */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Détails du produit</h3>
                <ul className="list-disc pl-4 space-y-2 text-sm text-gray-600">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>

              {/* Bouton ajouter au panier */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-lg transition-colors duration-300 ${
                  !selectedSize || !selectedColor
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#E6AACE] text-white hover:bg-[#d999bc]'
                }`}
                onClick={handleAddToCart}
              >
                Ajouter au panier
              </motion.button>
            </div>
          </div>
        </div>
      </main>
    
    </div>
  );
} 