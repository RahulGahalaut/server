import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./routes/user-routes.js";
import postRouter from "./routes/post-routes.js";
import commentRouter from "./routes/comment-routes.js";
import reactionRouter from "./routes/reaction-routes.js";
import dotenv from "dotenv"
import cors from "cors";

dotenv.config()

const app=express();
app.use(cors())
const mongodbURI=process.env.MONGODB_DATABASE_URI;

mongoose.connect(mongodbURI)
.then((results)=>{
    console.log("Connected with db!!")
    app.listen(process.env.PORT,()=>{
        console.log(`Server Started, Port- ${process.env.PORT}!`)
    })
})
.catch((err)=>{
    console.log(err)
})

app.use(express.json())

app.use("/users",userRouter)
app.use("/posts",postRouter)
app.use("/comments",commentRouter)
app.use("/reactions",reactionRouter)


app.use((req,res)=>{
    res.status(401).json({message:"route not defined!"})
})



