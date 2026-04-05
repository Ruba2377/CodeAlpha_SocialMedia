const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: String,
  username: String, // ✅ ADD THIS
  content: String,
  likes: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", PostSchema);