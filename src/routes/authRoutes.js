const { createAuthJWT } = require('../api/controllers/authControllers');

const router = require('express').Router();

router.post('/jwt', createAuthJWT);

module.exports = router;