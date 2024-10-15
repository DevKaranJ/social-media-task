const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json
app.use('/api/users', userRoutes); // User-related routes
app.use(errorHandler); // Error handling middleware

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
