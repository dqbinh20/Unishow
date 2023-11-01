const express = require("express");
const { engine } = require("express-handlebars");
const route = require("./routes");
const app = express();
const port = 3000;
const path = require("path");
const db = require("./config/db");
db.connect();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));

route(app);

app.listen(port, () => {
  console.log(`Listenning on port ${port}`);
});
