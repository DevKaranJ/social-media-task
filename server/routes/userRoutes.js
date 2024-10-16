const express = require('express');
const upload = require('../config/multerConfig');
const { createUser, getAllUsers } = require('../controllers/userController');
const { body } = require('express-validator');

const router = express.Router();

// Validation middleware for creating a user
const validateUser = [
    body('name')
        .notEmpty()
        .withMessage('Name is required.'),
    body('socialMediaHandle')
        .notEmpty()
        .withMessage('Social Media Handle is required.'),
];

// Route for creating a new user with image uploads
router.post('/', upload.array('images', 10), validateUser, createUser); // Allows up to 10 images
// Route for getting all users
router.get('/', getAllUsers);

module.exports = router;
