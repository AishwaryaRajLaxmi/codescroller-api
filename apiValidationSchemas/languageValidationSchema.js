const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createLanguage
module.exports.createLanguage = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  description: Joi.string().allow("").label("Description"),
  slug: Joi.string().required().label("Slug"),
});

// getAllLanguages
module.exports.getAllLanguages = Joi.object({
  page: Joi.number().label("Page"),
  limit: Joi.number().label("Limit"),
  status: Joi.string().valid("true", "false", "All").label("Status"),
  searchQuery: Joi.string().allow("").label("Search query"),
});

//getLanguageById
module.exports.getLanguageById = Joi.object({
  id: Joi.string().custom(customCallback).label("Id"),
});

// updateLanguage
module.exports.updateLanguage = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  description: Joi.string().allow("").label("Description"),
  slug: Joi.string().required().label("Slug"),
  status: Joi.boolean().label("Status"),
  isDeleted: Joi.boolean().label("Is Deleted"),
});
