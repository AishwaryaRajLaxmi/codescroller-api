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

// getPurchasedCourse
purchasedCourseRouter.get(
  "/myCourses",
  jsonwebtoken.validateUserToken,
  purchasedCourseController.getMyPurchasedCourse
);

// getPurchasedCourseById;
purchasedCourseRouter.get(
  "/:id",
  validateParams(getPurchasedCourseById),
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

module.exports = purchasedCourseRouter;
