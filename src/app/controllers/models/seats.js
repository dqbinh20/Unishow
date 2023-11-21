const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  name: String,
  booked: Boolean,
  type: String,
});

module.exports = mongoose.model("seat", seatSchema);
