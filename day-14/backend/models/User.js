const e = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
