const UserModel = require("./../database/models/user_model");

// API to save interests for a user
async function interestsCreate(req, res, next) {
    
    let { userId } = req.params;
    let { interests } = req.body;

    await UserModel.findByIdAndUpdate(userId, {interests});

    res.json({ interests });
}

// API to show user info
function showProfile(req, res, next) {
    // get first name, last name, avatar
    // interests
    // likes that a user has from article model
}

module.exports = {
    interestsCreate,
    showProfile
}