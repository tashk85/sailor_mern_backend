const ArticleModel = require("../database/models/article_model");

async function show(req, res) {
    let { id } = req.params;
    let article = await ArticleModel.findById(id).populate("article");
    console.log(article);
    res.render("article/show", { article });
}

module.exports = {
    show
}