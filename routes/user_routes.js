const express = require("express");
const router = express.Router();
const UserController = require("./../controllers/user_controller");

// Post selected interests to user model in database
router.post("/interests", UserController.interestsCreate);

// Retrieve ALL possible interests
router.get("/interests/all", UserController.interestsIndex);
// Retrieve interests that a user has stored in their entry in db
router.get("/interests", UserController.getUserInterests);
// how will we distinguish different routes when we create or update?

// Update Interests
// router.put("/interests", (req, res) => res.send("Your Interests are ...")); //UserController.interestsUpdate
// router.patch("/interests", (req, res) => res.send("Your Interests are ...")); //UserController.interestsUpdate

// Show User Profile page
router.get("/profile", UserController.showProfile);
// router.get("/:id", (req, res) => res.send("User Profile")); //UserController.show
// add user password change option later?

// User can delete their account
router.delete("/:id", (req, res) => res.send("You have deleted your account")); //UserController.destroy

router.get("/", UserController.getCurrentUser);

module.exports = router;