const UserModel = require("./../database/models/user_model");
const JWTService = require("./../services/jwt_service");

//can remove this method when move to redux form
function registerNew(req, res) {
    //display sign up form
    return res.render("authentications/signup");
}

async function registerCreate(req, res, next) {
    const { email, password, firstName,lastName, admin=false} = req.body;
    const user = await UserModel.create({ email, password, firstName, lastName, admin});
    req.login(user,(error) => {
        if (error) {
            return next(error);
        }
        const token = JWTService.generateToken(user);
        console.log(req.body);
        return res.json({ token });  
    })   

}

//can remove this method when move to redux form
function loginNew(req,res){
    return res.render("authentications/login");
}

function loginCreate(req,res) {

    // get user information from request
    const { user } = req;
    console.log(req.user);
    
    // generate token with user
    const token = JWTService.generateToken(user);
    return res.json({ token }); 
}

function loginOAuthCreate(req,res) {

    // get user information from request
    const { user } = req;
    console.log(req.user);
    
    // generate token with user
    const token = JWTService.generateToken(user);
    return res.redirect(`${process.env.REACT_URL}/oauth?token=${token}`);
}



module.exports = {
    registerNew,
    registerCreate,
    loginNew,
    loginCreate,
    loginOAuthCreate
}