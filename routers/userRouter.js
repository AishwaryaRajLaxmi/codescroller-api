const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  isMobileExists,
  isEmailExists,
} = require("../apiValidationSchemas/userValidationSchema");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");

// registerUser
userRouter.post(
  "/register",
  validateBody(registerUser),
  userController.registerUser
);

// loginUser
userRouter.post("/login", validateBody(loginUser), userController.loginUser);

//getAllUser
userRouter.get("/", validateQuery(getAllUsers), userController.getAllUsers);

// deleteUser
userRouter.delete(
  "/:id",
  validateParams(getUserById),
  userController.deleteUser
);

// getUser
userRouter.get("/:id", validateParams(getUserById), userController.getUserById);

// updateUser
userRouter.put(
  "/:id",
  validateParams(getUserById),
  validateBody(updateUser),
  userController.updateUser
);

// isMobileExists
userRouter.get(
  "/isMobileExists/:mobile",
  validateParams(isMobileExists),
  userController.isMobileExists
);
// isEmailExists
userRouter.get(
  "/isEmailExists/:email",
  validateParams(isEmailExists),
  userController.isEmailExists
);

module.exports = userRouter;
