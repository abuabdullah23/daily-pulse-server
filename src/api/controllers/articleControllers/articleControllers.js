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
//                 Article
// ==============================================

exports.addArticle = async (req, res) => {
    const { title, authorName, authorEmail, authorPhoto, publisher, tags, image, description } = req.body;

    try {
        await ArticleModel.create({
            title: title.trim(),
            authorName,
            authorEmail,
            authorPhoto,
            publisher,
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


// get all article
exports.getAllArticle = async (req, res) => {
    try {
        const articles = await ArticleModel.find({}).sort({ createdAt: - 1 }).populate('publisher', 'name slug image')
        res.send(articles)
    } catch (error) {
        console.log(error.message);
    }
}


// approve article
exports.approveArticle = async (req, res) => {
    const filter = req.params.id;
    const update = { articleStatus: 'approved' }

    try {
        await ArticleModel.findByIdAndUpdate(filter, update);
        responseReturn(res, 200, { message: 'Approved this article successful' })
    } catch (error) {
        responseReturn(res, 500, { error: error.message })
    }
}


// make pending article
exports.makePendingArticle = async (req, res) => {
    const filter = req.params.id;
    const update = { articleStatus: 'pending' }

    try {
        await ArticleModel.findByIdAndUpdate(filter, update);
        responseReturn(res, 200, { message: 'Pending this article successful' })
    } catch (error) {
        responseReturn(res, 500, { error: error.message })
    }
}


// make Premium article
exports.makePremiumArticle = async (req, res) => {
    const filter = req.params.id;
    const update = { isPremium: 'true' }

    try {
        await ArticleModel.findByIdAndUpdate(filter, update);
        responseReturn(res, 200, { message: 'Premium article successful' })
    } catch (error) {
        responseReturn(res, 500, { error: error.message })
    }
}


// remove Premium article
exports.removePremiumArticle = async (req, res) => {
    const filter = req.params.id;
    const update = { isPremium: 'false' }

    try {
        await ArticleModel.findByIdAndUpdate(filter, update);
        responseReturn(res, 200, { message: 'Remove Premium article.' })
    } catch (error) {
        responseReturn(res, 500, { error: error.message })
    }
}


// delete article
exports.deleteArticle = async (req, res) => {
    const articleId = req.params.id;

    try {
        await ArticleModel.findByIdAndDelete(articleId);
        responseReturn(res, 200, { message: 'Delete this article successful.' })
    } catch (error) {
        responseReturn(res, 500, { error: error.message })
    }
}


// add feedback from admin
exports.addFeedback = async (req, res) => {
    const filter = req.params.id;
    const { feedback } = req.body;

    const update = { adminFeedback: feedback, articleStatus: 'decline' }

    try {
        await ArticleModel.findByIdAndUpdate(filter, update);
        responseReturn(res, 200, { message: 'Decline this article.' })
    } catch (error) {
        responseReturn(res, 500, { error: error.message })
    }
}