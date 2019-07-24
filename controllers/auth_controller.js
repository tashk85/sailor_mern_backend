const UserModel = require("./../database/models/user_model");
const JWTService = require("./../services/jwt_service");


// API to create a new user
async function registerCreate(req, res, next) {
    // pull user info from request body
    const { email, password, firstName,lastName, admin=false } = req.body;

    const user = await UserModel.create({ email, password, firstName, lastName, admin});
    
    req.login(user, (error) => {
        if (error) {
            return next(new HTTPError(
                400,
                err.message
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
    
    // return token generated from user information
    const token = JWTService.generateToken(user);
    return res.json({ token }); 
}

// API to log in an existing user using LinkedIn OAuth strategy
function loginOAuthCreate(req, res, next) {

    // get user information from request
    const { user } = req;
    
    // return token generated from user information
    const token = JWTService.generateToken(user);
    return res.redirect(`${process.env.REACT_URL}/oauth?token=${token}`);
}



module.exports = {
    registerCreate,
    loginCreate,
    loginOAuthCreate
}