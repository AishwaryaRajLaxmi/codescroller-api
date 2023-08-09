const express = require("express");
const mainSliderRouter = express.Router();
const mainSliderController=require('../controllers/mainSliderController');
const {
  createMainSlider,
  updateMainSlider,
  getAllMainSliders,
  getSliderById
} = require("../apiValidationSchemas/mainSliderValidation");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");
const jsonwebtoken = require("../middlewares/jwtValidation");

// createMainSlider
mainSliderRouter.post(
  "/",
  validateBody(createMainSlider),
  jsonwebtoken.validateAdminToken,
  mainSliderController.createMainSlider
);

//getAllMainSliders
mainSliderRouter.get(
  "/",
  validateQuery(getAllMainSliders),
  mainSliderController.getAllMainSliders
);

// deleteMainSlider
mainSliderRouter.delete(
  "/:id",
  validateParams(getSliderById),
  jsonwebtoken.validateAdminToken,
  mainSliderController.deleteMainSlider
);

// getMainSlider
mainSliderRouter.get(
  "/:id",
  validateParams(getSliderById),
  mainSliderController.getMainSliderById
);

// updateMainSlider
mainSliderRouter.put(
  "/:id",
  validateParams(getSliderById),
  jsonwebtoken.validateAdminToken,
  validateBody(updateMainSlider),
  mainSliderController.updateMainSlider
);

module.exports = mainSliderRouter;
