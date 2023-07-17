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

// createsubcategory
subcategoryRouter.post(
  "/",
  validateBody(createSubCategory),
  subcategoryController.createSubCategory
);

//getAllSubCategories
subcategoryRouter.get(
  "/",
  validateQuery(getAllSubCategories),
  subcategoryController.getAllSubCategories
);

// deleteSubCategories
subcategoryRouter.delete(
  "/:id",
  validateParams(getSubCategoryById),
  subcategoryController.deleteSubCategory
);

// getsubcategory
subcategoryRouter.get(
  "/:id",
  validateParams(getSubCategoryById),
  subcategoryController.getSubCategoryById
);

// updatesubcategory
subcategoryRouter.put(
  "/:id",
  validateParams(getSubCategoryById),
  validateBody(updateSubCategory),
  subcategoryController.updateSubCategory
);

module.exports = subcategoryRouter;
