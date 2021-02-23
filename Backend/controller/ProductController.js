const mongoose = require('mongoose');
const ProductService = require('../services/ProductService');
const Product = require('../models/Product');
const ProductVarientsServices = require('../services/ProductVarientsServices');
const ProductVarients = require('../models/ProductVarients');
const ProductDetails = require('../models/ProductDetails');
const ProductImages = require('../models/ProductImages');
const ProductImagesService = require('../services/ProductImageService');

exports.GetAll = (req, res, next) => {
    ProductService.GetAll((err, product) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        if (product) {
            res.json({
                success: true,
                product: product
            })
        }
    })
}
exports.GetAllByFilter = (req, res, next) => {
    let query = []
    let sort = { "sp": -1 }
    if (req.body.subCategoryList &&
        Array.isArray(req.body.subCategoryList) &&
        req.body.subCategoryList.length
    ) {
        let subcat = []
        req.body.subCategoryList.map((item) => {
            if (mongoose.Types.ObjectId.isValid(item))
                subcat.push((mongoose.Types.ObjectId(item)))
        })
        query.push({ "product.subCategoryList_": { "$in": subcat } })
    }
    if (req.body.brand &&
        Array.isArray(req.body.brand) &&
        req.body.brand.length
    ) {
        let brands = []
        req.body.brand.map((item) => {
            if (mongoose.Types.ObjectId.isValid(item))
                brands.push(mongoose.Types.ObjectId(item))
        })
        query.push({ "product.brand": { "$in": brands } })
    }
    if (req.body.color &&
        Array.isArray(req.body.color) &&
        req.body.color.length
    ) {
        query.push({ "color": { "$in": req.body.color } },)
    }
    if (req.body.size &&
        Array.isArray(req.body.size) &&
        req.body.size.length
    ) {
        query.push({ "size": { "$in": req.body.size } })
    }
    if (req.body.discount &&
        Array.isArray(req.body.discount) &&
        req.body.discount.length
    ) {
        query.push({ "discount": { "$in": req.body.discount } })
    }
    if (req.body.sortsp &&
        parseInt(req.body.sortsp) == 1 ||
        parseInt(req.body.sortsp) == -1

    ) {
        sort = { "sp": parseInt(req.body.sortsp) }
    }
    ProductService.GetAllByFilter(query, sort, (err, product) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        if (product) {
            res.json({
                success: true,
                product: product
            })
        }
    })
}
exports.GetById = (req, res, next) => {
    ProductService.GetByFilter({ _id: mongoose.Types.ObjectId(req.params._id) }, (err, product) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        if (product) {
            res.json({
                success: true,
                product: product
            })
        }
    })
}
exports.AddProductDetails = (req, res, next) => {
    let newData = new ProductDetails({
        _id: new mongoose.Types.ObjectId(),
        fabric: req.body.fabric,
        color: req.body.color,
        neck: req.body.neck,
        occassion: req.body.occassion,
        fit: req.body.fit,
        sleeveLength: req.body.sleeveLength,
        washcare: req.body.washcare,
        product_: req.body.product_,
        seo_: req.body.seo_,
        status: "InActive",
        createdBy_: req.tokenData.data._id
    })
    ProductService.AddProductDetails(newData, (err, product) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!!",
                err_message: err
            })
        }
        else {
            res.json({
                success: true,
                success_subject: "Success!!",
                success_message: "Product Details registered successfully."
            })
        }

    })
}
exports.Add = (req, res, next) => {
    console.log("Token Data", req.tokenData)
    let newData = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        title: req.body.title,
        category_: req.body.category,
        subCategory_: req.body.subCategory,
        subCategoryList_: req.body.subCategoryList,
        trend_: req.body.trend,
        brand_: req.body.brand,
        seo_: req.body.seo,
        createdBy_: req.tokenData.data._id
    })
    ProductService.Add(newData, (err, product) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!!",
                err_message: err
            })
        }
        else {
            for (var i = 0; i < req.body.varients.length; i++) {
                console.log("storing...", i)
                let newVarients = new ProductVarients({
                    _id: new mongoose.Types.ObjectId(),
                    sku: req.body.varients[i].sku,
                    size: req.body.varients[i].size,
                    color: req.body.varients[i].color,
                    mrp: req.body.varients[i].mrp,
                    sp: req.body.varients[i].sp,
                    discount: req.body.varients[i].discount,
                    product_: product._id,
                    createdBy_: req.tokenData.data._id
                })
                ProductVarientsServices.Add(newVarients, (err, varient) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            success: false,
                            err_subject: "Error while storing varients!!",
                            err_message: err
                        })
                    }
                    if (i == req.body.varients.length) {
                        console.log("exiting...", i);
                        res.json({
                            success: true,
                            success_subject: "Success!!",
                            success_message: "Product registered successfully."
                        })
                    }
                })

            }

        }
    })
}
exports.AddImages = (req, res, next) => {
    const images = [];
    for (let i = 0; i < req.files.length; i++) {
        images.push(req.files[i].destination + "/" + req.files[i].filename)
    }
    let newVarients = new ProductImages({
        _id: mongoose.Types.ObjectId,
        image: images,
        productVarient_: req.params.vid,
        createdBy_: req.tokenData.data._id
    })
    ProductImagesService.AddProductVarientsImages(newVarients, (err, productVarientsImg) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        else if (productVarientsImg) {
            res.json({
                success: true,
                product: productVarientsImg
            })
        }
        else {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
    })
}
exports.GetByFilterdId = (req, res, next) => {
    let query = {}
    if (mongoose.Types.ObjectId.isValid(req.params.catid)) {
        query = {
            $or: [
                { _id: mongoose.Types.ObjectId(req.params.catid) },
                { category_: mongoose.Types.ObjectId(req.params.catid) },
                { subCategory_: mongoose.Types.ObjectId(req.params.catid) },
                { subCategoryList_: mongoose.Types.ObjectId(req.params.catid) }
            ]
        }
    }
    if (Object.keys(query).length) {
        ProductService.GetByFilterdId(query, (err, product) => {
            if (err) {
                res.json({
                    success: false,
                    err_subject: "Error!",
                    err_message: err
                })
            }
            else if (product) {
                res.json({
                    success: true,
                    product: product
                })
            }
            else {
                res.json({
                    success: false,
                    err_subject: "Error!",
                    err_message: "Id Not Exist"
                })
            }
        })
    }
    else {
        res.json({
            success: false,
            err_subject: "Error!",
            err_message: "Id Not Exist"
        })
    }
}
exports.GetOneByFilterdId = (req, res, next) => {
    let query = {}
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        query = {
            $or: [
                { _id: mongoose.Types.ObjectId(req.params.id) },
            ]
        }
    }
    if (Object.keys(query).length) {
        ProductService.GetOneByFilterdId(query, (err, product) => {
            if (err) {
                res.json({
                    success: false,
                    err_subject: "Error!",
                    err_message: err
                })
            }
            else if (product) {
                res.json({
                    success: true,
                    product: product[0]
                })
            }
            else {
                res.json({
                    success: false,
                    err_subject: "Error!",
                    err_message: "Id Not Exist"
                })
            }
        })
    }
    else {
        res.json({
            success: false,
            err_subject: "Error!",
            err_message: "Id Not Exist"
        })
    }
}