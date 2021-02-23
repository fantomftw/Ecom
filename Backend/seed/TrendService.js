const bcrypt = require('bcryptjs');
const Trend = require('../models/Trend');
var config = require('config');

module.exports.GetAll = function (callback){
    Trend.find({ status: "Active" }, callback);

}

module.exports.Add = function (newItem, callback){
    newItem.save(callback)
}

module.exports.GetByFilter = function (query, callback){
    Trend.findOne(query).exec(callback)
}

module.exports.Update = function (query, updateOps, callback) {
    // let query = {
    //     _id: UserId
    // }
    Trend.update(query, updateOps, callback);
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
