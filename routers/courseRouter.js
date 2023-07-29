const express = require("express");
const courseRouter = express.Router();
const courseController = require("../controllers/courseController");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} = require("../apiValidationSchemas/courseValidationSchema");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");
const jsonwebtoken = require("../middlewares/jwtValidation");

// createCourse
courseRouter.post(
  "/",
  validateBody(createCourse),
  jsonwebtoken.validateAdminToken,
  courseController.createCourse
);

//getAllCourses
courseRouter.get(
  "/",
  validateQuery(getAllCourses),
  courseController.getAllCourses
);

// deleteCourse
courseRouter.delete(
  "/:id",
  validateParams(getCourseById),
  jsonwebtoken.validateAdminToken,
  courseController.deleteCourse
);

// getCourse
courseRouter.get(
  "/:id",
  validateParams(getCourseById),
  courseController.getCourseById
);

// updateCourse
courseRouter.put(
  "/:id",
  validateParams(getCourseById),
  jsonwebtoken.validateAdminToken,
  validateBody(updateCourse),
  courseController.updateCourse
);

module.exports = courseRouter;
