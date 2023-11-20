const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feekbacks = new Schema(
  {
    name: String,
    email: String,
    title: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedbacks", feekbacks);
