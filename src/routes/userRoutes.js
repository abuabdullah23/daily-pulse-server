const { saveUser, checkAdmin, getUsers, deleteUser, makeAdmin, removeAdmin, getSingleUserDetails, updateUserProfile, checkPremiumUser, userCount } = require('../api/controllers/userControllers/userControllers');
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyJWT = require('../middlewares/verifyJWT');

const router = require('express').Router();

router.post('/save-user', saveUser);
router.get('/get-users', verifyJWT, verifyAdmin, getUsers);
router.get('/check-admin/:email', checkAdmin);
router.get('/check-premium-user/:email', checkPremiumUser);
router.delete('/delete-user/:id', verifyJWT, verifyAdmin, deleteUser);
router.put('/make-admin/:id', verifyJWT, verifyAdmin, makeAdmin);
router.put('/remove-admin/:id', verifyJWT, verifyAdmin, removeAdmin);

// user profile routes
router.get('/get-single-user-details/:email', verifyJWT, getSingleUserDetails);
router.put('/update-user-profile/:id', verifyJWT, updateUserProfile);


// countdown user
router.get('/count-users', userCount);


module.exports = router;