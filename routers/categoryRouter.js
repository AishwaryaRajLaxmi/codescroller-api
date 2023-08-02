const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/categoryController");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} = require("../apiValidationSchemas/categoryValidationSchema");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// createCategory
categoryRouter.post(
  "/",
  validateBody(createCategory),
  jwtValidation.validateAdminToken,
  categoryController.createCategory
);

//getAllCategories
categoryRouter.get(
  "/",
  validateQuery(getAllCategories),
  categoryController.getAllCategories
);

// deleteCategories
categoryRouter.delete(
  "/:id",
  validateParams(getCategoryById),
  jwtValidation.validateAdminToken,
  categoryController.deleteCategory
);

// getCategory
categoryRouter.get(
  "/:id",
  validateParams(getCategoryById),
  categoryController.getCategoryById
);

// updateCategory
categoryRouter.put(
  "/:id",
  validateParams(getCategoryById),
  jwtValidation.validateAdminToken,
  validateBody(updateCategory),
  categoryController.updateCategory
);

module.exports = categoryRouter;
