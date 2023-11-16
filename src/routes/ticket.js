const express = require("express");
const router = express.Router();

const ticketController = require("../app/controllers/TicketController");

router.get("/", ticketController.index);
router.post("/book", ticketController.book);
module.exports = router;
