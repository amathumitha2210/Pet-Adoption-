import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const CustomAlert = ({ alert }) => {
  if (!alert) return null;

  return (
    <div className="alert-container">
      <Alert variant={alert.type} className="fade-in">
        {alert.message}
      </Alert>
    </div>
  );
};

export default CustomAlert;
