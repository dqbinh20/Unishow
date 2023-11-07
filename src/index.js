const express = require("express");
const { engine } = require("express-handlebars");
const route = require("./routes");
const morgan = require("morgan");
const app = express();
const port = 3000;
const path = require("path");
const db = require("./config/db");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
db.connect();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("combined"));
route(app);

app.listen(port, () => {
  console.log(`Listenning on port ${port}`);
});
