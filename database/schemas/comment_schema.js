const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    date_posted: {
        type: Date,
        required: true,
        default: Date.now()
    },
    body: {
        type: String,
        required: true
    },
    user_metadata: {
        commentor_id: String,
        firstName: String,
        lastName: String,
        linkedin_url: String
    }
});

module.exports = CommentSchema;