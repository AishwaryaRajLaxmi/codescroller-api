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
const {
  validateAdminToken,
  validateUserToken,
} = require("../middlewares/jwtValidation");

// getMyProfile for user

userRouter.get(
  "/myProfile",
  jwtValidation.validateUserToken,
  userController.getMyProfile
);
// registerUser
userRouter.post(
  "/register",
  validateBody(userValidationSchema.registerUser),
  userController.registerUser
);

// verifyAccount
userRouter.post(
  "/verifyAccount",
  validateBody(userValidationSchema.verifyAccount),
  userController.verifyAccount
);

// findAccountAndSendOTP
userRouter.post(
  "/findAccountAndSendOTP",
  validateBody(userValidationSchema.findAccountAndSendOTP),
  userController.findAccountAndSendOTP
);

// loginUser
userRouter.post(
  "/login",
  validateBody(userValidationSchema.loginUser),
  userController.loginUser
);

// getAllUser
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
  validateParams(userValidationSchema.getUserById),
  jwtValidation.validateAdminToken,
  userController.getUserById
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

// update My Password
userRouter.put(
  "/updateMyPassword",
  validateBody(userValidationSchema.updateMyPassword),
  jwtValidation.validateUserToken,
  userController.updateMyPassword
);


// This is for User
// updateMyProfile
userRouter.put(
  "/update",
  validateBody(userValidationSchema.updateMyProfile),
  jwtValidation.validateUserToken,
  userController.updateMyProfile
);


// updateUser
userRouter.put(
  "/:id",
  validateParams(userValidationSchema.getUserById),
  jwtValidation.validateAdminToken,
  validateBody(userValidationSchema.updateUser),
  userController.updateUser
);
module.exports = userRouter;
