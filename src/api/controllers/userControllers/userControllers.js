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

// get all user: for pagination: ?pageNumber=1&perPage=2
exports.getUsers = async (req, res) => {
    // pagination
    const pageNumber = Number(req.query.pageNumber);
    const perPage = Number(req.query.perPage);
    const skipPage = (pageNumber - 1) * perPage;

    try {
        const total = await UserModel.find({}).countDocuments();
        const result = await UserModel.find({}).sort({ createdAt: - 1 }).skip(skipPage).limit(perPage)
        res.send({ total, result })
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


// check premium user
exports.checkPremiumUser = async (req, res) => {
    const { email } = req.params;
    // console.log(email);

    try {
        const user = await UserModel.findOne({ email });
        const userId = user?._id;
        let isPremiumUser = false;
        if (user) {
            isPremiumUser = user.isPremium === true;
            responseReturn(res, 200, { isPremiumUser })
            // console.log(isPremiumUser);
        } else {
            responseReturn(res, 500, { message: 'user not found' })
        }

        // console.log(user?.isPremium);

        // premium user to normal user after subscription period
        if (user && user.isPremium && user.expiresPremium) {
            const currentTime = new Date();
            const expiresPremiumTime = new Date(user.expiresPremium);

            if (currentTime > expiresPremiumTime) {
                await UserModel.findByIdAndUpdate(userId, {
                    $set: {
                        isPremium: false,
                        takenPremium: null,
                        expiresPremium: null,
                    },
                });
            }
        }
        // else {
        //     console.log('User Not Found');
        // }

    } catch (error) {
        responseReturn(res, 404, { error: 'user not found' })
    }
}


// delete user
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    try {
        await UserModel.findByIdAndDelete(userId);
        responseReturn(res, 200, { message: 'User delete successful' })
    } catch (error) {
        responseReturn(res, 500, { error: error.message })
    }
}


// Make Admin
exports.makeAdmin = async (req, res) => {
    const filter = req.params.id;
    const update = { role: 'admin' }

    try {
        await UserModel.findByIdAndUpdate(filter, update);
        responseReturn(res, 200, { message: 'Make Admin successful' })
    } catch (error) {
        responseReturn(res, 500, { error: error.message })
    }
}


// Remove Admin
exports.removeAdmin = async (req, res) => {
    const filter = req.params.id;
    const update = { role: 'user' }

    try {
        await UserModel.findByIdAndUpdate(filter, update);
        responseReturn(res, 200, { message: 'Remove Admin successful' })
    } catch (error) {
        responseReturn(res, 500, { error: error.message })
    }
}


// get single user from db
exports.getSingleUserDetails = async (req, res) => {
    const { email } = req.params;
    // console.log(email);
    try {
        const result = await UserModel.findOne({ email });
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
}

// update user profile
exports.updateUserProfile = async (req, res) => {
    const userId = req.params.id;
    const { yourName, imgUrl } = req.body;

    try {
        await UserModel.findByIdAndUpdate(userId, {
            name: yourName,
            image: imgUrl
        })
        responseReturn(res, 200, { message: 'Update your profile successful' })
    } catch (error) {
        responseReturn(res, 500, { error: error.message })
    }

}


// user count method
exports.userCount = async (req, res) => {
    const filterAdmin = { role: 'admin' }
    const filterPremiumUser = { isPremium: true }
    const filterUser = { role: 'user' }

    try {
        const totalAdmin = await UserModel.find(filterAdmin).countDocuments();
        const totalPremiumUser = await UserModel.find(filterPremiumUser).countDocuments();
        const onlyUser = await UserModel.find(filterUser).countDocuments();
        const totalUser = await UserModel.find({}).countDocuments();
        res.send({ totalAdmin, totalPremiumUser, onlyUser, totalUser })
    } catch (error) {
        console.log(error.message);
    }
}