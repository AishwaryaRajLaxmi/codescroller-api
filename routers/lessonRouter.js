const express = require("express");
const lessonRouter = express.Router();
const lessonController = require("../controllers/lessonController");
const {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
} = require("../apiValidationSchemas/lessonValidationSchema");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createLesson
lessonRouter.post(
  "/",
  validateBody(createLesson),
  validateAdminToken,
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
  validateAdminToken,
  lessonController.deleteLesson
);

// getLessonById
lessonRouter.get(
  "/:id",
  validateParams(getLessonById),
  validateAdminToken,
  lessonController.getLessonById
);

// updatelesson
lessonRouter.put(
  "/:id",
  validateParams(getLessonById),
  validateAdminToken,
  validateBody(updateLesson),
  lessonController.updateLesson
);

module.exports = lessonRouter;
