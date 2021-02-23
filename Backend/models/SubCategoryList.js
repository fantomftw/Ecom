const mongoose = require('mongoose');
const roleList = require('../seed/Roles');
const providerList = require('../seed/AuthProvider');
const statusList = require('../seed/Status');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique:true
    },
    status: {
        type: String,
        enum: statusList.User_status,
        default: 'InActive'
    },
    category_: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory_: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    seo_: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seo',
        required: false
    },
    createdBy_: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true
    })

SCHEMA.plugin(uniqueValidator);
const SubCategoryList = module.exports = mongoose.model('SubCategoryList', SCHEMA)