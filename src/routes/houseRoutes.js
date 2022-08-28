const express = require("express")
const router = express.Router()

const houseController = require("../controllers/houseController")

router.use("/addHouse", houseController.postHouse)
router.use("/getHouse", houseController.getHouse)

module.exports = router