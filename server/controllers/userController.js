const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const { formatResponse } = require('../utils/responseFormatter');

// Create a new user
const createUser = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(formatResponse(null, 'Validation Error', errors.array()));
    }

    const { name, socialMediaHandle } = req.body;
    const images = req.files.map(file => file.id); // Store the GridFS file ID

    try {
        const user = new User({ name, socialMediaHandle, images });
        await user.save();
        res.status(201).json(formatResponse(user));
    } catch (error) {
        res.status(500).json(formatResponse(null, 'Failed to create user', error));
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(formatResponse(users));
    } catch (error) {
        res.status(500).json(formatResponse(null, 'Failed to retrieve users', error));
    }
};

module.exports = { createUser, getAllUsers };
