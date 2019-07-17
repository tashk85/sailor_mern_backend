const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth_routes");
const UserRoutes = require("./user_routes");
const FeedRoutes = require("./feed_routes");
const ArticleRoutes = require("./article_routes");
const { authorise } = require("./../middleware/authorisation_middleware");
const passport = require("passport");

router.get("/", (req, res) => res.send("Welcome"));
router.get("/error", (req, res) => res.send("Welcome"));
router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
// router.use("/feed", passport.authenticate('jwt', {session: false}), FeedRoutes);
//test out rss feature without authentication
router.use("/feed", FeedRoutes);
// router.use("/article",authorise, ArticleRoutes);
router.use("/article", ArticleRoutes);


module.exports = router;