const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createCourse
module.exports.createCourse = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  thumbnail: Joi.string().required().label("Thumbnail"),
  description: Joi.string().allow(""),
  courseDetails: Joi.string(),
  instructorName: Joi.string().required().label("Instructor Name"),
  instructorAbout: Joi.string(),
  instructorImage: Joi.string(),
  instructorDesignation: Joi.string().allow(""),
  seoTitle: Joi.string(),
  seoDescription: Joi.string(),
  defaultVideo: Joi.string(),
  courseTag: Joi.string(),
  language: Joi.string().custom(customCallback).required().label("Language"),
  level: Joi.string().custom(customCallback).required().label("Level"),
  categories: Joi.array().required().label("Categories"),
  subCategories: Joi.array().label("Sub Categories"),
  topics: Joi.array().label("Topics"),
  highlights: Joi.string(),
  requirements: Joi.string(),
  prerequisite: Joi.string(),
  sellingPrice: Joi.number().required().label("Selling Price"),
  mrp: Joi.number().required().label("MRP"),
  validity: Joi.string().required().label("Validity"),
  isReturnable: Joi.boolean().required().label("Is Returnable"),
  returnDays: Joi.number().required().label("Return Days"),
});

// getAllCourses
module.exports.getAllCourses = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
  status: Joi.string().valid("true", "false", "All"),
  searchQuery: Joi.string().allow(""),
});

//getCourseById
module.exports.getCourseById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// Update Course Validation Schema
module.exports.updateCourse = Joi.object({
  name: Joi.string().trim(),
  slug: Joi.string().required().label("Slug"),
  thumbnail: Joi.string(),
  description: Joi.string(),
  courseDetails: Joi.string(),
  instructorName: Joi.string(),
  instructorAbout: Joi.string(),
  instructorImage: Joi.string(),
  instructorDesignation: Joi.string(),
  seoTitle: Joi.string(),
  seoDescription: Joi.string(),
  courseTag: Joi.string(),
  language: Joi.string().custom(customCallback),
  level: Joi.string().custom(customCallback),
  categories: Joi.array().items(Joi.string().custom(customCallback)),
  subCategories: Joi.array().items(Joi.string().custom(customCallback)),
  topics: Joi.array().items(Joi.string().custom(customCallback)),
  highlights: Joi.string(),
  requirements: Joi.string(),
  prerequisite: Joi.string(),
  sellingPrice: Joi.number(),
  mrp: Joi.number(),
  validity: Joi.string(),
  isReturnable: Joi.boolean(),
  returnDays: Joi.number(),
  courseStatus: Joi.boolean(),
  defaultVideo: Joi.string(),
});
