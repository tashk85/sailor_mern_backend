const UserModel = require("./../database/models/user_model");

function registerNew(req, res) {
    //display sign up form
    res.render("authentication/signup");
}

async function registerCreate(req, res, next) {
    const { email, password, first_name,last_name } = req.body;
    const user = await UserModel.create({ email, password, first_name,last_name });

    req.login(user, (error)=>{
        if (error) {
            return next(error);
        }

        res.redirect("/user/interests");
    });
}



module.exports = {
    registerNew,
    registerCreate,
    // loginNew,
    // loginCreate,
    // logout
}