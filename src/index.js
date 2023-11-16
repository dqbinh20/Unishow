const express = require("express");

const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/db");
db.connect();

const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const morgan = require("morgan");
app.use(morgan("combined"));

const route = require("./routes");
route(app);

app.listen(port, () => {
  console.log(`Listenning on port ${port}`);
});

// const https = require("https");
// const fs = require("fs");

// const key = fs.readFileSync("private.key");
// const cert = fs.readFileSync("certificate.crt");
// const cred = {
//   key,
//   cert,
// };

// const httpsServer = https.createServer(cred, app, () => {});
// httpsServer.listen(4000, () => {
//   console.log("listenning on port 4000");
// });
