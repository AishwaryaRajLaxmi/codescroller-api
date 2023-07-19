const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createCategory
module.exports.createCategory = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().required(),
  image: Joi.string(),
  description: Joi.string(),
  seoTitle: Joi.string(),
  seoDescription: Joi.string(),
  status: Joi.boolean(),
  isDeleted: Joi.boolean().required(),
});

// getAllCategories
module.exports.getAllCategories = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
  status: Joi.boolean(),
});

//getCategoryById
module.exports.getCategoryById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// Update Category Validation Schema
module.exports.updateCategory = Joi.object({
  name: Joi.string().trim(),
  slug: Joi.string().trim(),
  image: Joi.string().trim(),
  description: Joi.string().trim(),
  seoTitle: Joi.string().trim(),
  seoDescription: Joi.string().trim(),
  status: Joi.boolean(),
});
