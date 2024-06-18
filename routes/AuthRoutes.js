const express = require("express")
const router = express.Router()
const {logIn, signUp} = require("../controllers/AuthController")
const { authValidationRules } = require("../middlewares/middleware")

router.post("/login", authValidationRules,  logIn)
router.post("/signup", authValidationRules,  signUp)


module.exports = router