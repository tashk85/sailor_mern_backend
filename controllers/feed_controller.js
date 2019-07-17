const ArticleModel = require("./../database/models/article_model");
const RSSService = require("./../services/rss_service");

async function index(req,res){
    RSSService.addArticle("https://medcitynews.com/2019/07/ai-drug-discovery-company-recursion-pharmaceuticals-raises-121m-series-c/");
    const articles = await ArticleModel.find().sort({"date_posted": -1});
    return res.send({ articles });
}


module.exports = {
    index
}