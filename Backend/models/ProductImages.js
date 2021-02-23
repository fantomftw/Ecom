const mongoose = require('mongoose');
const roleList = require('../seed/Roles');
const providerList = require('../seed/AuthProvider');
const statusList = require('../seed/Status');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    image:{
        type:String,
        required: true
    },
    status: {
        type: String,
        enum: statusList.User_status,
        default: 'InActive'
    },
    productVarient_: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVarients',
        required: false
    },
    createdBy_:{
        type:String,
        required:true
    }
},
    {
        timestamps: true
    })
SCHEMA.plugin(uniqueValidator);
const ProductImages = module.exports = mongoose.model('ProductImages', SCHEMA)