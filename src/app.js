const express = require('express');
const multer = require('multer')
const uploadFile = require('./services/storage.service')
require("dotenv").config()
const postModel = require("./models/post.model")


const app = express();
app.use(express.json());

const upload = multer({storage: multer.memoryStorage()})

app.post('/create-post', upload.single("image"), async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        // 1. Safety check to prevent the 'undefined' error
        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image using the key 'image'" });
        }

        // 2. Call your service
        const result = await uploadFile(req.file.buffer);

        const post = await postModel.create({
            image: result.url,
            caption: req.body.caption,
        })

        return res.status(201).json({
            message: "Post created successfully",
            post
        })


    } catch (error) {
        console.error("Error in /create-post:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/posts', async(req, res) => {
    const posts = await postModel.find()

    return res.status(200).json({
        message: "Post fetched successfully",
        posts
    })
})


module.exports = app;