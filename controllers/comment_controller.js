const ArticleModel = require("./../database/models/article_model");
const UserModel = require("./../database/models/user_model");


//render comments with users info
async function index(req, res, next) {
    let { articleId } = req.params;
    //find the article
    let article = await ArticleModel.findById(articleId);
    // send back all users' first&last name&userId for mention functions
    
    let users = await UserModel.find({});
    console.log(users);
    // users.forEach((user)=>{
    //     delete user.lastName;
    //     console.log(`test delete:${user}`);
    // })

    // console.log(`retrieved users: ${users}`);
    // // console.log(`send to front users infor: ${allUsers}`);

    return res.send({ article, users});

}

// API to create comment
async function createComment(req, res) {
    let { articleId } = req.params;
    // access comments' body, user_metadata & mention info
    let { body, user_metadata, mention } = req.body;
    //add comment to ArticleModel with commentors' info
    let article = await ArticleModel.findById(articleId);
    article.comments.push({ body, user_metadata});
    await article.save();

    //add mention to UserModel
    console.log(`${mention.firstName} has been mentioned`);
        //find the mentionee in UserModel
        //retrieve commentor's info from comment's user_metadata
        //retrieve article's info from req.params
        let mentionedArticle = {
            mentioned_artile: article.metadata.title,
            mentioned_url: `/article/${articleId}`
        };     

        user_metadata = JSON.stringify(user_metadata);
        mentionedArticle = JSON.stringify(mentionedArticle);
  
        console.log(`mentioned artile info: ${mentionedArticle}`);
        console.log(` commentor info: ${user_metadata}`);
    // let mentionee = await UserModel.findByIdAndUpdate(mention.mentionee_id, { notifications: user_metadata });
    // await mentionee.save();
    // console.log(mentionee);
        //retrieve article's info from req.params

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