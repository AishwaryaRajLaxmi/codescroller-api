const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createLevel
module.exports.createLevel = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  description: Joi.string(),
  isDeleted: Joi.boolean().required(),
  status: Joi.boolean().required(),
});

// getAllLevel
module.exports.getAllLevels = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
  status: Joi.boolean(),
});

//getLevelById
module.exports.getLevelById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// Update Level Validation Schema
module.exports.updateLevel = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().trim(),
  status: Joi.boolean(),
});
