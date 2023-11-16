const Tickets = require("./models/tickets");
// const mysqlDatabase = require("../../config/db/mysql.js");

class ApiController {
  chekcValidateQRCode(req, res, next) {
    Tickets.find({ hashCode: req.query.hashcode })
      .then((result) => {
        result = result[0];
        res.json({
          status: "valid",
          message: `Name: ${result.name}\nEmail: ${result.email}\nPhone: ${result.phone}`,
        });
      })
      .catch((err) => {
        res.json({
          status: "invalid",
          message: "ticket error",
        });
      });

    // mysqlDatabase.connection.getConnection((err, connection) => {
    //   if (err) {
    //     res.status(500).json({
    //       status: "inValid",
    //       message: "QR code is not valid",
    //     });
    //     return;
    //   }
    //   connection.execute("select * from users", (err, result, fields) => {
    //     if (err) {
    //       res.status(400).json({
    //         data: "Error Occured!",
    //       });
    //       return;
    //     }
    //     res.json(result);
    //   });
    // });

    // console.log(req.query.content);
    // const data = {
    //   status: "inValid",
    //   message: "QR code is not valid",
    // };
    // res.json(data);
  }
}
module.exports = new ApiController();
