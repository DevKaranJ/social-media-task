const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    socialMediaHandle: { type: String, required: true },
    images: [{ type: String, required: true }], // Array to store image paths
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// User model
const User = mongoose.model('User', userSchema);
module.exports = User;
