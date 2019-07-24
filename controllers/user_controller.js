const UserModel = require("./../database/models/user_model");
const ArticleModel = require("./../database/models/article_model");
const InterestModel = require("./../database/models/interest_model");



// API to show user info
async function showProfile(req, res, next) {
    // get user info { first name, last name, avatar, interests }
    try {
        const { user } = req;
        
        // retrieve articles that current user has liked from article model
        const likes = await ArticleModel.find({ likes: user._id });

        return res.json({ user, likes });
    } catch (error) {

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

// API to show all possible interests for form
function interestsIndex(req, res, next) {
    const interestTags = InterestModel.schema.path('tag').enumValues;
    return res.json(interestTags);
}

// API to save interests for a user
async function interestsCreate(req, res, next) {
    let { user } = req;
    let userInterests = req.body;

    await UserModel.findByIdAndUpdate(user._id, { interests: userInterests });

    return res.json(userInterests);
}

// API to retrieve interests for a user
async function getUserInterests(req, res, next) {
    let { user } = req;
    let interests = user.interests;
    return res.json({ interests });
}

module.exports = {
    interestsCreate,
    showProfile,
    getCurrentUser,
    interestsIndex,
    getUserInterests
}
