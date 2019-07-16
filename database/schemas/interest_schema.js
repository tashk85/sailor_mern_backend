const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interestSchema = new Schema({
    tag: {
        type: String,
        enum: [ 'health','degisn', 'tech', 'react', 'javascript', 'all', 'none'],
        default: 'none'
    }
});

module.exports = interestSchema;