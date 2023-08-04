const express = require("express");
const subcategoryRouter = express.Router();
const subcategoryController = require("../controllers/subcategoryController");
const {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
} = require("../apiValidationSchemas/subCategoryValidation");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createSubCategory
subcategoryRouter.post(
  "/",
  validateBody(createSubCategory),
  validateAdminToken,
  subcategoryController.createSubCategory
);

// getAllSubCategories
subcategoryRouter.get(
  "/",
  validateQuery(getAllSubCategories),
  subcategoryController.getAllSubCategories
);

// deleteSubCategory
subcategoryRouter.delete(
  "/:id",
  validateParams(getSubCategoryById),
  validateAdminToken,
  subcategoryController.deleteSubCategory
);

// getSubCategoryById
subcategoryRouter.get(
  "/:id",
  validateParams(getSubCategoryById),
  validateAdminToken,
  subcategoryController.getSubCategoryById
);

// updateSubCategory
subcategoryRouter.put(
  "/:id",
  validateParams(getSubCategoryById),
  validateAdminToken,
  validateBody(updateSubCategory),
  subcategoryController.updateSubCategory
);

module.exports = subcategoryRouter;
