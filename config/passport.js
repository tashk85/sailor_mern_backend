const passport = require("passport");
const LocalStrategy = require("passport-local");
const { Strategy: JwtStrategy, ExtractJwt} = require("passport-jwt");
const UserModel = require("./../database/models/user_model");

passport.serializeUser((user,done)=>{
    done(null, user._id);
});

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
        const user = await UserModel.findOne( {email })
                    .catch(done);
        if (!user || !user.verifyPasswordSync(password)) {
            return done(null, false);
        }
        return done(null, user);
    }
));

passport.use(new JwtStrategy(
    {
        jwtFromRequest: (req) =>{
            let token = null;

            if (req && req.cookies) {
                token = req.cookies['jwt'];
            }
            return token;
        },
        secretOrKey: process.env.JWT_SECRET
    },
    async (jwt_payload, done) => {
        const user = await UserModel.findById(jwt_payload.sub)
                    .catch(done);
        if(!user) {
            return done(null, false);
        }
        return done(null, user);
    }
));