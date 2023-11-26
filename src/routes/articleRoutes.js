const { addPublisher, getAllPublisher, deletePublisher, addArticle } = require("../api/controllers/articleControllers/articleControllers");

const verifyAdmin = require("../middlewares/verifyAdmin");
const verifyJWT = require("../middlewares/verifyJWT");
const router = require('express').Router();

router.post('/add-publisher', verifyJWT, verifyAdmin, addPublisher)
router.get('/get-all-publisher', getAllPublisher)
router.delete('/delete-publisher/:id', verifyJWT, verifyAdmin, deletePublisher)

router.post('/add-article', verifyJWT, addArticle)

module.exports = router;