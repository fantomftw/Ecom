const mongoose = require('mongoose');
const CartService = require('../services/CartService');
const Cart = require('../models/Cart');

exports.GetAll = (req, res, next) => {
    if (req.tokenData.data.roles.some(r => ["User"].includes(r))) {
        CartService.GetAllByFilter({ user_: req.tokenData.data._id }, (err, cart) => {
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
                    success_subject: 'Success!!',
                    success_message: 'Cart List',
                    cart
                })
            }
        })
    }
    else {
        CartService.GetAll((err, cart) => {
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
                    success_subject: 'Success!!',
                    success_message: 'Order List',
                    cart
                })
            }
        })
    }
}
exports.GetById = (req, res, next) => {
    CartService.GetByFilter({ _id: req.params._id }, (err, cart) => {
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
    let newData = new Cart({
        _id: new mongoose.Types.ObjectId(),
        user_: req.tokenData.data._id,
        productVariant_: req.body.productVariant_,
        qunatity: req.body.qunatity,
    })
    CartService.Add(newData, (err, cart) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!!",
                err_message: err
            })
        }
        else if (cart) {
            res.json({
                success: true,
                success_subject: "Success!!",
                success_message: "Product Added successfully.",
                cart
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
exports.UpdateQuantity = (req, res, next) => {
    if (req.tokenData.data.roles.some(r => ["User"].includes(r))) {
        CartService.GetByFilter({ _id: req.params._id }, (err, cart) => {
            if (err) {
                res.json({
                    success: false,
                    err_subject: "Error!",
                    err_message: err
                })
            }
            if (cart) {
                if (parseInt(req.params.qty) < 1) {
                    res.json({
                        success: true,
                        success_subject: 'Success!!',
                        success_message: 'Quantity Should Be Greater Then 1 ',
                    })
                }
                CartService.Update({ _id: req.params._id }, { $set: { qunatity: req.params.qty } }, (err, update) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error!",
                            err_message: err
                        })
                    }
                    else {
                        res.json({
                            success: true,
                            success_subject: 'Success!!',
                            success_message: 'Quantity update Successfully',
                        })
                    }
                })
            }
        })
    }
}
exports.DeleteCartItem = (req, res, next) => {
    Cart.findByIdAndDelete({ _id: req.params.cartId }, (err, del) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        if (del) {
            res.json({
                success: true,
                success_subject: 'Success!!',
                success_message: 'Cart Item Deleted',
            })
        }
    })
}