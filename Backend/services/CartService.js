const bcrypt = require('bcryptjs');
const Cart = require('../models/Cart');
var config = require('config');

module.exports.GetAll = function (callback) {
    Cart.find(callback);
}

module.exports.Add = function (newItem, callback) {
    newItem.save(callback)
}

module.exports.GetByFilter = function (query, callback) {
    Cart.findOne(query).exec(callback)
}

module.exports.Update = function (query, updateOps, callback) {
    Cart.updateOne(query, updateOps, callback);
}
module.exports.GetAllByFilter = function (query, callback) {
    Cart.find(query).populate('productVariant_').exec(callback)
}

module.exports.DeleteById = function (query, callback) {
    Cart.findByIdAndDelete(query).exec(callback)
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
