const siteRoute = require("./site");
const ticketRoute = require("./ticket");
function route(app) {
  app.use("/", siteRoute);
  app.use("/ticket", ticketRoute);
}

module.exports = route;
