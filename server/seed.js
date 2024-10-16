const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/adminModel');

dotenv.config();

// Sample data for admin
const admin = {
    username: 'admin',
    password: 'admin123',
};

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

const seedDatabase = async () => {
    await connectDB();
    
    // Clear existing admin data
    await Admin.deleteMany({}); 

    // Create demo admin
    await Admin.create(admin);
    
    console.log('Database seeded with admin.');
    process.exit(); // Exit the process
};

seedDatabase();
