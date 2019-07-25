const express = require("express");
const router = express.Router();
const UserController = require("./../controllers/user_controller");
const NotificationController = require("./../controllers/notification_controller");

// Post selected interests to user model in database
router.post("/interests", UserController.interestsCreate);

// Retrieve ALL possible interests
router.get("/interests/all", UserController.interestsIndex);
// Retrieve interests that a user has stored in their entry in db
router.get("/interests", UserController.getUserInterests);

// Show User Profile page
router.get("/profile", UserController.showProfile);

// User can delete their account
router.delete("/:id", (req, res) => res.send("You have deleted your account")); //UserController.destroy

router.get("/", UserController.getCurrentUser);

// User's notifications
router.get("/notifications", NotificationController.index); // see all unread notification for one user
router.get("/:userId/:notificationId", NotificationController.showAndDelete); // re-direct to article with mention + delete the notification if clicked


module.exports = router;