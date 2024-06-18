const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

//to capture payment handler function
exports.capturePayment = async (req, res) => {
  //get courseId and userId
  const { courseId } = req.body;
  const userId = req.user.id;

  //validation
  //valid courseId
  if (!courseId) {
    return res.status(401).json({
      success: false,
      message: "Please provide valid course id",
    });
  }
  //valid courseDetail
  let course;
  try {
    course = await Course.findById(courseId);
    if (!course) {
      return res.status(401).json({
        success: false,
        message: "Could not find the course",
      });
    }
    //user already pay for the same course
    const uid = mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(400).json({
        success: false,
        message: "student is already enrolled",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  //order create
  const amount = course.price;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: courseId,
      userId,
    },
  };
  try {
    const paymentResponse = awaitinstance.orders.create(options);
    console.log(paymentResponse);

    //return response
    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Could not initiate payment",
    });
  }
};

//verify signature of razorpay and server
exports.verifySignature = async (req, res) => {
  const webhookSecret = "123456";

  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("Payment is authorized");

    const { userId, courseId } = req.body.paylod.payment.entity.notes;

    try {
      //find the course and enroll the student
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );
      if (!enrolledCourse) {
        return res.status(500).json({
          success: true,
          message: "Course not found",
        });
      }
      console.log(enrolledCourse);

      //find the student and add the course in list of enrolled course
      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );
      console.log(enrolledStudent);

      //mail send for confirmation of course purchase
      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Mail from CodeHelp",
        "Congralations you have purchased the course"
      );
      console.log(emailResponse);
      return res.status(200).json({
        success: true,
        message: "Signature verified and course purchased",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
};


//Pyment successful email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}