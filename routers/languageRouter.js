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
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createLanguage
languageRouter.post(
  "/",
  validateBody(createLanguage),
  validateAdminToken,
  languageController.createLanguage
);

// getAllLanguages
languageRouter.get(
  "/",
  validateQuery(getAllLanguages),
  languageController.getAllLanguages
);

// deleteLanguage
languageRouter.delete(
  "/:id",
  validateParams(getLanguageById),
  validateAdminToken,
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
  validateAdminToken,
  validateBody(updateLanguage),
  languageController.updateLanguage
);

module.exports = languageRouter;
