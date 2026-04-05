const router = require("express").Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  const savedUser = await user.save();
  res.json(savedUser);
});

// Follow user
router.put("/:id/follow", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user.followers.includes(req.body.userId)) {
    user.followers.push(req.body.userId);
    await user.save();
  }

  res.json("Followed");
});

module.exports = router;