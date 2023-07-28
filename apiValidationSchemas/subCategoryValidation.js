const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createSubCategory
module.exports.createSubCategory = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  description: Joi.string().allow("").label("Description"),
  seoTitle: Joi.string().allow("").label("SEO Title"),
  seoDescription: Joi.string().allow("").label("SEO Description"),
  category: Joi.custom(customCallback).required().label("Category"),
});

// getAllSubCategories
module.exports.getAllSubCategories = Joi.object({
  page: Joi.string(),
  limit: Joi.string(),
  status: Joi.string().valid("true", "false", "All"),
  searchQuery: Joi.string().allow(""),
});

//getSubCategoryById
module.exports.getSubCategoryById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// updateSubCategory
module.exports.updateSubCategory = Joi.object({
  name: Joi.string().trim().label("Name"),
  slug: Joi.string().trim().label("Slug"),
  description: Joi.string().trim().allow("").label("Description"),
  seoTitle: Joi.string().trim().allow("").label("SEO Title"),
  seoDescription: Joi.string().trim().allow("").label("SEO Description"),
  category: Joi.custom(customCallback).required().label("Category"),
  status: Joi.boolean().required().label("Status"),
});
