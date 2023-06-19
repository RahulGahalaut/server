import Comment from "../models/comment-model.js";

export const postComment=(req,res)=>{
    const postId=req.params.postId;
    const userId=req.user.userId;
    const commentText=req.body.text;

    const newComment= new Comment({
        user:userId,
        post:postId,    
        text:commentText
    })

    newComment.save()
    .then(()=>newComment.populate({path: 'user',select:["_id","username"]}))
    .then(commentWithUserInfo=> res.status(201).json(commentWithUserInfo))
    .catch(err=>{
        res.status(500).json({message:"postComment server error!"});
    })
}

export const getComments=(req,res)=>{
    const postId=req.params.postId;
    Comment.find({post:postId}).populate({path: 'user',select:["_id","username"]})
    .then(comments=>{
        res.status(200).json({comments:comments});
    })
    .catch(err=>{
        res.status(500).json({message:"getComments server error!"})
    })
}

export const deleteComment=(req,res)=>{
    const commentId=req.params.commentId;
    const loggedInUserId=req.user.userId;
    Comment.findOne({_id:commentId})
    .then(foundComment=>{
        if(foundComment.user==loggedInUserId){
            Comment.deleteOne({_id:commentId})
            .then(acknowledgement=>{
                res.status(200).json(acknowledgement);
            })
            .catch(err=>{
                res.status(500).json({message:"deleteComment server error!"});
            })
        }
        else{
            res.status(403).json({message:"you are not authorized to delete this comment!"})
        }
    })
    .catch(err=>{
        res.status(500).json({message:"deleteComment server error!"})
    })
    
}

export const updateComment=(req,res)=>{
    const commentId=req.params.commentId;
    const updatedText=req.body.text;
    const loggedInUserId=req.user.userId;
    Comment.findOne({_id:commentId})
    .then(foundComment=>{
        if(foundComment.user==loggedInUserId){
            Comment.findOneAndUpdate({_id:commentId},{text:updatedText},{new:true}).populate({path:"user",select:["_id","username"]})
            .then(updatedComment=>{
                res.status(200).json(updatedComment);
            })
            .catch(err=>{
                res.status(500).json({message:"updateComment server error!"});
            })
        }
        else{
            res.status(403).json({message:"you are not authorized to update this comment!"})
        }
    })
    .catch(err=>{
        res.status(500).json({message:"updateComment server error!"})
    })
    
}