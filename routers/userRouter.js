const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const {
  registerUser,
  login,
  getAllUsers,
  getUserById,
  updateUser
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
userRouter.post("/login", validateBody(login), userController.loginUser);

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
userRouter.put("/:id",validateParams(getUserById),validateBody(updateUser),userController.updateUser)

module.exports = userRouter;