import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
//const postRoutes = require("./routes/posts");
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import 'dotenv/config';

const app = express();
//const CONNECTION_URL = "mongodb+srv://msawada:nezukogairu@cluster0.5yyvjeq.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3001;

//Middlewares
app.use(cors());
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));

//connect to momngoose
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})//{useNewUrlParser: true, useUnifiedTopology: true}
    .then(()=>console.log("Mongo connection OPEN!"))
    .catch(e=>console.log("Error connecting Mongo!", e));


//ROUTES **Has to come after all the middleware or middlewares won't mount!
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
// router.get("/", getPosts);
// router.post("/", createPosts);


app.get("/", (req, res) => {
    res.send("APP IS RUNNING");//give user feedback to show on their browser
})


app.listen(PORT, ()=>{
    console.log("listening to Port ",PORT);
})