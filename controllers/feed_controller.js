const ArticleModel = require("./../database/models/article_model");

function index(req,res){
    const email = req.user.email;
    console.log("yes");
    return res.render("feed/feed", { email });
}

module.exports = {
    index
}