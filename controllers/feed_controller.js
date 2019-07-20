const ArticleModel = require("./../database/models/article_model");

// API to show articles according to date posted
async function index(req, res, next){
    const articles = await ArticleModel.find().sort({"date_posted": -1});
    
    return res.send({ articles });
}

async function showArticlesByInterest(req, res, next) {
    const { interest } = req.params;
    const interestTag = interest.replace("-", " ");
    const selectedArticles = await ArticleModel.find({ "interests": interestTag });

    return res.send({ selectedArticles });
}


module.exports = {
    index,
    showArticlesByInterest
}