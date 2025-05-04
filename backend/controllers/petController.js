const Pet = require('../models/Pet');
const petService = require('../services/petService');
const moment = require('moment'); 
const { generateAdoptionCertificate } = require('../utils/pdfGenerator');

const calculateMood = (createdAt) => {
  const now = moment();
  const createdDate = moment(createdAt);

  const daysInSystem = now.diff(createdDate, 'days'); // Calculate difference in days

  if (daysInSystem < 1) {
    return 'Happy';
  } else if (daysInSystem <= 3) {
    return 'Excited';
  } else {
    return 'Sad';
  }
};

// Get all pets
const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();  // Fetch all pets from the database
    const petsWithMood = pets.map(pet => ({
      ...pet.toObject(),  // Convert mongoose doc to plain object
      mood: calculateMood(pet.createdAt),  // Add dynamic mood
    }));

    res.json(petsWithMood);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pets', error });
  }
};


// Get pet by ID
const getPetById = async (req, res, next) => {
  try {
    const pet = await petService.getPetById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (err) {
    next(err);
  }
};

// Create a new pet
// Create a new pet
const createPet = async (req, res, next) => {
  try {
    const { name, age, species,personality } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newPet = await petService.createPet({
      name,
      age,
      species,
      
      personality,
      image: imageUrl // save image path
    });

    res.status(201).json(newPet);
  } catch (err) {
    next(err);
  }
};


// Update a pet
const updatePet = async (req, res, next) => {
  try {
    const updatedPet = await petService.updatePet(req.params.id, req.body);
    if (!updatedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(updatedPet);
  } catch (err) {
    next(err);
  }
};

// Delete a pet
const deletePet = async (req, res, next) => {
  try {
    const deletedPet = await petService.deletePet(req.params.id);
    if (!deletedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json({ message: 'Pet deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Adopt a pet
const adoptPet = async (req, res, next) => {
  try {
    const adoptedPet = await petService.adoptPet(req.params.id);
    if (!adoptedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    // Generate adoption certificate
    const certificate = await generateAdoptionCertificate(adoptedPet);
    
    res.json({
      pet: adoptedPet,
      certificate: certificate.toString('base64')
    });
  } catch (err) {
    next(err);
  }
};

// Filter pets by mood
const filterPetsByMood = async (req, res, next) => {
  try {
    const pets = await petService.filterPetsByMood(req.query.mood);
    res.json(pets);
  } catch (err) {
    next(err);
  }
};

// Personality match quiz
const getPersonalityMatches = async (req, res, next) => {
  try {
    const matches = await petService.getPersonalityMatches(req.body.answers);
    res.json(matches);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  adoptPet,
  filterPetsByMood,
  getPersonalityMatches
};