const { Schema } = require("mongoose");

const NotificationSchema = new Schema({
    type: Number,
    metadata: {
        user_id: String,
        first_name: String,
        last_name: String,
        email: String,
        article_title: String
    },
    article_url: String,
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = NotificationSchema;