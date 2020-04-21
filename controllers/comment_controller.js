const ArticleModel = require("./../database/models/article_model");
const UserModel = require("./../database/models/user_model");


//render comments with users info
async function index(req, res, next) {
    let { articleId } = req.params;
    //find the article
    let article = await ArticleModel.findById(articleId);
    
    // send back all users' first&last name&userId for mention functions
    let users = await UserModel.find({});
    return res.send({ article, users});
}

// API to create comment
async function createComment(req, res) {
    // access comments' body, user_metadata & mention info
    let { articleId } = req.params;
    let { body, user_metadata, mention } = req.body;

    //add comment to ArticleModel with commentors' info
    let article = await ArticleModel.findById(articleId);
    article.comments.push({ body, user_metadata});
    await article.save();

    //add notification via mention to UserModel
    console.log(`${mention.firstName} has been mentioned`);
        //find the mentionee in UserModel
        let mentionee = await UserModel.findById(mention.mentionee_id);
        //retrieve article's info from req.params
        let mentionedArticle = {
            mentioned_artileTitle: article.metadata.title,
            mentioned_url: `/article/${articleId}`
        };     
        // push commentors' & mentionedAritcle' info into notifications;
        mentionee.notifications.push({user_metadata, mentionedArticle})
        await mentionee.save();

        console.log(`${mentionee}`);
    res.redirect(`/article/${articleId}`);
}

async function destroyComment(req, res) {
    let { articleId } = req.params;
    let { _id: commentId, admin} = req.body;
    
    // access current article and the comment array
    let article = await ArticleModel.findById(articleId);
    let comment = await article.comments;

    //find the comment by commentId & delete by admin Only;
    let index = comment.indexOf(commentId);
    if (admin === true){
        comment.splice(index, 1);
        await article.save();
    } 

    res.redirect(`/article/${articleId}`); 
}


module.exports = {
    index,
    createComment,
    destroyComment
}