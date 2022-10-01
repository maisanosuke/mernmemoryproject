import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    message: String,
    creater: String,
    createrId: String,
    tags: [String],
    selectedFile: String,
    likedUsers: {type: [String],default: []},
    likeCount: {type: Number, default: 0},
    comments: [
        { //ONE TO MANY more efficient to save child data separately but store ref to child
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Comment"
        }
    ],
    createdAt: {type: Date, default: new Date()},
})

//mongoose MW
//postSchema.pre('save', () => console.log("about to save!"));

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;