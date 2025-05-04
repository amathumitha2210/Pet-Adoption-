const express = require('express');
const multer = require('multer');
const {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  adoptPet,
  filterPetsByMood,
  getPersonalityMatches
} = require('../controllers/petController');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files here
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });


// Pet routes
router.get('/', getAllPets);
router.get('/filter', filterPetsByMood);
router.get('/:id', getPetById);
router.post('/', upload.single('image'), createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);
router.patch('/:id/adopt', adoptPet);
router.post('/personality-match', getPersonalityMatches);

module.exports = router;
