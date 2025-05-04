import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import AddPetForm from '../components/AddPetForm';
import EditPetForm from '../components/EditPetForm';
import PetList from '../components/PetList';

const PetManagementPage = ({ showAlert }) => {
  const {
    pets,
    loading,
    addPet,
    editPet,
    removePet,
    fetchPets,
  } = usePets();

  const [editingPet, setEditingPet] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  // Fetch pets on mount — moods will be as stored in DB
  useEffect(() => {
    fetchPets(); // make sure fetchPets returns exact mood from DB
  }, [fetchPets]);

  const handleAddPet = async (petData) => {
    try {
      await addPet(petData); // addPet should not modify mood manually
      showAlert('Pet added successfully!', 'success');
      setShowAddForm(false);
    } catch (error) {
      console.error('Add pet error:', error);
      showAlert('Failed to add pet', 'danger');
    }
  };

  const handleEditPet = async (petData) => {
    try {
      if (!editingPet || !editingPet.id) {
        throw new Error('Invalid pet selected for editing.');
      }
      await editPet(editingPet.id, petData); // again, no mood manipulation
      showAlert('Pet updated successfully!', 'success');
      setEditingPet(null);
    } catch (error) {
      console.error('Edit pet error:', error);
      showAlert('Failed to update pet', 'danger');
    }
  };

  const handleDeletePet = async (id) => {
    try {
      await removePet(id);
      showAlert('Pet deleted successfully!', 'success');
    } catch (error) {
      console.error('Delete pet error:', error);
      showAlert('Failed to delete pet', 'danger');
    }
  };

  return (
    <div className="management-page container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Pet Management</h1>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>

      {!showAddForm && !editingPet && (
        <button
          className="btn btn-primary mb-4"
          onClick={() => setShowAddForm(true)}
        >
          Add New Pet
        </button>
      )}

      {showAddForm && (
        <AddPetForm
          onSubmit={handleAddPet}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingPet && (
        <EditPetForm
          pet={editingPet}
          onSubmit={handleEditPet}
          onCancel={() => setEditingPet(null)}
        />
      )}

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <PetList
          pets={pets}
          onEdit={(pet) => setEditingPet(pet)}
          onDelete={handleDeletePet}
          isManagement={true}
        />
      )}
    </div>
  );
};

export default PetManagementPage;
