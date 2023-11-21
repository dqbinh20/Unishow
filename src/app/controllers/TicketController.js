const Tickets = require("./models/tickets");
const Seats = require("./models/seats");
const mongoose = require("mongoose");

class TicketController {
  // GET BOOK PAGE
  async index(req, res, next) {
    res.locals.PRICE_VIP_SEAT = 119;
    res.locals.PRICE_NORMAL_SEAT = 59;

    let seats = await Seats.find();
    seats = seats.map((seat) => seat.toObject());

    //create chunkedSeats
    const chunkedSeats = [];
    chunkedSeats.push(seats.slice(0, 16));
    chunkedSeats.push(seats.slice(16, 34));

    for (var i = 34; i <= 234; i += 20) {
      chunkedSeats.push(seats.slice(i, i + 20));
    }

    chunkedSeats.push(seats.slice(254, 270));
    chunkedSeats.push(seats.slice(270, 286));
    chunkedSeats.push(seats.slice(286, 304));
    chunkedSeats.push(seats.slice(304, 322));

    chunkedSeats.push(seats.slice(322, 329));

    res.render("ticket", { chunkedSeats });

    // Seats.find()
    //   .then((seats) => {
    //     seats = seats.map((seat) => seat.toObject());
    //     // seats.sort((a, b) => {
    //     //   const rowA = a.name.slice(0, 1);
    //     //   const rowB = b.name.slice(0, 1);
    //     //   var compare = rowA.localeCompare(rowB);
    //     //   if (compare == 0) {
    //     //     const numA = Number(a.name.slice(1));
    //     //     const numB = Number(b.name.slice(1));
    //     //     if (numA < numB) return -1;
    //     //     else if (numA > numB) return 1;
    //     //     else return 0;
    //     //   } else return compare;
    //     // });
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
  async book(req, res, next) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      var { name, email, phone, donate, seats } = req.body;
      seats = seats.split(",").map((seat) => seat.trim());

      const seatDocumentCounter = await Seats.find({
        name: { $in: seats },
        booked: false,
      }).countDocuments();

      if (seatDocumentCounter !== seats.length) {
        await session.abortTransaction();
        session.endSession();
        return res.send("<h3>Ghế đã có người đặt, thử lại ngay !</h3>");
      }

      const crc32 = require("buffer-crc32");

      function hashStringUTF8(inputString) {
        const buffer = Buffer.from(inputString, "utf-8");
        return crc32.unsigned(buffer).toString(16);
      }

      const stringToHash = `${name}|${email}|${phone}|${seats.join()}|${
        process.env.PRIVATE_KEY_TICKET
      }`;
      const hashCode = hashStringUTF8(stringToHash);
      const totalMoney = donate;

      const newTicket = new Tickets({
        name,
        email,
        phone,
        hashCode,
        donate,
        seats,
      });

      await Promise.all([
        newTicket.save({ session }),
        Seats.updateMany(
          { name: { $in: seats } },
          { booked: true },
          { session }
        ),
      ]);

      await session.commitTransaction();
      session.endSession();

      res.render("ticket_booking_successful", {
        hashCode,
        name,
        email,
        phone,
        seats,
        totalMoney,
      });
    } catch (err) {
      console.log(err);
      await session.abortTransaction();
      session.endSession();

      res.status(500).json({
        error:
          "Rất xin lỗi vì sự bất tiện này.\nQuá nhiều lượng truy cập cùng lúc, xin hãy thử lại sau ...",
      });
    }
  }
}

module.exports = new TicketController();
