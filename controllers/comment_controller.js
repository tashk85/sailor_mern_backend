const ArticleModel = require("./../database/models/article_model");

// API to create comment
async function createComment(req, res, next) {
    let { articleId } = req.params;
    let { body } = req.body;

    let article = await ArticleModel.findById(articleId);
    article.comments.push({ body });

    await article.save();

    res.redirect(`/article/${article._id}`);
}


module.exports = {
    createComment
}