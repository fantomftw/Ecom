const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController')
const permits = require('../handler/oauthorization');
// const fileUpload = require('../handler/imageUpload');

//Registration Of Users
router.post('/signup', UserController.Add);

router.post('/signin', UserController.SignIn);

//Get Method Calls
router.get('/profile', permits('User'), UserController.GetUserProfile);

router.get('/type/:role', permits('Su', 'Admin'), UserController.GetList);

router.get('/roles/:role', permits('Su', 'Admin'), UserController.GetRole)

router.get('/:id', permits('Su', 'Admin'), UserController.GetById);

router.get('/statusUpdate/:_id', permits('Su', 'Admin'), UserController.UpdateStatus);

router.delete('/:_id', permits('Su', 'Admin'), UserController.DeActivateUser);

router.patch('/:id', permits('Su', 'Admin'), UserController.Update);

router.get('/verify/:verify', UserController.VerifyUser)

router.post('/resetpassword', UserController.UpdatePassword)

module.exports = router;