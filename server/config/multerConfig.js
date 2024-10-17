const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB URI
const mongoURI = process.env.MONGODB_URI;

// Create storage engine for GridFS
const storage = new GridFsStorage({
    url: mongoURI,
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads', // The name of the collection to store files
                };
                resolve(fileInfo);
            });
        });
    },
});

const upload = multer({ storage });

module.exports = upload;
