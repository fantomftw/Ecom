const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/CategoryController')
const BrandController = require('../controller/BrandController')
const TrendController = require('../controller/TrendController')
const ProductController = require('../controller/ProductController')

const permits = require('../handler/oauthorization');
const fileUpload = require('../handler/UploadHandler/FileUpload');

router.get('/category', CategoryController.GetAllCategory);
router.get('/category/status/:level/:id', CategoryController.UpdateStatus);
router.get('/category/:catId/:subCatId', CategoryController.GetAllSubCategoryList);
router.get('/category/:catId', CategoryController.GetAllSubCategory);
router.post('/categorylist/:id', permits('Su'), CategoryController.GetSubCategoryList);
router.post('/category/:catId/:subCatId', permits('Su'), CategoryController.AddSubCategoryList);
router.post('/category/:catId', permits('Su'), CategoryController.AddSubCategory);

router.get('/brand', BrandController.GetAll);
router.get('/brand/status/:_id', BrandController.UpdateStatus);
router.get('/brand/:_id', BrandController.GetById);
router.delete('/brand/:_id', BrandController.DeActivateUser);
router.post('/brand', permits('Su'), fileUpload.uploadBrand.single('image'), BrandController.Add);

router.get('/trend', TrendController.GetAll);
router.get('/trend/status/:_id', TrendController.UpdateStatus);
router.delete('/trend/:_id', TrendController.DeActivateUser);
router.get('/trend/:_id', TrendController.GetById);
router.post('/trend', permits('Su'), fileUpload.uploadTrend.single('image'), TrendController.Add);

router.get('/product/filter', ProductController.GetAllByFilter);
router.get('/product', ProductController.GetAll);
router.post('/product', ProductController.Add);
router.get('/categories/:catid/product/:id', ProductController.GetOneByFilterdId);
router.get('/categories/:catid', ProductController.GetByFilterdId);
router.post('/p_varients/:vid', fileUpload.uploadBrand.any('image'), ProductController.AddImages);


router.post('/productdetails', permits('Su'), ProductController.AddProductDetails);


module.exports = router;