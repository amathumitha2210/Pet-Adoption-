import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getPets, createPet, updatePet, deletePet, adoptPet } from '../services/api';
import moment from 'moment'; 

const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPets, setFilteredPets] = useState([]);
  const [moodFilter, setMoodFilter] = useState('all');
  const [notifications, setNotifications] = useState([]);

  const normalizePet = (pet) => {
    
    const now = moment();
    const createdDate = moment(pet.createdAt);
    const daysInSystem = now.diff(createdDate, 'days');

    let mood = 'Happy'; 
    if (daysInSystem < 1) mood = 'Happy';
    else if (daysInSystem <= 3) mood = 'Excited';
    else mood = 'Sad';

    return {
      ...pet,
      id: pet.id || pet._id, 
      imageUrl: pet.imageUrl || '/default-pet.jpg',
      mood: mood, 
    };
  };

  const fetchPets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPets();
      const petsWithImages = data.map(normalizePet);
      setPets(petsWithImages);
      setFilteredPets(petsWithImages);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  useEffect(() => {
    const checkForSadPets = () => {
      const sadPets = pets.filter(
        (pet) =>
          pet.mood.toLowerCase() === 'sad' &&
          !pet.adopted &&
          !notifications.some((n) => n.id === pet.id)
      );

      if (sadPets.length > 0) {
        const newNotifications = sadPets.map((pet) => ({
          id: pet.id,
          pet,
          timestamp: Date.now(),
        }));
        setNotifications((prev) => [...prev, ...newNotifications]);
      }
    };

    if (pets.length > 0) checkForSadPets();
  }, [pets, notifications]);

  useEffect(() => {
    if (moodFilter === 'all') {
      setFilteredPets(pets);
    } else {
      setFilteredPets(
        pets.filter(
          (pet) => pet.mood?.toLowerCase() === moodFilter.toLowerCase()
        )
      );
    }
  }, [moodFilter, pets]);

  const addPet = async (formData) => {
    try {
      const newPet = await createPet(formData);
      const petWithImage = normalizePet(newPet);
      setPets((prev) => [...prev, petWithImage]);
      return petWithImage;
    } catch (error) {
      console.error('Error adding pet:', error);
      throw error;
    }
  };

  const editPet = async (id, petData) => {
    try {
      const updatedPet = await updatePet(id, petData);
      const petWithImage = normalizePet(updatedPet);
      setPets((prev) =>
        prev.map((pet) => (pet.id === id ? petWithImage : pet))
      );
      return petWithImage;
    } catch (error) {
      console.error('Failed to edit pet in context:', error);
      throw error;
    }
  };

  const removePet = async (id) => {
    try {
      await deletePet(id);
      setPets((prev) => prev.filter((pet) => pet.id !== id));
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error('Error deleting pet:', error);
      throw error;
    }
  };

  const handleAdopt = async (id) => {
    try {
      const adoptedPet = await adoptPet(id);
      const petWithImage = normalizePet(adoptedPet);
      setPets((prev) =>
        prev.map((pet) => (pet.id === id ? petWithImage : pet))
      );
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      return petWithImage;
    } catch (error) {
      console.error('Error adopting pet:', error);
      throw error;
    }
  };

  const filterByMood = (mood) => setMoodFilter(mood);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getAvailablePets = () => pets.filter((pet) => !pet.adopted);

  const getPetById = (id) => pets.find((pet) => pet.id === id);

  return (
    <PetContext.Provider
      value={{
        pets,
        filteredPets,
        loading,
        notifications,
        moodFilter,
        addPet,
        editPet,
        removePet,
        handleAdopt,
        filterByMood,
        fetchPets,
        removeNotification,
        getAvailablePets,
        getPetById,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePets = () => useContext(PetContext);
