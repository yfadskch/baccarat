const mongoose = require("mongoose");

const gameResultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    result: { type: String, enum: ["player", "banker", "tie"], required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("GameResult", gameResultSchema);
