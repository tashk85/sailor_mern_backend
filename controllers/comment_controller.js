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
    let { _id: commentId, userDelete, admin} = req.body;
    
    // access current article and the comment array
    let article = await ArticleModel.findById(articleId);
    let comment = await article.comments;
    // let commentor = comment.user_metadata._id;

    console.log(`comment: ${comment}`);
    // console.log(`commentor: ${commentor}`)

    //find the comment by commentId & delete by admin or general_user;
    let index = comment.indexOf(commentId);
    if (admin === true){
        comment.splice(index, 1);
        await article.save();
    } else {
        if (userDelete === commentor){
            comment.splice(index, 1);
            await article.save();
            res.redirect(`/article/${articleId}`);
        }else {
            res.redirect(`/article/${articleId}`);
        }
    }
    res.redirect(`/article/${articleId}`); 
}


module.exports = {
    createComment,
    destroyComment
}