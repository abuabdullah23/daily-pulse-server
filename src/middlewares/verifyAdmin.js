const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel/UserModel');

const verifyAdmin = async (req, res, next) => {
    const token = req?.cookies?.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const userEmail  = decoded.email;

        // Find user by email in database
        const user = await UserModel.findOne({ email: userEmail });
        // console.log(user);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Check user role
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Permission denied' });
        }

        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = verifyAdmin;
