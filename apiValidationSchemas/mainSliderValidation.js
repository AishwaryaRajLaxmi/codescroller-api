const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

module.exports.createMainSlider = Joi.object({
  title: Joi.string().label("Title").allow(""),
  image: Joi.string().required().label("Image"),
});

// updateMainSlider
module.exports.updateMainSlider = Joi.object({
  title: Joi.string().label("Title").allow(""),
  image: Joi.string().required().label("Image"),
  status: Joi.boolean().label("Status"),
  isDeleted: Joi.boolean().label("Is Deleted"),
});


// getMainSliderById
module.exports.getSliderById=Joi.object({
  id:Joi.string().custom(customCallback).label("Id")
})


// getAllMainSliders
module.exports.getAllMainSliders=Joi.object({
  page:Joi.number().label("Page"),
  limit:Joi.number().label("Limit"),
})