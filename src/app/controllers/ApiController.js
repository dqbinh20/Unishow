const Seat = require("./models/seat");

class ApiController {
  chekcValidateQRCode(req, res, next) {
    console.log(req.query.content);
    const data = {
      status: "inValid",
      message: "QR code is not valid",
    };
    res.json(data);
  }
}
module.exports = new ApiController();
