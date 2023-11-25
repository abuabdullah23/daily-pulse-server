const generateToken = require("../../../utils/generateToken");

const createAuthJWT = async (req, res) => {
    const user = req.body;
    const token = generateToken(user);
    res.send({ token });
}

module.exports = createAuthJWT;