const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'publishers'
    },
    status: {
        type: String,
        default: 'pending'
    },
    views: {
        type: Number,
        default: 0
    },
    tags: {
        type: Array,
        require: true,
        trim: true
    },
    isPremium: {
        type: Boolean,
        default: false,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    }
}, { timestamps: true })

module.exports = model('articles', ArticleSchema);