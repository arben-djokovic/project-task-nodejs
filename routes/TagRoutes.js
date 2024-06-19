const express = require("express")
const { tagValidation } = require("../middlewares/middleware") 
const { createTag } = require("../controllers/TagController")
const router = express.Router()

router.post("/", tagValidation, createTag)


module.exports = router