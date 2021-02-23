const bcrypt = require('bcryptjs');
const Contact = require('../models/Contact');
var config = require('config');
const { connections } = require('mongoose');

module.exports.GetAll = function (filter, callback) {
    Contact.find(filter, callback);
}
module.exports.AddNew = function (ContactData, callback) {
    ContactData.save(callback);
}

module.exports.findByIdAndUpdate = function (ContactData, callback) {
    Contact.findByIdAndUpdate(ContactData, callback);
}
module.exports.Delete = function (id, callback) {
    let query = {
        _id: id
    }
    Contact.remove(query, callback);
}