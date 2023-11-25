const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
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
    role: {
        type: String,
        default: 'user'
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    takenPremium: {
        type: String,
        default: null
    },
}, { timestamps: true })

module.exports = model('users', UserSchema);