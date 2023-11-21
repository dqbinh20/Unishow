const express = require("express");
const router = express.Router();
const siteController = require("../app/controllers/SiteController");

router.get("/", siteController.home);
router.get("/contact", siteController.contact);
router.post("/contact", siteController.saveFeedback);
module.exports = router;
