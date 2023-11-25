const UserModel = require("../../../models/UserModel");
const { responseReturn } = require("../../../utils/response");

// save user in db
exports.saveUser = async (req, res) => {
    const { name, email, image } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            responseReturn(res, 404, { error: 'Email already exist' })
            return res.status(403).send({ error: true, message: 'This category already exist.' })
        } else {
            await UserModel.create({
                name: name.trim(),
                email: email.trim(),
                image: image.trim()
            })
            responseReturn(res, 200, { message: 'Saved User' })
        }
    } catch (error) {
        console.log(error.message);
    }
}

// get all user
exports.getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}).sort({ createdAt: - 1 })
        res.send(users)
    } catch (error) {
        console.log(error.message);
    }
}


// check admin
exports.checkAdmin = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await UserModel.findOne({ email });
        let isAdmin = false;
        if (user) {
            isAdmin = user.role === 'admin';
            responseReturn(res, 200, { isAdmin })
        } else {
            responseReturn(res, 500, { message: 'user not found' })
        }
    } catch (error) {
        responseReturn(res, 404, { error: 'user not found' })
    }

}