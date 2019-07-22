const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InterestSchema = new Schema({
    tag: {
        type: String,
        enum: [
            "Digital Health", 
            "General Practice", 
            "HealthTech", 
            "Mental Health", 
            "Public Health", 
            "Apps", 
            "Legal", 
            "TeleHealth", 
            "Devices",
            "Innovation"
        ],
        default: 'none'
    }
});

module.exports = InterestSchema;