const bcrypt = require('bcryptjs');
const SubCategory = require('../models/SubCategory');
var config = require('config');


module.exports.GetAll = function (query, callback){
    SubCategory.find(query).exec(callback);
}

module.exports.Add = function (newSubCat, callback){
    newSubCat.save(callback)
}
module.exports.GetByFilter = function (query, callback){
    SubCategory.findOne(query, callback);
}
module.exports.Update = function (UserId, updateOps, callback) {
    let query = {
        _id: UserId
    }
    SubCategory.update(query, updateOps, callback);
}

module.exports.GetCount = function (role, callback) {
    const query = {
        "roles": { $in: role }
    }
    SubCategory.find(query).count(callback);
}
module.exports.GetCountByStatus = function (role, status, callback) {
    let query = {
        "roles": { $in: role },
        status: status
    }
    SubCategory.find(query).count(callback);
}
module.exports.GetByID = function (id, callback) {
    SubCategory.findById(id).populate('companyProfile').exec(callback);
}
