const express = require("express");
const router = express.Router();
const ArticleController=require("./../controllers/article_controller");

router.post("/article/new", ArticleController.create);

module.exports = router;