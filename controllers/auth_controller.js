const UserModel = require("./../database/models/user_model");

function registerNew(req, res) {
    //display sign up form
    res.render("authentication/signup");
}

function registerCreate(req, res) {
    
}



module.exports = {
    registerNew,
    registerCreate,
    loginNew,
    loginCreate,
    logout
}