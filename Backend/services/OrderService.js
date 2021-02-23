const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Order = require('../models/Order');
const OrderDetails = require('../models/OrderDetails');
var config = require('config');
const mongooseUniqueValidator = require('mongoose-unique-validator');

module.exports.GetAll = function (callback) {
    Order.find(callback).populate(['user_']);
}
module.exports.AddOrder = function (newItem, callback) {
    newItem.save(callback)
}
module.exports.AddOrderDetails = function (newItem, callback) {
    newItem.save(callback)
}
module.exports.GetAllByFilter = function (query, callback) {
    Order.find(query).exec(callback)
}
module.exports.GetOneByOrderFilter = function (query, callback) {
    Order.findOne(query).populate('contact_').exec(callback)
}
module.exports.GetByDetailFilter = function (query, callback) {
    OrderDetails.find(query).populate({ path: 'productVarient_', populate: { path: 'product_' } }).exec(callback)
}
module.exports.Update = function (query, updateOps, callback) {
    Order.updateOne(query, updateOps, callback);
}  