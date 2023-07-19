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
      "string.empty": `"Mobile Number" should be 10 digit`,
      "string.pattern.base": `"Mobile Number" must be a valid number`,
      "any.required": `"Mobile Number" is a required field`,
    }),
  password: Joi.string().min(5).trim().required(),
  cPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm Password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

// loginUser
module.exports.loginUser = Joi.object({
  email: Joi.string().email().trim().required().label("Email"),
  password: Joi.string().min(5).trim().required().label("Password"),
});

// getAllUsers
module.exports.getAllUsers = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
  status: Joi.boolean(),
  isVerified: Joi.boolean(),
  query: Joi.string(),
});

//getUserById
module.exports.getUserById = Joi.object({
  id: Joi.string().custom(customCallback),
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
    }),
});

// isEmailExists
module.exports.isEmailExists = Joi.object({
  email: Joi.string().email().trim().required(),
});
