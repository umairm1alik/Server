const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    // tc: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
});
const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;