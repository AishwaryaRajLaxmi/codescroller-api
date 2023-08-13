const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createCourse
module.exports.createCourse = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  thumbnail: Joi.string().required().label("Thumbnail"),
  description: Joi.string().allow("").label("Description"),
  courseDetails: Joi.string().label("Course Details"),
  instructorName: Joi.string().required().label("Instructor Name"),
  instructorAbout: Joi.string().label("Instructor About"),
  instructorImage: Joi.string().allow("").label("Instructor Image"),
  instructorDesignation: Joi.string().allow("").label("Instructor Designation"),
  seoTitle: Joi.string().allow("").label("SEO Title"),
  seoTags: Joi.string().allow("").label("SEO Tags"),
  seoDescription: Joi.string().allow("").label("SEO Description"),
  courseTag: Joi.string().label("Course Tag"),
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
  highlights: Joi.string().allow("").label("Highlights"),
  defaultVideoSource: Joi.string()
    .valid("youtube", "dailymotion", "others")
    .label("Default Video Source"),
  courseDuration: Joi.string().label("Course Duration"),
  requirements: Joi.string().allow("").label("Requirement"),
  prerequisite: Joi.string().allow("").label("Prerequisite"),
  sellingPrice: Joi.number().required().label("Selling Price"),
  mrp: Joi.number().required().label("MRP"),
  validity: Joi.string().required().label("Validity"),
  defaultVideo: Joi.string().allow("").label("Default Video"),
  isReturnable: Joi.boolean().required().label("Is Returnable"),
  returnDays: Joi.number().required().label("Return Days"),
  isPaid:Joi.boolean().label("Is Paid")
});

// getAllCourses
module.exports.getAllCourses = Joi.object({
  page: Joi.number().label("Page"),
  limit: Joi.number().label("Limit"),
  status: Joi.string().valid("true", "false", "All").label("Status"),
  searchQuery: Joi.string().allow("").label("Search Query"),
  language: Joi.string().custom(customCallback).label("Language"),
  category: Joi.string().custom(customCallback).label("Category"),
  subCategory: Joi.string().custom(customCallback).label("Sub Category"),
  topic: Joi.string().custom(customCallback).label("Topic"),
  level: Joi.string().custom(customCallback).label("Level"),
  isPaid:Joi.boolean().label("Is Paid")
});

//getCourseById
module.exports.getCourseById = Joi.object({
  id: Joi.string().custom(customCallback).label("Id"),
  lessonData: Joi.string().valid("true", "false").label("Lesson Data"),
});

// Update Course Validation Schema
module.exports.updateCourse = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  thumbnail: Joi.string().required().label("Thumbnail"),
  description: Joi.string().allow("").label("Description"),
  courseDetails: Joi.string().label("Course Details"),
  instructorName: Joi.string().required().label("Instructor Name"),
  instructorAbout: Joi.string().allow("").label("Instructor About"),
  instructorImage: Joi.string().allow("").label("Instruct Image"),
  instructorDesignation: Joi.string().allow("").label("Instructor Designation"),
  seoTitle: Joi.string().allow("").label("SEO Title"),
  seoTags: Joi.string().allow("").label("SEO Tags"),
  seoDescription: Joi.string().allow("").label("SEO Description"),
  courseTag: Joi.string().allow("").label("Course Tag"),
  language: Joi.string().custom(customCallback).required().label("Language"),
  level: Joi.string().custom(customCallback).required().label("Level"),
  defaultVideoSource: Joi.string()
    .valid("youtube", "dailymotion", "others")
    .label("Default Video Source"),
  courseDuration: Joi.string().label("Course Duration"),
  category: Joi.string().custom(customCallback).required().label("Category"),
  subCategories: Joi.array()
    .items(Joi.string().custom(customCallback).required())
    .required()
    .label("Sub Categories"),
  topics: Joi.array()
    .items(Joi.string().custom(customCallback).required())
    .required()
    .label("Topics"),
  highlights: Joi.string().allow("").label("Highlights"),
  requirements: Joi.string().allow("").label("Requirements"),
  prerequisite: Joi.string().allow("").label("Prerequisites"),
  sellingPrice: Joi.number().required().label("Selling Price"),
  mrp: Joi.number().required().label("MRP"),
  validity: Joi.string().required().label("Validity"),
  defaultVideo: Joi.string().allow("").label("Default Video"),
  isReturnable: Joi.boolean().required().label("Is Returnable"),
  returnDays: Joi.number().required().label("Return Days"),
  status: Joi.boolean().label("Status"),
  isDeleted: Joi.boolean().label("Is Deleted"),
  isPaid: Joi.boolean().label("Is Paid"),
});
