const bcrypt = require('bcryptjs');
const SubCategoryList = require('../models/SubCategoryList');
var config = require('config');

module.exports.GetAll = function (query, callback) {
    SubCategoryList.find(query).exec(callback);
}
module.exports.GetSubCategoryList = function (query, callback) {
    SubCategoryList.find(query).exec(callback);
}
module.exports.Add = function (newSubCatList, callback) {
    newSubCatList.save(callback)
}
module.exports.GetByFilter = function (query, callback) {
    SubCategoryList.findOne(query, callback);
}
module.exports.Update = function (UserId, updateOps, callback) {
    let query = {
        _id: UserId
    }
    SubCategoryList.update(query, updateOps, callback);
}

// module.exports.GetCount = function (role, callback) {
//     const query = {
//         "roles": { $in: role }
//     }
//     SubCategoryList.find(query).count(callback);
// }
// module.exports.GetCountByStatus = function (role, status, callback) {
//     let query = {
//         "roles": { $in: role },
//         status: status
//     }
//     SubCategoryList.find(query).count(callback);
// }
// module.exports.GetByID = function (id, callback) {
//     SubCategoryList.findById(id).populate('companyProfile').exec(callback);
// }
