const express = require("express");
const purchasedCourseHistoryRouter = express.Router();
const purchasedCourseHistoryController = require("../controllers/purchasedCourseHistoryController");
const {
  createPurchasedCourse,
  getAllPurchasedCourses,
  getPurchasedCourseById,
  updatePurchasedCourse,
  getMySingleCourse,
  getUsersByCourse,
} = require("../apiValidationSchemas/purchasedCourseValidationSchema");

const {
  validateBody,
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
  
  purchasedCourseHistoryController.getPurchasedCourseHistoryByID
);

module.exports=purchasedCourseHistoryRouter