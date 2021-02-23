const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product_: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
},
    {
        timestamps: true
    })
SCHEMA.plugin(uniqueValidator);
const Cart = module.exports = mongoose.model('Wishlist', SCHEMA)