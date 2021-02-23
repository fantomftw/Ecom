const mongoose = require('mongoose');
const roleList = require('../seed/Roles');
const providerList = require('../seed/AuthProvider');
const orderStatus = require('../seed/orderStatus');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    overAllCost: {
        type: String
    },
    // For No OF Items Listed In Invoice
    itemQty: {
        type: String
    },
    // For Total Order Items
    orderQty: {
        type: String
    },
    user_: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contact_: {
        type: mongoose.Types.ObjectId,
        ref: 'Contact',
        required: true
    },
    status: {
        type: String,
        enum: orderStatus.Order_Status,
        default: 'Pending'
    },
},
    {
        timestamps: true
    })
SCHEMA.plugin(uniqueValidator);
const Order = module.exports = mongoose.model('Order', SCHEMA)