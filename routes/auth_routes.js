const express = require("express");
const { celebrate, Joi } = require("celebrate");
const passport = require("passport");
const router = express.Router();
const AuthController = require("./../controllers/auth_controller");
const { authRedirect } = require("./../middleware/authorisation_middleware");

// Shows Sign Up Form --> Can remove this route when move to Redux in front-end
router.get("/signup", authRedirect, AuthController.registerNew); //AuthController.registerNew


router.post("/signup", celebrate({
    body: {
        first_name: Joi.string().first_namel().required(),
        last_name: Joi.string().last_name().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), AuthController.registerCreate); //AuthController.registerCreate


// Add LinkedIn OAuth routes


// Shows Login Page --> Can remove this route when move to Redux in front-end
router.get("/login", (req, res) => res.send("Log In")); //AuthController.loginNew

router.post("/login", celebrate({
    body: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}),
    passport.authenticate('local', {
        successRedirect: "/feed",
        failureRedirect: "auth/login",
        session: false
    }), AuthController.loginCreate
); //AuthController.loginCreate

router.get("/logout", (req, res) => res.send("You have successfully logged out")); //AuthController.logout

module.exports = router;