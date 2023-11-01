const mongoose = require("mongoose");

function connect() {
  const uri =
    "mongodb+srv://Quangbinh:bAYzohS4WtsNfi6I@cluster0.kaluzja.mongodb.net/unishow?retryWrites=true&w=majority";
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(uri, connectionParams)
    .then(() => {
      console.log("Connected database");
    })
    .catch((err) => {
      console.log("error connecting to the database");
    });
}

module.exports = { connect };
