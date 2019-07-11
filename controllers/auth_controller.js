const UserModel = require("./../database/models/user_model");
const JWTService = require("./../services/jwt_service");

//can remove this method when move to redux form
function registerNew(req, res) {
    //display sign up form
    res.render("authentication/signup");
}

async function registerCreate(req, res, next) {
    const { email, password, first_name,last_name } = req.body;
    const user = new UserModel({ email, first_name,last_name  });
    // const user = await UserModel.create({ email, first_name,last_name });

    // req.login(user, (error)=>{
    //     if (error) {
    //         return next(error);
    //     }

    //     res.redirect("/user/interests");
    // });
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
    res.redirect("/");
}

//can remove this method when move to redux form
function loginNew(req,res){
    res.render("authentication/login");
}

function loginCreate(req,res) {
    const token= jwt.sign({ sub: req.user._id}, process.env.JWT_SECRET);
    res.cookie("jwt", token);
    res.redirect("feed/feed");

}



module.exports = {
    registerNew,
    registerCreate,
    loginNew,
    loginCreate,
    logout
}