const ArticleModel = require("./../database/models/article_model");
const  RssFetch = require("./../services/rss_service");

function index(req,res){
    // const email = req.user.email;
    // RssFetch.RssMedCity();
    // RssFetch.Trial();
    RssFetch.getIndividualArticle();
    return res.json("feed testing!")
    // return res.render("feed/feed", { email });
}





module.exports = {
    index
}