const bcrypt = require('bcryptjs');
const Trend = require('../models/Trend');
var config = require('config');

module.exports.GetAll = function (callback) {
    Trend.find({ status: "Active" }, callback);
}
module.exports.Add = function (newItem, callback) {
    newItem.save(callback)
}
module.exports.GetByFilter = function (query, callback) {
    Trend.findOne(query).exec(callback)
}
module.exports.Update = function (query, updateOps, callback) {
    Trend.update(query, updateOps, callback);
}