const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
dotenv.config({ path: "./config/.env" });
const Post = require("./model/Post.js");

const app = express();

// connect Database
connectDB();

//static file
app.use(express.static(__dirname + "\\public"));
app.use(cors());
app.use(express.json());

//set route

app.post("/api/v1/post", async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const data = await Post.create({ title, content });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/post", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

app.put("/api/v1/post/:id", async (req, res) => {
  try {
    const oldPost = await Post.findById(req.params.id);
    if (!oldPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const { title = oldPost.title, content = oldPost.content } = req.body;

    const post = await Post.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

// handle Error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
