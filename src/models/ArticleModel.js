const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    authorName: {
        type: String,
        require: true,
        trim: true
    },
    authorEmail: {
        type: String,
        require: true,
        trim: true
    },
    authorPhoto: {
        type: String,
        require: true,
        trim: true
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'publishers',
        require: true
    },
    isPremium: {
        type: Boolean,
        default: false,
        trim: true
    },
    articleStatus: {
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
    image: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    adminFeedback: {
        type: String,
        default: null
    }
}, { timestamps: true })

module.exports = model('articles', ArticleSchema);