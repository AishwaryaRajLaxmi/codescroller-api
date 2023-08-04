const Joi = require("joi");

// registerAdmin
module.exports.registerAdmin = Joi.object({
  name: Joi.string().trim().required().min(3).label("Name"),
  email: Joi.string().email().trim().required().label("Email"),
  password: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&@? "])[a-zA-Z0-9!#$%&@?]{6,20}$/
    )
    .required()
    .min(6)
    .messages({
      "string.empty": `"Password" must not be empty`,
      "string.pattern.base": `"Pasword" must be a mix of number, char, and special char`,
    })
    .label("Password"),
});

// loginAdmin
module.exports.loginAdmin = Joi.object({
  email: Joi.string().email().trim().required().label("Email"),
  password: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&@? "])[a-zA-Z0-9!#$%&@?]{6,20}$/
    )
    .required()
    .min(6)
    .messages({
      "string.empty": `"Password" must not be empty`,
      "string.pattern.base": `"Pasword" must be a mix of number, char, and special char`,
    })
    .label("Password"),
});

// updateProfile
module.exports.updateProfile = Joi.object({
  name: Joi.string().trim().label("Name"),
  email: Joi.string().email().trim().label("Email"),
  mobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .messages({
      "string.empty": `"Mobile" must contain value`,
      "string.pattern.base": `"Mobile" must be a valid Number`,
    })
    .label("Mobile"),

  password: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&@? "])[a-zA-Z0-9!#$%&@?]{6,20}$/
    )
    .min(6)
    .messages({
      "string.empty": `"Password" must not be empty`,
      "string.pattern.base": `"Password" must be a mix of number, char, and special char`,
    })
    .label("Password"),
  oldPassword: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&@? "])[a-zA-Z0-9!#$%&@?]{6,20}$/
    )
    .min(6)
    .messages({
      "string.empty": `"oldPassword" must not be empty`,
      "string.pattern.base": `"oldPassword" must be a mix of number, char, and special char`,
    })
    .label("Old Password"),
});

// findAccount
module.exports.findAccount = Joi.object({
  email: Joi.string().email().trim().required().label("Email"),
});

// verifyOTP
module.exports.verifyOTP = Joi.object({
  email: Joi.string().email().trim().required().label("Email"),
  otp: Joi.string().trim().required().min(4).label("OTP"),
});

// createNewPassword
module.exports.createNewPassword = Joi.object({
  password: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&@? "])[a-zA-Z0-9!#$%&@?]{6,20}$/
    )
    .required()
    .min(6)
    .messages({
      "string.empty": `"Password" must not be empty`,
      "string.pattern.base": `"Pasword" must be a mix of number, char, and special char`,
    })
    .label("Password"),
  cPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm Password")
    .options({ messages: { "any.only": "{{#label}} does not match" } }),
});
