const express = require("express");
const purchasedCourseRouter = express.Router();
const purchasedCourseController = require("../controllers/purchasedCourseController");
const {
  createPurchasedCourse,
  getAllPurchasedCourses,
  getPurchasedCourseById,
  updatePurchasedCourse,
  getPurchasedCourseByUserId,
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
 
  purchasedCourseController.getAllPurchasedCourses
);

// deletePurchasedCourse
purchasedCourseRouter.delete(
  "/:id",
  validateParams(getPurchasedCourseById),
  purchasedCourseController.deletePurchasedCourse
);

// getPurchasedCourse
purchasedCourseRouter.get(
  "/myCourses",
  jsonwebtoken.validateUserToken,
  purchasedCourseController.getPurchasedCourseById
);

// updatePurchasedCourse
purchasedCourseRouter.put(
  "/:id",
  validateParams(getPurchasedCourseById),
  jsonwebtoken.validateAdminToken,
  validateBody(updatePurchasedCourse),
  purchasedCourseController.updatePurchasedCourse
);

module.exports = purchasedCourseRouter;
