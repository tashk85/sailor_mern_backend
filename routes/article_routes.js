const express = require("express");
const router = express.Router();

// To find the article 
router.get("/:id", ArticleController.show); //ArticleController.show

// Renders comments for an article
router.post("/:articleid/comment", CommentController.createComment); // CommentController.createComment

// we don't need route to show all comments as it's part of article route

module.exports = router;