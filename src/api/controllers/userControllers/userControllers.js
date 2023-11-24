const UserModel = require("../../../models/UserModel/UserModel");
const { responseReturn } = require("../../../utils/response");

// save user in db
exports.saveUser = async (req, res) => {
    const { name, email, image } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            responseReturn(res, 404, { error: 'Email already exist' })
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