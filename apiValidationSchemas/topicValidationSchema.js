const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createTopic
module.exports.createTopic = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().trim().required().label("Slug"),
  description: Joi.string().label("Description").allow(""),
  seoTitle: Joi.string().label("SEO Title").allow(""),
  seoDescription: Joi.string().label("SEO Description").allow(""),
});

// getAllTopics
module.exports.getAllTopics = Joi.object({
  page: Joi.string(),
  limit: Joi.string(),
  status: Joi.string().valid("true", "false", "All"),
  searchQuery: Joi.string().allow(""),
});

//getTopicById
module.exports.getTopicById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// Update Topic Validation Schema
module.exports.updateTopic = Joi.object({
  name: Joi.string().trim().label("Name"),
  slug: Joi.string().trim().label("Slug"),
  description: Joi.string().trim().label("Description"),
  status: Joi.boolean().label("Status"),
  seoDescription: Joi.string().label("SEO Description"),
  seoTitle: Joi.string().label("SEO Title"),
});
