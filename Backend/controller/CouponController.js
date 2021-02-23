const mongoose = require('mongoose');
const CuponService = require('../services/CuponService');
const Coupon = require('../models/Coupon');

exports.GetAll = (req, res, next) => {
    CuponService.GetAll((err, coupons) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        else if (coupons && coupons.length) {
            res.json({
                success: true,
                coupons: coupons
            })
        }
        else {
            res.json({
                success: false,
                err_subject: "Warning!",
                err_message: "No coupons Found"
            })
        }
    })
}
exports.GetById = (req, res, next) => {
    CuponService.GetByFilter({ _id: req.params._id }, (err, coupon) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        if (coupon) {
            res.json({
                success: true,
                coupon
            })
        }
    })
}
exports.Add = (req, res, next) => {
    let newData = new Coupon({
        _id: new mongoose.Types.ObjectId(),
        code: req.body.code,
        tc: req.body.tc,
        product_: req.body.product_,
        category_: req.body.category_,
        subCategory_: req.body.subCategory_,
        subCategoryList_: req.body.subCategoryList_,
        productVarients_: req.body.productVarients_,
        brand_: req.body.brand_,
        trend_: req.body.trend_,
        discount: req.body.discount,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: "Active",
        description: req.body.description,
        createdBy_: req.tokenData.data._id
    })
    CuponService.Add(newData, (err, coupon) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!!",
                err_message: err
            })
        }
        else if (coupon) {
            res.json({
                success: true,
                success_subject: "Success!!",
                success_message: "Brand registered successfully."
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
exports.UpdateStatus = (req, res, next) => {
    console.log(req.params._id)
    CuponService.GetByFilter({ _id: req.params._id }, (err, coupon) => {
        if (coupon) {
            console.log(coupon)
            if (coupon.status == "Active") {
                CuponService.Update({ _id: req.params._id }, { $set: { status: 'InActive' } }, (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error..",
                            err_message: err
                        })
                    }
                    if (data) {
                        res.json({
                            success: true,
                            success_subject: "Success!!",
                            success_message: "Coupon Status InActivated Successfully."
                        })
                    }
                })
            } else if (coupon.status == "InActive") {

                CuponService.Update({ _id: req.params._id }, { $set: { status: 'Active' } }, (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error..",
                            err_message: err
                        })
                    }
                    if (data) {
                        res.json({
                            success: true,
                            success_subject: "Success!!",
                            success_message: "Coupon Status Activated Successfully."
                        })
                    }
                })
            } else if (coupon.status == "DeActivate") {
                CuponService.Update({ _id: req.params._id }, { $set: { status: 'Active' } }, (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error..",
                            err_message: err
                        })
                    }
                    if (data) {
                        res.json({
                            success: true,
                            success_subject: "Success!!",
                            success_message: "Coupon Status Activated Successfully."
                        })
                    }
                })

            }
        }
        if (err) {
            console.log(err)

            res.json({
                success: false,
                err_subject: 'unhandled',
                err_message: err
            })
        }
    });
}
exports.DeActivate = (req, res, next) => {
    CuponService.Update({ _id: req.params._id }, { $set: { status: 'DeActivate' } }, (err, success) => {
        if (err) {
            res.json({
                success: false,
                err_subject: 'Error!!',
                err_message: 'Oops Something went wrong, Please contact your admin'
            })
        }
        if (success) {
            res.json({
                success: true,
                success_subject: 'Success!!',
                success_message: 'Coupon Deactivated Successfully'
            })
        }
    })
}
exports.Update = (req, res, next) => {
    const couponid = req.params.id;
    let updatedData = {
        code: req.body.code,
        tc: req.body.tc,
        product_: req.body.product_,
        category_: req.body.category_,
        subCategory_: req.body.subCategory_,
        subCategoryList_: req.body.subCategoryList_,
        productVarients_: req.body.productVarients_,
        brand_: req.body.brand_,
        trend_: req.body.trend_,
        status: req.body.status,
        description: req.body.description,
    }
    CuponService.Update({ _id: couponid }, updatedData, (err, updatedCoupon) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!!",
                err_message: err
            })
        }
        else if (updatedCoupon) {
            res.json({
                success: true,
                success_subject: "Success!!",
                success_message: "Coupon Updated successfully."
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