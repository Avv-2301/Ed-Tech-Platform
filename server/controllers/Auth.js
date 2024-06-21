const User = require("../models/User"); // To extract the user form User Model
const OTP = require("../models/OTP"); // To save the OTP in the model
const otpGenerator = require("otp-generator"); // To generate OTP
const bcrypt = require('bcrypt'); // To hash the password
const jwt = require('jsonwebtoken'); //To send the token
const Profile = require('../models/Profile')
require('dotenv').config()

// send OTP
exports.sendOTP = async (req, res) => {
  try {
    // fetch email from request ki body
    const { email } = req.body;

    //check if user already exist
    const checkUserPresent = await User.findOne({ email });

    // if user is already present
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User Already Present",
      });
    }

    // generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generated: ", otp);

    // check unique otp or not
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }

    // creating a payload for otp
    const otpPayload = { email, otp };

    //create a entry for otp
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      message: "otp sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//signUp
exports.signUp = async (req, res) => {
  try {
    // fetch data from request ki body
    const {
      firstName,
      lastName,
      email,
      accountType,
      password,
      confirmPassword,
      otp,
      contactNumber,
    } = req.body;

    // validate fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields required",
      });
    }
    // validate password and confirm Password
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password Values Does not Match",
      });
    }
    // check user already exist or not
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }
    //find the most recent otp stored from the user
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);
    //validate otp
    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP Not Found",
      });
    } else if (otp !== recentOtp[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    // create entry in DB
    const user = await User.create({
      firstName,
      lastName,
      email,
      accountType,
      password: hashedPassword,
      contactNumber,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // return Response
    return res.status(200).json({
      succes: true,
      user,
      message: "User created Succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot registered. Please try again",
    });
  }
};


//Login
exports.login = async (req,res) =>{
    try{
        // fetch data fron request ki body
        const {email,password} = req.body;

        // validate fields
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:'Please fill all the fields'
            })
        }

        // check user exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User is not registerd. Please try again'
            })
        }

        // match the password and then generate token
        if(await bcrypt.compare(password, user.password)){

            // create payload 
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token  = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"24h"
            })
            user.token = token;
            user.password = undefined;

            // create cookie
            //create options
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                user,
                token,
                message:"Logged In Successfully"
            });
        }
        else{
            return res.status(401).json({
                success:false,
                message:'Passwod is Incorrect'
            })
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Login Failure"
        })
    }
}

//changePassword
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id)

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    )
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" })
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      )
      console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}
