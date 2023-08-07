const express = require("express");
const purchasedCourseHistoryRouter = express.Router();
const purchasedCourseHistoryController = require("../controllers/purchasedCourseHistoryController");
const {
  getAllPurchasedCourses,
  getPurchasedCourseById,
} = require("../apiValidationSchemas/purchasedCourseValidationSchema");

const {
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");

const {
  validateAdminToken,
  validateUserToken,
} = require("../middlewares/jwtValidation");

// getAllPurchasedCourseHistory
purchasedCourseHistoryRouter.get(
  "/",
  validateAdminToken,
  validateQuery(getAllPurchasedCourses),
  purchasedCourseHistoryController.getAllPurchasedCoursesHistory
);

// getPurchasedCourseHistory By Id
purchasedCourseHistoryRouter.get(
  "/:id",
  validateParams(getPurchasedCourseById),
  validateUserToken,
  purchasedCourseHistoryController.getPurchasedCourseHistoryByID
);

module.exports = purchasedCourseHistoryRouter;
