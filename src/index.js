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

// const Seats = require("./app/controllers/models/seats");

// Seats.deleteMany()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {});

// const saveSeatssSequentially = async () => {
//   for (let i = 1; i <= 16; i++) {
//     try {
//       const result = await new Seats({
//         name: "A" + i,
//         booked: false,
//         type: "special",
//       }).save();
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   // tret vip
//   for (let i = 1; i <= 18; i++) {
//     try {
//       const result = await new Seats({
//         name: "B" + i,
//         booked: false,
//         type: "vip",
//       }).save();
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   for (let i = 1; i <= 20; i++) {
//     try {
//       const result = await new Seats({
//         name: "C" + i,
//         booked: false,
//         type: "vip",
//       }).save();
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   // tret normal
//   for (let row = 68; row <= 68 + 9; row++)
//     for (let i = 1; i <= 20; i++) {
//       try {
//         const result = await new Seats({
//           name: String.fromCharCode(row) + i,
//           booked: false,
//           type: "normal",
//         }).save();
//       } catch (err) {
//         console.log(err);
//       }
//     }

//   // lau vip
//   for (let row = 78; row <= 79; row++)
//     for (let i = 1; i <= 16; i++) {
//       try {
//         const result = await new Seats({
//           name: String.fromCharCode(row) + i,
//           booked: false,
//           type: "vip",
//         }).save();
//       } catch (err) {
//         console.log(err);
//       }
//     }

//   // lau normal
//   for (let row = 80; row <= 81; row++)
//     for (let i = 1; i <= 18; i++) {
//       try {
//         const result = await new Seats({
//           name: String.fromCharCode(row) + i,
//           booked: false,
//           type: "normal",
//         }).save();
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   for (let i = 1; i <= 7; i++) {
//     try {
//       const result = await new Seats({
//         name: String.fromCharCode(82) + i,
//         booked: false,
//         type: "normal",
//       }).save();
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

// saveSeatssSequentially();

// xoa ve
const Ticket = require("./app/controllers/models/tickets");
const Seat = require("./app/controllers/models/seats");

// const hashCode = "56cd68ed";
// Ticket.findOne({ hashCode })
//   .then((ticket) => {
//     if (!ticket) {
//       throw new Error("Ticket not found");
//     }
//     return Seat.updateMany({ name: { $in: ticket.seats } }, { booked: false });
//   })
//   .then((updateResult) => {
//     console.log("Seats updated successfully");
//     return Ticket.deleteOne({ hashCode });
//   })
//   .then((deleteResult) => {
//     console.log("Ticket deleted successfully");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// Ticket.deleteOne({ hashCode });
