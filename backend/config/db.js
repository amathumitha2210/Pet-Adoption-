const mongoose = require('mongoose');
require('dotenv').config(); // This must be first

const connectDB = async () => {
  try {
    // Check if the URI exists before attempting to connect
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // In Mongoose 6+, these options are default and no longer needed
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Database connection error:', err.message);
    // Exit with failure code
    process.exit(1);
  }
};

module.exports = connectDB;