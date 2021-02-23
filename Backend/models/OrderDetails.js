const mongoose = require('mongoose');
const roleList = require('../seed/Roles');
const providerList = require('../seed/AuthProvider');
const statusList = require('../seed/Status');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cost: {
        type: String
    },
    // For Total Order Items
    qty: {
        type: String
    },
    orderNo_: {
        type: mongoose.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    mrp: {
        type: Number
    },
    sp: {
        type: Number
    },
    discount: {
        type: Number
    },
    coupon: {
        type: mongoose.Types.ObjectId,
        ref: 'Coupon',
    },
    productVarient_: {
        type: mongoose.Types.ObjectId,
        ref: 'ProductVarients',
        required: true
    },
},
    {
        timestamps: true
    })
SCHEMA.plugin(uniqueValidator);
const OrderDetails = module.exports = mongoose.model('OrderDetails', SCHEMA)