const express = require("express");
const router = express.Router();

// View Feed of Articles
router.get("/", (req, res) => res.send("Feed Page")); // FeedController.index

// Filter Feed by Interest
router.get("/:interest", (req, res) => res.send("Feed sorted by interest tag")); // FeedController.showByInterest
// :interest will be a string interpolation of interest tags from user

module.exports = router;