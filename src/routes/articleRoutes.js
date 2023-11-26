const { addPublisher, getAllPublisher, deletePublisher, addArticle, getAllArticle, approveArticle, makePendingArticle, makePremiumArticle, removePremiumArticle, deleteArticle, addFeedback } = require("../api/controllers/articleControllers/articleControllers");

const verifyAdmin = require("../middlewares/verifyAdmin");
const verifyJWT = require("../middlewares/verifyJWT");
const router = require('express').Router();

router.post('/add-publisher', verifyJWT, verifyAdmin, addPublisher)
router.get('/get-all-publisher', getAllPublisher)
router.delete('/delete-publisher/:id', verifyJWT, verifyAdmin, deletePublisher)

router.post('/add-article', verifyJWT, addArticle)
router.get('/get-all-article', verifyJWT, verifyAdmin, getAllArticle)
router.put('/approved-article/:id', verifyJWT, verifyAdmin, approveArticle)
router.put('/make-pending/:id', verifyJWT, verifyAdmin, makePendingArticle)
router.put('/make-premium/:id', verifyJWT, verifyAdmin, makePremiumArticle)
router.put('/remove-premium/:id', verifyJWT, verifyAdmin, removePremiumArticle)
router.delete('/delete-article/:id', verifyJWT, verifyAdmin, deleteArticle)
router.put('/add-feedback/:id', verifyJWT, verifyAdmin, addFeedback)

module.exports = router;