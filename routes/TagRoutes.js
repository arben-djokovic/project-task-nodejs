const express = require("express")
const { tagValidation } = require("../middlewares/middleware") 
const { createTag, getTags } = require("../controllers/TagController")
const router = express.Router()

router.get("/", getTags)
router.post("/", tagValidation, createTag)


module.exports = router