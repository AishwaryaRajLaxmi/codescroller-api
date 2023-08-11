const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// registerUser
module.exports.registerUser = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  email: Joi.string().email().trim().required().label("Email"),
  mobile: Joi.string()
    .label("Mobile")
    .regex(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.empty": `"Mobile Number" shld be 10 digitou`,
      "string.pattern.base": `"Mobile Number" must be a valid number`,
      "any.required": `"Mobile Number" is a required field`,
    })
    .label("Mobile"),
  password: Joi.string().min(5).trim().required().label("Password"),
  cPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm Password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

// updateMyPassword
module.exports.updateMyPassword = Joi.object({
  oldPassword: Joi.string().min(5).trim().required().label("Old Password"),
  newPassword: Joi.string().min(5).trim().required().label("New Password"),
  cPassword: Joi.any()
    .equal(Joi.ref("newPassword"))
    .required()
    .label("Confirm Password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

// verifyAccount
module.exports.verifyAccount = Joi.object({
  email: Joi.string().email().trim().required().label("Email"),
  otp: Joi.string().min(4).max(4).label("OTP"),
});

// forgetPassword
module.exports.forgetPassword = Joi.object({
  email: Joi.string().email().trim().required().label("Email"),
});

// findAccountAndSendOTP
module.exports.findAccountAndSendOTP = Joi.object({
  email: Joi.string().email().trim().required().label("Email"),
});

// loginUser
module.exports.loginUser = Joi.object({
  email: Joi.string().email().trim().required().label("Email"),
  password: Joi.string().min(5).trim().required().label("Password"),
});

// getAllUsers
module.exports.getAllUsers = Joi.object({
  page: Joi.number().label("Page"),
  limit: Joi.number().label("Limit"),
  status: Joi.string().valid("true", "false", "All").label("Status"),
  isVerified: Joi.string().valid("true", "false", "All").label("Is Verified"),
  searchQuery: Joi.string().allow("").label("Search query"),
});

// updateUser
module.exports.updateUser = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  email: Joi.string().email().trim().required().label("Email"),

  mobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.empty": `"Mobile Number" should be 10 digit`,
      "string.pattern.base": `"Mobile Number" must be a valid number`,
      "any.required": `"Mobile Number" is a required field`,
    })
    .label("Mobile"),
  status: Joi.boolean().label("Status"),
  isVerified: Joi.boolean().label("Is Verified"),
  isDeleted: Joi.boolean().label("Is Deleted"),
});

// updateMyProfile  for user
module.exports.updateMyProfile = Joi.object({
  name: Joi.string().trim().label("Name"),
  email: Joi.string().email().trim().label("Email"),
  mobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .messages({
      "string.empty": `"Mobile Number" should be 10 digit`,
      "string.pattern.base": `"Mobile Number" must be a valid number`,
      "any.required": `"Mobile Number" is a required field`,
    })
    .label("Mobile"),
  address: Joi.string().label("Address"),
  city: Joi.string().label("City"),
  landmark: Joi.string().label("Landmark"),
  pincode: Joi.string().label("Pincode"),
  state: Joi.string().label("State"),
  dob: Joi.date().required().label("Date Of Birth"),
  gender: Joi.string()
    .trim()
    .required()
    .label("Gender")
    .valid("male", "female", "others"),
});

//getUserById
module.exports.getUserById = Joi.object({
  id: Joi.string().custom(customCallback).label("Id"),
});

//isMobileExists
module.exports.isMobileExists = Joi.object({
  mobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.empty": `"Mobile Number" should be 10 digit`,
      "string.pattern.base": `"Mobile Number" must be valid number`,
      "any.required": `"Mobile Number" is a required field`,
    })
    .label("Mobile"),
});

// isEmailExists
module.exports.isEmailExists = Joi.object({
  email: Joi.string().email().trim().required().label("Email"),
});
