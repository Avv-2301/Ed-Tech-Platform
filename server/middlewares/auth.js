const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../models/User');


//auth
exports.auth = async(req,res, next) =>{
    try{
        // extract token
        const token = req.cookies.token 
                        ||req.body.token
                        ||req.header("Authorization").replace("Bearer ", "")

        // if token missing return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token Is missing"
            });
        }

        // verify token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode)
            req.user = decode
        }
        catch(error){
            // verification issue
            return res.status(500).json({
                success:false,
                message:'Token is Invalid'
            })
        }
        next();
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'Something went wrong while validating Token'
        })
    }
}


//isStudent
exports.isStudent = async(req, res, next) =>{
    try{
        if(req.user.accountType !== "Students"){
            return res.status(401).json({
                success:false,
                message:'This is protected route for students only'
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role canot be verified'
        })
    }
}


//isInstructor
exports.isInstructor = async(req, res, next) =>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:'This is protected route for Instructor only'
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role canot be verified'
        })
    }
}



//isAdmin
exports.isAdmin = async(req, res, next) =>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:'This is protected route for Admin only'
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role canot be verified'
        })
    }
}