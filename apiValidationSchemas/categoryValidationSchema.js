const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createCategory
module.exports.createCategory = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  image: Joi.string().allow("").label("Image"),
  description: Joi.string().allow("").label("Description"),
  seoTitle: Joi.string().allow("").label("SEO Title"),
  seoDescription: Joi.string().allow("").label("SEO Description"),
});

// getAllCategories
module.exports.getAllCategories = Joi.object({
  page: Joi.number().label("Page"),
  limit: Joi.number().label("Limit"),
  status: Joi.string().valid("true", "false", "All").label("Status"),
  searchQuery: Joi.string().allow("").label("Search Query"),
});

//getCategoryById
module.exports.getCategoryById = Joi.object({
  id: Joi.string().custom(customCallback).label("Id"),
});

// updateCategory
module.exports.updateCategory = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  image: Joi.string().allow("").label("Image"),
  description: Joi.string().allow("").label("Description"),
  seoTitle: Joi.string().allow("").label("SEO Title"),
  seoDescription: Joi.string().allow("").label("SEO Description"),
  status: Joi.boolean().label("Status"),
  isDeleted: Joi.boolean().label("Is Deleted"),
});
