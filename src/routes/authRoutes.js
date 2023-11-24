const { createAuthJWT, clearJWT } = require('../api/controllers/authControllers');

const router = require('express').Router();

router.post('/jwt', createAuthJWT);
router.post('/logout', clearJWT)

module.exports = router;