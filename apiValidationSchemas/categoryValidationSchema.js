const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createCategory
module.exports.createCategory = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  image: Joi.string().allow(""),
  description: Joi.string().allow(""),
  seoTitle: Joi.string().allow(""),
  seoDescription: Joi.string().allow(""),
});

// getAllCategories
module.exports.getAllCategories = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
  status: Joi.string().valid("true", "false", "All"),
  searchQuery: Joi.string().allow(""),
});

//getCategoryById
module.exports.getCategoryById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// updateCategory
module.exports.updateCategory = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  image: Joi.string().allow(""),
  description: Joi.string().allow(""),
  seoTitle: Joi.string().allow(""),
  seoDescription: Joi.string().allow(""),
  status: Joi.boolean(),
});
