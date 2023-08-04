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
  page: Joi.string().label("Page"),
  limit: Joi.string().label("Limit"),
  status: Joi.string().valid("true", "false", "All").label("Status"),
  searchQuery: Joi.string().allow("").label("Search Query"),
  category: Joi.string().custom(customCallback).label("Category"),
});

// getSubCategoryById
module.exports.getSubCategoryById = Joi.object({
  id: Joi.string().custom(customCallback).label("Id"),
});

// updateSubCategory
module.exports.updateSubCategory = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  description: Joi.string().allow("").label("Description"),
  seoTitle: Joi.string().allow("").label("SEO Title"),
  seoDescription: Joi.string().allow("").label("SEO Description"),
  category: Joi.custom(customCallback).required().label("Category"),
  status: Joi.boolean().label("Status"),
});
