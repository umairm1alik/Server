const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const authMiddleware = require("../middlewares/authMiddleware")

// ROute Level Middleware - To Protect Route
router.use('/changePassword', authMiddleware)
router.use('/loggedInUser', authMiddleware)

//Public Route
router.post("/signup", authController.signup)
router.post("/login", authController.login)

//Private Route
router.post("/changePassword", authController.changePassword)
router.get("/loggedInUser", authController.loggedInUser)



module.exports = router