const ArticleModel = require("./../database/models/article_model");

async function update(req, res) {
    let { articleId } = req.params;
    let { likes } = req.body;

    await ArticleModel.findByIdAndUpdate(articleId, {likes});


    res.redirect(`/article/${article._id}`);
}


module.exports = {
    update
}