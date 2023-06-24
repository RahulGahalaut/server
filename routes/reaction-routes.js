import express from "express";
import auth from "../middlewares/auth.js"
import { getAllLikes, likeOnPost, deleteLikeOnPost, getAllFavPosts, markFavOnPost, deleteFavMarkOnPost } from "../controllers/reaction-controllers.js";

const reactionRouter = express.Router();

reactionRouter.use(auth);

reactionRouter.get("/like/:postId", getAllLikes);
reactionRouter.post("/like/:postId", likeOnPost);
reactionRouter.delete("/like/:postId", deleteLikeOnPost);

reactionRouter.get("/favs", getAllFavPosts);
reactionRouter.post("/favs/:postId", markFavOnPost);
reactionRouter.delete("/favs/:postId", deleteFavMarkOnPost);

reactionRouter.getFavorites

export default reactionRouter;
