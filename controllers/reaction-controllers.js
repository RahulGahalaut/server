import Reaction from "../models/reaction-model.js";

export const getAllReactions = (req, res) => {
    const userId = req.user.userId;
    const postId = req.params.postId;
    Reaction.find({ postInfo: postId })
        .then(reactions => {
            let doLike = false;
            const currentUserReaction = reactions.filter((reaction) => reaction.userInfo == userId)
            if (currentUserReaction.length)
                doLike = true;
            res.status(200).json({ reactions: reactions.length, doLike: doLike })
        })
        .catch(err => {
            res.status(400).json({ message: "getAllReactions server error!" })
        })
}
export const reactOnPost = (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.userId;
    const like = req.body.like;

    Reaction.findOne({ userInfo: userId, postInfo: postId })
        .then(reaction => {
            if (reaction) {
                if (reaction.like == like) {
                    res.status(200).json(reaction)
                }
                else {
                    Reaction.findOneAndUpdate({ userInfo: userId, postInfo: postId }, {
                        like: like
                    }, { new: true })
                        .then(updatedReaction => {
                            res.status(200).json(updatedReaction)
                        })
                        .catch(err => {
                            res.status(500).json({ message: "reactOnPost server error!" })
                        })
                }
            }
            else {
                const newReaction = new Reaction({
                    userInfo: userId,
                    postInfo: postId,
                    like: like
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

export const deleteReactionOnPost = (req, res) => {
    const userId = req.user.userId;
    const postId = req.params.postId;

    Reaction.deleteOne({ userInfo: userId, postInfo: postId })
        .then(acknowledgement => {
            res.status(200).json(acknowledgement)
        })
        .catch(err => {
            res.status(500).json({ message: "deleteReactionOnPost server error!" })
        })

}
