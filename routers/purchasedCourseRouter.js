const express = require("express");
const purchasedCourseRouter = express.Router();
const purchasedCourseController = require("../controllers/purchasedCourseController");
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
const jsonwebtoken = require("../middlewares/jwtValidation");

// createPurchasedCourse
purchasedCourseRouter.post(
  "/",
  validateBody(createPurchasedCourse),
  jsonwebtoken.validateUserToken,
  purchasedCourseController.createPurchasedCourse
);

// getAllPurchasedCourse
purchasedCourseRouter.get(
  "/",
  validateQuery(getAllPurchasedCourses),
  jsonwebtoken.validateAdminToken,
  purchasedCourseController.getAllPurchasedCourses
);

// deletePurchasedCourse
purchasedCourseRouter.delete(
  "/:id",
  validateParams(getPurchasedCourseById),
  jsonwebtoken.validateAdminToken,
  purchasedCourseController.deletePurchasedCourse
);

// getllPurchasedCourse For User
purchasedCourseRouter.get(
  "/myCourses",
  validateQuery(getMySingleCourse),
  jsonwebtoken.validateUserToken,
  purchasedCourseController.getMyPurchasedCourse
);

// getPurchasedCourseById;
purchasedCourseRouter.get(
  "/:id",
  validateParams(getPurchasedCourseById),
  jsonwebtoken.validateAdminToken,
  purchasedCourseController.getPurchasedCourseByID
);

// updatePurchasedCourse
purchasedCourseRouter.put(
  "/:id",
  validateParams(getPurchasedCourseById),
  jsonwebtoken.validateAdminToken,
  validateBody(updatePurchasedCourse),
  purchasedCourseController.updatePurchasedCourse
);

// purchasedCourse by student
purchasedCourseRouter.get(
  "/getUsers/:courseId",
  validateParams(getUsersByCourse),
  jsonwebtoken.validateAdminToken,
  purchasedCourseController.getUserByCourse
);

module.exports = purchasedCourseRouter;
