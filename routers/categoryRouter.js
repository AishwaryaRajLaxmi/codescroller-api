const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/categoryController");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} = require("../apiValidationSchemas/categoryValidation");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");

// createCategory
categoryRouter.post(
  "/",
  validateBody(createCategory),
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
  validateBody(updateCategory),
  categoryController.updateCategory
);

module.exports = categoryRouter;
