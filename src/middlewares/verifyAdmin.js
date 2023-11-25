const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const verifyAdmin = async (req, res, next) => {
    const authorization = req.headers.authorization;
   
    if (!authorization) {
        return res
            .status(401)
            .send({ error: true, message: 'Unauthorized Access' })
    }
    const token = authorization.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            return res
                .status(401)
                .send({ error: true, message: 'Unauthorized Access' })
        }
        req.decoded = decoded;
    })

    const email = req.decoded.email;

    try {
        const user = await UserModel.findOne({ email });
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
        return res.status(403).json({ error: 'Unauthorized' });
    }
};

module.exports = verifyAdmin;