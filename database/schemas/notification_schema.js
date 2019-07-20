const { Schema } = require("mongoose");

const NotificationSchema = new Schema({
    user_metadata: {
        commentor_id: String,
        firstName: String,
        lastName: String
    },
    mentionedArticle: {
        mentioned_artileTitle: String,
        mentioned_url: String,
    }
});

module.exports = NotificationSchema;