const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const path = require('path');
const Admin = require('./models/adminModel');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // For parsing application/json

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure admin user exists
const admin = {
    username: 'admin',
    password: 'admin123', // In a real application, we can hash the password
};

const ensureAdminExists = async () => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const newAdmin = new Admin(admin);
            await newAdmin.save();
            console.log('Admin user created.');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (error) {
        console.error('Error ensuring admin user:', error);
    }
};

ensureAdminExists(); // Call the function to ensure the admin exists if not it can create demo admin 

// Routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/admin', adminRoutes); // Admin-related route
app.use(errorHandler); // Error handling middleware

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
