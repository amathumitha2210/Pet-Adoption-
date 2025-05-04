import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const AddPetForm = ({ onSubmit, onCancel }) => {
  const [petData, setPetData] = useState({
    name: '',
    species: 'Dog',
    age: '',
    personality: '',
    mood: 'Happy'
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!petData.name.trim()) newErrors.name = 'Name is required';
    if (!petData.age) newErrors.age = 'Age is required';
    if (!petData.personality.trim()) newErrors.personality = 'Personality is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (imageFile) {
      const formData = new FormData();
      Object.entries(petData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('image', imageFile);

      // Debug log
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      onSubmit(formData);
    } else {
      onSubmit(petData);
    }
  };

  return (
    <Modal show={true} onHide={onCancel} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Pet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={petData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Species</Form.Label>
            <Form.Select
              name="species"
              value={petData.species}
              onChange={handleChange}
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age *</Form.Label>
            <Form.Control
              type="number"
              name="age"
              min="0"
              value={petData.age}
              onChange={handleChange}
              isInvalid={!!errors.age}
            />
            <Form.Control.Feedback type="invalid">
              {errors.age}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Personality *</Form.Label>
            <Form.Control
              type="text"
              name="personality"
              value={petData.personality}
              onChange={handleChange}
              isInvalid={!!errors.personality}
            />
            <Form.Control.Feedback type="invalid">
              {errors.personality}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mood</Form.Label>
            <Form.Select
              name="mood"
              value={petData.mood}
              onChange={handleChange}
            >
              <option value="Happy">Happy</option>
              <option value="Excited">Excited</option>
              <option value="Sad">Sad</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Pet Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {previewImage && (
              <div className="mt-3 text-center">
                <img 
                type="file"
                  src={previewImage} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '200px', 
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }} 
                />
                <p className="text-muted mt-1">Image Preview</p>
              </div>
            )}
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={onCancel} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Pet
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPetForm;
