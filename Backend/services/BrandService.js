const bcrypt = require('bcryptjs');
const Brand = require('../models/Brand');
var config = require('config');

module.exports.GetAll = function (callback) {

    // October 15, 1996 05:35:32'

    let startdate = new Date("2021-02-11").toISOString()
    let enddate = new Date("2021-02-18").toISOString()

    console.log(startdate);
    console.log(enddate);
    let obj = {
        createdAt: { $gte: startdate },
        createdAt: { $lte: enddate }
    }
    Brand.find(obj, callback);
}

module.exports.Add = function (newItem, callback) {
    newItem.save(callback)
}

module.exports.GetByFilter = function (query, callback) {
    Brand.findOne(query).exec(callback)
}

module.exports.Update = function (query, updateOps, callback) {
    // let query = {
    //     _id: UserId
    // }
    Brand.updateOne(query, updateOps, callback);
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
