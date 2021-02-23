const multer = require('multer');
const mkdirp = require('mkdirp')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        const dir = './uploads/brands';
        mkdirp(dir, err => cb(err, dir));
        // cb(null, dir);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// const brandStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         console.log('file param', file)
//         console.log("file --- ", req.files);
//         const dir = './uploads/brands';
//         mkdirp(dir, err => cb(err, dir));
//         cb(null, dir);
//     },
//     filename: (req, file, cb) => {
//         console.log(file);
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
const brandStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        const dir = './uploads/service/book';
        mkdirp(dir, err => cb(err, dir));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const trendStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        const dir = './uploads/trends';
        mkdirp(dir, err => cb(err, dir));
        // cb(null, dir);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const serviceRequestStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        const dir = './uploads/request';
        mkdirp(dir, err => cb(err, dir));
        // cb(null, dir);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const staffStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        const dir = './uploads/staff';
        mkdirp(dir, err => cb(err, dir));
        // cb(null, dir);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const bannerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        const dir = './uploads/banner';
        mkdirp(dir, err => cb(err, dir));
        // cb(null, dir);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const companyStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        const dir = './uploads/company';
        mkdirp(dir, err => cb(err, dir));
        // cb(null, dir);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1000
    },
    fileFilter: fileFilter
});

module.exports.uploadBrand = multer({
    
    storage: brandStorage,
    limits: {
        fileSize: 1024 * 1024 * 1000
    },
    fileFilter: fileFilter
});
module.exports.uploadTrend = multer({
    storage: trendStorage,
    limits: {
        fileSize: 1024 * 1024 * 1000
    },
    fileFilter: fileFilter
});

const bannerUpload = multer({
    storage: bannerStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const staffUpload = multer({
    storage: staffStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const companyUpload = multer({
    storage: companyStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const serviceRequestUpload = multer({
    storage: serviceRequestStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

module.exports.upload = upload;
module.exports.bannerUpload = bannerUpload;
module.exports.staffUpload = staffUpload;
module.exports.companyUpload = companyUpload;
module.exports.serviceRequestUpload = serviceRequestUpload;