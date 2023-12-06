const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const verifyPremium = async (req, res, next) => {
    const authorization = req.headers.authorization;
    // console.log('from home:', authorization);

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

    const email = req?.decoded?.email;
    // console.log(req.decoded);
    // console.log(email);

    try {
        // stored user information in req.user after authentication
        const user = await UserModel.findOne({ email });
        const userId = user?._id;
        // console.log(user.isPremium);
        // console.log(user.expiresPremium);
        // console.log(user.takenPremium);

        if (user && user.isPremium && user.expiresPremium) {
            const currentTime = new Date();
            const expiresPremiumTime = new Date(user.expiresPremium);

            // console.log(currentTime);
            // console.log(expiresPremiumTime);

            if (currentTime > expiresPremiumTime) {
                // User's premium period has ended, update premium properties to null
                await UserModel.findByIdAndUpdate(userId, {
                    $set: {
                        isPremium: false,
                        takenPremium: null,
                        expiresPremium: null
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error checking premium status:', error);
    }

    next();

};

module.exports = verifyPremium;