const express = require("express");
const lessonContentRouter = express.Router();

const lessonContentController = require("../controllers/lessonContentController");
const {
  createLessonContent,
  checkMongoId
} = require("../apiValidationSchemas/lessonContentValidationSchema");
const {getLessonById}=require('../apiValidationSchemas/lessonValidationSchema')
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");
const jsonwebtoken = require("../middlewares/jwtValidation");

// createLessonContent
lessonContentRouter.post(
  "/:lessonId",
  validateParams(checkMongoId),
  validateBody(createLessonContent),
  lessonContentController.createLessonContent
);

module.exports = lessonContentRouter;
