const Seat = require("./models/seat");

class ApiController {
  chekcValidateQRCode(req, res, next) {
    console.log(req.query.content);
    const data = { name: "Duong Quang Binh" };
    res.json(data);
  }
}
module.exports = new ApiController();
