const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tickets = new Schema({
  name: String,
  email: String,
  phone: String,
  hashCode: String,
});

module.exports = mongoose.model("tickets", tickets);
