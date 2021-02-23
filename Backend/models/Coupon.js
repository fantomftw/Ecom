const mongoose = require('mongoose');
const roleList = require('../seed/Roles');
const providerList = require('../seed/AuthProvider');
const statusList = require('../seed/Status');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false,
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    tc: {
        type: String
    },
    discount: {
        type: String
    },
    brand_: [{
        type: mongoose.Types.ObjectId,
        ref: 'Brand'
    }],
    product_: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }],
    category_: [{
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    }],
    subCategory_: [{
        type: mongoose.Types.ObjectId,
        ref: 'SubCategory'
    }],
    subCategoryList_: [{
        type: mongoose.Types.ObjectId,
        ref: 'SubCategoryList'
    }],
    trend_: [{
        type: mongoose.Types.ObjectId,
        ref: 'Trend'
    }],
    productVarients_: [{
        type: mongoose.Types.ObjectId,
        ref: 'ProductVarients'
    }],
    status: {
        type: String,
        enum: statusList.User_status,
        default: 'InActive'
    },
    createdBy_: {
        type: String,
        required: true
    }

},
    {
        timestamps: true
    })
SCHEMA.plugin(uniqueValidator);
const Coupon = module.exports = mongoose.model('Coupon', SCHEMA)