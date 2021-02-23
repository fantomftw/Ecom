const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productVariant_: {
        type: mongoose.Types.ObjectId,
        ref: 'ProductVarients',
        required: true,
    },
    qunatity: {
        type: String
    }
},
    {
        timestamps: true
    })
SCHEMA.plugin(uniqueValidator);
const Cart = module.exports = mongoose.model('Cart', SCHEMA)