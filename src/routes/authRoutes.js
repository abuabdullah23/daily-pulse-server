const { createAuthJWT, clearJWT } = require('../api/controllers/authControllers');
const { saveUser } = require('../api/controllers/userControllers/userControllers');

const router = require('express').Router();

router.post('/jwt', createAuthJWT);
router.post('/logout', clearJWT);
router.post('/save-user', saveUser);

module.exports = router;