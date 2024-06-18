const Course = require("../models/Course");
const Categories = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

//Handler Function for create course
exports.createCourse = async (req, res) => {
  try {
    //fetch Data
    const { courseName, courseDescription, whatYouWillLearn, price, tag } =
      req.body;

    //thumbnail required
    const thumbnail = req.files.thumbnailImage;

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag
    ) {
      return req.status(401).json({
        success: false,
        message: "All Fields are required",
      });
    }

    //Check if the person is instructor or not
    const userId = req.user.id;
    const instructorDetails = await User.findOne({ userId });
    +console.log("Instructor Details:- ", instructorDetails);

    //if there is no instructor found
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Not Found",
      });
    }

    //check given category is valid or not
    const categoryDetails = await Categories.findById(tag);

    //not tag details
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
        categoryDetails
      });
    }

    //Upload Image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create an entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price: price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    //add the new course to user schema of instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    );

    //update the tag schema
    
    //return response
    return res.status(200).json({
      success: true,
      message: "Course Created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: message.error,
    });
  }
};

//getAllcourses handler function

exports.showAllCourses = async (req, res) => {
  try {
    //finding all courses
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingsAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched Successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch  Course Data",
      error: message.error,
    });
  }
};

//get course details
exports.getCourseDetails = async (req, res) => {
  try {
    //get course id
    const { courseId } = req.body;
    //find course details
    const courseDetails = await Course.find(
      {
        _id: courseId,
      }
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingsAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
    );

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }

    //return response
    return res.status(200).json({
      success:true,
      message:'Course detail fetched successfully',
      data:courseDetails
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
};
