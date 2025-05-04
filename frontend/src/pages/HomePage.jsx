import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import PetList from '../components/PetList';
import FilterBar from '../components/FilterBar';
import PersonalityQuiz from '../components/PersonalityQuiz';
import MoodNotification from '../components/MoodNotification';
import Confetti from '../components/Confetti';
import AdoptionCertificate from '../components/AdoptionCertificate';

const HomePage = ({ showAlert }) => {
  const { 
    pets, 
    filteredPets, 
    loading, 
    handleAdopt, 
    filterByMood, 
    fetchPets,
    notifications,
    removeNotification
  } = usePets();
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [certificatePet, setCertificatePet] = useState(null);
  const navigate = useNavigate();

  const handleAdoption = async (id) => {
    try {
      const adoptedPet = await handleAdopt(id);
      showAlert(`${adoptedPet.name} has been adopted!`, 'success');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setCertificatePet(adoptedPet);
      fetchPets(); // Refresh the pet list
    } catch (error) {
      showAlert('Failed to adopt pet', 'danger');
    }
  };

  const handleQuizComplete = (pet) => {
    navigate('/');
    // You could add scrolling to the pet here if needed
  };

  return (
    <div className="home-page">
      {showConfetti && <Confetti />}
      
      {certificatePet && (
        <AdoptionCertificate 
          pet={certificatePet} 
          show={true} 
          onHide={() => setCertificatePet(null)} 
        />
      )}

      <div className="notifications-container">
        {notifications.map(notification => (
          <MoodNotification
            key={notification.id}
            pet={notification.pet}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Available Pets</h1>
        <div>
          <PersonalityQuiz 
            pets={pets.filter(p => !p.adopted)} 
            onComplete={handleQuizComplete} 
            className="me-2"
          />
          <button
            className="btn btn-primary ms-2"
            onClick={() => navigate('/manage')}
          >
            Manage Pets
          </button>
        </div>
      </div>

      <FilterBar onFilter={filterByMood} />

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <PetList 
          pets={filteredPets.filter(pet => !pet.adopted)} 
          onAdopt={handleAdoption} 
        />
      )}
    </div>
  );
};

export default HomePage;