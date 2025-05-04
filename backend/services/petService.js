const Pet = require('../models/Pet');
const { calculateMood } = require('../utils/moodLogic');


const getAllPets = async () => {
  const pets = await Pet.find();
  return pets.map(pet => updatePetMood(pet));
};

// Get pet by ID
const getPetById = async (id) => {
  const pet = await Pet.findById(id);
  return pet ? updatePetMood(pet) : null;
};

// Create a new pet
const createPet = async (petData) => {
  const pet = new Pet(petData);
  await pet.save();
  return pet;
};

const updatePet = async (id, updateData) => {
  try {
    
    const pet = await Pet.findByIdAndUpdate(id, updateData, { new: true });

    if (!pet) {
      return null;  // If pet is not found, return null
    }

    return updatePetMood(pet);  
  } catch (error) {
    console.error('Error updating pet:', error);
    throw error; 
  }
};




// Delete a pet
const deletePet = async (id) => {
  return await Pet.findByIdAndDelete(id);
};

// Adopt a pet
const adoptPet = async (id) => {
  const pet = await Pet.findByIdAndUpdate(
    id,
    { adopted: true, adoptionDate: Date.now() },
    { new: true }
  );
  return pet ? updatePetMood(pet) : null;
};

// Filter pets by mood
const filterPetsByMood = async (mood) => {
  const pets = await Pet.find();
  return pets
    .map(pet => updatePetMood(pet))
    .filter(pet => pet.mood === mood);
};

// Personality match quiz
const getPersonalityMatches = async (answers) => {
  const pets = await Pet.find({ adopted: false });
  const updatedPets = pets.map(pet => updatePetMood(pet));
  
  // Simple matching algorithm - in a real app this would be more sophisticated
  return updatedPets.filter(pet => 
    answers.some(answer => pet.personality.toLowerCase().includes(answer.toLowerCase()))
    .slice(0, 3)); // Return top 3 matches
};

// Helper function to update pet's mood based on time in system
const updatePetMood = (pet) => {
  const mood = calculateMood(pet.createdAt);
  if (pet.mood !== mood) {
    pet.mood = mood;
    pet.save();
  }
  return pet;
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
