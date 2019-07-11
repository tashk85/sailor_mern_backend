const { Schema } = require("mongoose");
const NotificationSchema = require("./notification_schema");
const interestSchema = require("./interest_schema");

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        bcrypt: true
    },
    linkedin_profile: {
        type: String,
        trim: true
    },
    interest: [interestSchema],
    notifications: [NotificationSchema]
});

UserSchema.plugin(require('mongoose-bcrypt'));

module.exports = UserSchema;