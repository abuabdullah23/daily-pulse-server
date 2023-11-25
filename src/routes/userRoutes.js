const { saveUser, checkAdmin, getUsers } = require('../api/controllers/userControllers/userControllers');
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyJWT = require('../middlewares/verifyJWT');

const router = require('express').Router();

router.post('/save-user', saveUser);
router.get('/get-users', getUsers);
router.get('/check-admin/:email', checkAdmin);

module.exports = router;