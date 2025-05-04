import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const MoodNotification = ({ pet, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Alert variant="warning" dismissible onClose={onClose} className="fade-in">
      <Alert.Heading>{pet.name} is feeling sad!</Alert.Heading>
      <p>
        {pet.name} has been waiting for adoption. 
        Consider giving {pet.name.toLowerCase()} a loving home!
      </p>
    </Alert>
  );
};

export default MoodNotification;
