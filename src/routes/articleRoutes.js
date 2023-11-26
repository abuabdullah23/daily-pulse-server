const { addPublisher, getAllPublisher, deletePublisher } = require("../api/controllers/articleControllers/articleControllers");

const verifyAdmin = require("../middlewares/verifyAdmin");
const verifyJWT = require("../middlewares/verifyJWT");
const router = require('express').Router();

router.post('/add-publisher', verifyJWT, verifyAdmin, addPublisher)
router.get('/get-all-publisher', getAllPublisher)
router.delete('/delete-publisher/:id', verifyJWT, verifyAdmin, deletePublisher)

module.exports = router;