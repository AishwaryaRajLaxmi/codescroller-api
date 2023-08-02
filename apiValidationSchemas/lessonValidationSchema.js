const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createLesson
module.exports.createLesson = Joi.object({
  name: Joi.string().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  description: Joi.string().label("Description").allow(""),
  course: Joi.string().custom(customCallback).required().label("Course"),
  serialNo: Joi.number().label("Serial Number"),
});

// updateLesson
module.exports.updateLesson = Joi.object({
  name: Joi.string().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  description: Joi.string().label("Description").allow(""),
  status: Joi.boolean().required().label("Status"),
  course: Joi.string().custom(customCallback).required().label("Course"),
  serialNo: Joi.number().label("Serial Number"),
  contents: Joi.array(),
});

// getLessonById
module.exports.getLessonById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// getAllLessons
module.exports.getAllLessons = Joi.object({
  searchQuery: Joi.string().allow(""),
  status: Joi.string().valid("true", "false", "All"),
  serialNo: Joi.number().label("Serial Number"),
  page: Joi.number(),
  course: Joi.string().custom(customCallback).label("Course"),
  limit: Joi.number(),
});
