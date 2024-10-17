const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;

mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads'); // Set the GridFS collection to use
});

// Route to fetch an uploaded file by filename
const getFile = (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Stream the file content to the client
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    });
};

module.exports = { getFile };
