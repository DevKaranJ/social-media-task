const express = require('express');
const { getFile } = require('../controllers/fileController');
const router = express.Router();

// Route for fetching a file
router.get('/:filename', getFile);

module.exports = router;
