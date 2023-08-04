const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createLessonContent
module.exports.createLessonContent = Joi.object({
  name: Joi.string().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  description: Joi.string().allow("").label("Description"),
  contentType: Joi.string().valid("video", "pdf").label("Content Type"),
  contentSource: Joi.string()
    .valid("youtube", "dailymotion")
    .label("Content Source"),
  contentUrl: Joi.string().required().label("Content Url"),
  isFree: Joi.boolean().required().label("Is Free"),
});

// checkLessonMongoId
module.exports.checkLessonMongoId = Joi.object({
  lessonId: Joi.custom(customCallback).required().label("Lesson Id"),
});

// checkContentMongoId
module.exports.checkContentMongoId = Joi.object({
  contentId: Joi.custom(customCallback).required().label("Content Id"),
});

// getAllLessonsContents
module.exports.getAllLessonsContents = Joi.object({
  page: Joi.number().label("Page"),
  limit: Joi.number().label("Limit"),
  searchQuery: Joi.string().allow("").label("Serach Query"),
  status: Joi.string().valid("true", "false", "All").label("Status"),
});

// updateLessonContent
module.exports.updateLessonContent = Joi.object({
  name: Joi.string().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  description: Joi.string().allow("").label("Description"),
  contentType: Joi.string().valid("video", "pdf").label("Content Type"),
  contentSource: Joi.string()
    .valid("youtube", "dailymotion")
    .label("Content Source"),
  contentUrl: Joi.string().required().label("Content Url"),
  isFree: Joi.boolean().required().label("Is Free"),
  status: Joi.boolean().required().label("Statue"),
  isDeleted: Joi.boolean().label("Is Deleted"),
});
