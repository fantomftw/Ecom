const mongoose = require('mongoose');
const WishlistService = require('../services/WishlistService');
const Wishlist = require('../models/Wishlist');

exports.GetAll = (req, res, next) => {
    WishlistService.GetAllByFilter({ user_: mongoose.Types.ObjectId(req.tokenData.data._id) }, (err, wishlist) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        if (wishlist) {
            res.json({
                success: true,
                success_subject: 'Success!!',
                success_message: 'wishlist List',
                wishlist
            })
        }
    })
}
exports.GetById = (req, res, next) => {
    let query = {}
    if (mongoose.Types.ObjectId.isValid(req.params.catid)) {
        query = {
            $or: [
                { _id: mongoose.Types.ObjectId(req.params.catid) },
                { user_: mongoose.Types.ObjectId(req.params.catid) },
                { product_: mongoose.Types.ObjectId(req.params.catid) },
            ]
        }
    }
    WishlistService.GetByFilter(query, (err, wishlist) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        if (cart) {
            res.json({
                success: true,
                cart
            })
        }
    })
}
exports.Add = (req, res, next) => {
    console.log(req.tokenData.data);
    let query = {}
    if (mongoose.Types.ObjectId.isValid(req.params.pid)) {
        query = {
            $and: [
                { user_: mongoose.Types.ObjectId(req.tokenData.data._id) },
                { product_: mongoose.Types.ObjectId(req.params.pid) },
            ]
        }
    }
    WishlistService.GetByFilter(query, (err, wishlist) => {
        if (err) {

        }
        else if (wishlist) {

        }
        else {
            let newData = new Wishlist({
                _id: new mongoose.Types.ObjectId(),
                user_: req.tokenData.data._id,
                product_: req.params.pid,
            })
            WishlistService.Add(newData, (err, wishlist) => {
                if (err) {
                    res.json({
                        success: false,
                        err_subject: "Error!!",
                        err_message: err
                    })
                }
                else if (wishlist) {
                    res.json({
                        success: true,
                        success_subject: "Success!!",
                        success_message: "Product Added In Wish List successfully.",
                        wishlist
                    })
                }
                else {
                    res.json({
                        success: false,
                        err_subject: "Error!!",
                        err_message: err
                    })
                }
            })
        }
    })

}
exports.DeleteWishlistItem = (req, res, next) => {
    Wishlist.findByIdAndDelete({ _id: req.params.wishId }, (err, del) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        else if (del) {
            res.json({
                success: true,
                success_subject: 'Success!!',
                success_message: 'WishList Item Deleted',
            })
        }
        else {
            res.json({
                success: false,
                err_subject: "Warning!",
                err_message: "Id Not Exist"
            })
        }
    })
}