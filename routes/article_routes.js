const express = require("express");
const router = express.Router();

// To see an article
router.get("/:id", (req, res) => res.send("Individual Article")); //ArticleController.show

// Renders comments for an article
router.get("/:id/comment", (req, res) => res.send("Individual Article Comment")); // CommentController.newComment
router.post("/:id/comment", (req, res) => res.send("Created Individual Article Comment")); // CommentController.createComment
// we don't need route to show all comments as it's part of article route
// router.get("/:id/comments", (req, res) => res.send("Show Article Comments")); // CommentController.showComments
router.delete("/:id/comment", (req, res) => res.send("Delete Individual Article Comment")); // CommentController.deleteComment

module.exports = router;