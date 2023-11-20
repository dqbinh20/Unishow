const express = require("express");
const router = express.Router();
const siteController = require("../app/controllers/SiteController");

router.get("/", siteController.home);
router.get("/contact", siteController.getContact);
router.post("/contact", siteController.postContact);
module.exports = router;
