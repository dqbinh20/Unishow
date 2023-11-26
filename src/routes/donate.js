const express = require("express");
const router = express.Router();

const donateController = require("../app/controllers/DonateController");

router.get("/", donateController.index);
router.post("/", donateController.save);
module.exports = router;
