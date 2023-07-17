const express = require("express");
const levelRouter = express.Router();
const levelController = require("../controllers/levelController");
const {
  createLevel,
  getLevelById,
  updateLevel,
  getAllLevels,
} = require("../apiValidationSchemas/levelValidationSchema");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");

// createLevel
levelRouter.post("/", validateBody(createLevel), levelController.createLevel);

//getLevels
levelRouter.get("/", validateQuery(getAllLevels), levelController.getAllLevels);

// getLevel
levelRouter.get(
  "/:id",
  validateParams(getLevelById),
  levelController.getLevelById
);

// updateLevel
levelRouter.put(
  "/:id",
  validateParams(getLevelById),
  validateBody(updateLevel),
  levelController.updateLevel
);

// deleteLevel
levelRouter.delete(
  "/:id",
  validateParams(getLevelById),
  levelController.deleteLevel
);

module.exports = levelRouter;
