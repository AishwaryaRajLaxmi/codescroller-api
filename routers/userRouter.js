const express=require('express');
const userRouter=express.Router();
const userController=require('../controllers/userController');

// registerUser
userRouter.post('/',userController.registerUser);


//getAllUser
userRouter.get('/',userController.getAllUser);

module.exports=userRouter;