const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { imageUploadToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

//subsection creation handler function
exports.createSubSection = async (req, res) => {
  try {
    //data fetch
    const { sectionId, title, timeDuration, description } = req.body;

    //extract video/file
    const video = req.files.videoFile;

    //validation
    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //upload video to cloudinary
    const uploadDetails = await imageUploadToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    //create a subsection
    const subsectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    //insert subsection Id in section schema
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: subsectionDetails._id,
        },
      },
      { new: true }
    );
    //HW:log updated section here after adding populate query

    //return response
    return res.status(200).json({
      success: true,
      message: "Sub section created successfully",
      updatedSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//updateSubsection

//deleteSubsection
