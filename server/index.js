const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const path = require('path');
const Admin = require('./models/adminModel');
const fileRoutes = require('./routes/fileRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
// Configure CORS
app.use(cors({
    origin: 'https://social-media-task-git-dev-devkaranjs-projects.vercel.app', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true // Enable credentials if needed
}));
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

ensureAdminExists(); // Call the function to ensure the admin exists

// Routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/admin', adminRoutes); // Admin-related routes
app.use('/api/files', fileRoutes); // File-related routes
app.use(errorHandler); // Error handling middleware

// Custom CORS Error Handling Middleware
app.use((err, req, res, next) => {
    if (err.name === 'CorsError') {
        res.status(400).json({ message: 'CORS error: Access to this resource is restricted.' });
    } else {
        next(err);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
