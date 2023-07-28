const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createLanguage
module.exports.createLanguage = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  description: Joi.string().allow("").label("Description"),
  slug: Joi.string().required().label("Slug"),
});

// getAllLanguage
module.exports.getAllLanguages = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
  status: Joi.string().valid("true", "false", "All"),
  searchQuery: Joi.string().allow(""),
});

//getLanguageById
module.exports.getLanguageById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// Update Language Validation Schema
module.exports.updateLanguage = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().trim().allow(""),
  slug: Joi.string().required(),
  status: Joi.boolean(),
});
