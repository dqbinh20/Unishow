const Tickets = require("./models/tickets");

class ApiController {
  checkValidateQRCode(req, res, next) {
    Tickets.find({ hashCode: req.query.hashcode })
      .then((result) => {
        result = result[0];
        res.json({
          status: "valid",
          message: `Name: ${result.name}\nEmail: ${result.email}\nPhone: ${result.phone}\nDonate: ${result.donate}`,
        });
      })
      .catch((err) => {
        res.json({
          status: "invalid",
          message: "ticket error",
        });
      });
  }
}
module.exports = new ApiController();
