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

// createCourse
courseRouter.post(
  "/",
  validateBody(createCourse),
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
  validateBody(updateCourse),
  courseController.updateCourse
);

module.exports = courseRouter;
