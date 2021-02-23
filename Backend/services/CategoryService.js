const bcrypt = require('bcryptjs');
const Category = require('../models/Category');
var config = require('config');

module.exports.GetAll = function (callback){
    Category.find(callback);
}

module.exports.Add = function (newCat, callback){
    newCat.save(callback)
}

module.exports.GetByFilter = function (query, callback){
    Category.findOne(query, callback);
}

module.exports.Update = function (UserId, updateOps, callback) {
    let query = {
        _id: UserId
    }
    Category.update(query, updateOps, callback);
}

module.exports.GetByCategoryName = function (query, callback){
    Category.findOne(query).exec(callback)
}

module.exports.GetAllForPublic = function (callback){
    Category.aggregate([       
        {
            $lookup:{
                from: "subcategories",
                localField: "_id", 
                foreignField: "category_",
                as: "subCategory_"
            }
        },
        {
            "$unwind": "$subCategory_"
        },
            {
                "$lookup": {
                "from": "subcategorylists",
                "localField": "subCategory_._id",
                "foreignField": "subCategory_",
                "as": "subCategory_.subCategoryList_"
            }
        },
    ]).exec(callback)
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
