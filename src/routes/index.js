const siteRoute = require("./site");
const ticketRoute = require("./ticket");
const apiRoute = require("./api");
function route(app) {
  app.use("/", siteRoute);
  app.use("/ticket", ticketRoute);
  app.use("/api", apiRoute);
}

module.exports = route;
