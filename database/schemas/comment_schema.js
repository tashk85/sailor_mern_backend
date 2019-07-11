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
        first_name: String,
        last_name: String,
        linkedin_url: String
    }
});

module.exports = CommentSchema;