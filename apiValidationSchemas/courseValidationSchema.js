const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createCourse
module.exports.createCourse = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().required(),
  image: Joi.string(),
  description: Joi.string(),
  courseDetails: Joi.string(),
  instructor: Joi.string(),
  seoTitle: Joi.string(),
  seoDescription: Joi.string(),
  image: Joi.string(),
  courseTag: Joi.string(),
  language: Joi.string().custom(customCallback).required(),
  level: Joi.string().custom(customCallback).required(),
  categories: Joi.array(),
  subCategories: Joi.array(),
  topics: Joi.array(),
  highlights: Joi.string(),
  requirements: Joi.string(),
  prerequisite: Joi.string(),
  sellingPrice: Joi.string(),
  mrp: Joi.string(),
  validity: Joi.string(),
  isReturnable: Joi.boolean(),
  returnDays: Joi.number(),
  courseStatus: Joi.string(),
});

// getAllCourses
module.exports.getAllCourses = Joi.object({
  page: Joi.string(),
  limit: Joi.string(),
  status: Joi.string().valid("true", "false", "All"),
});

//getCourseById
module.exports.getCourseById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// Update Course Validation Schema
module.exports.updateCourse = Joi.object({
  name: Joi.string().trim(),
  slug: Joi.string(),
  image: Joi.string(),
  description: Joi.string(),
  courseDetails: Joi.string(),
  instructor: Joi.string(),
  seoTitle: Joi.string(),
  seoDescription: Joi.string(),
  image: Joi.string(),
  courseTag: Joi.string(),
  language: Joi.string().custom(customCallback),
  level: Joi.string().custom(customCallback),
  categories: Joi.array().items(Joi.string().custom(customCallback)),
  subCategories: Joi.array().items(Joi.string().custom(customCallback)),
  topics: Joi.array().items(Joi.string().custom(customCallback)),
  highlights: Joi.string(),
  requirements: Joi.string(),
  prerequisite: Joi.string(),
  sellingPrice: Joi.string(),
  mrp: Joi.string(),
  validity: Joi.string(),
  isReturnable: Joi.boolean(),
  returnDays: Joi.number(),
  courseStatus: Joi.string(),
});
