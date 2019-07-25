const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth_routes");
const UserRoutes = require("./user_routes");
const FeedRoutes = require("./feed_routes");
const AdminRoutes = require("./admin_routes");
const ArticleRoutes = require("./article_routes");
const { admin_authorise   } = require("./../middleware/authorisation_middleware");
const passport = require("passport");

router.get("/", (req, res) => res.send("Welcome"));
router.get("/error", (req, res) => res.send("Welcome"));

// **** Authentication Routes ****
router.use("/auth", AuthRoutes);

// **** User Routes ****
router.use("/user", passport.authenticate("jwt", { session: false }), UserRoutes);

// **** Feed Routes ****
router.use("/feed", passport.authenticate('jwt', {session: false}), FeedRoutes);

// **** Article Routes ****
router.use("/article",passport.authenticate('jwt', {session: false}),  ArticleRoutes);


// **** Admin Routes ****
router.use("/admin",passport.authenticate('jwt', {session: false}), admin_authorise, AdminRoutes);


module.exports = router;