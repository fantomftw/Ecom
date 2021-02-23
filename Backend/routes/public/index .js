const express = require('express');
const router = express.Router();
const CategoryController = require('../../controller/CategoryController')
const BrandController = require('../../controller/BrandController')
const TrendController = require('../../controller/TrendController')
const ProductController = require('../../controller/ProductController')

//Defining routes after /api

router.get('/category', CategoryController.GetAllCategoryForPublic);
// router.use('/catalog', require('./category'));


// router.use('/upload', require('./upload'));

// router.use('/c', require('./public'));
module.exports = router;