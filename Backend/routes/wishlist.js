const express = require('express');
const router = express.Router();
const WishlistController = require('../controller/WishlistController')
const permits = require('../handler/oauthorization');

//Get Method Calls

router.get('/:pid', permits('Su', "User"), WishlistController.Add)

router.get('/', permits("User"), WishlistController.GetAll)

// router.get('/:id', permits('Su', "User"), CartController.GetById)

router.delete('/:wishId', permits('Su', 'User'), WishlistController.DeleteWishlistItem)

// router.get('/:_id/:qty', permits('Su', "User"), CartController.UpdateQuantity)

// router.patch('/:id', permits('Su', "User"), CartController.Update)

module.exports = router;