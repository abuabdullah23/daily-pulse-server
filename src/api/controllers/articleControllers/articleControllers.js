const ArticleModel = require("../../../models/ArticleModel");
const PublisherModel = require("../../../models/PublisherModel");
const { responseReturn } = require("../../../utils/response");

// for add publisher
exports.addPublisher = async (req, res) => {
    const { name, image } = req.body;
    const slug = name.trim().split(' ').join('-').toLowerCase();

    try {
        const publisher = await PublisherModel.findOne({ name })
        // console.log(publisher);
        if (!publisher) {
            await PublisherModel.create({
                name: name.trim(),
                image: image.trim(),
                slug
            });
            responseReturn(res, 200, { message: 'Publisher added successful' })
        } else {
            // TODO: it cant sent to client side
            responseReturn(res, 500, { error: 'publisher already exist' })
        }
    } catch (error) {
        responseReturn(res, 500, { error: error.message })
    }
}


// get all publisher
exports.getAllPublisher = async (req, res) => {
    try {
        const publishers = await PublisherModel.find({}).sort({ createdAt: - 1 })
        res.send(publishers)
    } catch (error) {
        console.log(error.message);
    }
}


// delete Publisher
exports.deletePublisher = async (req, res) => {
    const publisherId = req.params.id;

    try {
        await PublisherModel.findByIdAndDelete(publisherId);
        responseReturn(res, 200, { message: 'Publisher delete successful' })
    } catch (error) {
        responseReturn(res, 500, { error: error.message })
    }
}



// ==============================================
//                 Article add
// ==============================================

exports.addArticle = async (req, res) => {
    const { title, userName, userEmail, userPhoto, publisher, isPremium, tags, image, description } = req.body;

    try {
        await ArticleModel.create({
            title: title.trim(),
            userName,
            userEmail,
            userPhoto,
            publisher,
            isPremium,
            tags,
            image,
            description
        })
        responseReturn(res, 200, { message: 'Article added successful' })

    } catch (error) {
        console.log(error);
        responseReturn(res, 500, { error: error.message })
    }
}
