const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likesSchema = new Schema({
    // tag: {
    //     // type: String,
    //     // enum: ['like', 'unlike'],
    //     // default: 'unlike'
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = likesSchema;