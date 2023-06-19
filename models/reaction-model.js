import mongoose from 'mongoose';

const reactionSchema= new mongoose.Schema({
    userInfo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postInfo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    like:{
        type: Boolean,
        required:true
    }
},{
    timestamps:true
})

const Reaction= new mongoose.model("Reaction",reactionSchema)

export default Reaction;