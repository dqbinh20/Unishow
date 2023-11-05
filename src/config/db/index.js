const mongoose = require("mongoose");
require("dotenv").config();

function connect() {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(process.env.DATABASE_URL, connectionParams)
    .then(() => {
      console.log("Connected database");
    })
    .catch((err) => {
      console.log("error connecting to the database");
    });
}

module.exports = { connect };
