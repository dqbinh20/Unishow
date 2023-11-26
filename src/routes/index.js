const siteRoute = require("./site");
const ticketRoute = require("./ticket");
const apiRoute = require("./api");
const donateRoute = require("./donate");
function route(app) {
  app.use("/", siteRoute);
  app.use("/ticket", ticketRoute);
  app.use("/api", apiRoute);
  app.use("/donate", donateRoute);
}

module.exports = route;
