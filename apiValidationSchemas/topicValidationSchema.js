const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createTopic
module.exports.createTopic = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().trim().required(),
  description: Joi.string(),
  seoTitle: Joi.string(),
  seoDescription: Joi.string(),
  isDeleted: Joi.boolean().required(),
  status: Joi.boolean().required(),
});

// getAllTopic
module.exports.getAllTopics = Joi.object({
  skip: Joi.string(),
  limit: Joi.string(),
  status: Joi.boolean(),
});

//getTopicById
module.exports.getTopicById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// Update Topic Validation Schema
module.exports.updateTopic = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().trim(),
  status: Joi.boolean(),
  seoDescription: Joi.string(),
  seoTitle: Joi.string(),
});
