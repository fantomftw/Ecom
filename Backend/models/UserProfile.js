const mongoose = require('mongoose');
const roleList = require('../seed/Roles');
const providerList = require('../seed/AuthProvider');
const statusList = require('../seed/Status');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type:String,
        unique:true,
        required:true
    },
    cin:{
        type:String,
        unique:true,
        required:true
    },
    email : {
        type:String,
        unique:true,
        index:true,
        match:[/\S+@\S+\.\S+/, "Invalid"],
    },
    contact : {
        type:String,
        unique:true,
    },
    status:{
        type: String,
        enum : statusList.User_status,
        default: 'InActive'
    },
    address : {
        type:String,
    },
    state : {
        type:String,
    },
    city : {
        type:String,
    },
    pincode : {
        type:String,
    },
    image:{
        type:String,
    },
    reg_doc_image:{
        type:String,
    },

    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }
},
{
    timestamps : true
})

SCHEMA.plugin(uniqueValidator);
const UserProfile = module.exports=mongoose.model('UserProfile', SCHEMA)