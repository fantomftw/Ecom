const mongoose = require('mongoose');
const ContactSchema = require('../models/Contact');
const ContactService = require('../services/ContactService')

exports.AddOrUpdateContact = (req, res, next) => {
    if (!req.body._id) {
        let newContact = new ContactSchema({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode,
            landmark: req.body.landmark,
            type: req.body.type,
            user_: req.body.user_
        })
        ContactService.AddNew(newContact, (err, contact) => {
            if (err) {
                res.json({
                    status: false,
                    err_subject: "Error!!",
                    err_subject: err
                })
            }
            else if (contact) {
                res.json({
                    status: true,
                    success_subject: 'Success!!',
                    success_message: 'Record Added Successfully',
                    contact
                })
            }
            else {
                res.json({
                    status: false,
                    err_subject: "Error!!",
                    err_subject: "No Related Data Found!!"
                })
            }
        })
    }
    else {
        let updateContact = {
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode,
            landmark: req.body.landmark,
            type: req.body.type,
            user_: Contact.user_
        }
        ContactService.findByIdAndUpdate(req.body._id, updateContact, (err, contact) => {
            if (err) {
                res.json({
                    status: false,
                    err_subject: "Error!!",
                    err_subject: err
                })
            }
            else if (contact) {
                res.json({
                    status: true,
                    success_subject: 'Success!!',
                    success_message: 'Record Updated Successfully',
                })
            }
            else {
                res.json({
                    status: false,
                    err_subject: "Error!!",
                    err_subject: "Address is not valid!!"
                })
            }

        })
    }
}
exports.GetByUserId = (req, res, next) => {
    let id = {}
    if (req.params.id)
        id = { $or: [{ user_: req.params.id }, { _id: req.params.id }] }
    ContactService.GetAll(id, (err, contacts) => {
        if (err) {
            res.json({
                status: false,
                err_subject: "Error!!",
                err_subject: err
            })
        }
        else if (contacts) {
            res.json({
                status: true,
                success_subject: 'Success!!',
                success_message: 'Contact Found',
                contacts
            })
        }
        else {
            res.json({
                status: false,
                err_subject: "Error!!",
                err_subject: "No Related Data Found!!"
            })
        }
    })
}