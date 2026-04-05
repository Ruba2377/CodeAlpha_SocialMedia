const router = require("express").Router();
const Comment = require("../models/Comment");

// Add comment
router.post("/", async (req, res) => {
  const comment = new Comment(req.body);
  const saved = await comment.save();
  res.json(saved);
});

// Get comments for a post
router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId });
  res.json(comments);
});

module.exports = router;