const Admin = require('../models/adminModel');

const authAdmin = async (req, res, next) => {
    const { username, password } = req.headers;

    try {
        const admin = await Admin.findOne({ username });

        // Validate credentials
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
