const { Schema, model } = require("mongoose");

const PublisherSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        require: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

module.exports = model('publishers', PublisherSchema);