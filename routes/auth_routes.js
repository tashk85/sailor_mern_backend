const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => res.send("Sign Up"));

router.post("/signup", (req, res) => res.send("You have signed Up"));

module.exports = router;