const express = require("express");
const router = express.Router();
const UserController = require("./../controllers/user_controller");

// Interests Creation for redux
router.post("/interests", UserController.interestsCreate);

// Interests Update
router.get("/interests", UserController.interestsIndex);
// how will we distinguish different routes when we create or update?

// Update Interests
router.put("/interests", (req, res) => res.send("Your Interests are ...")); //UserController.interestsUpdate
router.patch("/interests", (req, res) => res.send("Your Interests are ...")); //UserController.interestsUpdate

// Show User Profile page
router.get("/profile", UserController.showProfile);
// router.get("/:id", (req, res) => res.send("User Profile")); //UserController.show
// add user password change option later?

// User can delete their account
router.delete("/:id", (req, res) => res.send("You have deleted your account")); //UserController.destroy

router.get("/", UserController.getCurrentUser);

module.exports = router;