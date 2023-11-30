const ArticleModel = require("../../../models/ArticleModel");
const PublisherModel = require("../../../models/PublisherModel");
const UserModel = require("../../../models/UserModel");
const queryArticles = require("../../../utils/queryArticles");
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





// ============================================================== 
//              ARTICLE CRUD OPERATION for AUTHOR
// ============================================================== 

// Add article
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
            description: description.trim()
        })
        responseReturn(res, 200, { message: 'Article added successful' })

    } catch (error) {
        console.log(error);
        responseReturn(res, 500, { error: error.message })
    }
}


// get all article for author
exports.getMyArticle = async (req, res) => {
    const { email } = req.params;

    try {
        const total = await ArticleModel.find({ authorEmail: email }).countDocuments();
        const result = await ArticleModel.find({ authorEmail: email }).sort({ createdAt: - 1 }).populate('publisher', 'name slug image')
        res.send({ total, result })
    } catch (error) {
        console.log(error.message);
    }
}


// Update article
exports.updateArticle = async (req, res) => {
    const { title, authorName, authorEmail, authorPhoto, publisher, tags, image, description } = req.body;
    const id = req.params.id;

    try {
        await ArticleModel.findByIdAndUpdate(id, {
            title: title.trim(),
            authorName,
            authorEmail,
            authorPhoto,
            publisher,
            tags,
            image,
            description: description.trim()
        })
        responseReturn(res, 200, { message: 'Article Updated successful' })

    } catch (error) {
        console.log(error);
        responseReturn(res, 500, { error: error.message })
    }
}


// delete my article
exports.deleteMyArticle = async (req, res) => {
    const articleId = req.params.id;

    try {
        await ArticleModel.findByIdAndDelete(articleId);
        responseReturn(res, 200, { message: 'Delete this article successful.' })
    } catch (error) {
        responseReturn(res, 500, { error: error.message })
    }
}


// view single article for all user
exports.viewSingleArticle = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await ArticleModel.findById(id).populate('publisher', 'name');
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
}


// get author article details : only author view his own article
exports.authorArticleDetails = async (req, res) => {
    const articleId = req.params.id;

    // requested user email
    const { email } = req.query;

    // console.log(email);
    // console.log(articleId);

    try {
        const article = await ArticleModel.findById(articleId);

        // for check user admin or not
        const user = await UserModel.findOne({ email });
        const role = user?.role;

        // console.log(email, role, article.authorEmail);

        if (email === article?.authorEmail || role === 'admin') {
            const result = await ArticleModel.findById(articleId).populate('publisher')
            res.send(result)
        } else {
            responseReturn(res, 403, { error: 'Unauthorize access' })
        }
    } catch (error) {
        responseReturn(res, 500, { error: error.message })
    }
}



// ===============================================================
//                 ARTICLE CRUD OPERATION FOR ADMIN
// ===============================================================

// pagination: http://localhost:5000/get-all-article?pageNumber=1&perPage=2

// get all article
exports.getAllArticle = async (req, res) => {
    // pagination
    const pageNumber = Number(req.query.pageNumber);
    const perPage = Number(req.query.perPage);
    const skipPage = (pageNumber - 1) * perPage;

    try {
        const total = await ArticleModel.find({}).countDocuments();
        const result = await ArticleModel.find({}).sort({ createdAt: - 1 }).skip(skipPage).limit(perPage).populate('publisher', 'name slug image')

        res.send({ total, result })
    } catch (error) {
        console.log(error.message);
    }
}


exports.getPublisherPercentage = async (req, res) => {

    const allPublisher = await PublisherModel.find({});
    const publisherId = allPublisher.map((p) => p._id);
    const allArticle = await ArticleModel.find({}).populate('publisher', 'slug');
    const articleCount = await ArticleModel.find({})

    console.log(publisherId);
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




// ===============================================================
//             ARTICLE CRUD OPERATION NORMAL & LOGIN USER
// ===============================================================
// infinity scroll route: /get-approved-articles?pageNumber=1&perPage=2
//  ‍total query: /get-approved-articles?publisherSlug=${publisherSlug}&tagValue=${tagValue}&searchValue=${searchValue ? searchValue : ''}&pageNumber=${pageNumber}&perPage=${perPage}

// get all approved article
exports.getApprovedArticles = async (req, res) => {
    const filter = { articleStatus: 'approved' };

    // pagination
    // const pageNumber = Number(req.query.pageNumber);
    // const perPage = Number(req.query.perPage);
    // const skipPage = (pageNumber - 1) * perPage;

    // console.log(req.query.pageNumber)
    // console.log(req.query.perPage)

    try {
        const total = await ArticleModel.find(filter).countDocuments();

        const approvedArticles = await ArticleModel.find(filter).sort({ createdAt: -1 }).populate('publisher', 'name slug image');
        const totalArticles = new queryArticles(approvedArticles, req.query).publisherQuery().tagQuery();
        const result = new queryArticles(approvedArticles, req.query).publisherQuery().tagQuery().searchQuery().skip().limit();

        // console.log(total);
        res.send({ approvedArticles: result, total, totalArticles })
    } catch (error) {
        console.log(error.message);
    }
}

// view increase one by one for every request. if 1: article is approved and 2: !admin || !author

exports.viewApprovedArticleDetails = async (req, res) => {
    const articleId = req.params.id;

    // requested user email
    const { email } = req.query;

    // console.log(articleId);
    // console.log(email);

    try {
        const article = await ArticleModel.findById(articleId);
        const isApproved = article?.articleStatus === 'approved';
        // console.log('isApproved: ', isApproved);

        // check is user Author this article?
        const isAuthor = email === article?.authorEmail;
        // console.log('author: ', isAuthor);

        // for check user admin or not
        const user = await UserModel.findOne({ email });
        const isAdmin = user?.role === 'admin';
        // console.log('admin: ', isAdmin);

        const result = await ArticleModel.findById(articleId).populate('publisher');
        res.send(result);

        if (isApproved && !isAdmin && !isAuthor) {
            // console.log('view + 1');
            const article = await ArticleModel.findById(articleId);
            const views = article?.views;
            const update = { views: views + 1 }

            await ArticleModel.findByIdAndUpdate(articleId, update)
        }
        // else {
        //     console.log('not increase views');
        // }
    } catch (error) {
        console.log(error.message);
    }
}


// ===============================================================
//           PREMIUM ARTICLE ARTICLE CRUD OPERATION
// ===============================================================

// get all premium article
exports.getPremiumArticles = async (req, res) => {
    const filter = { articleStatus: 'approved', isPremium: 'true' };

    try {
        const result = await ArticleModel.find(filter).populate('publisher', 'name image').sort({ createdAt: -1 });
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
}



/** // view premium article details
 * logic of access to view premium article details
 * route: http://localhost:5000/view-premium-article-details/:id?email=user@email.com
 * case 1: if article is approved && isPremium
 * case 2: if user isAdmin || isPremiumUser
 * 
 * Article views increase one by one for every request. if 
 * case 1: article is approved && isPremium. 
 * case 2: !admin || isPremiumUser
 */
exports.viewPremiumArticleDetails = async (req, res) => {
    const articleId = req.params.id;

    // requested user email
    const { email } = req.query;

    // console.log(articleId);
    // console.log(email);

    try {
        const article = await ArticleModel.findById(articleId);
        const isApproved = article?.articleStatus === 'approved';
        const isPremium = article?.isPremium === 'true';
        // console.log('article isApproved: ', isApproved);
        // console.log('article isPremium: ', isPremium);

        // for check user admin or not
        const user = await UserModel.findOne({ email });
        const isAdmin = user?.role === 'admin';
        // console.log('isAdmin: ', isAdmin);

        // check is premium user
        const isPremiumUser = user?.isPremium === true;
        // console.log('User isPremium: ', isPremiumUser);

        // view article details logic 
        if ((isAdmin || isPremiumUser) && isApproved && isPremium) {
            const result = await ArticleModel.findById(articleId).populate('publisher');
            res.send(result);
        } else {
            console.log('Unauthorized access');
        }

        // increase views logic
        if (isApproved && isPremium && !isAdmin && isPremiumUser) {
            // console.log('view + 1');
            const article = await ArticleModel.findById(articleId);
            const views = article?.views;
            const update = { views: views + 1 }

            await ArticleModel.findByIdAndUpdate(articleId, update);
        } else {
            // console.log('not increase views');
        }
    } catch (error) {
        console.log(error.message);
    }
}


// ============ count and get article, user etc =========

// get all trending article
exports.trendingArticles = async (req, res) => {
    const filter = { articleStatus: 'approved' };

    try {
        const result = await ArticleModel.find(filter, '_id image title authorName publisher isPremium views').sort({ views: -1 }).populate('publisher', 'image name').limit(6);
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
}


// article count method
exports.articlesCount = async (req, res) => {
    const filterApproved = { articleStatus: 'approved' }
    const filterPending = { articleStatus: 'pending' }
    const filterDecline = { articleStatus: 'decline' }
    const filterPremium = { isPremium: true, articleStatus: 'approved' }

    try {
        const totalApproved = await ArticleModel.find(filterApproved).countDocuments();
        const totalPending = await ArticleModel.find(filterPending).countDocuments();
        const totalDecline = await ArticleModel.find(filterDecline).countDocuments();
        const totalPremium = await ArticleModel.find(filterPremium).countDocuments();

        const totalArticle = await ArticleModel.find({}).countDocuments();
        res.send({ totalArticle, totalApproved, totalPending, totalDecline, totalPremium })
    } catch (error) {
        console.log(error.message);
    }
}