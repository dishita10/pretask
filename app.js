const express=require("express");
const app=express();
const cookieParser=require('cookie-parser');
//middleware function->post, front->json
app.use(express.json())//global middleware 
app.listen(3000);
app.use(cookieParser());
// let users=[
//     {
//         'id':1,
//         'name':"Abhishek"
//     },
//     {
//         'id':2,
//         'name':"Jasbeer"
//     },
//     {
//         'id':3,
//         'name':"Kartik"
//     }
// ];

//miniapp
const userRouter=require('./Routers/userRouter');
//sconst authRouter=require('./Routers/authRouter');
//base router,router to use
app.use("/user",userRouter);
//app.use("/auth",authRouter);
