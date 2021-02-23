const mongoose = require('mongoose');
const UserSchema = require('../models/User');
const UserService = require('../services/UserService');
const config = require('config')
const Token = require('../handler/genToken');
const roleList = require('../seed/Roles');
const Email = require('../handler/node-mailer');


exports.GetList = (req, res, next) => {
    let roleListControl;
    // console.log(req.tokenData.data.roles.some(r=> ["Su"].includes(r)))
    // if(req.tokenData.data.roles.some(r=> ["Su"].includes(r))){
    //     roleListControl=roleList.AppAdminUserRoles;

    // }else{
    //     res.status(404).json({
    //         success:false,
    //         err_subject:"Error !!",
    //         err_message:"Oops something went wrong, Please check your URL call."
    //     })
    // }

    if (req.tokenData.data.roles.some(r => ["Su"].includes(r))) {
        if (req.params.role == "Admin") {
            let tempRole = roleList.AppAdminRoles;
            tempRole = tempRole.concat(roleList.AppAdminUserRoles);
            roleListControl = tempRole;
        } else if (req.params.role == "Employee") {
            roleListControl = roleList.AppEmployeeRoles;
        } else if (req.params.role == "User") {
            roleListControl = roleList.AppUserRoles;
            console.log("Fetching user with User role")
        } else {
            res.status(404).json({
                success: false,
                err_subject: "Error !!",
                err_message: "Oops something went wrong."
            })
        }
        console.log(roleListControl)
        UserService.GetListByRole(roleListControl, (err, user) => {
            // if(typeof user != "undefined" && user != null && user.length != null && user.length){
            //     console.log(user)
            //     res.json({
            //         success:true,
            //         user
            //     })
            // }else{
            //     console.log("There are no user to your account")
            //     res.json({
            //         success:false
            //     })
            // }
            res.json({
                success: true,
                user
            })
        })
    }

}
exports.GetById = (req, res, next) => {
    let id = req.params.id
    UserService.GetByID(id, (err, user) => {
        res.json({
            success: true,
            user
        })
    })
}
exports.GetRole = (req, res, next) => {
    if (req.params.role == "Admin") {
        let tempRole = roleList.AppAdminRoles;
        tempRole = tempRole.concat(roleList.AppAdminUserRoles);
        roleListControl = tempRole;
        res.json({
            success: true,
            roles: roleListControl
        })
    } else if (req.params.role == "Employee") {
        roleListControl = roleList.AppEmployeeRoles;
        res.json({
            success: true,
            roles: roleListControl
        })
    } else if (req.params.role == "User") {
        roleListControl = roleList.AppUserRoles;
        res.json({
            success: true,
            roles: roleListControl
        })
    } else {
        res.status(404).json({
            success: false,
            err_subject: "Error !!",
            err_message: "Oops something went wrong. Invalid Role Search"
        })
    }
}
exports.Add = (req, res, next) => {
    console.log("Creating User");
    let formData = new UserSchema({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
        roles: ['User'],
        salt: config.get('App.SALT_ROUNDS'),
        provider: 'Local'
    })
    console.log(formData)
    UserService.Add(formData, (err, user) => {
        if (err) {
            let message = [];
            console.log(err);
            if (err.errors.name) message.push("Name is required.")
            if (err.errors.password) message.push("Password is required.")
            if (err.errors.email) message.push("Invalid Email Address or Already Taken.")
            if (err.errors.contact) message.push("Invalid Email Address or Already Taken.")
            return res.json({
                success: false,
                err_subject: "Error !!",
                err_message: message
            })
        } else {
            return res.json({
                success: true,
                success_subject: "Success !!",
                success_message: "You have successfully registered the user."
            })
        }
    })

}
exports.SignIn = (req, res, next) => {
    UserService.findUserByRole(req.body.email, req.body.email, (err, user) => {
        if (err) {
            res.status(200).json({
                success: false,
                err_subject: "Authentication Error",
                err_message: err
            })
        }
        if (!user) {
            console.log("Invalid email, username, password");
            res.status(200).json({
                success: false,
                err_subject: "Authentication Error",
                err_message: "Invalid Authentication, Please check your login name and password"
            });
        }
        if (user) {
            console.log(user);
            UserService.comparePassword(req.body.password, user.password, (err, isMatch) => {
                if (err) {
                    console.log("Invalid Password")
                    res.status(200).json({
                        success: false,
                        err_subject: "Authentication Error",
                        err_message: "Invalid Authentication, Please check your login name and password"
                    });
                }
                if (isMatch) {
                    console.log("user found", user)
                    // console.log(user)
                    const token = Token.generateToken(user);
                    // console.log(token);
                    return res.json({
                        success: true,
                        // user:user,
                        role: user.roles,
                        token: "JWT " + token
                    })

                } else {
                    return res.status(200).json({
                        success: false,
                        err_subject: "Authentication Error",
                        err_message: "Wrong Password"
                    })
                }
            })
        }
    })
}
exports.UpdateStatus = (req, res, next) => {
    console.log(req.params._id)
    UserService.GetByID(req.params._id, (err, user) => {
        if (user) {
            if (user.status == "Active") {
                UserService.updateUserStatus(req.params._id, 'InActive', (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error..",
                            err_message: err
                        })
                    }
                    if (data) {
                        res.json({
                            success: true,
                            success_subject: "Success!!",
                            success_message: "User Status InActivated Successfully."
                        })
                    }
                })
            } else if (user.status == "InActive") {

                UserService.updateUserStatus(req.params._id, 'Active', (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error..",
                            err_message: err
                        })
                    }
                    if (data) {
                        res.json({
                            success: true,
                            success_subject: "Success!!",
                            success_message: "User Status Activated Successfully."
                        })
                    }
                })
            } else if (user.status == "DeActivate") {
                UserService.updateUserStatus(req.params._id, 'Active', (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error..",
                            err_message: err
                        })
                    }
                    if (data) {
                        res.json({
                            success: true,
                            success_subject: "Success!!",
                            success_message: "User Status Activated Successfully."
                        })
                    }
                })

            }
        }
        if (err) {
            res.json({
                success: false,
                err_subject: 'unhandled',
                err_message: err
            })
        }
    });
}
exports.DeActivateUser = (req, res, next) => {
    console.log(req.params._id)
    UserService.deactivateUser(req.params._id, (err, success) => {
        if (err) {
            res.json({
                success: false,
                err_subject: 'Error!!',
                err_message: 'Oops Something went wrong, Please contact your admin'
            })
        }
        if (success) {
            res.json({
                success: true,
                success_subject: 'Success!!',
                success_message: 'Account Deactivated Successfully'
            })
        }
    })
}
exports.Update = (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    UserService.GetByID(id, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                err_subject: 'Error',
                err_message: "No user found, If you found any issue please contact to technical team."
            })
        } else {
            UserService.Update(id, updateOps, (err, data) => {
                if (err) {
                    let message = [];
                    console.log(err);
                    if (err.errors.name) message.push("Name is required.")
                    if (err.errors.email) message.push("Invalid Email Address or Already Taken.")
                    if (err.errors.contact) message.push("Invalid Email Address or Already Taken.")
                    return res.json({
                        success: false,
                        err_subject: "Error !!",
                        err_message: message
                    })
                } else {
                    Email.sendTo(user.email, "Service Management System", "You Account has updated successfully <br> below are the update details <br>" + updateOps)
                    return res.json({
                        success: true,
                        success_subject: "Success !!",
                        success_message: "You have successfully Updated the user."
                    })
                }
            })

        }
    })
}
exports.VerifyUser = (req, res, next) => {
    UserService.verifyUser(req.params.verify, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(200).json({
                success: false,
                message: err
            })
        }
        if (!user) {
            return res.status(200).json({
                success: false,
                message: "No User found"
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Already Taken"
            })
        }
    })
}
exports.UpdatePassword = (req, res, next) => {
    console.log("processing reset")
    console.log(req.body.user)
    console.log(req.body.password)


    UserService.verifyUser(req.body.user, (err, user) => {
        console.log(user)
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Oops something went wrong.."
            })
        }
        if (user) {
            UserService.SetPassword(user._id, req.body.password, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(200).json({
                        success: false,
                        message: err
                    })
                }
                else {
                    return res.status(200).json({
                        success: true,
                        message: "Password reset successfully"
                    })
                }
            })
        } else {
            res.json({
                success: false,
                message: "You are not registered yet."
            })
        }

    })


}
exports.GetUserProfile = (req, res, next) => {
    if (req.tokenData.data.roles.some(r => ["User"].includes(r))) {
        UserService.GetClientProfile(req.tokenData.data._id, (err, profile) => {
            if (err) {
                res.json(
                    {
                        status: false,
                        error: err
                    }
                )
            }
            if (profile) {
                res.json({
                    status: true,
                    profile: profile
                })
            } else {
                res.json({
                    status: false,
                    err_subject: 'Error!!',
                    err_message: "Oops something went wrong, No User found."
                })
            }

        })
    }

}