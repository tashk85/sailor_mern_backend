const ArticleModel = require("./../database/models/article_model");
const rssService = require("./../services/rss_service");

const feeds = [
    "https://medcitynews.com/feed/", 
    "https://www.digitalhx.com/feed/", 
    "https://www.healthcareitnews.com/home/feed"
]

async function index(req,res){
    feeds.forEach(feed => rssService.fetchRSS(feed));
    const articles = await ArticleModel.find().sort({"date_posted": -1});;
    return res.send({ articles });
}


module.exports = {
    index
}