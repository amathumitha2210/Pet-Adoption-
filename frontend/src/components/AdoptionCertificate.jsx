import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const AdoptionCertificate = ({ pet, show, onHide }) => {
  console.log("Pet Data Received in Modal: ", pet); 

  if (!pet) return null;  

  const adoptionDate = new Date().toLocaleDateString();

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Adoption Certificate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="certificate p-4 border">
          <div className="text-center mb-4">
            <h2>Adoption Certificate</h2>
            <p className="lead">This certifies that</p>
            <h3 className="display-4">{pet.name}</h3>
            <p className="lead">has found a loving forever home!</p>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <p><strong>Species:</strong> {pet.species}</p>
              <p><strong>Age:</strong> {pet.age} years</p>
              <p><strong>Personality:</strong> {pet.personality}</p>
            </div>
            <div className="col-md-6 text-end">
              <p><strong>Adoption Date:</strong> {adoptionDate}</p>
              <div className="mt-5">
                <p>_________________________</p>
                <p className="mb-0">Virtual Pet Adoption Center</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <small className="text-muted">
              Thank you for giving {pet.name} a second chance at happiness!
            </small>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={() => window.print()}>
          Print Certificate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdoptionCertificate;
