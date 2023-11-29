const { saveSubscriptionMemberInfo, makeUserPremium, removeUserPremium, createPayment } = require('../api/controllers/subscriptionController/subscriptionController');
const verifyJWT = require('../middlewares/verifyJWT');

const router = require('express').Router();

// make payment
router.post('/create-payment-intent', verifyJWT, createPayment)


// save subscription member info
router.post('/save-subscription-info', verifyJWT, saveSubscriptionMemberInfo)


// make premium user after payment
// router.put('/make-user-premium/:email', makeUserPremium);
router.put('/remove-user-premium/:email', removeUserPremium);


module.exports = router;