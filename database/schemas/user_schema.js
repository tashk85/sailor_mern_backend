const { Schema } = require("mongoose");
const NotificationSchema = require("./notification_schema");
const InterestSchema = require("./interest_schema");

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
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
    admin: {
        type: Boolean,
        default: false,
        required: true
    },
    avatar: {
        type: String,
        trim: true
    },
    linkedinProfile: {
        type: String,
        trim: true
    },
    interest: [InterestSchema],
    notifications: [NotificationSchema]
});

UserSchema.plugin(require('mongoose-bcrypt'));

module.exports = UserSchema;