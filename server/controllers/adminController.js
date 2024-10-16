const User = require('../models/userModel');
const { formatResponse } = require('../utils/responseFormatter');

// Get all users (admin function)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(formatResponse(users));
    } catch (error) {
        res.status(500).json(formatResponse(null, 'Failed to retrieve users', error));
    }
};

// Delete a user by ID (admin function)
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json(formatResponse(null, 'User not found'));
        }
        res.status(200).json(formatResponse(null, 'User deleted successfully'));
    } catch (error) {
        res.status(500).json(formatResponse(null, 'Failed to delete user', error));
    }
};

module.exports = { getAllUsers, deleteUser };
