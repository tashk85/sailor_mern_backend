const express = require("express");
const router = express.Router();
const ArticleController=require("./../controllers/article_controller");
const CommentController=require("./../controllers/comment_controller");
const LikesController=require("./../controllers/likes_controller");

// To show an article 
router.get("/:id", ArticleController.show); //ArticleController.show

// Renders comments for an article
router.post("/:articleId/comment_create", CommentController.createComment); // CommentController.createComment
router.delete("/:articleId/comment_delete", CommentController.destroyComment);

// To show and update likes for an article
router.post("/:articleId/likes", LikesController.update); // LikesController.update
router.put("/:articleId/likes", LikesController.update); // LikesController.update
router.patch("/:articleId/likes", LikesController.update); // LikesController.update

// router.post("/new", ArticleController.create); --> move to admin routes

module.exports = router;