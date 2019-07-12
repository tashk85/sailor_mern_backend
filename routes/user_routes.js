const express = require("express");
const router = express.Router();
const UserController = require("./../controllers/user_controller");

// Interests Creation
router.get("/interests", UserController.interestsNew); //UserController.interestsNew

router.post("/:userid/interests", UserController.interestsCreate); //UserController.interestsCreate

// Interests Update
router.get("/interests", (req, res) => res.send("Edit your interests")); //UserController.interestsEdit
// how will we distinguish different routes when we create or update?

router.put("/interests", (req, res) => res.send("Your Interests are ...")); //UserController.interestsUpdate
router.patch("/interests", (req, res) => res.send("Your Interests are ...")); //UserController.interestsUpdate

// For User Profile page
router.get("/:id", (req, res) => res.send("User Profile")); //UserController.show
// add user password change option later?

//User can delete their account
router.delete("/:id", (req, res) => res.send("You have deleted your account")); //UserController.destroy

module.exports = router;