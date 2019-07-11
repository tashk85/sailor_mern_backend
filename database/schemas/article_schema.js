const mongoose = require("mongoose");
const CommentSchema = require("./comment_schema");
const interestSchema = require("./interest_schema");
const likesSchema = require("./likes_schema");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    date_posted: {
        type: Date,
        required: true
    },
    metadata: {
        Author: String,
        Source: String,
        url: String
    },
    comments: [CommentSchema],
    //double check whether it's correctly referenced??? likes & interest schema are creatd as test.
    likes:[likesSchema],
    interest:[interestSchema]
});

module.exports = ArticleSchema;