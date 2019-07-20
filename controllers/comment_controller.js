const ArticleModel = require("./../database/models/article_model");

// API to create comment
async function createComment(req, res, next) {
    let { articleId } = req.params;
    let { body, user_metadata} = req.body;
    console.log(req.body);
    console.log(articleId);
    console.log(body);
    console.log(user_metadata);

    let article = await ArticleModel.findById(articleId);
    article.comments.push({ body, user_metadata});

    await article.save();

    res.redirect(`/article/${articleId}`);
}

async function deleteComment() {
    
}


module.exports = {
    createComment
}