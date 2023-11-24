const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = async (req, res, next) => {
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized access' })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        // error
        if (err) {
            return res.status(401).send({ message: 'Unauthorized access' })
        }

        // decoded
        req.user = decoded;
        next();
    })
}

module.exports = verifyJWT;
