const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createLesson
module.exports.createLesson = Joi.object({
  name: Joi.string().required().label("Name"),
  slug: Joi.string().label("Slug").required(),
  description: Joi.string().allow("").label("Description"),
  course: Joi.string().custom(customCallback).required().label("Course"),
  serialNo: Joi.number().label("Serial Number"),
});

// getAllLessons
module.exports.getAllLessons = Joi.object({
  searchQuery: Joi.string().allow("").label("Search Query"),
  status: Joi.string().valid("true", "false", "All").label("Status"),
  serialNo: Joi.number().label("Serial Number"),
  page: Joi.number().label("Page"),
  course: Joi.string().custom(customCallback).label("Course"),
  limit: Joi.number().label("Limit"),
});

// getLessonById
module.exports.getLessonById = Joi.object({
  id: Joi.string().custom(customCallback).label("Id"),
});

// content schema
const contentSchema = Joi.object({
  name: Joi.string().required().label("Content Name"),
  slug: Joi.string().required().label("Slug"),
  description: Joi.string().allow("").label("Description"),
  contentType: Joi.string().label("Content Type").valid("video", "pdf"),
  contentSource: Joi.string()
    .label("Content Source")
    .valid("youtube", "dailymotion"),
  contentUrl: Joi.string().label("Content Url"),
  isFree: Joi.boolean().label("Is Free").required(),
  status: Joi.boolean().label("Status").required(),
  isDeleted: Joi.boolean().label("Is Deleted").required(),
});

// updateLesson
module.exports.updateLesson = Joi.object({
  name: Joi.string().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  description: Joi.string().allow("").label("Description"),
  status: Joi.boolean().required().label("Status"),
  serialNo: Joi.number().label("Serial Number"),
  contents: Joi.array().items(contentSchema).label("Contents"),
  course: Joi.string().custom(customCallback).label("Course"),
  isDeleted: Joi.boolean().label("Is Deleted"),
  // Need proper validation
});
