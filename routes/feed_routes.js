const express = require("express");
const router = express.Router();
const passport = require("passport");

// View Feed of Articles
router.get("/", (req, res) => res.render("feed/feed")); // FeedController.index

// Filter Feed by Interest
router.get("/:interest", passport.authenticate("jwt", {session: false }), (req, res) => res.send("Feed sorted by interest tag")); // FeedController.showByInterest
// :interest will be a string interpolation of interest tags from user

module.exports = router;