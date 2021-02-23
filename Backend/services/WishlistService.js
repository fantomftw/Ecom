const Wishlist = require('../models/Wishlist');

module.exports.GetAll = function (callback) {
    Wishlist.find(callback);
}

module.exports.Add = function (newItem, callback) {
    newItem.save(callback)
}

module.exports.GetByFilter = function (query, callback) {
    Wishlist.findOne(query).exec(callback)
}

module.exports.Update = function (query, updateOps, callback) {
    Wishlist.updateOne(query, updateOps, callback);
}
module.exports.GetAllByFilter = function (query, callback) {
    Wishlist.aggregate([
        {
            $match: query
        },
        {
            $lookup: {
                from: "products",
                localField: "product_",
                foreignField: "_id",
                as: "products_"
            }
        },
        {
            $lookup: {
                from: "productvarients",
                localField: "product_",
                foreignField: "product_",
                as: "productvarients"
            }
        }
    ]).exec(callback)
}

module.exports.DeleteById = function (query, callback) {
    Wishlist.findByIdAndDelete(query).exec(callback)
}
