const express = require("express");
const router = express.Router();
const siteController = require("../app/controllers/SiteController");

const Ticket = require("../app/controllers/models/tickets");

router.get("/", siteController.home);
router.get("/contact", siteController.contact);
router.post("/contact", siteController.saveFeedback);
router.get("/admin/nguyenthanhngan", (req, res, next) => {
  Ticket.find()
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});
module.exports = router;
