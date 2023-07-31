const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createLesson
module.exports.createLesson = Joi.object({
  name: Joi.string().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  description: Joi.string().required().label
  ("Description").allow(""),

  course: Joi.string().custom(customCallback).required().label("Course"),
  serialNo: Joi.string().required().label("Serial Number"),
});

// updateLesson
module.exports.updateLesson = Joi.object({
  name: Joi.string().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  description: Joi.string().required().label("Description").allow(""),
  status: Joi.boolean().required().label("Status"),
  course: Joi.string().custom(customCallback).required().label("Course"),
  serialNo: Joi.string().required(),
});

// getLessonById
module.exports.getLessonById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// getAllLessons
module.exports.getAllLessons = Joi.object({
  searchQuery: Joi.string().allow(""),
  serialNo: Joi.string().allow(""),
  page: Joi.number(),
  limit: Joi.number(),
});