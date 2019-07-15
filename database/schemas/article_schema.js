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
        title: String,
        Author: String,
        Source: String,
        url: String,
        categories: Array
    },
    artilce_body: {
        type: String,
        required: true
    },
    comments: [CommentSchema],
    likes:[likesSchema],
    interest:[interestSchema]
});

module.exports = ArticleSchema;