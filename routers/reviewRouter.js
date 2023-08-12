const express = require("express");
const reviewRouter = express.Router();
const reviewController = require("../controllers/reviewController");
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  updateReviewByUser,
} = require("../apiValidationSchemas/reviewsValidationSchema");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");
const {
  validateUserToken,
  validateAdminToken,
} = require("../middlewares/jwtValidation");

// createreview
reviewRouter.post(
  "/",
  validateBody(createReview),
  validateUserToken,
  reviewController.createReview
);

//getAllreviews
reviewRouter.get(
  "/",
  validateQuery(getAllReviews),
  reviewController.getAllReviews
);
//getMyReview
reviewRouter.get(
  "/myReviews",
  validateQuery(getAllReviews),
  validateUserToken,
  reviewController.getMyReview
);

//getReviewById
reviewRouter.get(
  "/:id",
  validateParams(getReviewById),
  reviewController.getReviewById
);


// deleteReveiw
reviewRouter.delete(
  "/:id",
  validateParams(getReviewById),
  validateUserToken,
  reviewController.deleteReview
);

// updateReview
reviewRouter.put(
  "/:id",
  validateParams(getReviewById),
  validateAdminToken,
  validateBody(updateReview),
  reviewController.updateReview
);

// updateReviewByUser
reviewRouter.put(
  "/updateReviewByUser/:id",
  validateParams(getReviewById),
  validateUserToken,
  validateBody(updateReviewByUser),
  reviewController.updateReviewByUser
);

module.exports = reviewRouter;
