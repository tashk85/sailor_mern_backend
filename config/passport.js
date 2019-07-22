const passport = require("passport");
const LocalStrategy = require("passport-local");
const { Strategy: JwtStrategy, ExtractJwt} = require("passport-jwt");
const { Strategy: LinkedInStrategy } = require("@sokratis/passport-linkedin-oauth2");
const UserModel = require("./../database/models/user_model");

//The serializeUser() method stores information inside of our session relating to the passport user.
passport.serializeUser((user,done)=>{
    done(null, user._id);
});

//The deserializeUser() method gives us access to the information stored within the passport.
//user property of our session and allows us to return back data (in this case the user from the database)
// that will be appended to req.user.
passport.deserializeUser(async (id, done)=> {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch(error){
        done(error);
    }
});

passport.use(new LocalStrategy({
    usernameField: "email"
},
    async (email, password, done) => {
        // console.log(email, password, done);
        const user = await UserModel.findOne({ email })
        .catch(done);

        if (!user || !user.verifyPasswordSync(password)) {
        return done(null, false);
    }
    return done(null, user);
}
));

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    async (jwt_payload, done) => {
        try{
            const user = await UserModel.findById(jwt_payload.sub);
    
            if (!user) {
                return done(null, false);
            }
    
            return done(null, user);           
        } catch (error) {
            return done(error);
        }
    }
));

passport.use(new LinkedInStrategy(
    {
        clientID: process.env.LINKEDIN_KEY,
        clientSecret: process.env.LINKEDIN_SECRET,
        // callbackURL: "http://localhost:3000/auth/linkedin/callback",
        callbackURL: "https://sailor-mern.herokuapp.com/auth/linkedin/callback",
        scope: ['r_emailaddress', 'r_liteprofile'],
        // passReqToCallback: true
    }, async (accessToken, refreshToken, profile, done) => {
    // console.log("*********************************")
    // console.log(profile);
        
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const email = profile.emails[0].value;
        const avatar = profile.photos[1].value;
        const linkedinToken = accessToken;
    
        console.log("*****************")
        console.log(email, firstName, lastName, avatar);

        let user = await UserModel.findOne({ email })
            .catch(done);

        if(user) {
            return done(null, user);
        }

        //if user doesn't exist then create one
        user = await UserModel.create({ email, firstName, lastName, password: "testing1", avatar });

        return done(null, user);
    }
));