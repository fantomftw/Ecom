const mongoose = require('mongoose');
const TrendService = require('../services/TrendService');
const Trend = require('../models/Trend');

exports.GetAll = (req, res, next) => {
    TrendService.GetAll((err, trend) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        if (Trend) {
            res.json({
                success: true,
                trend: trend
            })  
        }
    })
}
exports.GetById = (req, res, next) => {
    TrendService.GetByFilter({ _id: req.params._id }, (err, trend) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        if (trend) {
            res.json({
                success: true,
                Trend: trend
            })
        }
    })
}
exports.Add = (req, res, next) => {

    let newData = new Trend({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        image: req.file.path,
        title: req.body.title,
        createdBy_: req.tokenData.data._id
    })
    TrendService.Add(newData, (err, trend) => {
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
                success_message: "Trend registered successfully."
            })
        }
    })
}
exports.UpdateStatus = (req, res, next) => {
    console.log(req.params._id)
    TrendService.GetByFilter({ _id: req.params._id }, (err, user) => {
        if (user) {
            console.log(user)
            if (user.status == "Active") {
                TrendService.Update({ _id: req.params._id }, { $set: { status: 'InActive' } }, (err, data) => {
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

                TrendService.Update({ _id: req.params._id }, { $set: { status: 'Active' } }, (err, data) => {
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
                TrendService.Update({ _id: req.params._id }, { $set: { status: 'Active' } }, (err, data) => {
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
    console.log("Deactivating user")
    console.log(req.params._id)
    TrendService.Update({ _id: req.params._id }, { $set: { status: 'DeActivate' } }, (err, success) => {
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