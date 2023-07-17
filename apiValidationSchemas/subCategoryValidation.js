const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createSubCategory
module.exports.createSubCategory = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().required(),
  image: Joi.string(),
  description: Joi.string(),
  seoTitle: Joi.string(),
  seoDescription: Joi.string(),
  category: Joi.custom(customCallback),
  status: Joi.boolean(),
  isDeleted: Joi.boolean().required(),
});

// getAllSubCategories
module.exports.getAllSubCategories = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
  status: Joi.boolean(),
});

//getSubCategoryById
module.exports.getSubCategoryById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// UpdateSubCategory Validation Schema
module.exports.updateSubCategory = Joi.object({
  name: Joi.string().trim(),
  slug: Joi.string().trim(),
  image: Joi.string().trim(),
  description: Joi.string().trim(),
  seoTitle: Joi.string().trim(),
  seoDescription: Joi.string().trim(),
  status: Joi.boolean(),
});
