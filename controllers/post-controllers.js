import Post from "../models/post-model.js";

export const getAllPosts = (req, res) => {
    Post.find().populate({ path: 'author', select: ["_id", "username"] })
        .then(posts => {
            res.status(200).json({ posts: posts });
        })
        .catch(err => {
            res.status(500).json({ message: "getAllPost server error!" });
        })
};

export const getOnePost = (req, res) => {
    const postId = req.params.postId;
    Post.findOne({ _id: postId }).populate({ path: 'author', select: ["_id", "username"] })
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ message: "getOnePost server error!" })
        })
};

export const getMyPosts = (req, res) => {
    const author = req.user.userId;
    Post.find({ author: author }).populate({ path: 'author', select: ["_id", "username"] })
        .then(posts => {
            res.status(200).json({ posts: posts })
        })
        .catch(err => {
            res.status(500).json({ message: "myPost server error!" })
        })
};
export const createPost = (req, res) => {
    const author = req.user.userId;
    const title = req.body.title;
    const content = req.body.content;
    const newPost = new Post({
        title: title,
        author: author,
        content: content
    })
    newPost.save()
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({ message: "createPost server error!" })
        })
};

export const updatePost = (req, res) => {
    const postId = req.params.postId;
    const updatedTitle = req.body.updatedTitle;
    const updatedContent = req.body.updatedContent;
    const loggedInUserId = req.user.userId;

    Post.findOne({ _id: postId })
        .then(foundPost => {

            if (foundPost) {
                if (foundPost.author == loggedInUserId) {
                    Post.findOneAndUpdate({ _id: postId }, {
                        title: updatedTitle,
                        content: updatedContent
                    }, { new: true })
                        .then(updatedPost => {
                            res.status(200).json(updatedPost);
                        })
                        .catch(err => {
                            res.status(500).json({ message: "updatePost server error!" })
                        })
                }
                else {
                    res.status(400).json({ message: "you are not authorized to update this post!" })
                }
            }
            else {
                res.status(400).json({ message: "post not found!" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "updatePost server error!" })
        })

};

export const deletePost = (req, res) => {
    const postId = req.params.postId;
    const loggedInUserId = req.user.userId;
    Post.findOne({ _id: postId })
        .then(foundPost => {
            if (foundPost) {
                if (foundPost.author == loggedInUserId) {
                    Post.deleteOne({ _id: postId })
                        .then(acknowledgement => {
                            res.status(200).json(acknowledgement);
                        })
                        .catch(err => {
                            res.status(500).json({ message: "deletePost server error!" })
                        })
                }
                else {
                    res.status(400).json({ message: "you are not authorized to delete this post!" })
                }
            }
            else {
                res.status(400).json({ message: "post not found!" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "deletePost server error!" })
        })

};