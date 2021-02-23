const express = require('express');
const router = express.Router();
const ContactController = require('../controller/ContactController')
const permits = require('../handler/oauthorization');

router.get('/:id?', ContactController.GetByUserId)

router.post('/', ContactController.AddOrUpdateContact)

module.exports = router;