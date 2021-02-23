const mongoose = require('mongoose');
const roleList = require('../seed/Roles');
const providerList = require('../seed/AuthProvider');
const statusList = require('../seed/Status');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    images: [{
        type: String,
        required: true
    }],
    ProductVarients_: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVarients',
        required: false
    },
},
    {
        timestamps: true
    })
SCHEMA.plugin(uniqueValidator);
const ProductVarientsImages = module.exports = mongoose.model('ProductVarientsImages', SCHEMA)