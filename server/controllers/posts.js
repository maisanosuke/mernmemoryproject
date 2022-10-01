import PostMessage from "../models/postMessage.js";
import Comment from "../models/comment.js";
import mongoose from "mongoose";

const postsPerPage = 6;

export const getPosts = async (req, res) => {
    try{
        const {page} = req.query;
        const totalPosts = await PostMessage.count({});
        let postMessage;
        if(isNaN(page)){//page is not a number
            postMessage = await PostMessage.find({}).sort({_id: -1});
            postsPerPage = totalPosts;
        }
        else{
            const firstIndex = ( page - 1 ) * postsPerPage; //shows 4 posts per page
            postMessage = await PostMessage.find({}).sort({_id: -1}).skip(firstIndex).limit(postsPerPage);
            //res.render("posts", {postMessage}); to send posts.ejs
        }
        // postMessage.sort((a,b)=>{
        //     if(a.createdAt < b.createdAt) return 1;//a is created before b
        //     else if(a.createdAt > b.createdAt) return -1; //a is created after b => bring at top
        //     else return 0;
        // })
        //console.log('totalPage: ', Math.ceil(totalPosts / postsPerPage));
        res.status(200).json({posts: postMessage, page: page, totalPage: Math.ceil(totalPosts / postsPerPage)});
        //res.sendFile("/Users/maisawada/Desktop/Web Development/React/MERN memories project/server/views/posts.html");
    }
    catch(e){
        res.status(404).json({message: e.message});
    }
};

export const getPost = async (req, res) => {
    try{
        const {id} = req.params;
        //comments are ref so use populate to get the data. sort commments bring most updated comment at top
        const post = await (await PostMessage.findOne({_id: id})).populate('comments')//populate({path: 'comments', options: {sort: {'_id': -1}}});
        res.status(200).json(post);
    }catch(e){
        res.status(404).json({message: e.message});
    }
}

//page
export const getSearchPosts = async (req, res) => {
    try{
        const {searchQuery, tags} = req.query;
        //console.log('tags: ', tags);
        const posts = await PostMessage.find({
            $or:[
                {title: { $regex: searchQuery, $options: 'i'}},//if title contains searchQuery 
                {message: { $regex: searchQuery, $options: 'i'}},//$option: 'i' means case-insensitive
                {tags: { $in: tags.split(',')}}
            ]
        })
        res.status(200).json({posts: posts, page: 1, totalPage: Math.ceil(posts.length/postsPerPage)});
    }
    catch(e){
        res.status(404).json({message: e.message});
    }
}

export const createPosts = async (req, res) => {
    //const {title, message, creater, selectedFile, tags} = req.body;
    if(!req.userId) return res.status(401).json({message: "login to create Post!"})
    //console.log('req.body: ', req.body);
    const newPost = new PostMessage({...req.body, createdAt: new Date(), createrId: req.userId});
    console.log("newPost: ", newPost);
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(e){
        console.log(e);
        res.status(409).json({message: e.message});
    }
};


export const deletePost = async (req, res) => {
    const {id} = req.body;
    try{
        const deletedPost = await PostMessage.findOneAndDelete({ _id: id });
        //console.log("DELETED:", deletedPost);
        res.status(200).send("Deleted successfully!");
    }catch(e){
        console.log("Failed to delete");
        res.status(404).json({message: e.message});
    }
}

export const likePost = async (req, res) => {
    //console.log("req.userId: ", req.userId); //data stored in auth MW
    const {id} = req.params;
    if(!mongoose.Types.ObjectId(id)) return res.status(404).send("Not a valid ID");
    if(!req.userId) return res.status(401).json({message: "Need to log in to like a post!"});
    try{
            const post = await PostMessage.findById(id);
            const index = post.likedUsers.indexOf(req.userId);
            let updatedPost;
            if(index === -1){//user hasn't liked the post add user to array
                updatedPost = await PostMessage.findByIdAndUpdate(id, 
                    {
                        likedUsers: [...post.likedUsers, req.userId],
                        likeCount: post.likeCount+1
                    }, {new: true})
            }else{//userId found, so the user already liked the post so dislike the post
                updatedPost = await PostMessage.findByIdAndUpdate(id, 
                {
                    likedUsers: post.likedUsers.filter( user => user!=req.userId ),
                    likeCount: post.likeCount-1
                }, {new: true})
            }
            //const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount+1}, {new: true});
            //console.log('updatedPost', updatedPost);
            res.json(updatedPost);
    }catch(e){
        console.log("Failed to update like",e);
        res.status(404).json({message: e.message});
    }
}

export const patchPost = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId(id)) return res.status(404).send("Not a valid ID");
    try{
        const data = await PostMessage.findByIdAndUpdate(id, req.body, {new: true});
        res.status(201).json(data);
    }catch(e){
        res.status(404).json({message: e.message});
    }
}

export const commentPost = async (req, res) => {
    try{
        const {id} = req.params;
        const {comment, username} = req.body.data;
        const newComment = new Comment({commentText: comment, user: username});
        const post = await PostMessage.findById(id);
        post.comments.push(newComment);
        await newComment.save();
        await post.save();
        res.status(201).json(newComment);
    }catch(e){
        res.status(404).json({message: e.message});
    }
} 