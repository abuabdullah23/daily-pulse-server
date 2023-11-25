const { addPublisher } = require("../api/controllers/articleControllers/articleControllers");
const verifyAdmin = require("../middlewares/verifyAdmin");
const verifyJWT = require("../middlewares/verifyJWT");
const router = require('express').Router();

router.post('/add-publisher', verifyJWT, verifyAdmin, addPublisher)

module.exports = router;