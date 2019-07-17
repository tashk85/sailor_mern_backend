const ArticleModel = require("../database/models/article_model");

async function show(req, res) {
    let { id } = req.params;
    let article = await ArticleModel.findById(id);
    return res.send({ article });
}

module.exports = {
    show
}