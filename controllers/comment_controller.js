const ArticleModel = require("./../database/models/article_model");

// API to create comment
async function createComment(req, res) {
    let { articleId } = req.params;
    let { body, user_metadata} = req.body;
    // console.log(req.body);
    // console.log(articleId);
    // console.log(body);
    // console.log(user_metadata);
    let article = await ArticleModel.findById(articleId);
    article.comments.push({ body, user_metadata});

    await article.save();

    res.redirect(`/article/${articleId}`);
}

async function destroyComment(req, res) {
    let { articleId } = req.params;
    let { _id: commentId } = req.body;

    // access current article and the comment array
    let article = await ArticleModel.findById(articleId);
    let comment = await article.comments

    //find the comment by commentId, & delete the comment
    let index = comment.indexOf(commentId);
    comment.splice(index, 1);
        await article.save();

    res.redirect(`/article/${articleId}`);
    
}


module.exports = {
    createComment,
    destroyComment
}