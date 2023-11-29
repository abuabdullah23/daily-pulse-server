const { Schema, model } = require("mongoose");

const SubscriptionModel = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    takenTime: {
        type: String,
        default: null
    },
    expireTime: {
        type: String,
        default: null
    },
}, { timestamps: true })

module.exports = model('subscriptions', SubscriptionModel);