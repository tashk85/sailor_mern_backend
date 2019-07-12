const express = require("express");
const router = express.Router();
const passport = require("passport");
const { authRedirect, authorise } = require("./../middleware/authorisation_middleware");
const FeedController = require("./../controllers/feed_controller");

// View Feed of Articles
router.get("/", FeedController.index); // FeedController.index

// Filter Feed by Interest
router.get("/:interest", (req, res) => res.send("Feed sorted by interest tag")); // FeedController.showByInterest
// :interest will be a string interpolation of interest tags from user

module.exports = router;