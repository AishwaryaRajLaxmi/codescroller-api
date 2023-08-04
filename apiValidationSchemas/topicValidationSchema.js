const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createTopic
module.exports.createTopic = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().trim().required().label("Slug"),
  category: Joi.string().custom(customCallback).required().label("Category"),
  subCategories: Joi.array()
    .items(Joi.string().custom(customCallback).required())
    .label("Sub Categories"),
  description: Joi.string().allow("").label("Description"),
  seoTitle: Joi.string().allow("").label("SEO Title"),
  seoDescription: Joi.string().allow("").label("SEO Description"),
});

// getAllTopics
module.exports.getAllTopics = Joi.object({
  page: Joi.string().label("Page"),
  limit: Joi.string().label("Limit"),
  status: Joi.string().valid("true", "false", "All").label("Status"),
  searchQuery: Joi.string().allow("").label("Search Query"),
  category: Joi.string().custom(customCallback).label("Category"),
  subCategory: Joi.string().custom(customCallback).label("Sub Category"),
  subCategories: Joi.array()
    .items(Joi.string().custom(customCallback).required())
    .label("Sub Categories"), // Need proper validation
});

// getTopicById
module.exports.getTopicById = Joi.object({
  id: Joi.string().custom(customCallback).label("Id"),
});

// updateTopic
module.exports.updateTopic = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().trim().required().label("Slug"),
  category: Joi.string().custom(customCallback).required().label("Category"),
  subCategories: Joi.array()
    .items(Joi.string().custom(customCallback).required())
    .label("Sub Categories"),
  description: Joi.string().allow("").label("Description"),
  seoTitle: Joi.string().allow("").label("SEO Title"),
  seoDescription: Joi.string().allow("").label("SEO Description"),
  status: Joi.boolean().label("Status"),
  isDeleted: Joi.boolean().label("Is Deleted"),
});
