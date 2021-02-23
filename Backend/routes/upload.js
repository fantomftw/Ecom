const express = require('express');
const router = express.Router();
const permits = require('../handler/oauthorization');
const fileUpload = require('../handler/UploadHandler/FileUpload');

router.post('/', permits('Su', 'Admin'), fileUpload.upload.single('image'), (req, res, next) => {
    res.json({
        success: true,
        imageUrl: req.file.path
    })
});


router.post('/banner', permits('Su', 'Admin'), fileUpload.bannerUpload.single('image'), (req, res, next) => {
    console.log(req.file.path)
    res.json({
        success: true,
        imageUrl: req.file.path
    })
});

router.post('/staff', permits('Su', 'Admin'), fileUpload.staffUpload.single('image'), (req, res, next) => {
    res.json({
        success: true,
        imageUrl: req.file.path
    })
});

router.post('/company', permits('Su', 'Admin'), fileUpload.companyUpload.single('image'), (req, res, next) => {
    res.json({
        success: true,
        imageUrl: req.file.path
    })
});

router.post('/requestRef', permits('Su', 'Admin', 'User'), fileUpload.serviceRequestUpload.single('image'), (req, res, next) => {
    console.log(req.file)
    res.json({
        success: true,
        imageUrl: req.file.path
    })
});
module.exports = router;