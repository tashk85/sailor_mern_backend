const UserModel = require("./../database/models/user_model");
const ArticleModel = require("./../database/models/article_model");
const InterestModel = require("./../database/models/interest_model");

// API to save interests for a user
async function interestsCreate(req, res, next) {
    
    let { user } = req;
    let { interests } = req.body;
    console.log(interests);
    await UserModel.findByIdAndUpdate(user._id, {interests});

    res.json({ interests });
}

// API to show user info
async function showProfile(req, res, next) {
    // get user info { first name, last name, avatar, interests }
    try {
        const { user } = req;
        
        // retrieve articles that current user has liked from article model
        const likes = await ArticleModel.find({ likes: user._id });
        console.log(user, likes);
        console.log("HEEERE")
        return res.json({ user, likes });
    } catch (error) {
        console.log("errorrr")
        return next(error);
    } 
}

// API to show current user
function getCurrentUser(req, res, next) {
    try {
        const { user } = req;
        return res.json(user);
    } catch (error) {
        return next(error);
    }
}

// API to show interests for form
function interestsIndex(req, res, next) {
    const interestTags = InterestModel.schema.path('tag').enumValues;
    res.json(interestTags);
}

module.exports = {
    interestsCreate,
    showProfile,
    getCurrentUser,
    interestsIndex
}