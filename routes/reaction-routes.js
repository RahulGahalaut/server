import express from "express";
import auth from "../middlewares/auth.js"
import {getAllReactions,reactOnPost,deleteReactionOnPost} from "../controllers/reaction-controllers.js";

const reactionRouter=express.Router();

reactionRouter.use(auth);

reactionRouter.get("/:postId",getAllReactions);
reactionRouter.post("/:postId",reactOnPost);
reactionRouter.delete("/:postId",deleteReactionOnPost);

export default reactionRouter;
