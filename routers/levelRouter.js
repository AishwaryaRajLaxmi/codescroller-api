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
const jsonwebtoken = require("../middlewares/jwtValidation");

// createLevel
levelRouter.post(
  "/",
  validateBody(createLevel),
  jsonwebtoken.validateAdminToken,
  levelController.createLevel
);

//getLevels
levelRouter.get(
  "/",
  validateQuery(getAllLevels),
  levelController.getAllLevels
);

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
  jsonwebtoken.validateAdminToken,
  validateBody(updateLevel),
  levelController.updateLevel
);

// deleteLevel
levelRouter.delete(
  "/:id",
  validateParams(getLevelById),
  jsonwebtoken.validateAdminToken,
  levelController.deleteLevel
);

module.exports = levelRouter;
