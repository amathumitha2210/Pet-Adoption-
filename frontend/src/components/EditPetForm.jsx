import { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const EditPetForm = ({ pet, onSubmit, onCancel }) => {
  const [petData, setPetData] = useState({
    id: '',
    name: '',
    species: 'Dog',
    age: '',
    personality: '',
  });

  useEffect(() => {
    if (pet) {
      setPetData({
        id: pet._id || '', // Make sure _id exists
        name: pet.name || '',
        species: pet.species || 'Dog',
        age: pet.age || '',
        personality: pet.personality || '',
      });
    }
  }, [pet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value, 10) || '' : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!petData.id) {
      console.error('Pet ID is missing');
      return;
    }

    onSubmit(petData);
  };

  return (
    <Modal show={true} onHide={onCancel} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Pet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={petData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Species</Form.Label>
            <Form.Select
              name="species"
              value={petData.species}
              onChange={handleChange}
              required
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              min="0"
              value={petData.age}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Personality</Form.Label>
            <Form.Control
              type="text"
              name="personality"
              value={petData.personality}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onCancel} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPetForm;
