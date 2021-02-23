const express = require('express');
const router = express.Router();
const OrderController = require('../controller/OrderController')
const permits = require('../handler/oauthorization');

//Get Method Calls

router.get('/orderstatus', permits('User', 'Su'), OrderController.GetOrderStatus)

router.post('/', permits('User', 'Su'), OrderController.Add)

router.get('/', permits('User', 'Su'), OrderController.GetAll)

router.get('/:id', permits('User', 'Su'), OrderController.GetById)

router.get('/getbystatus/:status', permits('User', 'Su'), OrderController.GetByStatus)

router.get('/details/:_orderId', permits('User', 'Su'), OrderController.GetByOrderDetails)

router.get('/updatestatus/:_id/:status', permits('Su', 'User'), OrderController.UpdateStatus)

module.exports = router;    