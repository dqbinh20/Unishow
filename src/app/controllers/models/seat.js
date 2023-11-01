const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seat = new Schema({
  name: String,
  booked: Boolean,
  customerName: String,
});

module.exports = mongoose.model("seat", seat);
