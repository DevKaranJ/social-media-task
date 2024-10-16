const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel'); // Adjust the path if needed
const Admin = require('./models/adminModel'); // Import the admin model
const path = require('path');

dotenv.config();

// Sample data for users
const users = [
    {
        name: 'John Doe',
        socialMediaHandle: '@john_doe',
        images: [
            path.join(__dirname, 'uploads', 'image1.jpg'), // Adjust image names as per your uploads
            path.join(__dirname, 'uploads', 'image2.jpg'),
        ],
    },
    {
        name: 'Jane Smith',
        socialMediaHandle: '@jane_smith',
        images: [
            path.join(__dirname, 'uploads', 'image3.jpg'),
        ],
    },
    {
        name: 'Alice Johnson',
        socialMediaHandle: '@alice_johnson',
        images: [
            path.join(__dirname, 'uploads', 'image4.jpg'),
            path.join(__dirname, 'uploads', 'image5.jpg'),
        ],
    },
];

// Sample data for admin
const admin = {
    username: 'admin',
    password: 'admin123', // In a real application, make sure to hash the password
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
    
    // Clear existing data
    await User.deleteMany({});
    await Admin.deleteMany({}); // Clear existing admin data

    // Create demo users
    await User.insertMany(users);
    
    // Create demo admin
    await Admin.create(admin);
    
    console.log('Database seeded with demo users and an admin.');
    process.exit(); // Exit the process
};

seedDatabase();
