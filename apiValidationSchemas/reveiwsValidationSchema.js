const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createReveiw
module.exports.createReveiw = Joi.object({
  course: Joi.string().custom(customCallback).required().label("Course"),
  ratings: Joi.number().allow(""),
  comment: Joi.string().allow(""),

});

// getAllReveiw
module.exports.getAllReveiw = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
  status: Joi.string().valid("true", "false", "All"),
  searchQuery: Joi.string().allow(""),
});

//getReveiwById
module.exports.getReveiwById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// updateReveiwByUser
module.exports.updateReveiwByUser = Joi.object({
  course: Joi.string().custom(customCallback),
  ratings: Joi.number().allow(""),
  comments: Joi.string().allow(""),
});
// updateReveiw
module.exports.updateReveiw = Joi.object({
  course: Joi.string().custom(customCallback),
  ratings: Joi.number().allow(""),
  comments: Joi.string().allow(""),
  reviewStatus: Joi.string().valid("pending", "approved"),
});
