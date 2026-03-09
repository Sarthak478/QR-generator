const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,

    text: String,
    type: String,

    shortId: String,
    scanCount: { type: Number, default: 0 },

    expiryDate: Date,
    password: String,

    oneTime: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QR", qrSchema);