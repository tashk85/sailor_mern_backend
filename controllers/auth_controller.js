const UserModel = require("./../database/models/user_model");
const JWTService = require("./../services/jwt_service");

//can remove this method when move to redux form
function registerNew(req, res) {
    //display sign up form
    return res.render("authentication/signup");
}

async function registerCreate(req, res, next) {
    const { email, password, firstName,lastName } = req.body;
    const user = new UserModel({ email, firstName,lastName  });
    UserModel.register(user, password, (err, user) => {
        if (err) {
            return next(new HTTPError(500, err.message));
        }

        const token = JWTService.generateToken(user);

        res.json({ token });    

        return res.redirect("user/interests");    
    });
}

function logout(req,res) {
    req.logout();
    res.cookie("jwt", null, {maxAge: -1 });
    return res.redirect("/auth/login");
}

//can remove this method when move to redux form
function loginNew(req,res){
    return res.render("authentication/login");
}

async function loginCreate(req,res) {

    //regular login
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.render("authentication/login", { error: "Invalid email & password" });
    }

    const valid = await user.verifyPassword(password);

    if (!valid) {
        return res.render("authentication/login", { error: "Invalid email & password" });
    }

    //passport jwt
    const token = JWTService.generateToken(user);
    //testing
        // const token = JWT.sign({ sub: req.user._id }, process.env.JWT_SECRET);
        // res.cookie("jwt", token);
    res.json({ token }); 
    //testing
        // req.user = user;

    return res.redirect("/feed");

}



module.exports = {
    registerNew,
    registerCreate,
    loginNew,
    loginCreate,
    logout
}