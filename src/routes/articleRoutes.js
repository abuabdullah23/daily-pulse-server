const { addPublisher, getAllPublisher, deletePublisher, addArticle, getAllArticle, approveArticle, makePendingArticle, makePremiumArticle, removePremiumArticle, deleteArticle, addFeedback, getMyArticle, deleteMyArticle, viewSingleArticle, updateArticle, authorArticleDetails, getApprovedArticles, viewApprovedArticleDetails, getPremiumArticles, viewPremiumArticleDetails } = require("../api/controllers/articleControllers/articleControllers");

const verifyAdmin = require("../middlewares/verifyAdmin");
const verifyJWT = require("../middlewares/verifyJWT");
const router = require('express').Router();

router.post('/add-publisher', verifyJWT, verifyAdmin, addPublisher)
router.get('/get-all-publisher', verifyJWT, getAllPublisher)
router.delete('/delete-publisher/:id', verifyJWT, verifyAdmin, deletePublisher)


// for author
router.post('/add-article', verifyJWT, addArticle);
router.get('/get-my-article/:email', verifyJWT, getMyArticle);
router.delete('/delete-my-article/:id', verifyJWT, deleteMyArticle);
router.get('/get-single-article/:id', verifyJWT, viewSingleArticle);
router.put('/update-article/:id', verifyJWT, updateArticle);
router.get('/author-article-details/:id', (verifyJWT || verifyAdmin), authorArticleDetails)

// for admin
router.get('/get-all-article', verifyJWT, verifyAdmin, getAllArticle)
router.put('/approved-article/:id', verifyJWT, verifyAdmin, approveArticle)
router.put('/make-pending/:id', verifyJWT, verifyAdmin, makePendingArticle)
router.put('/make-premium/:id', verifyJWT, verifyAdmin, makePremiumArticle)
router.put('/remove-premium/:id', verifyJWT, verifyAdmin, removePremiumArticle)
router.delete('/delete-article/:id', verifyJWT, verifyAdmin, deleteArticle)
router.put('/add-feedback/:id', verifyJWT, verifyAdmin, addFeedback)

// approved article
router.get('/get-approved-articles', getApprovedArticles);
router.get('/view-approved-article-details/:id', verifyJWT, viewApprovedArticleDetails);

// premium article
router.get('/get-premium-articles', verifyJWT, getPremiumArticles);
router.get('/view-premium-article-details/:id', verifyJWT, viewPremiumArticleDetails);



module.exports = router;