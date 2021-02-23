const mongoose = require('mongoose');
const roleList = require('../seed/Roles');
const providerList = require('../seed/AuthProvider');
const statusList = require('../seed/Status');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sku: {
        type: String,
        required: true
    },
    size: [{
        type: String,
        required: true
    }],
    color: [{
        type: String,
        required: true
    }],
    mrp: {
        type: String,
        required: true
    },
    sp: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: statusList.User_status,
        default: 'InActive'
    },
    product_: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false
    },
    seo_: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seo',
        required: false
    }],
    createdBy_: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })
SCHEMA.plugin(uniqueValidator);
const ProductVarients = module.exports = mongoose.model('ProductVarients', SCHEMA)