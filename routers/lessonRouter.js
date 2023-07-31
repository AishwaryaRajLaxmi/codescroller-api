const express = require("express");
const lessonRouter = express.Router();
const lessonController = require("../controllers/lessonController");
const {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson
} = require("../apiValidationSchemas/lessonValidationSchema");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");
const jsonwebtoken = require("../middlewares/jwtValidation");


// createLesson
lessonRouter.post(
  "/",
  validateBody(createLesson),
  jsonwebtoken.validateAdminToken,
  lessonController.createLesson
);

//getAlllessons
lessonRouter.get(
  "/",
  validateQuery(getAllLessons),
  lessonController.getAllLessons
);

// deletelesson
lessonRouter.delete(
  "/:id",
  validateParams(getLessonById),
  jsonwebtoken.validateAdminToken,
  lessonController.deleteLesson
);

// getLesson
lessonRouter.get(
  "/:id",
  validateParams(getLessonById),
  lessonController.getLessonById
);

// updatelesson
lessonRouter.put(
  "/:id",
  validateParams(getLessonById),
  jsonwebtoken.validateAdminToken,
  validateBody(updateLesson),
  lessonController.updateLesson
);

module.exports = lessonRouter;
