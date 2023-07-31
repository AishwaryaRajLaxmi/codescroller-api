const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createLesson
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

// checkMongoId
module.exports.checkMongoId = Joi.object({
  lessonId: Joi.custom(customCallback).required(),
});
