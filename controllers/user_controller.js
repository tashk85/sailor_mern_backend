const UserModel = require("./../database/models/user_model");
const ArticleModel = require("./../database/models/article_model");

// API to save interests for a user
async function interestsCreate(req, res, next) {
    
    let { userId } = req.params;
    let { interests } = req.body;

    await UserModel.findByIdAndUpdate(userId, {interests});

    res.json({ interests });
}

// API to show user info
async function showProfile(req, res, next) {
    // get first name, last name, avatar
    // interests
    // likes that a user has from article model
    try {
        const { user } = req;
        console.log(user);

        const likes = await ArticleModel.find({ likes: user._id });
        console.log(likes);

        return res.json({ user, likes });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    interestsCreate,
    showProfile
}