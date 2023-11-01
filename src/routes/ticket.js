const express = require("express");
const router = express.Router();

const ticketController = require("../app/controllers/TicketController");

router.get("/", ticketController.index);

module.exports = router;
