import axios from 'axios';

const API_URL = 'http://localhost:5000/api/pets';

const api = axios.create({
  baseURL: API_URL,
});

export const getPets = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
};

export const createPet = async (data) => {
  try {
    let response;

    if (data instanceof FormData) {
      response = await api.post('/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      response = await api.post('/', data); // sends JSON
    }

    return response.data;
  } catch (error) {
    console.error('Error creating pet:', error);
    if (error.response) {
      console.error('Server responded with:', error.response.data);
    }
    throw error;
  }
};

// api/pets.js or similar
export const updatePet = async (id, petData) => {
    try {
      let response;
      if (petData instanceof FormData) {
        response = await api.put(`/${id}`, petData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await api.put(`/${id}`, petData);
      }
      return response.data;
    } catch (error) {
      console.error('Error updating pet:', error);
      throw error;
    }
  };
  

export const deletePet = async (id) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error('Error deleting pet:', error);
    throw error;
  }
};

export const adoptPet = async (id) => {
  try {
    const response = await api.patch(`/${id}/adopt`);
    return response.data;
  } catch (error) {
    console.error('Error adopting pet:', error);
    throw error;
  }
};
