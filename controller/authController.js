const express = require("express");
const authRouter = express.Router();
const userModel = require('../models/userModel');
const jwt=require('jsonwebtoken');
const JWT_KEY=require('../secret/secrets.js');
//user sign up
module.exports.signup=async function signup(req,res){
    try {
        let dataObj=req.body;
        let user=await userModel.create(dataObj);
        if(user){
            return res.json({
                message:'User Signed Up',
                data:user
            });
        }
        else{
            res.json({
                message:'Error !'
            });
        }
        res.json({
            message:'User Signed Up',
            data:user
        });
    } catch (error) {
        res.status({
            message:error.message
        })
    }
}
//user login
module.exports.login=async function login(req, res) {
    try{
        let data = req.body;
        if (data.email){
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                if (user.password == data.password) {
                    let uid=user['_id'];
                    let token=jwt.sign({payload:uid},JWT_KEY);
                    res.cookie('login',token,{httpOnly:true});
                    return res.json({
                        message: "User has been logged in",
                        userDetails: data,
                    });
                } else {
                    return res.json({
                        message: "Invalid"
                    });
                }
            } else {
                return res.json({
                    message: "User not found"
                });
            }
        }else{
            return res.json({
                message: "Please enter the email"
            });
        }
    } catch (error) {
        return res.json({
            message: error.message
        });
    }
}

//isauthorised function-check user role
module.exports.isAuthorised=function isAuthorised(roles){
    return function(req,res,next){
        if(roles.includes(req.role)==true){
            next();
        }
        else{
            res.status(401).json({
                message:'operation not allowed!'
            });
        }
    };
};
//protectRoute
module.exports.protectRoute=async function protectRoute(req,res,next){
    try {
        let token;
        if(req.cookies.login){
            console.log(req.cookies);
            token=req.cookies.login;
            let payload=jwt.verify(token,JWT_KEY);
            if(payload){
                console.log('payload token',payload);
                const user=await userModel.findById(payload.payload);
                req.role=user.role;
                req.id=user.id;
                console.log(req.role,req.id);
                next();
            }
            else{
                return res.json({
                    message:'Please Login again'
                });
            }
        }
        else{
            res.json({
                message:'Please Login'
            });
        }
    } catch (err) {
        return res.json({
            message:err.message
        });
    }
};