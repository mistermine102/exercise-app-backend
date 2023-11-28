const express = require("express")
const router = express.Router()

const calendarController = require("../controllers/Calendar")

router.get("/", calendarController.getCalendar)

router.post("/select-group", calendarController.selectGroup)

module.exports = router