const ArticleModel = require("./../database/models/article_model");

async function index(req,res){
    const articles = await ArticleModel.find().sort({"date_posted": -1});
    return res.send({ articles });
}


module.exports = {
    index
}