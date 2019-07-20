const { Schema } = require("mongoose");

const NotificationSchema = new Schema({
    user_metadata: {
        commentor_id: String,
        firstName: String,
        lastName: String
    },
    // mention: {
    //     mentionee_id: String,
    //     firstName: String,
    //     lastName: String,
    // },
    article: {
        mentioned_artile: String,
        mentioned_url: String,
    }
    // read: {
    //     type: Boolean,
    //     default: false
    // }
});

module.exports = NotificationSchema;