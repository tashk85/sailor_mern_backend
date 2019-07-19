const mongoose = require("mongoose");
const InterestSchema = require("./../schemas/interest_schema");

const InterestModel = mongoose.model("interest", InterestSchema);

module.exports = InterestModel;