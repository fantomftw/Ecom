const mongoose = require('mongoose');
const UserSchema = require('../../models/User');
const UserService = require('../../services/UserService');

const CategoryService = require('../../services/CategoryService')
const SubCategoryService = require('../../services/SubCategoryService')
const SubCategoryListService = require('../../services/SubCategoryListService')

const CategorySchema = require('../../models/Category');
const SubCategorySchema = require('../../models/SubCategory');
const SubCategoryListSchema = require('../../models/SubCategoryList');


const config = require('config')
const Token = require('../../handler/genToken');
const roleList = require('../Roles');
const Email = require('../../handler/email');

exports.Add = (req, res, next) => {
    let categoryHead = ['Men', 'Women'];
    let menSubCategory = ["Top Wear", "Bottom Wear"];
    let womenSubCategory = ["Tops", "Bottom Wear"];
    let menSubCategoryList = ["T-Shirt", "Shirt"];
    let womenSubCategoryList = ["Kurta", "Format Shirt"];


    for(var i=0; i<=categoryHead.length-1; i++){
        let newData = new CategorySchema({
            _id:new mongoose.Types.ObjectId(),
            name :categoryHead[i],
            status:'Active'         
        })
        CategoryService.GetByCategoryName({name:categoryHead[i]}, (err, info)=>{
            if(err){
                console.log("error while searching category name. ", err)
            }
            if(info){
                console.log("Category name already exist.")
            }else{
                CategoryService.Add(newData, (err, category) => {
                    
                    if(err){
                        console.log("err while storing category. ", err);
                    }else{
                        console.log("New Category added successfully. ", categoryHead[i])
                    }
                    
                })
            }
        })

    }

}

