const ArticleModel = require("./../database/models/article_model");

// API to show articles according to date posted
async function index(req, res, next){
    const articles = await ArticleModel.find().sort({"date_posted": -1});
    
    return res.send({ articles });
}


module.exports = {
    index
}