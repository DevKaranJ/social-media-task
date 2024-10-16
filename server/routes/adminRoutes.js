const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/adminController');
const authAdmin = require('../middleware/auth');

const router = express.Router();

// Route for getting all users (admin only)
router.get('/', authAdmin, getAllUsers);

// Route for deleting a user by ID (admin only)
router.delete('/:id', authAdmin, deleteUser);

module.exports = router;
