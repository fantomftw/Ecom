const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const ContactType = require('../seed/ContactType');

//User Schema 
const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    pincode: {
        type: String,
    },
    landmark: {
        type: String,
    },
    type: {
        type: String,
        enum: ContactType.Contact_Type,
        default: 'Other'
    },
    user_: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

SCHEMA.plugin(uniqueValidator);
const Contact = module.exports = mongoose.model('Contact', SCHEMA);