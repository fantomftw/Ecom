const express = require('express');
const router = express.Router();
const CartController = require('../controller/CartController')
const permits = require('../handler/oauthorization');

//Get Method Calls

router.post('/', permits('Su', "User"), CartController.Add)

router.get('/', permits('Su', "User"), CartController.GetAll)

// router.get('/:id', permits('Su', "User"), CartController.GetById)

router.delete('/:cartId', permits('Su', 'User'), CartController.DeleteCartItem)

router.get('/:_id/:qty', permits('Su', "User"), CartController.UpdateQuantity)

// router.patch('/:id', permits('Su', "User"), CartController.Update)

module.exports = router;