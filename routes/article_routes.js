const express = require("express");
const router = express.Router();
const ArticleController=require("./../controllers/article_controller");
const CommentController=require("./../controllers/comment_controller");
const LikesController=require("./../controllers/likes_controller");
const { celebrate, Joi } = require("celebrate");

// To show an article 
router.get("/:id", ArticleController.show); //ArticleController.show

// Render comments for an article
router.get("/:articleId/comment", CommentController.index); // CommentController.createComment

// Post comments for an article
router.post("/:articleId/comment_create", CommentController.createComment); // CommentController.createComment

//Admin delete comment (need to add general users to delete their own comment function in the future)
router.delete("/:articleId/comment_delete",  CommentController.destroyComment); 

// To show and update likes for an article
router.post("/:articleId/likes", LikesController.update); // LikesController.update
router.put("/:articleId/likes", LikesController.update); // LikesController.update
router.patch("/:articleId/likes", LikesController.update); // LikesController.update

module.exports = router;