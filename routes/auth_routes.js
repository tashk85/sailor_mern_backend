const express = require("express");
const { celebrate, Joi } = require("celebrate");
const passport = require("passport");
const router = express.Router();
const AuthController = require("./../controllers/auth_controller");

// Register new user
router.post("/signup", celebrate({
    body: {
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(6).max(20).required(),
        admin: Joi.boolean()
    }
}), AuthController.registerCreate); 

// Login for an existing user
router.post("/login", celebrate({
    body: {
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().required()
    }
}),
    passport.authenticate('local', {
        session: false
    }), AuthController.loginCreate
); 

// Login via LinkedIn OAuth
router.get('/linkedin', passport.authenticate("linkedin", { state: 'SOME STATE' }));

router.get('/linkedin/callback', 
    passport.authenticate('linkedin', {
        failureRedirect: "/login",
        session: false
    }), AuthController.loginOAuthCreate
);

module.exports = router;
