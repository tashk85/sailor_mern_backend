const UserModel = require("./../database/models/user_model");
const JWTService = require("./../services/jwt_service");


// API to create a new user
function registerCreate(req, res, next) {
    // pull user info from request body
    const { email, password, firstName,lastName, admin=false } = req.body;

    const user = new UserModel({ email, firstName, lastName, admin});
    
    UserModel.register(user, password, (error, user) => {
        if (error) {
            return next(new HTTPError(
                400,
                "A user has already been registered with the given email address"
            ));
        }
        // return token generated from user information
        const token = JWTService.generateToken(user);
        return res.json({ token });  
    });
}

// API to log in an existing user using local strategy
function loginCreate(req, res, next) {

    // get user information from request
    const { user } = req;
    console.log(req.user);
    
    // return token generated from user information
    const token = JWTService.generateToken(user);
    return res.json({ token }); 
}

// API to log in an existing user using LinkedIn OAuth strategy
function loginOAuthCreate(req, res, next) {

    // get user information from request
    const { user } = req;
    console.log(req.user);
    
    // return token generated from user information
    const token = JWTService.generateToken(user);
    return res.redirect(`${process.env.REACT_URL}/oauth?token=${token}`);
}



module.exports = {
    registerCreate,
    loginCreate,
    loginOAuthCreate
}