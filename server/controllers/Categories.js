const Category = require("../models/Category");

//creating Handler Funcion for Tag
exports.createCategory = async (req, res) => {
  try {
    //getting name, description from request body
    const { name, description } = req.body;

    // validating name and description fields
    if (!name || !description) {
      return res.status(401).json({
        success: false,
        message: "All fields required",
      });
    }

    //create entry in DB
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(categoryDetails);

    return res.status(200).json({
      success: true,
      message: "Category Entry Created Successfully",
      categoryDetails
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get allCategories handler Function

exports.showAllCategory = async (req, res) => {
  try {
    const allCategories = await Category.find({}, { name: true, description: true });
    return res.status(200).json({
      success: true,
      message: "All Category Returned SuccessFULLY",
      data:allCategories
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Category Page Details
exports.categoryPageDetails = async (req, res) => {
  try {
    //get category id
    const { categoryId } = req.body;

    //get courses according to specific id
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();

    //validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    //get courses for different categories
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();
    //get top selling courses
    //return response
    return res.status(200).json({
        success:true,
        data:{
            selectedCategory,
            differentCategories
        }
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
        success:false,
        message:error.message
    })
  }
};
