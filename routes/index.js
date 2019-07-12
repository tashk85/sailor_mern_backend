const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth_routes");
const UserRoutes = require("./user_routes");
const FeedRoutes = require("./feed_routes");
const ArticleRoutes = require("./article_routes");
const { authorise } = require("./../middleware/authorisation_middleware");

router.get("/", (req, res) => res.send("Welcome"));
router.use("/auth", AuthRoutes);
router.use("/user", authorise, UserRoutes);
router.use("/feed", authorise, FeedRoutes);
router.use("/article",authorise, ArticleRoutes);


module.exports = router;