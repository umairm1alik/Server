const mongoose = require("mongoose");
const { Schema } = mongoose;

const houseSchema = new Schema({
    headline: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
});
const HouseModel = mongoose.model("house", houseSchema);
module.exports = HouseModel;