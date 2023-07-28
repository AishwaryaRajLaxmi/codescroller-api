const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const userValidationSchema = require("../apiValidationSchemas/userValidationSchema");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");
// registerUser
userRouter.post(
  "/register",
  validateBody(userValidationSchema.registerUser),
  userController.registerUser
);

// loginUser
userRouter.post(
  "/login",
  validateBody(userValidationSchema.loginUser),
  userController.loginUser
);

//getAllUser
userRouter.get(
  "/",
  jwtValidation.validateAdminToken,
  validateQuery(userValidationSchema.getAllUsers),
  userController.getAllUsers
);

// deleteUser
userRouter.delete(
  "/:id",
  validateParams(userValidationSchema.getUserById),
  jwtValidation.validateAdminToken,
  userController.deleteUser
);

// getUser
userRouter.get(
  "/:id",
  jwtValidation.validateAdminToken,
  validateParams(userValidationSchema.getUserById),
  userController.getUserById
);

// updateUser
userRouter.put(
  "/:id",
  validateParams(userValidationSchema.getUserById),
  jwtValidation.validateAdminToken,
  validateBody(userValidationSchema.updateUser),
  userController.updateUser
);

// isMobileExists
userRouter.get(
  "/isMobileExists/:mobile",
  validateParams(userValidationSchema.isMobileExists),
  userController.isMobileExists
);
// isEmailExists
userRouter.get(
  "/isEmailExists/:email",
  validateParams(userValidationSchema.isEmailExists),
  userController.isEmailExists
);

module.exports = userRouter;
