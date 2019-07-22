const express = require("express");
const router = express.Router();
const ArticleController=require("./../controllers/article_controller");

// Admin - Add new article
router.post("/article/new", ArticleController.create);

module.exports = router;