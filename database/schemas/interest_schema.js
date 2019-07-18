const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InterestSchema = new Schema({
    tag: {
        type: String,
        enum: [ 'health','design', 'tech', 'react', 'javascript', 'all', 'none'],
        default: 'none'
    }
});

module.exports = InterestSchema;