import express from "express";
import auth from "../middlewares/auth.js"
import {getAllPosts, getOnePost, createPost , updatePost, deletePost, getMyPosts} from "../controllers/post-controllers.js";

const postRouter=express.Router();

postRouter.use(auth)

postRouter.get("/",getAllPosts);
postRouter.get("/post/:postId",getOnePost);
postRouter.get("/my-posts",getMyPosts);

postRouter.post("/create",createPost);
postRouter.patch("/update/:postId",updatePost);
postRouter.delete("/delete/:postId",deletePost);

export default postRouter;

