require("dotenv").config();

const SubscriptionModel = require("../../../models/SubscriptionModel");
const UserModel = require("../../../models/UserModel");
const { responseReturn } = require("../../../utils/response");
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)

// create payment intent

exports.createPayment = async (req, res) => {
    const { price } = req.body;
    // console.log(price)
    const amount = parseInt(price * 100); // fixed invalid integer
    // console.log(price, amount)

    if (!price || amount < 1) return;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    })
}


// save subscription member info and make user Premium
exports.saveSubscriptionMemberInfo = async (req, res) => {
    console.log(req.body);
    const { name, email, image, transactionId, amount, period } = req.body;

    let time;
    if (period === '1 minute') {
        time = 60 * 1000;
    } else if (period === '5 days') {
        time = 5 * 24 * 60 * 60 * 1000
    } else if (period === '10 days') {
        time = 10 * 24 * 60 * 60 * 1000
    }

    try {
        const update = {
            isPremium: true,
            takenPremium: new Date(Date.now()),
            expiresPremium: new Date(Date.now() + time)
        }
        // make user premium
        if (transactionId) {
            await UserModel.findOneAndUpdate({email}, update)
            responseReturn(res, 200, { message: 'Congratulations! You are premium user.' })
        }

        // save subscription info
        await SubscriptionModel.create({
            name,
            email,
            image,
            transactionId,
            amount,
            takenTime: new Date(Date.now()),
            expireTime: new Date(Date.now() + time)
        })
        responseReturn(res, 200, { message: 'Save your information in Database' })
    } catch (error) {
        console.log(error.message);
    }
}


// remove subscription member info










// ==================== make and remove premium ===========

// exports.makeUserPremium = async (req, res) => {
//     const { email } = req.params;
//     const update = { isPremium: true }
//     console.log(email);

//     try {
//         const result = await UserModel.findOneAndUpdate(email, update)
//     } catch (error) {
//         console.log(error.message);
//     }
// }


// remove premium user
exports.removeUserPremium = async (req, res) => {
    const { email } = req.params;
    const update = { isPremium: false }
    // console.log(email);

    try {
        const result = await UserModel.findOneAndUpdate(email, update)
    } catch (error) {
        console.log(error.message);
    }
}