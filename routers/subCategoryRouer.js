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
const jsonwebtoken = require("../middlewares/jwtValidation");

// createsubcategory
subcategoryRouter.post(
  "/",
  validateBody(createSubCategory),
  jsonwebtoken.validateAdminToken,
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
  jsonwebtoken.validateAdminToken,
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
  jsonwebtoken.validateAdminToken,
  validateBody(updateSubCategory),
  subcategoryController.updateSubCategory
);

module.exports = subcategoryRouter;
