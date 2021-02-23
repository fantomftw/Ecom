const mongoose = require('mongoose');
const roleList = require('../seed/Roles');
const providerList = require('../seed/AuthProvider');
const statusList = require('../seed/Status');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fabric: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: false,
    },
    neck: {
        type: String,
        required: false,
    },
    occassion: {
        type: String,
        required: false,
    },
    length: {
        type: String,
        required: false,
    },
    fit: {
        type: String,
        required: false,
    },
    sleeveLength: {
        type: String,
        required: false,
    },
    washcare: {
        type: String,
        required: false,
    },
    sleeveStyling: {
        type: String,
        required: false,
    },
    product_: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    status: {
        type: String,
        enum: statusList.User_status,
        default: 'InActive'
    },
    seo_: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seo',
        required: false
    }],
    createdBy_:{
        type:String,
        required:true
    }
},
    {
        timestamps: true
    })
SCHEMA.plugin(uniqueValidator);
const ProductDetails = module.exports = mongoose.model('ProductDetails', SCHEMA)