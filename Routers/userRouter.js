const express=require("express");
const userRouter=express.Router();
//const protectRoute=require('./authHelper');
const {getUser,getAllUser,updateUser,deleteUser,postUser}=require('../controller/userController');
const {signup,login,protectRoute,isAuthorised}=require('../controller/authController');
//options for user
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)

//profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

//admin specific function
userRouter.use(isAuthorised(['admin']));
userRouter
.route('')
.get(getAllUser)



module.exports=userRouter;