const mongoose = require('mongoose');
const OrderService = require('../services/OrderService');
const Order = require('../models/Order');
const OrderDetails = require('../models/OrderDetails');
const Order_Status = require('../seed/orderStatus')
const CartService = require('../services/CartService');

exports.GetOrderStatus = (req, res, next) => {
    res.json({
        OrderStatus: Order_Status.Order_Status
    })
}
exports.GetAll = (req, res, next) => {
    if (req.tokenData.data.roles.some(r => ["User"].includes(r))) {
        OrderService.GetAllByFilter({ user_: req.tokenData.data._id }, (err, orders) => {
            if (err) {
                res.json({
                    success: false,
                    err_subject: "Error!",
                    err_message: err
                })
            }
            if (orders) {
                res.json({
                    success: true,
                    success_subject: 'Success!!',
                    success_message: 'Order List',
                    orders
                })
            }
        })
    }
    else {
        OrderService.GetAll((err, orders) => {
            if (err) {
                res.json({
                    success: false,
                    err_subject: "Error!",
                    err_message: err
                })
            }
            if (orders) {
                res.json({
                    success: true,
                    success_subject: 'Success!!',
                    success_message: 'Order List',
                    orders
                })
            }
        })
    }
}
exports.GetById = (req, res, next) => {
    OrderService.GetByFilter({ $or: [{ _id: req.params._id }, { _id: req.params._id }] }, (err, order) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        if (Brand) {
            res.json({
                success: true,
                order
            })
        }
    })
}
exports.GetByStatus = (req, res, next) => {
    if (Order_Status.Order_Status.some(r => [req.params.status].includes(r))) {
        OrderService.GetAllByFilter({ status: req.params.status }, (err, orders) => {
            if (err) {
                res.json({
                    success: false,
                    err_subject: "Error!",
                    err_message: err
                })
            }
            if (orders) {
                console.log(orders);
                res.json({
                    success: true,
                    orders
                })
            }
        })
    }
    else {
        res.json({
            success: false,
            err_subject: "Error!",
            err_message: "Status Is No Applicable"
        })
    }

}
exports.GetByOrderDetails = (req, res, next) => {
    OrderService.GetOneByOrderFilter({ _id: req.params._orderId }, (err, order) => {
        if (err) {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: err
            })
        }
        else if (order) {
            OrderService.GetByDetailFilter({ orderNo_: order._id }, (err, orderDetails) => {
                if (err) {
                    res.json({
                        success: false,
                        err_subject: "Error!",
                        err_message: err
                    })
                }
                else if (orderDetails) {
                    res.json({
                        success: true,
                        success_subject: 'Success!!',
                        success_message: 'orderDetail List',
                        order: [{
                            order,
                            orderDetails: orderDetails
                        }]
                    })
                }
                else {
                    res.json({
                        success: false,
                        err_subject: "Error!",
                        err_message: "order details not found"
                    })
                }
            })
        }
        else {
            res.json({
                success: false,
                err_subject: "Error!",
                err_message: "order id not found"
            })
        }
    })
}
exports.Add = (req, res, next) => {
    CartService.GetAllByFilter({ user_: req.tokenData.data._id }, (err, cart) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(cart);
            if (cart && cart.length) {
                totalCost = 0;
                totalQty = cart.length;
                orderQty = 0;

                cart.forEach(el => {
                    orderQty += parseInt(el.qunatity);
                    totalCost += parseFloat(el.productVariant_.sp) * parseFloat(el.qunatity);
                })
                console.log(totalCost, totalQty, orderQty)
                let newOrder = new Order({
                    _id: mongoose.Types.ObjectId(),
                    overAllCost: totalCost,
                    itemQty: totalQty,
                    orderQty: orderQty,
                    contact_: req.body.contact_,
                    user_: req.tokenData.data._id
                })
                OrderService.AddOrderDetails(newOrder, (err, order) => {
                    if (err) {
                        console.log("error while generating order id", err)
                    }
                    if (order) {
                        cart.forEach((element, index) => {
                            let orderDetailes = new OrderDetails({
                                _id: mongoose.Types.ObjectId(),
                                cost: parseFloat(element.productVariant_.sp) * parseFloat(element.qunatity),
                                qty: element.qunatity,
                                orderNo_: order._id,
                                mrp: element.productVariant_.mrp,
                                sp: element.productVariant_.sp,
                                // discount: element.productVarients_.discount,
                                productVarient_: element.productVariant_._id,
                            })
                            OrderService.AddOrderDetails(orderDetailes, (err, orderDetail) => {

                                if (err) console.log('while storing order details', err);
                                if (orderDetail) {
                                    CartService.DeleteById({ _id: element._id }, (err, del) => {
                                        console.log("Order Details Saved" + index);
                                    })
                                }
                            })
                        });
                        return res.json({
                            success: true,
                            success_subject: 'order Saved',
                            success_message: 'saved'
                        })
                    }
                })
            }
        }
    })

}
exports.UpdateStatus = (req, res, next) => {
    if (Order_Status.Order_Status.some(r => [req.params.status].includes(r))) {
        let update = {
            $set: { status: req.params.status }
        }
        let query = {
            _id: req.params._id
        }
        OrderService.Update(query, update, (err, update) => {
            if (err) {
                res.json({
                    success: false,
                    err_subject: "Error!",
                    err_message: err
                })
            }
            else if (update) {
                res.json({
                    success: true,
                    success_subject: 'Success!!',
                    success_message: 'Order Status Updated',
                })
            }
            else {
                res.json({
                    success: false,
                    err_subject: "Error!",
                    err_message: "Id Not Found"
                })
            }
        })
    }
    else {
        res.json({
            success: false,
            err_subject: "Error!",
            err_message: "Status Is No Applicable"
        })
    }
}