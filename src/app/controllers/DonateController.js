class DonateController {
  index(req, res, next) {
    res.render("donate");
  }
  save(req, res, next) {
    res.render("donate page");
  }
}
module.exports = new DonateController();
