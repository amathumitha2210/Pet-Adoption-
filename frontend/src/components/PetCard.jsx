import { FaDog, FaCat, FaHeart, FaEdit, FaTrash } from 'react-icons/fa';
import { GiRabbit, GiHummingbird } from 'react-icons/gi';
import { BsEmojiSmile, BsEmojiFrown, BsEmojiAngry } from 'react-icons/bs';

const PetCard = ({ pet, onAdopt, onEdit, onDelete, isManagement = false }) => {
  // Get the species icon based on the species of the pet
  const getSpeciesIcon = () => {
    switch (pet.species.toLowerCase()) {
      case 'dog': return <FaDog className="me-2" />;
      case 'cat': return <FaCat className="me-2" />;
      case 'rabbit': return <GiRabbit className="me-2" />;
      case 'bird': return <GiHummingbird className="me-2" />;
      default: return <FaDog className="me-2" />;
    }
  };

  // Get the mood badge with appropriate icon and color
  const getMoodBadge = () => {
    const mood = pet.mood.toLowerCase();
    let icon, badgeClass;
    
    switch (mood) {
      case 'happy':
        icon = <BsEmojiSmile />;
        badgeClass = 'bg-success';
        break;
      case 'excited':
        icon = <BsEmojiAngry />;
        badgeClass = 'bg-warning';
        break;
      case 'sad':
        icon = <BsEmojiFrown />;
        badgeClass = 'bg-danger';
        break;
      default:
        icon = <BsEmojiSmile />;
        badgeClass = 'bg-secondary';
    }

    return (
      <span className={`badge ${badgeClass} d-flex align-items-center`}>
        {icon}
        <span className="ms-1">{pet.mood}</span>
      </span>
    );
  };

  return (
    <div className="card mb-3 shadow-sm h-100">
      <div className="card-img-top" style={{ height: '200px', overflow: 'hidden' }}>
        {/* Use the full image URL for the pet */}
        <img
          src={`http://localhost:5000${pet.image}`}  // Ensure the image path is complete with the base URL
          alt={pet.name}
          className="w-100 h-100"
          style={{ 
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          //onError={(e) => e.target.src = 'https://via.placeholder.com/200'}  // Placeholder if image fails to load
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 className="card-title mb-1">
              {getSpeciesIcon()}
              {pet.name}
            </h5>
            <h6 className="card-subtitle text-muted">
              {pet.species}, {pet.age} years
            </h6>
          </div>
          <div>
            {getMoodBadge()}
          </div>
        </div>
        <p className="card-text mb-3">
          <small className="text-muted">Personality: {pet.personality}</small>
        </p>
        <div className="mt-auto d-flex justify-content-between align-items-end">
          {pet.adopted ? (
            <span className="badge bg-success">Adopted</span>
          ) : (
            <>
              {!isManagement && (
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => onAdopt(pet.id)}
                >
                  <FaHeart className="me-1" />
                  Adopt
                </button>
              )}
              {isManagement && (
                <div>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => onEdit(pet)}
                  >
                    <FaEdit className="me-1" />
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(pet.id)}
                  >
                    <FaTrash className="me-1" />
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCard;
