const feedbacks = require("./models/feedbacks");
const Seats = require("./models/seats");

class SiteController {
  home(req, res, next) {
    res.render("home");
  }
  contact(req, res, next) {
    console.log(req.statusCode);
    res.render("contact");
  }
  saveFeedback(req, res, next) {
    const { name, email, title, message } = req.body;
    const feedback = new feedbacks({
      name,
      email,
      title,
      message,
    });
    feedback
      .save()
      .then((result) => {
        res.status(201).redirect("/contact");
      })
      .catch(next);
  }
}
module.exports = new SiteController();
