const Admin = require('../models/adminModel');

const authAdmin = async (req, res, next) => {
    // Retrieve username and password from headers
    const { username, password } = req.headers;

    try {
        // Find the admin by username
        const admin = await Admin.findOne({ username });

        // Check if the admin exists and the password matches
        if (admin && admin.password === password) {
            next(); // Proceed to the next middleware or route
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Authentication failed", error });
    }
};

module.exports = authAdmin;
