import Reaction from "../models/reaction-model.js";

export const getAllLikes = (req, res) => {
    const userId = req.user.userId;
    const postId = req.params.postId;
    Reaction.find({ postInfo: postId })
        .then(reactions => {
            let likes = (reactions.filter((reactions) => reactions.reaction === "like")).length;
            let doLike = Boolean((reactions.filter((reactions) => (reactions.userInfo == userId && reactions.reaction === "like"))).length);
            let isFav = Boolean((reactions.filter((reactions) => (reactions.reaction === "fav" && reactions.userInfo == userId))).length);
            res.status(200).json({ likes: likes, doLike: doLike, isFav: isFav })
        })
        .catch(err => {
            res.status(400).json({ message: "getAllReactions server error!" })
        })
}
export const likeOnPost = (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.userId;

    Reaction.findOne({ userInfo: userId, postInfo: postId, reaction: "like" })
        .then(reaction => {
            if (reaction) {
                res.status(200).json(reaction)
            }
            else {
                const newReaction = new Reaction({
                    userInfo: userId,
                    postInfo: postId,
                    reaction: "like"
                })
                newReaction.save()
                    .then(generatedReaction => {
                        res.status(200).json(generatedReaction)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ message: "reactOnPost server error!" })
                    })
            }
        })
        .catch(err => {
            res.status(200).json({ message: "reactOnPost server error!" })
        })
}

export const deleteLikeOnPost = (req, res) => {
    const userId = req.user.userId;
    const postId = req.params.postId;

    Reaction.deleteOne({ userInfo: userId, postInfo: postId, reaction: "like" })
        .then(acknowledgement => {
            res.status(200).json(acknowledgement)
        })
        .catch(err => {
            res.status(500).json({ message: "deleteReactionOnPost server error!" })
        })

}

export const getAllFavPosts = (req, res) => {
    const userId = req.user.userId;
    Reaction.find({ userInfo: userId, reaction: "fav" }).populate({ path: 'postInfo', populate: { path: 'author' } })
        .then(reactions => {
            if (reactions.length) {
                const posts = reactions.map((reaction) => reaction.postInfo)
                res.status(200).json({ posts: posts })
            }
            else {
                res.status(500).json({ message: "No Post Found!" })
            }
        })
        .catch(err => {
            res.status(400).json({ message: "getAllReactions server error!" })
        })
}
export const markFavOnPost = (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.userId;

    Reaction.findOne({ userInfo: userId, postInfo: postId, reaction: "fav" })
        .then(reaction => {
            if (reaction) {
                res.status(200).json(reaction)
            }
            else {
                const newReaction = new Reaction({
                    userInfo: userId,
                    postInfo: postId,
                    reaction: "fav"
                })
                newReaction.save()
                    .then(generatedReaction => {
                        res.status(200).json(generatedReaction)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ message: "reactOnPost server error!" })
                    })
            }
        })
        .catch(err => {
            res.status(200).json({ message: "reactOnPost server error!" })
        })
}
export const deleteFavMarkOnPost = (req, res) => {
    const userId = req.user.userId;
    const postId = req.params.postId;

    Reaction.deleteOne({ userInfo: userId, postInfo: postId, reaction: "fav" })
        .then(acknowledgement => {
            res.status(200).json(acknowledgement)
        })
        .catch(err => {
            res.status(500).json({ message: "deleteReactionOnPost server error!" })
        })
}
