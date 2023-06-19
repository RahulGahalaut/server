import express from "express";
import auth from "../middlewares/auth.js"
import {loginUser,signupUser} from "../controllers/user-controllers.js";

const userRouter=express.Router()

userRouter.post("/login",loginUser)
userRouter.post("/signup",signupUser)

export default userRouter;

// userRouter.get("/",(req,res)=>{
    
// })

