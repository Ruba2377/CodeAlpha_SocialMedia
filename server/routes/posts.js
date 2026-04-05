const router = require("express").Router();
const Post = require("../models/Post");

// Create post
router.post("/", async (req, res) => {
  const post = new Post(req.body);
  const savedPost = await post.save();
  res.json(savedPost);
});

// Like post
router.put("/:id/like", async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes.push(req.body.userId);
  await post.save();
  res.json("Post liked");
});

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

module.exports = router;