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
        unique: true
    },
    title: {
        type: String,
        required: false,
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
    subCategoryList_: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategoryList',
        required: true
    },
    trend_: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trend',
        required: true
    },
    brand_: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
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
    createdBy_: {
        type: String,
        required: true
    }

},
    {
        timestamps: true
    })
SCHEMA.plugin(uniqueValidator);
const Product = module.exports = mongoose.model('Product', SCHEMA)