const express = require("express");
const reveiwRouter = express.Router();
const reveiwController = require("../controllers/reveiwController");
const {
  createReveiw,
  getAllReveiw,
  getReveiwById,
  updateReveiw,
} = require("../apiValidationSchemas/reveiwsValidationSchema");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");
const {
  validateUserToken,
  validateAdminToken,
} = require("../middlewares/jwtValidation");

// createreveiw
reveiwRouter.post(
  "/",
  validateBody(createReveiw),
  validateUserToken,
  reveiwController.createReveiw
);

//getAllreveiw
reveiwRouter.get(
  "/",
  validateQuery(getAllReveiw),
  reveiwController.getAllReviews
);

// deleteReveiw
reveiwRouter.delete(
  "/:id",
  validateParams(getReveiwById),
  validateUserToken,
  reveiwController.deleteReview
);

module.exports = reveiwRouter;
