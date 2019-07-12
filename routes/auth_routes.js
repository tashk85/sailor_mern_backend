const express = require("express");
const { celebrate, Joi } = require("celebrate");
const passport = require("passport");
const router = express.Router();
const AuthController = require("./../controllers/auth_controller");
const { authRedirect } = require("./../middleware/authorisation_middleware");

// Shows Sign Up Form --> Can remove this route when move to Redux in front-end
router.get("/signup", authRedirect, AuthController.registerNew); 


router.post("/signup", celebrate({
    body: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), AuthController.registerCreate); 


// Add LinkedIn OAuth routes


// Shows Login Page --> Can remove this route when move to Redux in front-end
router.get("/login", AuthController.loginNew); //AuthController.loginNew

router.post("/login", celebrate({
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}),
    passport.authenticate('local', {
        // successRedirect: "/feed",
        // failureRedirect: "/auth/login",
        session: false
    }), AuthController.loginCreate
); 

router.get("/logout", AuthController.logout); //AuthController.logout

module.exports = router;