const express = require('express');
const router = express.Router();
const CouponController = require('../controller/CouponController')
const permits = require('../handler/oauthorization');

//Get Method Calls

router.post('/', permits('Su'), CouponController.Add)

router.get('/', permits('Su'), CouponController.GetAll)

router.get('/:id', permits('Su'), CouponController.GetById)

router.delete('/:_id', permits('Su'), CouponController.DeActivate)

router.get('/updateStatus/:_id', permits('Su'), CouponController.UpdateStatus)

router.patch('/:id', permits('Su'), CouponController.Update)

module.exports = router;