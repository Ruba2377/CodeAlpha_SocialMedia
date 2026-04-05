const router = require("express").Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();

    const { password, ...others } = savedUser._doc;

    res.json(others); // ✅ password removed
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.json("User not found");

    if (user.password !== req.body.password) {
      return res.json("Wrong password");
    }

    const { password, ...others } = user._doc;

    res.json(others); // ✅ password removed
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;