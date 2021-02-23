const mongoose = require('mongoose');
const BrandService = require('../services/BrandService');
const Brand = require('../models/Brand');

exports.GetAll = (req, res, next) => {
    BrandService.GetAll((err, Brand) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        if (Brand) {
            res.json({
                success: true,
                brand: Brand
            })
        }
    })
}
exports.GetById = (req, res, next) => {
    BrandService.GetByFilter({ _id: req.params._id }, (err, Brand) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        if (Brand) {
            res.json({
                success: true,
                brand: Brand
            })
        }
    })
}
exports.Add = (req, res, next) => {
    console.log(req.file)
    let newData = new Brand({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        image: req.file.path,
        description: req.body.description,
        createdBy_: req.tokenData.data._id
    })
    BrandService.Add(newData, (err, brand) => {
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
                success_message: "Brand registered successfully."
            })
        }
    })
    console.log(newData)
}
exports.UpdateStatus = (req, res, next) => {
    console.log(req.params._id)
    BrandService.GetByFilter({ _id: req.params._id }, (err, user) => {
        if (user) {
            console.log(user)
            if (user.status == "Active") {
                BrandService.Update({ _id: req.params._id }, { $set: { status: 'InActive' } }, (err, data) => {
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
                            success_message: "User Status InActivated Successfully."
                        })
                    }
                })
            } else if (user.status == "InActive") {

                BrandService.Update({ _id: req.params._id }, { $set: { status: 'Active' } }, (err, data) => {
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
                            success_message: "User Status Activated Successfully."
                        })
                    }
                })
            } else if (user.status == "DeActivate") {
                BrandService.Update({ _id: req.params._id }, { $set: { status: 'Active' } }, (err, data) => {
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
                            success_message: "User Status Activated Successfully."
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
exports.DeActivateUser = (req, res, next) => {
    console.log(req.params._id)
    BrandService.Update({ _id: req.params._id }, { $set: { status: 'DeActivate' } }, (err, success) => {
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
                success_message: 'Account Deactivated Successfully'
            })
        }
    })
}