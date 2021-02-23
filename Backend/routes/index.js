const express = require('express');
const router = express.Router();

//Defining routes after /api

router.use('/user', require('./user'));

router.use('/catalog', require('./category'));

router.use('/upload', require('./upload'));

router.use('/coupon', require('./coupon'));

router.use('/order', require('./order'));

router.use('/cart', require('./cart'));

router.use('/contact', require('./contact'));

router.use('/wishlist', require('./wishlist'));

router.use('/public', require('./public/index '));


module.exports = router;