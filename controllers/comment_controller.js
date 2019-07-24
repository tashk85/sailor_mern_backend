const ArticleModel = require("./../database/models/article_model");
const UserModel = require("./../database/models/user_model");

//render comments with users info
async function index(req, res, next) {
  let { articleId } = req.params;
  //find the article
  let article = await ArticleModel.findById(articleId);

  // send back all users' first&last name&userId for mention functions
  let users = await UserModel.find({});
  let filteredUsers = [];
  users.forEach(user => {
    let { firstName, lastName, email, _id: userId } = user;
    filterdUser = { firstName, lastName, email, userId };
    filteredUsers.push(filterdUser);
    return filteredUsers;
  });

  return res.send({ article, filteredUsers });
}

// API to create comment
async function createComment(req, res) {
  // access comments' body, user_metadata & mention info
  let { articleId } = req.params;
  let { body, user_metadata, date_posted, mentions } = req.body;

  //add comment to ArticleModel with commentors' info
  let article = await ArticleModel.findById(articleId);
  article.comments.push({ body, user_metadata, date_posted });
  await article.save();


  // Article Data
    let mentionedArticle = {
      mentioned_artileTitle: article.metadata.title,
      mentioned_url: `/article/${articleId}`
    };

  //   add notification via mention to UserModel

  //  find the mentionees in UserModel
// push commentors' & mentionedAritcle' info into notifications;
  mentions.taggedUsers.forEach(email => {
    UserModel.find({ "email": email })
      .then(mentionee => {
        if (!mentionee[0].notifications.includes({ user_metadata, mentionedArticle })) {
          mentionee[0].notifications.unshift({ user_metadata, mentionedArticle });
          mentionee[0].save();
        }
      })
  })

  res.json(article.comments);
}

async function destroyComment(req, res) {
  let { articleId } = req.params;
  let { _id: commentId, admin } = req.body;

  // access current article and the comment array
  let article = await ArticleModel.findById(articleId);
  let comment = await article.comments;

  //find the comment by commentId & delete by admin Only;
  let index = comment.indexOf(commentId);
  if (admin === true) {
    comment.splice(index, 1);
    await article.save();
  }

  res.redirect(`/article/${articleId}`);
}

module.exports = {
  index,
  createComment,
  destroyComment
};
