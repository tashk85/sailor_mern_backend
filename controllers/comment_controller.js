const ArticleModel = require("./../database/models/article_model");

async function createComment(req, res) {
    let { articleId } = req.params;
    let { body } = req.body;

    let article = await ArticleModel.findById(articleId);
    article.comments.push({ body });

    await article.save();

    res.redirect(`/article/${article._id}`);
}

async function deleteComment(req, res) {
    let { articleId } = req.params;
    let { body } = req.body;

    let article = await ArticleModel.findById(articleId);
    article.comments.push({ body });

    await article.save();

    res.redirect(`/article/${article._id}`);
}

module.exports = {
    newComment,
    createComment,
    deleteComment
}