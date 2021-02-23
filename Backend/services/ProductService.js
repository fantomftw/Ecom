const mongoose = require('mongoose')
const Product = require('../models/Product');
const ProductVarients = require('../models/ProductVarients');

module.exports.GetAll = function (callback) {
    // Product.find().populate('category_ subCategory_ brand_ trend_ subCategoryList_').exec(callback);
    Product.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category_",
                foreignField: "_id",
                as: "category_"
            }
        },
        {
            $lookup: {
                from: "brands",
                localField: "brand_",
                foreignField: "_id",
                as: "brand_"
            }
        },
        {
            $lookup: {
                from: "trends",
                localField: "trend_",
                foreignField: "_id",
                as: "trend_"
            }
        },
        {
            $lookup: {
                from: "productvarients",
                localField: "_id",
                foreignField: "product_",
                as: "varients"
            }
        }

    ]).exec(callback)
}
module.exports.Add = function (newItem, callback) {
    newItem.save(callback)
}
module.exports.GetByFilterdId = function (query, callback) {
    Product.aggregate([
        {
            $match: query
        },
        {
            $lookup: {
                from: "productvarients",
                localField: "_id",
                foreignField: "product_",
                as: "productvarients"
            }
        },
    ]).exec(callback)
}
module.exports.GetOneByFilterdId = function (query, callback) {
    Product.aggregate([
        {
            $match: query
        },
        {
            $lookup: {
                from: "productvarients",
                localField: "_id",
                foreignField: "product_",
                as: "productvarients"
            }
        },
        {
            $lookup: {
                from: "productdetails",
                localField: "_id",
                foreignField: "product_",
                as: "productDetails"
            }
        }
        
    ]).exec(callback)
}
module.exports.GetAllByFilter = function (query, sort, callback) {
    ProductVarients.aggregate(
        [
            {
                "$lookup": {
                    "from": "products",
                    "localField": "product_",
                    "foreignField": "_id",
                    "as": "product"
                }
            },
            { "$unwind": "$product" },
            {
                "$match": {
                    "$or": query
                }
            },
            {
                "$sort": sort
            }
        ],
        function (err, result) {
            callback(err, result)
        }
    )
}
module.exports.GetAll = function (callback) {
    // Product.find().populate('category_ subCategory_ brand_ trend_ subCategoryList_').exec(callback);
    Product.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category_",
                foreignField: "_id",
                as: "category_"
            }
        },
        {
            $lookup: {
                from: "brands",
                localField: "brand_",
                foreignField: "_id",
                as: "brand_"
            }
        },
        {
            $lookup: {
                from: "trends",
                localField: "trend_",
                foreignField: "_id",
                as: "trend_"
            }
        },
        {
            $lookup: {
                from: "productvarients",
                localField: "_id",
                foreignField: "product_",
                as: "varients"
            }
        }

    ]).exec(callback)
}