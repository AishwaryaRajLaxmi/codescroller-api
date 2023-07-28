const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createLevel
module.exports.createLevel = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  description: Joi.string().allow(""),
  slug: Joi.string().required().label("Slug"),
});

// getAllLevel
module.exports.getAllLevels = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
  status: Joi.string().valid("true", "false", "All"),
  searchQuery: Joi.string().allow(""),
});

//getLevelById
module.exports.getLevelById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// Update Level Validation Schema
module.exports.updateLevel = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().trim().allow(""),
  slug: Joi.string().trim().required(),
  status: Joi.boolean(),
});
