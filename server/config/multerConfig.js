const multer = require('multer');

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for uploads
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename with timestamp
    },
});

// Multer upload instance
const upload = multer({ storage });

module.exports = upload;
