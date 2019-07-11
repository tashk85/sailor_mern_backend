const mongoose = require("mongoose");
const CommentSchema = require("./comment_schema");
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
    likes:[user_ids],
    interest_tags:[String]
});

module.exports = ArticleSchema;