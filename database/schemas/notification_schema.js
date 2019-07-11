const { Schema } = require("mongoose");

const NotificationSchema = new Schema({
    type: Number,
    metadata: {
        first_name: String,
        last_name: String,
        email: String,
        article_title: String
    },
    article_url: String
});

module.exports = NotificationSchema;