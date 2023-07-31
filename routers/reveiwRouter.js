const express = require("express");
const reveiwRouter = express.Router();
const reveiwController = require("../controllers/reveiwController");
const {
  createReveiw,
  getAllReveiw,
  getReveiwById,
  updateReveiw,
  updateReveiwByUser,
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

//getReveiwById
reveiwRouter.get(
  "/:id",
  validateParams(getReveiwById),
  reveiwController.getReviewById
);

// deleteReveiw
reveiwRouter.delete(
  "/:id",
  validateParams(getReveiwById),
  validateUserToken,
  reveiwController.deleteReview
);

// updateReview
reveiwRouter.put(
  "/:id",
  validateParams(getReveiwById),
  validateAdminToken,
  validateBody(updateReveiw),
  reveiwController.updateReview
);

// updateReviewByUser
reveiwRouter.put(
  "/updateReviewByUser/:id",
  validateParams(getReveiwById),
  validateUserToken,
  validateBody(updateReveiwByUser),
  reveiwController.updateReviewByUser
);

module.exports = reveiwRouter;
