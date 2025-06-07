const mongoose = require("mongoose");

const emailVerifySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  OTP: { type: String },
  OTPCreatedTime: { type: Date },
  OTPAttempts: { type: Number, default: 0 },
  isBlocked: { type: Boolean, default: false },
  blockUntil: { type: Date },
});

module.exports = mongoose.model("EmailVerify", emailVerifySchema);
