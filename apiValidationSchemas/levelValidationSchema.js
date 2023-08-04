const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createLevel
module.exports.createLevel = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  description: Joi.string().allow("").label("Description"),
  slug: Joi.string().required().label("Slug"),
});

// getAllLevels
module.exports.getAllLevels = Joi.object({
  page: Joi.number().label("Page"),
  limit: Joi.number().label("Limit"),
  status: Joi.string().valid("true", "false", "All").label("Status"),
  searchQuery: Joi.string().allow("").label("Search query"),
});

//getLevelById
module.exports.getLevelById = Joi.object({
  id: Joi.string().custom(customCallback).label("Id"),
});

// updateLevel
module.exports.updateLevel = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  description: Joi.string().allow("").label("Description"),
  slug: Joi.string().required().label("Slug"),
  status: Joi.boolean().label("Status"),
});
