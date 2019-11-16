const mongoose = require('mongoose')
const Schema = mongoose.Schema

const House = new Schema(
    {
        title: { type: String, required: true },
        address: { type: String, required: true },
        price: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('houses', House)