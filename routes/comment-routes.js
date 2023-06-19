import express from "express";
import auth from "../middlewares/auth.js"
import {getComments,postComment, deleteComment,updateComment} from "../controllers/comment-controllers.js";

const commentRouter=express.Router();

commentRouter.use(auth);

commentRouter.get("/:postId",getComments);
commentRouter.post("/:postId",postComment)
commentRouter.delete("/:commentId",deleteComment)
commentRouter.patch("/:commentId",updateComment)
export default commentRouter;
