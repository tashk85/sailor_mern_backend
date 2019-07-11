const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth_routes");
const UserRoutes = require("./user_routes");
const FeedRoutes = require("./feed_routes");
const ArticleRoutes = require("./article_routes");

router.get("/", (req, res) => res.send("Welcome"));
router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/feed", FeedRoutes);
router.use("/article", ArticleRoutes);


module.exports = router;