const tickets = require("./models/tickets");

class TicketController {
  // GET BOOK PAGE
  index(req, res, next) {
    res.render("ticket");
    // mysql.connection.getConnection((err, connection) => {
    //   if (err) {
    //     return;
    //   }
    //   connection.execute("select * from seats", (err, seats, fields) => {
    //     if (err) {
    //       return;
    //     }
    //     const chunkedSeats = [];
    //     const chunkSize = 20;
    //     for (let i = 0; i < seats.length; i += chunkSize) {
    //       const chunk = seats.slice(i, i + chunkSize);
    //       chunkedSeats.push(chunk);
    //     }
    //     res.render("ticket", { chunkedSeats });
    //   });
    //   connection.release();
    // });
    // Seat.find()
    //   .then((seats) => {
    //     seats = seats.map((seat) => seat.toObject());
    //     seats.sort((a, b) => {
    //       const rowA = a.name.slice(0, 1);
    //       const rowB = b.name.slice(0, 1);
    //       var compare = rowA.localeCompare(rowB);
    //       if (compare == 0) {
    //         const numA = Number(a.name.slice(1));
    //         const numB = Number(b.name.slice(1));
    //         if (numA < numB) return -1;
    //         else if (numA > numB) return 1;
    //         else return 0;
    //       } else return compare;
    //     });
    //     const chunkedSeats = [];
    //     const chunkSize = 10;
    //     for (let i = 0; i < seats.length; i += chunkSize) {
    //       const chunk = seats.slice(i, i + chunkSize);
    //       chunkedSeats.push(chunk);
    //     }
    //     res.render("ticket", { chunkedSeats });
    //   })
    //   .catch(next);
  }

  // POST book ticket
  book(req, res, next) {
    var dataForm = req.body;
    // var seats = dataForm.seats.split(",");
    const crc32 = require("buffer-crc32");

    function hashStringUTF8(inputString) {
      const buffer = Buffer.from(inputString, "utf-8");
      return crc32.unsigned(buffer).toString(16);
    }
    const stringToHash = `${dataForm.name}|${dataForm.email}|${dataForm.phone}|${dataForm.seats}|${process.env.PRIVATE_KEY_TICKET}`;
    const hashData = hashStringUTF8(stringToHash);

    // res.render("ticket_booking_successful", { hashData, dataForm });
    // return;
    // save to database
    const newTicket = new tickets({
      name: dataForm.name,
      email: dataForm.email,
      phone: dataForm.phone,
      hashCode: hashData,
    });

    tickets
      .count()
      .then((quantity) => {
        if (quantity < 150) {
          return newTicket.save();
        } else {
          console.log(quantity);

          res.send(
            "<h4>Rất xin lỗi, số lượng vé miễn phí đã hết.\nVui lòng liên hệ 0562212002\nXin cảm ơn !</h4>"
          );
        }
      })
      .then((saveTicket) => {
        res.render("ticket_booking_successful", { hashData, dataForm });
      })
      .catch((err) => {
        res.status(500).json({
          error:
            "Rất xin lỗi vì sự bất tiện này.\nQuá nhiều lượng truy cập cùng lúc, xin hãy thử lại sau ... ",
        });
      });
  }

  book_copy(req, res, next) {
    const crc32 = require("buffer-crc32");

    function hashStringUTF8(inputString) {
      const buffer = Buffer.from(inputString, "utf-8");
      return crc32.unsigned(buffer).toString(16);
    }

    var dataForm = req.body;
    var seats = dataForm.seats.split(",");

    const stringToHash = `${dataForm.name}|${dataForm.email}|${dataForm.phone}|${dataForm.seats}|${process.env.PRIVATE_KEY_TICKET}`;
    const hashData = hashStringUTF8(stringToHash);

    res.render("ticket_booking_successful", { hashData, dataForm });

    // save ticket to database
    // save user
    mysql.connection.getConnection((err, connection) => {
      if (err) {
        return;
      }
      connection.execute(
        "insert into users(name, email, phone) value (?, ?, ?)",
        [dataForm.name, dataForm.email, dataForm.phone],
        (err, userResult) => {
          if (err) {
            return;
          }

          // save ticket
          connection.execute(
            "insert into tickets(user_id, code) value (?,?)",
            [userResult.insertId, hashData],
            (err, ticketResult) => {
              if (err) {
                console.log(err);
              }

              // save ticket_id to seats
              seats.forEach((seat) => {
                connection.execute(
                  "UPDATE seats SET ticket_id = ? WHERE name = (?)",
                  [ticketResult.insertId, seat],
                  (err, result) => {
                    console.log(result);
                  }
                );
              });
            }
          );
        }
      );
      connection.release();
    });
  }
}

module.exports = new TicketController();
