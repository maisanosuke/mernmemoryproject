import express from "express";
import {getPosts, getSearchPosts, getPost, createPosts, deletePost, patchPost, likePost, commentPost} from "../controllers/posts.js";
import auth from '../middleware/auth.js';
const router = express.Router();

// const express = require("express");
// const {getPosts, postPosts} = require ("../controllers/posts.js");


router.get("/", getPosts);
router.get("/search", getSearchPosts);
router.get("/:id", getPost);
//router.get("/:id", getPost);
router.post("/", auth, createPosts);//has to log in to create post
router.delete("/", auth, deletePost);//delete post
router.patch("/:id", auth, patchPost);//edit post
router.patch("/:id/like", auth, likePost);//increment likeCount
router.post("/:id/comment", auth, commentPost);//add comment to post 
// router.patch("/", patchPost);//deosn't find path.. 



//module.exports = router;
export default router;