import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    commentText: String,
    // post: { //use ref to parent instead if there are more than few thausand posts
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "PostMessage"
    // },
    user: String //username or ref 
    // user: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     },
})

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;