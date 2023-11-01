const Seat = require("./models/seat");

class SiteController {
  home(req, res, next) {
    Seat.find()
      .then((seats) => {
        seats = seats.map((seat) => seat.toObject());

        seats.sort((a, b) => {
          const rowA = a.name.slice(0, 1);
          const rowB = b.name.slice(0, 1);
          var compare = rowA.localeCompare(rowB);
          if (compare == 0) {
            const numA = Number(a.name.slice(1));
            const numB = Number(b.name.slice(1));
            if (numA < numB) return -1;
            else if (numA > numB) return 1;
            else return 0;
          } else return compare;
        });

        const chunkedSeats = [];
        const chunkSize = 10;

        for (let i = 0; i < seats.length; i += chunkSize) {
          const chunk = seats.slice(i, i + chunkSize);
          chunkedSeats.push(chunk);
        }

        res.render("home", { chunkedSeats });
      })
      .catch(next);
  }
}
module.exports = new SiteController();
