const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const connectDB = require('./db');

// Charger les variables d'environnement
dotenv.config();

// Connecter à MongoDB
connectDB();

// Données initiales
const users = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@nova.fr',
    password: 'admin123',
    isAdmin: true,
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false,
  },
];

// Importer les données
const importData = async () => {
  try {
    // Supprimer les données existantes
    await User.deleteMany();

    // Créer les utilisateurs
    await User.insertMany(users);

    console.log('Données importées avec succès !');
    process.exit();
  } catch (error) {
    console.error(`Erreur: ${error.message}`);
    process.exit(1);
  }
};

// Supprimer les données
const destroyData = async () => {
  try {
    // Supprimer les données existantes
    await User.deleteMany();

    console.log('Données supprimées avec succès !');
    process.exit();
  } catch (error) {
    console.error(`Erreur: ${error.message}`);
    process.exit(1);
  }
};

// Exécuter le script en fonction de l'argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 