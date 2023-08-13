const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// Create Purchased Course Validation Schema
module.exports.createPurchasedCourse = Joi.object({
  course: Joi.string().custom(customCallback).required().label("Course ID"),
  courseName: Joi.string().trim().required().label("Course Name"),
  courseMrp: Joi.number().required().label("Course MRP"),
  thumbnail: Joi.string().required().label("Thumbnail"),
  courseSellingPrice: Joi.number().required().label("Course Selling Price"),
  couponCode: Joi.string().trim().label("Coupon Name").allow(""),
  discountWithCouponAmount: Joi.number().label("Discount With Coupon Amount"),
  cGstAmount: Joi.number().label("CGST Amount"),
  sGstAmount: Joi.number().label("SGST Amount"),
  totalAmount: Joi.number().required().label("Total Amount"),
  subTotalAmount: Joi.number().required().label("Sub Total Amount"),
  isPaid: Joi.boolean().label("Is Paid"),
  courseValidity: Joi.string().required().label("Course Validity"),
  isReturnable: Joi.boolean().required().label("Is Returnable"),
  returnBy: Joi.string().valid("user", "admin").label("Return By"),
  returnMessage: Joi.string().label("Return Message"),
  paymentId: Joi.string().label("Payment ID"),
  paymentRequestId: Joi.string().label("Payment Request ID"),
});

// Get Purchased Course By ID Validation Schema
module.exports.getPurchasedCourseById = Joi.object({
  id: Joi.string().custom(customCallback).required().label("ID"),
});

// getUsersByCourse
module.exports.getUsersByCourse = Joi.object({
  courseId: Joi.string().custom(customCallback).required().label("ID"),
});

// Get All Purchased Courses Validation Schema

module.exports.getAllPurchasedCourses = Joi.object({
  page: Joi.number().label("Page"),
  limit: Joi.number().label("Limit"),
  searchQuery: Joi.string().label("Search Query"),
  courseMrp: Joi.number().label("Course Mrp"),
  courseSellingPrice: Joi.number().label("Course Selling Price"),
  couponName: Joi.string().label("Coupon Name"),
  courseStatus: Joi.string()
    .label("Purchased Course")
    .valid("purchased", "returned", "All"),
  status: Joi.string().valid("true", "false", "All").label("Status"),
  course: Joi.string().custom(customCallback),
  user: Joi.string().custom(customCallback),
});

// Update Purchased Course Validation Schema
module.exports.updatePurchasedCourse = Joi.object({
  status: Joi.boolean().label("Status").required(),
});

