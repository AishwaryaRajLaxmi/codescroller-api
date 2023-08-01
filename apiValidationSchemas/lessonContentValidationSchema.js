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
  contentUrl: Joi.string().label("Content Url"),
  isFree: Joi.boolean().required(),
});
module.exports.updateLessonContent = Joi.object({
    name: Joi.string().required().label("Name"),
  slug: Joi.string().required().label("Slug"),
  description: Joi.string().allow("").label("Description"),
  contentType: Joi.string().valid("video", "pdf").label("Content Type"),
  contentSource: Joi.string()
    .valid("youtube", "dailymotion")
    .label("Content Source"),
  contentUrl: Joi.string().label("Content Url"),
  isFree: Joi.boolean().required(),
});

// checkLessonMongoId
module.exports.checkLessonMongoId = Joi.object({
  lessonId: Joi.custom(customCallback).required(),
});

// checkContentMongoId
module.exports.checkContentMongoId = Joi.object({
  contentId: Joi.custom(customCallback).required(),
});

// getAllLessonContents
module.exports.getAllLessonsContents = Joi.object({
  searchQuery: Joi.string().allow(""),
  status: Joi.string().valid("true", "false", "All"),
  page: Joi.number(),
  limit: Joi.number(),
  
});
