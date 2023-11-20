const express = require("express");
const router = express.Router();
const apiController = require("../app/controllers/ApiController");

router.get("/check-validate-qrcode", apiController.checkValidateQRCode);

module.exports = router;
