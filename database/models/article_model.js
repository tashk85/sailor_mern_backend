const mongoose = require("mongoose");
const ArticleSchema = require("./../schemas/article_schema");

const ArticleModel = mongoose.model("article", ArticleSchema);

module.exports = ArticleModel;