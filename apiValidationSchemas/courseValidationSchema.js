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
  instructorImage: Joi.string().allow(""),
  instructorDesignation: Joi.string().allow(""),
  seoTitle: Joi.string().allow(""),
  seoTags: Joi.string().allow(""),
  seoDescription: Joi.string().allow(""),
  defaultVideo: Joi.string(),
  courseTag: Joi.string(),
  language: Joi.string().custom(customCallback).required().label("Language"),
  level: Joi.string().custom(customCallback).required().label("Level"),
  category: Joi.string().custom(customCallback).required().label("Category"),
  subCategories: Joi.array()
    .items(Joi.string().custom(customCallback).required())
    .required()
    .label("Sub Categories"),
  topics: Joi.array()
    .items(Joi.string().custom(customCallback).required())
    .required()
    .label("Topics"),
  highlights: Joi.string().allow(""),
  requirements: Joi.string().allow(""),
  prerequisite: Joi.string().allow(""),
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
  language: Joi.string().custom(customCallback),
  category: Joi.string().custom(customCallback),
  subCategory: Joi.string().custom(customCallback),
  topic: Joi.string().custom(customCallback),
  level: Joi.string().custom(customCallback),
});

//getCourseById
module.exports.getCourseById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// Update Course Validation Schema
module.exports.updateCourse = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  thumbnail: Joi.string().required().label("Thumbnail"),
  description: Joi.string().allow(""),
  courseDetails: Joi.string(),
  instructorName: Joi.string().required().label("Instructor Name"),
  instructorAbout: Joi.string(),
  instructorImage: Joi.string().allow(""),
  instructorDesignation: Joi.string().allow(""),
  seoTitle: Joi.string().allow(""),
  seoTags: Joi.string().allow(""),
  seoDescription: Joi.string().allow(""),
  defaultVideo: Joi.string(),
  courseTag: Joi.string(),
  language: Joi.string().custom(customCallback).required().label("Language"),
  level: Joi.string().custom(customCallback).required().label("Level"),
  category: Joi.string().custom(customCallback).required().label("Category"),
  subCategories: Joi.array()
    .items(Joi.string().custom(customCallback).required())
    .required()
    .label("Sub Categories"),
  topics: Joi.array()
    .items(Joi.string().custom(customCallback).required())
    .required()
    .label("Topics"),
  highlights: Joi.string().allow(""),
  requirements: Joi.string().allow(""),
  prerequisite: Joi.string().allow(""),
  sellingPrice: Joi.number().required().label("Selling Price"),
  mrp: Joi.number().required().label("MRP"),
  validity: Joi.string().required().label("Validity"),
  isReturnable: Joi.boolean().required().label("Is Returnable"),
  returnDays: Joi.number().required().label("Return Days"),
  status: Joi.boolean().label("Status"),
});
