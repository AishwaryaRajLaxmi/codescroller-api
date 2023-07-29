const express = require("express");
const languageRouter = express.Router();
const languageController = require("../controllers/languageController");
const {
  createLanguage,
  getLanguageById,
  updateLanguage,
  getAllLanguages,
} = require("../apiValidationSchemas/languageValidationSchema");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");
const jsonwebtoken = require("../middlewares/jwtValidation");

// createCategory
languageRouter.post(
  "/",
  validateBody(createLanguage),
  jsonwebtoken.validateAdminToken,
  languageController.createLanguage
);

//getAllLanguages
languageRouter.get(
  "/",
  validateQuery(getAllLanguages),
    languageController.getAllLanguages
);

// deleteLanguage
languageRouter.delete(
  "/:id",
  validateParams(getLanguageById),
  jsonwebtoken.validateAdminToken,
  languageController.deleteLanguage
);

// getLanguageById
languageRouter.get(
  "/:id",
  validateParams(getLanguageById),
  languageController.getLanguageById
);

// updateLanguage
languageRouter.put(
  "/:id",
  validateParams(getLanguageById),
  jsonwebtoken.validateAdminToken,
  validateBody(updateLanguage),
  languageController.updateLanguage
);

module.exports = languageRouter;
