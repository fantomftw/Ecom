const mongoose = require('mongoose');
const CategoryService = require('../services/CategoryService');
const CategorySchema = require('../models/Category');

const SubCategoryService = require('../services/SubCategoryService');
const SubCategorySchema = require('../models/SubCategory');

const SubCategoryListService = require('../services/SubCategoryListService');
const SubCategoryListSchema = require('../models/SubCategoryList');

const config = require('config')
const Token = require('../handler/genToken');
const roleList = require('../seed/Roles');
const SubCategoryList = require('../models/SubCategoryList');

exports.GetAllCategory = (req, res, next) => {
    CategoryService.GetAll((err, category) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        if (category) {
            res.json({
                success: true,
                category: category
            })
        }
    })
}
exports.GetAllSubCategory = (req, res, next) => {
    console.log("Fetching sub category")
    SubCategoryService.GetAll({ category_: req.params.catId }, (err, subCategory) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        if (subCategory) {
            res.json({
                success: true,
                subCategory: subCategory
            })
        }
    })
}
exports.GetAllSubCategoryList = (req, res, next) => {
    SubCategoryListService.GetAll({ $and: [{ category_: req.params.catId }, { subCategory_: req.params.subCatId }] }, (err, subCategoryList) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        if (subCategoryList) {
            res.json({
                success: true,
                subCategoryList: subCategoryList
            })
        }
    })
}
exports.GetSubCategoryList = (req, res, next) => {
    let filter = {
        $or: [{ _id: req.params.id }, { category_: req.params.id }, { subCategory_: req.params.id }]
    }
    SubCategoryListService.GetSubCategoryList(filter, (err, categoryList) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        else if (subCategoryList) {
            res.json({
                success: true,
                categoryList: categoryList
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
exports.AddSubCategory = (req, res, next) => {
    console.log("Adding subcategory --- ", req.body)
    let newData = new SubCategorySchema({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        category_: req.params.catId,
        createdBy_: req.tokenData.data._id,
    })
    SubCategoryService.Add(newData, (err, subCategory) => {
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
                success_message: "Category registered successfully."
            })
        }
    })
    console.log(newData)
}
exports.AddSubCategoryList = (req, res, next) => {
    console.log("Add Sub Category List -- ", req.body)
    let newData = new SubCategoryListSchema({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        category_: req.params.catId,
        subCategory_: req.params.subCatId,
        createdBy_: req.tokenData.data._id,
    })
    console.log(newData)
    SubCategoryListService.Add(newData, (err, subCategory) => {
        if (err) {
            res.json({
                success: false,
                err_subject: err.name,
                err_message: err.message,
                err
            })
        }
        else {
            res.json({
                success: true,
                success_subject: "Success!!",
                success_message: "Category listed to subcategory successfully."
            })
        }
    })
}
exports.UpdateStatus = (req, res, next) => {
    if (req.params.level == 1) {
        CategoryService.GetByFilter({ _id: req.params.id }, (err, info) => {
            if (err) {
                res.json({
                    success: false,
                    err_subject: "Error!!",
                    err_message: "Oops something went wrong, " + err
                })
            }
            else {
                let UpdateStatusValue;
                successRes = {};
                if (info.status == "Active") {
                    UpdateStatusValue = "InActive"
                    successRes = {
                        success: true,
                        success_subject: "Success!!",
                        success_message: "Category Status set to InActive successfully.",
                        info
                    };
                } else if (info.status == "InActive") {
                    UpdateStatusValue = "Active"
                    successRes = {
                        success: true,
                        success_subject: "Success!!",
                        success_message: "Category Status set to Active successfully.",
                        info
                    };
                }
                CategoryService.Update({ _id: req.params.id }, { $set: { status: UpdateStatusValue } }, (err, info) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error!!",
                            err_message: "Oops something went wrong, " + err
                        })
                    }
                    else {
                        res.json(successRes)
                    }
                })
            }
        })
    } else if (req.params.level == 2) {
        SubCategoryService.GetByFilter({ _id: req.params.id }, (err, info) => {
            if (err) {
                res.json({
                    success: false,
                    err_subject: "Error!!",
                    err_message: "Oops something went wrong, " + err
                })
            }
            else {
                let UpdateStatusValue;
                successRes = {};
                if (info.status == "Active") {
                    UpdateStatusValue = "InActive"
                    successRes = {
                        success: true,
                        success_subject: "Success!!",
                        success_message: "Category Status set to InActive successfully.",
                        info
                    };
                } else if (info.status == "InActive") {
                    UpdateStatusValue = "Active"
                    successRes = {
                        success: true,
                        success_subject: "Success!!",
                        success_message: "Category Status set to Active successfully.",
                        info
                    };
                }
                SubCategoryService.Update({ _id: req.params.id }, { $set: { status: UpdateStatusValue } }, (err, info) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error!!",
                            err_message: "Oops something went wrong, " + err
                        })
                    }
                    else {
                        res.json(successRes)
                    }
                })
            }
        })
    } else if (req.params.level == 3) {
        SubCategoryListService.GetByFilter({ _id: req.params.id }, (err, info) => {
            if (err) {
                res.json({
                    success: false,
                    err_subject: "Error!!",
                    err_message: "Oops something went wrong, " + err
                })
            }
            else {
                let UpdateStatusValue;
                successRes = {};
                if (info.status == "Active") {
                    UpdateStatusValue = "InActive"
                    successRes = {
                        success: true,
                        success_subject: "Success!!",
                        success_message: "Category Status set to InActive successfully.",
                        info
                    };
                } else if (info.status == "InActive") {
                    UpdateStatusValue = "Active"
                    successRes = {
                        success: true,
                        success_subject: "Success!!",
                        success_message: "Category Status set to Active successfully.",
                        info
                    };
                }
                SubCategoryListService.Update({ _id: req.params.id }, { $set: { status: UpdateStatusValue } }, (err, info) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error!!",
                            err_message: "Oops something went wrong, " + err
                        })
                    }
                    else {
                        res.json(successRes)
                    }
                })
            }
        })
    } else {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!!",
                err_message: "Oops something went wrong, " + err
            })
        }
    }
    // if(req.params.catId && !req.params.subCatId){
    //     CategoryService.GetByFilter({_id:req.params.catId},(err, info)=>{
    //         if(err){
    //             res.json({
    //                 success:false,
    //                 err_subject:"Error!!",
    //                 err_message:"Oops something went wrong, "+err
    //             })
    //         }
    //         else{
    //             UpdateStatusValue;
    //             successRes={};
    //             if(info.status=="Active"){
    //                 UpdateStatusValue="InActive"
    //                 successRes={
    //                     success:true,
    //                     success_subject:"Success!!",
    //                     success_message:"Category Status set to InActive successfully.",
    //                     info
    //                 };   
    //             }else if(info.status=="InActive"){
    //                 UpdateStatusValue="Active"
    //                 successRes={
    //                     success:true,
    //                     success_subject:"Success!!",
    //                     success_message:"Category Status set to Active successfully.",
    //                     info
    //                 };   
    //             }
    //             CategoryService.Update({_id:req.params.catId},{status:UpdateStatusValue},(err, info)=>{
    //                 if(err){
    //                     res.json({
    //                         success:false,
    //                         err_subject:"Error!!",
    //                         err_message:"Oops something went wrong, "+err
    //                     })
    //                 }
    //                 else{
    //                     res.json(successRes)
    //                 }      
    //             })
    //         }
    //     })
    // }
}
exports.GetAllCategoryForPublic = (req, res, next) => {
    CategoryService.GetAllForPublic((err, category) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                err_message: err
            })
        }
        if (category) {
            console.log(category)
            res.json({
                success: true,
                category: category
            })
        }
    })
}