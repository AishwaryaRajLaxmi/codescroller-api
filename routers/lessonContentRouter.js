const express = require("express");
const lessonContentRouter = express.Router();

const lessonContentController = require("../controllers/lessonContentController");
const {
  createLessonContent,
  updateLessonContent,
  checkContentMongoId,
  checkLessonMongoId,
} = require("../apiValidationSchemas/lessonContentValidationSchema");
const {
  getLessonById,
} = require("../apiValidationSchemas/lessonValidationSchema");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");
const jsonwebtoken = require("../middlewares/jwtValidation");

// createLessonContent
lessonContentRouter.post(
  "/:lessonId",
  validateParams(checkLessonMongoId),
  validateBody(createLessonContent),
  lessonContentController.createLessonContent
);

// updateLessonContent
lessonContentRouter.put(
  "/:contentId",
  validateParams(checkContentMongoId),
  validateBody(updateLessonContent),
  lessonContentController.updateLessonContent
);

// deleteLessonContent
lessonContentRouter.delete(
  "/:contentId",
  validateParams(checkContentMongoId),
  lessonContentController.deleteLessonContent
);

// getLessonContentById
lessonContentRouter.get(
  "/:contentId",
   lessonContentController.getLessonContentById
);

module.exports = lessonContentRouter;
