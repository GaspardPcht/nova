const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Générer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Formater la réponse utilisateur de manière cohérente
const formatUserResponse = (user) => {
  // S'assurer que createdAt existe, sinon utiliser la date actuelle
  const createdAt = user.createdAt || new Date();
  
  return {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    createdAt: createdAt.toISOString(),
    role: user.role || 'user',
    token: generateToken(user._id)
  };
};

// @desc    Authentifier un utilisateur et obtenir un token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await user.comparePassword(password)) {
      const userResponse = formatUserResponse(user);
      console.log('Login - données renvoyées:', JSON.stringify(userResponse, null, 2));
      res.json(userResponse);
    } else {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
  } catch (error) {
    console.error('Erreur de connexion:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Enregistrer un nouvel utilisateur
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
    }

    // Créer un nouvel utilisateur
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
    });

    if (user) {
      const userResponse = formatUserResponse(user);
      console.log('Register - données renvoyées:', JSON.stringify(userResponse, null, 2));
      res.status(201).json(userResponse);
    } else {
      res.status(400).json({ message: 'Données utilisateur invalides' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir le profil de l'utilisateur
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    console.log('ID utilisateur reçu:', req.user._id);
    
    const user = await User.findById(req.user._id);
    console.log('Utilisateur trouvé (brut):', JSON.stringify(user, null, 2));

    if (user) {
      // S'assurer que createdAt existe
      if (!user.createdAt) {
        user.createdAt = new Date();
        await user.save();
        console.log('Date de création ajoutée:', user.createdAt);
      }

      const userResponse = formatUserResponse(user);
      console.log('GetProfile - données renvoyées:', JSON.stringify(userResponse, null, 2));
      return res.json(userResponse);
    } else {
      console.log('Utilisateur non trouvé');
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur dans getUserProfile:', error);
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// @desc    Mettre à jour le profil de l'utilisateur
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    console.log('Données reçues pour mise à jour:', req.body);
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      console.log('Utilisateur mis à jour:', updatedUser);

      const userResponse = formatUserResponse(updatedUser);
      console.log('Réponse envoyée:', userResponse);
      res.json(userResponse);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
}; 