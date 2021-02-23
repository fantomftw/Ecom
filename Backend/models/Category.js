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
    seo_: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seo',
        required: false
    }],
   
},
    {
        timestamps: true
    })
SCHEMA.plugin(uniqueValidator);
const Category = module.exports = mongoose.model('Category', SCHEMA)