const express = require("express")
const router = express.Router()

const houseController = require("../controllers/houseController")

router.use("/addHouse", houseController.postHouse)
router.use("/getHouse", houseController.getHouse)
router.use("/addFavProperty", houseController.postFavProperty)
router.use("/getFavProperty", houseController.getFavProperty)

module.exports = router