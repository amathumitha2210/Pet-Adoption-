const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const petRoutes = require('./routes/petRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/pets', petRoutes);
app.use('/uploads', express.static('uploads'));

// Error handling middleware
app.use(errorHandler);

module.exports = app;