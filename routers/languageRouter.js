const express = require("express");
const languageRouter = express.Router();
const languageController = require("../controllers/languageController");
const {
  createLanguage,
  getLanguageById,
  updateLanguage,
  getAllLanguages,
} = require("../apiValidationSchemas/languageValidation");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");

// createCategory
languageRouter.post(
  "/",
  validateBody(createLanguage),
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
  validateBody(updateLanguage),
  languageController.updateLanguage
);

module.exports = languageRouter;
