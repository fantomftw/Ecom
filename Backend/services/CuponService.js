const bcrypt = require('bcryptjs');
const Coupon = require('../models/Coupon');
var config = require('config');

module.exports.GetAll = function (callback) {
    Coupon.find(callback);
}

module.exports.Add = function (newItem, callback) {
    newItem.create(callback)
}

module.exports.GetByFilter = function (query, callback) {
    Coupon.findOne(query).exec(callback)
}

module.exports.Update = function (query, updateOps, callback) {
    Coupon.updateOne(query, updateOps, callback);
}

// module.exports.GetCount = function (role, callback) {
//     const query = {
//         "roles": { $in: role }
//     }
//     Category.find(query).count(callback);
// }
// module.exports.GetCountByStatus = function (role, status, callback) {
//     let query = {
//         "roles": { $in: role },
//         status: status
//     }
//     Category.find(query).count(callback);
// }
