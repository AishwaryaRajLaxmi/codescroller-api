const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createLanguage
module.exports.createLanguage = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  description: Joi.string(),
  isDeleted: Joi.boolean().required(),
  status: Joi.boolean().required(),
});

// getAllLanguage
module.exports.getAllLanguages = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
  status: Joi.boolean(),
});

//getLanguageById
module.exports.getLanguageById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// Update Language Validation Schema
module.exports.updateLanguage = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().trim(),
  status: Joi.boolean(),
});
