const express = require("express");
const router = express.Router();

// Shows Sign Up Form
router.get("/signup", (req, res) => res.send("Sign Up")); //AuthController.registerNew

router.post("/signup", (req, res) => res.send("You have signed Up")); //AuthController.registerCreate

// Add LinkedIn OAuth routes

// Shows Login Page
router.get("/login", (req, res) => res.send("Log In")); //AuthController.loginNew
router.post("/login", (req, res) => res.send("Log In")); //AuthController.loginCreate

router.get("/logout", (req, res) => res.send("You have successfully logged out")); //AuthController.logout

module.exports = router;