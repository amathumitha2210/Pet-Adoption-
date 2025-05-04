const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  species: {
    type: String,
    required: [true, 'Please provide a species'],
    enum: ['Dog', 'Cat', 'Rabbit', 'Bird', 'Hamster', 'Other'],
    default: 'Dog'
  },
  age: {
    type: Number,
    required: [true, 'Please provide an age'],
    min: [0, 'Age cannot be negative']
  },
  personality: {
    type: String,
    required: [true, 'Please provide personality traits'],
    trim: true,
    maxlength: [100, 'Personality cannot be more than 100 characters']
  },
  mood: {
    type: String,
    enum: ['Happy', 'Excited', 'Sad'],
    default: 'Happy'
  },
  adopted: {
    type: Boolean,
    default: false
  },
  adoptionDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  image: {
     type: String 
  }
});

module.exports = mongoose.model('Pet', PetSchema);