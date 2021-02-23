const bcrypt = require('bcryptjs');
const ProductVarients = require('../models/ProductVarients');
var config = require('config');

module.exports.GetAll = function (callback) {
    ProductVarients.find(callback);
}
module.exports.GetAllByFilter = function (query, callback) {
    ProductVarients.find(query, callback);
}
module.exports.Add = function (newItem, callback) {
    newItem.save(callback)
}
module.exports.GetByFilter = function (query, callback) {
    ProductVarients.findOne(query).exec(callback)
}
module.exports.Update = function (query, updateOps, callback) {
    ProductVarients.updateOne(query, updateOps, callback);
}