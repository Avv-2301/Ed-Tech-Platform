const Profile = require('../models/Profile');
const User = require('../models/User');
const {imageUploadToCloudinary} = require('../utils/imageUploader')

exports.updateProfile = async(req,res) =>{
    try{
        //get data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;

        //get userid
        const id = req.user.id;

        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:'All Fields required'
            })
        }
        //find profile
        const userdetails = await User.findById(id);
        const profileId = userdetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId)

        //updateProfile
         profileDetails.dateofBirth = dateOfBirth;
         profileDetails.about = about;
         profileDetails.gender = gender;
         profileDetails.contactNumber = contactNumber;
         await profileDetails.save()

         return res.status(200).json({
            success:true,
            message:'Profile updated successfully',
            profileDetails
         })

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//Update profile picture
exports.updateDisplayPicture = async (req, res) => {
    try {
      // REQ
      const displayPicture = req.files.displayPicture
      const authId = req.user.id

      // LOGIC
      const image = await imageUploadToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: authId },
        { image: image.secure_url },
        { new: true }
      )

      // RES
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  

//handler function for delete account
exports.deleteAccount = async(req,res) =>{
    try{
        //get id
        const id = req.user.id;

        //valid id or not
        const userDetails = await User.findById(id)
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //HW: Unenrolled user from all enrolled courses
        //delete user
        await User.findByIdAndDelete({_id:id})

        return res.status(200).json({
            success:true,
            message:'User delete successfully'
        })

    }
    catch(error){
        return res.status(500).json({
            succcess:false,
            message:'User cannot be deleted'
        })
    }
}


//get all user details handler functions
exports.getAllUserDetails = async(req,res) =>{
    try{
        //get user id
        const id =req.user.id

        //validation
        const userDetails = await User.findById(id).populate('additionalDetails').exec()

        //return response
        return res.status(200).json({
            success:true,
            message:'All details of user found successfully',
            userDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to find details',
            error:error.message
        })
    }
}