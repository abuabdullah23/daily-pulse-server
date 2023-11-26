const { saveUser, checkAdmin, getUsers, deleteUser, makeAdmin, removeAdmin } = require('../api/controllers/userControllers/userControllers');
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyJWT = require('../middlewares/verifyJWT');

const router = require('express').Router();

router.post('/save-user', saveUser);
router.get('/get-users', verifyJWT, verifyAdmin, getUsers);
router.get('/check-admin/:email', checkAdmin);
router.delete('/delete-user/:id', verifyJWT, verifyAdmin, deleteUser);
router.put('/make-admin/:id', verifyJWT, verifyAdmin, makeAdmin);
router.put('/remove-admin/:id', verifyJWT, verifyAdmin, removeAdmin);

module.exports = router;